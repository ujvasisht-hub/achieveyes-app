import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const goal = await prisma.goal.findFirst({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    });

    if (!goal) {
      return NextResponse.json({ error: "Goal not found" }, { status: 404 });
    }

    const { processGoals, habitGoals } = await request.json();

    // Delete existing process goals, habit goals, and milestones
    await prisma.processGoal.deleteMany({
      where: { goalId: params.id },
    });
    await prisma.habitGoal.deleteMany({
      where: { goalId: params.id },
    });
    await prisma.milestone.deleteMany({
      where: { goalId: params.id },
    });

    // Create new process goals
    if (processGoals && processGoals.length > 0) {
      await prisma.processGoal.createMany({
        data: processGoals.map((pg: any) => ({
          goalId: params.id,
          title: pg.title,
          description: pg.description || null,
          periodType: pg.periodType,
          periodStart: new Date(pg.periodStart),
          periodEnd: new Date(pg.periodEnd),
        })),
      });
    }

    // Create new habit goals
    if (habitGoals && habitGoals.length > 0) {
      await prisma.habitGoal.createMany({
        data: habitGoals.map((hg: any) => ({
          goalId: params.id,
          title: hg.title,
          description: hg.description || null,
          type: hg.type,
        })),
      });
    }

    // Create initial milestones
    const processGoalsCount = processGoals?.length || 0;
    const milestones = [];
    
    if (processGoalsCount > 0) {
      milestones.push(
        {
          goalId: params.id,
          title: "25% Process Goals Complete",
          description: "Complete 25% of your process goals",
          type: "process",
          targetValue: Math.ceil(processGoalsCount * 0.25),
        },
        {
          goalId: params.id,
          title: "50% Process Goals Complete",
          description: "Complete 50% of your process goals",
          type: "process",
          targetValue: Math.ceil(processGoalsCount * 0.5),
        },
        {
          goalId: params.id,
          title: "75% Process Goals Complete",
          description: "Complete 75% of your process goals",
          type: "process",
          targetValue: Math.ceil(processGoalsCount * 0.75),
        },
        {
          goalId: params.id,
          title: "100% Process Goals Complete",
          description: "Complete all your process goals",
          type: "process",
          targetValue: processGoalsCount,
        }
      );
    }

    const habitGoalsCount = habitGoals?.length || 0;
    if (habitGoalsCount > 0) {
      milestones.push(
        {
          goalId: params.id,
          title: "7 Day Habit Streak",
          description: "Maintain a 7-day streak for any habit",
          type: "habit",
          targetValue: 7,
        },
        {
          goalId: params.id,
          title: "14 Day Habit Streak",
          description: "Maintain a 14-day streak for any habit",
          type: "habit",
          targetValue: 14,
        },
        {
          goalId: params.id,
          title: "21 Day Habit Streak",
          description: "Complete 21 days for any habit",
          type: "habit",
          targetValue: 21,
        }
      );
    }

    if (milestones.length > 0) {
      await prisma.milestone.createMany({
        data: milestones,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error setting up goal:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
