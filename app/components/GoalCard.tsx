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
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-purple-500">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 line-clamp-2">
              {goal.realGoal}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Calendar className="w-4 h-4" />
              <span>Due: {formatDate(new Date(goal.deadline))}</span>
            </div>
          </div>
          {goal.isCompleted && (
            <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
          )}
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600 dark:text-gray-400">Progress</span>
            <span className="font-semibold text-gray-800 dark:text-white">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Target className="w-4 h-4 text-purple-500" />
              <span className="text-gray-600 dark:text-gray-400">
                {completedProcessGoals}/{totalProcessGoals} Process Goals
              </span>
            </div>
          </div>
          <div className="text-purple-600 dark:text-purple-400 font-semibold">View →</div>
        </div>
      </div>
    </Link>
  );
}



