"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts";
import { formatDate } from "@/app/lib/utils";

interface ProgressChartProps {
  goal: any;
}

export default function ProgressChart({ goal }: ProgressChartProps) {
  // Prepare data for process goals progress
  const processGoalsData = goal.processGoals?.map((pg: any, index: number) => {
    const completed = pg.isCompleted ? 1 : 0;
    return {
      name: `PG ${index + 1}`,
      completed,
      target: 1,
      progress: completed * 100,
    };
  }) || [];

  // Prepare data for habit streaks
  const habitData = goal.habitGoals?.map((hg: any) => {
    const streak = goal.checkIns?.filter(
      (ci: any) => ci.habitGoalId === hg.id && ci.isAccomplished
    ).length || 0;
    return {
      name: hg.title.substring(0, 15),
      streak,
      target: hg.targetDays,
      progress: Math.min((streak / hg.targetDays) * 100, 100),
    };
  }) || [];

  // Timeline data
  const timelineData = goal.processGoals?.map((pg: any, index: number) => ({
    date: formatDate(new Date(pg.periodStart)),
    completed: pg.isCompleted ? 1 : 0,
    index: index + 1,
  })) || [];

  return (
    <div className="space-y-6">
      {/* Process Goals Progress */}
      {processGoalsData.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Process Goals Progress
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={processGoalsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="completed" fill="#8b5cf6" name="Completed" />
              <Bar dataKey="target" fill="#e5e7eb" name="Target" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Habit Streaks */}
      {habitData.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Habit Streaks
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={habitData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="streak" fill="#f97316" name="Current Streak" />
              <Bar dataKey="target" fill="#e5e7eb" name="Target (21 days)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Timeline Progress */}
      {timelineData.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Timeline Progress
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="completed"
                stroke="#8b5cf6"
                strokeWidth={2}
                name="Completed"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}



