"use client";

import Link from "next/link";
import { formatDate } from "@/app/lib/utils";
import { Target, Calendar, CheckCircle2 } from "lucide-react";

interface GoalCardProps {
  goal: {
    id: string;
    realGoal: string;
    deadline: Date;
    isCompleted: boolean;
    processGoals: any[];
    habitGoals: any[];
  };
  onUpdate: () => void;
}

export default function GoalCard({ goal, onUpdate }: GoalCardProps) {
  const completedProcessGoals = goal.processGoals?.filter((pg: any) => pg.isCompleted).length || 0;
  const totalProcessGoals = goal.processGoals?.length || 0;
  const progress = totalProcessGoals > 0 ? (completedProcessGoals / totalProcessGoals) * 100 : 0;

  return (
    <Link href={`/goals/${goal.id}`}>
      <div className="bg-white border-2 border-orange-300 rounded-xl p-6 hover:border-orange-500 hover:shadow-xl transition-all cursor-pointer shadow-lg">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
              {goal.realGoal}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4 text-orange-500" />
              <span>Due: {formatDate(new Date(goal.deadline))}</span>
            </div>
          </div>
          {goal.isCompleted && (
            <CheckCircle2 className="w-6 h-6 text-orange-600 flex-shrink-0" />
          )}
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600 font-bold">Progress</span>
            <span className="font-bebas text-[#ea580c] text-lg">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-orange-100 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-orange-600 to-red-600 h-3 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Target className="w-4 h-4 text-orange-500" />
              <span className="text-gray-600">
                {completedProcessGoals}/{totalProcessGoals} Process Goals
              </span>
            </div>
          </div>
          <div className="text-orange-600 font-bold">View →</div>
        </div>
      </div>
    </Link>
  );
}



