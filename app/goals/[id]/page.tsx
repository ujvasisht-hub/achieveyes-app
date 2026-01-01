"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { formatDate, isSameDay } from "@/app/lib/utils";
import {
  Calendar,
  Target,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Trophy,
  Flame,
} from "lucide-react";
import CheckInModal from "@/app/components/CheckInModal";
import ProgressChart from "@/app/components/ProgressChart";

export default function GoalDetailPage() {
  const params = useParams();
  const router = useRouter();
  const goalId = params.id as string;

  const [goal, setGoal] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  useEffect(() => {
    fetchGoal();
  }, [goalId]);

  const fetchGoal = async () => {
    try {
      const res = await fetch(`/api/goals/${goalId}`);
      if (res.ok) {
        const data = await res.json();
        setGoal(data);
      }
    } catch (error) {
      console.error("Error fetching goal:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckIn = (item: any, type: "process" | "habit") => {
    setSelectedItem({ ...item, checkInType: type });
    setShowCheckIn(true);
  };

  const handleCheckInComplete = () => {
    fetchGoal();
    setShowCheckIn(false);
    setSelectedItem(null);
  };

  const getTodayCheckIn = (itemId: string, type: "process" | "habit") => {
    if (!goal?.checkIns) return null;
    const today = new Date();
    return goal.checkIns.find(
      (ci: any) =>
        isSameDay(new Date(ci.date), today) &&
        ((type === "process" && ci.processGoalId === itemId) ||
          (type === "habit" && ci.habitGoalId === itemId))
    );
  };

  const getHabitStreak = (habitGoal: any) => {
    if (!goal?.checkIns) return 0;
    const habitCheckIns = goal.checkIns
      .filter((ci: any) => ci.habitGoalId === habitGoal.id && ci.isAccomplished)
      .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (const checkIn of habitCheckIns) {
      const checkInDate = new Date(checkIn.date);
      checkInDate.setHours(0, 0, 0, 0);
      const daysDiff = Math.floor((today.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));

      if (daysDiff === streak) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-800 font-bebas">Loading...</div>
      </div>
    );
  }

  if (!goal) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-800 font-bebas">Goal not found</div>
      </div>
    );
  }

  const completedProcessGoals = goal.processGoals?.filter((pg: any) => pg.isCompleted).length || 0;
  const totalProcessGoals = goal.processGoals?.length || 0;
  const progress = totalProcessGoals > 0 ? (completedProcessGoals / totalProcessGoals) * 100 : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full py-8 flex justify-center">
        <div className="w-full max-w-[33.33vw] px-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-orange-200">
          <button
            onClick={() => router.push("/")}
            className="text-orange-600 hover:underline mb-4 font-medium"
          >
            ← Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {goal.realGoal}
          </h1>
          <div className="flex items-center gap-4 text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-orange-500" />
              <span>Due: {formatDate(new Date(goal.deadline))}</span>
            </div>
            {goal.isCompleted && (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle2 className="w-5 h-5" />
                <span>Completed!</span>
              </div>
            )}
          </div>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4 border border-orange-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Overall Progress
              </h3>
              <TrendingUp className="w-6 h-6 text-orange-500" />
            </div>
            <div className="text-4xl font-bold text-gray-800 mb-2">
              {Math.round(progress)}%
            </div>
            <div className="w-full bg-orange-100 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-orange-600 to-red-600 h-3 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border border-orange-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Process Goals
              </h3>
              <Target className="w-6 h-6 text-orange-500" />
            </div>
            <div className="text-4xl font-bold text-gray-800">
              {completedProcessGoals}/{totalProcessGoals}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border border-orange-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Habit Goals
              </h3>
              <Flame className="w-6 h-6 text-orange-500" />
            </div>
            <div className="text-4xl font-bold text-gray-800">
              {goal.habitGoals?.length || 0}
            </div>
          </div>
        </div>

        {/* Progress Chart */}
        {goal.processGoals && goal.processGoals.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-orange-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Progress Chart
            </h2>
            <ProgressChart goal={goal} />
          </div>
        )}

        {/* Process Goals */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-orange-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Process Goals
          </h2>
          <div className="space-y-4">
            {goal.processGoals?.map((pg: any) => {
              const todayCheckIn = getTodayCheckIn(pg.id, "process");
              const isPastDue = new Date(pg.periodEnd) < new Date() && !pg.isCompleted;

              return (
                <div
                  key={pg.id}
                  className={`border-2 rounded-lg p-4 ${
                    pg.isCompleted
                      ? "border-green-500 bg-green-50"
                      : isPastDue
                      ? "border-red-500 bg-red-50"
                      : "border-orange-200 bg-white"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">
                        {pg.title}
                      </h3>
                      {pg.description && (
                        <p className="text-sm text-gray-600 mt-1">
                          {pg.description}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 mt-2">
                        {formatDate(new Date(pg.periodStart))} -{" "}
                        {formatDate(new Date(pg.periodEnd))}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {pg.isCompleted ? (
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                      ) : (
                        <button
                          onClick={() => handleCheckIn(pg, "process")}
                          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-md ${
                            todayCheckIn?.isAccomplished
                              ? "bg-green-500 text-white"
                              : todayCheckIn
                              ? "bg-red-500 text-white"
                              : "bg-gradient-to-r from-orange-600 to-red-600 text-white hover:from-orange-700 hover:to-red-700"
                          }`}
                        >
                          {todayCheckIn?.isAccomplished
                            ? "✓ Done"
                            : todayCheckIn
                            ? "✗ Missed"
                            : "Check In"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Habit Goals */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-orange-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Habit Goals
          </h2>
          <div className="space-y-4">
            {goal.habitGoals?.map((hg: any) => {
              const todayCheckIn = getTodayCheckIn(hg.id, "habit");
              const streak = getHabitStreak(hg);
              const isCompleted = streak >= hg.targetDays;

              return (
                <div
                  key={hg.id}
                  className={`border rounded-lg p-4 ${
                    hg.type === "develop"
                      ? "border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20"
                      : "border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-800 dark:text-white">
                          {hg.title}
                        </h3>
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            hg.type === "develop"
                              ? "bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200"
                              : "bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200"
                          }`}
                        >
                          {hg.type === "develop" ? "Develop" : "Let Go"}
                        </span>
                      </div>
                      {hg.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {hg.description}
                        </p>
                      )}
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1">
                          <Flame className="w-4 h-4 text-orange-500" />
                          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                            {streak} / {hg.targetDays} days
                          </span>
                        </div>
                        {isCompleted && (
                          <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                            <Trophy className="w-4 h-4" />
                            <span className="text-sm font-semibold">Completed!</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => handleCheckIn(hg, "habit")}
                      disabled={isCompleted}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                        todayCheckIn?.isAccomplished
                          ? "bg-green-500 text-white"
                          : todayCheckIn
                          ? "bg-red-500 text-white"
                          : isCompleted
                          ? "bg-gray-400 text-white cursor-not-allowed"
                          : "bg-purple-500 text-white hover:bg-purple-600"
                      }`}
                    >
                      {todayCheckIn?.isAccomplished
                        ? "✓ Done"
                        : todayCheckIn
                        ? "✗ Missed"
                        : isCompleted
                        ? "Completed"
                        : "Check In"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Milestones */}
        {goal.milestones && goal.milestones.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 border border-orange-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Milestones
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {goal.milestones.map((milestone: any) => (
                <div
                  key={milestone.id}
                  className={`border-2 rounded-lg p-4 ${
                    milestone.isCompleted
                      ? "border-yellow-500 bg-yellow-50"
                      : "border-orange-200 bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {milestone.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {milestone.currentValue} / {milestone.targetValue}
                      </p>
                    </div>
                    {milestone.isCompleted && (
                      <Trophy className="w-6 h-6 text-yellow-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        </div>
      </div>

      {showCheckIn && selectedItem && (
        <CheckInModal
          item={selectedItem}
          goalId={goalId}
          onClose={() => {
            setShowCheckIn(false);
            setSelectedItem(null);
          }}
          onComplete={handleCheckInComplete}
        />
      )}
    </div>
  );
}



