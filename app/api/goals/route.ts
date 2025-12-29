import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const goals = await prisma.goal.findMany({
      where: { userId: session.user.id },
      include: {
        processGoals: true,
        habitGoals: true,
        checkIns: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(goals);
  } catch (error: any) {
    console.error("Error fetching goals:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { initialGoal, realGoal, deadline, why1, why2, why3, why4, why5 } = body;

    if (!realGoal || !deadline) {
      return NextResponse.json(
        { error: "Real goal and deadline are required" },
        { status: 400 }
      );
    }

    const goal = await prisma.goal.create({
      data: {
        userId: session.user.id,
        initialGoal: initialGoal || realGoal,
        realGoal,
        deadline: new Date(deadline),
        why1: why1 || null,
        why2: why2 || null,
        why3: why3 || null,
        why4: why4 || null,
        why5: why5 || null,
      },
    });

    return NextResponse.json(goal, { status: 201 });
  } catch (error: any) {
    console.error("Error creating goal:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}



