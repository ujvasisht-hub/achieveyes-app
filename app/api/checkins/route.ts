import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import { isSameDay } from "@/app/lib/utils";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { goalId, processGoalId, habitGoalId, isAccomplished, notes } =
      await request.json();

    if (!goalId || (!processGoalId && !habitGoalId)) {
      return NextResponse.json(
        { error: "Goal ID and either process or habit goal ID required" },
        { status: 400 }
      );
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if check-in already exists for today
    const existingCheckIn = await prisma.checkIn.findFirst({
      where: {
        userId: session.user.id,
        goalId,
        processGoalId: processGoalId || null,
        habitGoalId: habitGoalId || null,
        date: {
          gte: today,
          lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
        },
      },
    });

    let checkIn;
    if (existingCheckIn) {
      // Update existing check-in
      checkIn = await prisma.checkIn.update({
        where: { id: existingCheckIn.id },
        data: {
          isAccomplished,
          notes: notes || null,
        },
      });
    } else {
      // Create new check-in
      checkIn = await prisma.checkIn.create({
        data: {
          userId: session.user.id,
          goalId,
          processGoalId: processGoalId || null,
          habitGoalId: habitGoalId || null,
          date: today,
          isAccomplished,
          notes: notes || null,
        },
      });
    }

    // Handle process goal completion
    if (processGoalId && isAccomplished) {
      const processGoal = await prisma.processGoal.findUnique({
        where: { id: processGoalId },
      });

      if (processGoal && !processGoal.isCompleted) {
        await prisma.processGoal.update({
          where: { id: processGoalId },
          data: {
            isCompleted: true,
            completedAt: new Date(),
          },
        });
      }
    }

    // Handle habit goal tracking
    if (habitGoalId) {
      const habitGoal = await prisma.habitGoal.findUnique({
        where: { id: habitGoalId },
        include: {
          checkIns: {
            where: { isAccomplished: true },
            orderBy: { date: "desc" },
          },
        },
      });

      if (habitGoal) {
        if (isAccomplished) {
          // Calculate streak
          let streak = 0;
          const checkIns = habitGoal.checkIns.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          );

          for (const ci of checkIns) {
            const checkInDate = new Date(ci.date);
            checkInDate.setHours(0, 0, 0, 0);
            const daysDiff = Math.floor(
              (today.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
            );

            if (daysDiff === streak) {
              streak++;
            } else {
              break;
            }
          }

          // Add today's check-in to streak
          if (streak === 0 || isSameDay(new Date(checkIns[0]?.date || 0), today)) {
            streak++;
          }

          const longestStreak = Math.max(streak, habitGoal.longestStreak);
          const isCompleted = streak >= habitGoal.targetDays;

          await prisma.habitGoal.update({
            where: { id: habitGoalId },
            data: {
              currentStreak: streak,
              longestStreak,
              lastCheckInDate: today,
              isCompleted: isCompleted || habitGoal.isCompleted,
              completedAt: isCompleted && !habitGoal.isCompleted ? new Date() : habitGoal.completedAt,
            },
          });
        } else {
          // Reset streak if missed (and not same day grace period)
          const lastCheckIn = habitGoal.checkIns[0];
          if (lastCheckIn) {
            const lastCheckInDate = new Date(lastCheckIn.date);
            lastCheckInDate.setHours(0, 0, 0, 0);
            const daysDiff = Math.floor(
              (today.getTime() - lastCheckInDate.getTime()) / (1000 * 60 * 60 * 24)
            );

            // If more than 1 day has passed, reset streak
            if (daysDiff > 1) {
              await prisma.habitGoal.update({
                where: { id: habitGoalId },
                data: {
                  currentStreak: 0,
                },
              });
            }
          }
        }
      }
    }

    // Handle recalibration for missed process goals
    if (processGoalId && !isAccomplished) {
      await handleRecalibration(processGoalId, goalId);
    }

    // Update milestones
    await updateMilestones(goalId);

    return NextResponse.json(checkIn);
  } catch (error: any) {
    console.error("Error creating check-in:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

async function handleRecalibration(processGoalId: string, goalId: string) {
  const processGoal = await prisma.processGoal.findUnique({
    where: { id: processGoalId },
    include: { goal: true },
  });

  if (!processGoal || processGoal.isCompleted) return;

  const now = new Date();
  const periodEnd = new Date(processGoal.periodEnd);
  const isPastDue = periodEnd < now;

  if (isPastDue) {
    // Calculate extra work needed (2-4 check-ins)
    const extraDays = Math.floor(Math.random() * 3) + 2; // 2-4 days
    const newEndDate = new Date(now.getTime() + extraDays * 24 * 60 * 60 * 1000);

    // Create recalibration record
    await prisma.recalibration.create({
      data: {
        processGoalId,
        reason: "Process goal was not accomplished by deadline",
        originalEndDate: periodEnd,
        newEndDate,
        extraWorkDays: extraDays,
        isAccepted: false,
        isManual: false,
      },
    });

    // Auto-update the period end (user can manually override later)
    await prisma.processGoal.update({
      where: { id: processGoalId },
      data: {
        periodEnd: newEndDate,
      },
    });
  }
}

async function updateMilestones(goalId: string) {
  const goal = await prisma.goal.findUnique({
    where: { id: goalId },
    include: {
      processGoals: true,
      habitGoals: true,
      milestones: true,
    },
  });

  if (!goal) return;

  // Update process goal milestones
  const completedProcessGoals = goal.processGoals.filter((pg) => pg.isCompleted).length;
  const processMilestones = goal.milestones.filter((m) => m.type === "process");

  for (const milestone of processMilestones) {
    if (!milestone.isCompleted && completedProcessGoals >= milestone.targetValue) {
      await prisma.milestone.update({
        where: { id: milestone.id },
        data: {
          isCompleted: true,
          completedAt: new Date(),
          currentValue: completedProcessGoals,
        },
      });

      // Award badge
      await prisma.badge.create({
        data: {
          userId: goal.userId,
          type: "milestone",
          title: milestone.title,
          description: milestone.description || "",
        },
      });
    } else {
      await prisma.milestone.update({
        where: { id: milestone.id },
        data: {
          currentValue: completedProcessGoals,
        },
      });
    }
  }

  // Update habit streak milestones
  const habitMilestones = goal.milestones.filter((m) => m.type === "habit");
  const maxStreak = Math.max(
    ...goal.habitGoals.map((hg) => hg.currentStreak),
    0
  );

  for (const milestone of habitMilestones) {
    if (!milestone.isCompleted && maxStreak >= milestone.targetValue) {
      await prisma.milestone.update({
        where: { id: milestone.id },
        data: {
          isCompleted: true,
          completedAt: new Date(),
          currentValue: maxStreak,
        },
      });

      // Award badge
      await prisma.badge.create({
        data: {
          userId: goal.userId,
          type: "habit_streak",
          title: milestone.title,
          description: milestone.description || "",
        },
      });
    } else {
      await prisma.milestone.update({
        where: { id: milestone.id },
        data: {
          currentValue: maxStreak,
        },
      });
    }
  }

  // Check if all process goals are completed
  if (
    goal.processGoals.length > 0 &&
    completedProcessGoals === goal.processGoals.length &&
    !goal.isCompleted
  ) {
    await prisma.goal.update({
      where: { id: goalId },
      data: {
        isCompleted: true,
        completedAt: new Date(),
      },
    });

    // Award completion badge
    await prisma.badge.create({
      data: {
        userId: goal.userId,
        type: "goal_complete",
        title: "Goal Completed!",
        description: `Congratulations on completing: ${goal.realGoal}`,
      },
    });
  }
}



