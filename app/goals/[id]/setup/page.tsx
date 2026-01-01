"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Plus, Trash2, Save, Target, CheckCircle } from "lucide-react";
import { calculateProcessGoalPeriods } from "@/app/lib/utils";

interface ProcessGoal {
  id?: string;
  title: string;
  description: string;
  periodType: string;
  periodStart: string;
  periodEnd: string;
}

interface HabitGoal {
  id?: string;
  title: string;
  description: string;
  type: "develop" | "let_go";
}

export default function GoalSetupPage() {
  const router = useRouter();
  const params = useParams();
  const goalId = params.id as string;

  const [goal, setGoal] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [processGoals, setProcessGoals] = useState<ProcessGoal[]>([]);
  const [habitGoals, setHabitGoals] = useState<HabitGoal[]>([]);

  useEffect(() => {
    fetchGoal();
  }, [goalId]);

  const fetchGoal = async () => {
    try {
      const res = await fetch(`/api/goals/${goalId}`);
      if (res.ok) {
        const data = await res.json();
        setGoal(data);
        
        // Auto-generate process goal periods
        if (data.deadline && !data.processGoals?.length) {
          const periods = calculateProcessGoalPeriods(
            new Date(data.deadline),
            new Date()
          );
          setProcessGoals(
            periods.map((p) => ({
              title: `Complete ${p.label.toLowerCase()} tasks`,
              description: "",
              periodType: p.type,
              periodStart: p.start.toISOString(),
              periodEnd: p.end.toISOString(),
            }))
          );
        } else if (data.processGoals) {
          setProcessGoals(data.processGoals);
        }

        if (data.habitGoals) {
          setHabitGoals(data.habitGoals);
        }
      }
    } catch (error) {
      console.error("Error fetching goal:", error);
    } finally {
      setLoading(false);
    }
  };

  const addProcessGoal = () => {
    setProcessGoals([
      ...processGoals,
      {
        title: "",
        description: "",
        periodType: "custom",
        periodStart: new Date().toISOString(),
        periodEnd: new Date().toISOString(),
      },
    ]);
  };

  const removeProcessGoal = (index: number) => {
    setProcessGoals(processGoals.filter((_, i) => i !== index));
  };

  const updateProcessGoal = (index: number, field: keyof ProcessGoal, value: string) => {
    const updated = [...processGoals];
    updated[index] = { ...updated[index], [field]: value };
    setProcessGoals(updated);
  };

  const addHabitGoal = (type: "develop" | "let_go") => {
    setHabitGoals([
      ...habitGoals,
      {
        title: "",
        description: "",
        type,
      },
    ]);
  };

  const removeHabitGoal = (index: number) => {
    setHabitGoals(habitGoals.filter((_, i) => i !== index));
  };

  const updateHabitGoal = (index: number, field: keyof HabitGoal, value: string) => {
    const updated = [...habitGoals];
    updated[index] = { ...updated[index], [field]: value };
    setHabitGoals(updated);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/goals/${goalId}/setup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          processGoals: processGoals.filter((pg) => pg.title.trim().length > 0),
          habitGoals: habitGoals.filter((hg) => hg.title.trim().length > 0),
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to save setup");
      }

      router.push(`/goals/${goalId}`);
    } catch (error: any) {
      console.error("Error saving setup:", error);
      alert(error.message || "Failed to save setup. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-800 font-bebas">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 sm:p-12 md:p-16 lg:p-20 xl:p-24">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-8 border border-orange-200">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Set Up Your Goal
          </h1>
          <p className="text-gray-600 mb-8">
            Define your process goals and habits to achieve: <strong>{goal?.realGoal}</strong>
          </p>

          {/* Process Goals */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                Process Goals
              </h2>
              <button
                onClick={addProcessGoal}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg hover:from-orange-700 hover:to-red-700 transition-colors shadow-md"
              >
                <Plus className="w-4 h-4" />
                Add Process Goal
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              What processes do you need to complete to achieve your goal?
            </p>
            <div className="space-y-4">
              {processGoals.map((pg, index) => (
                <div
                  key={index}
                  className="border-2 border-orange-200 rounded-lg p-4 bg-orange-50"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-semibold text-gray-700">
                      {pg.periodType === "24h"
                        ? "Next 24 hours"
                        : pg.periodType === "48h"
                        ? "Next 48 hours"
                        : pg.periodType === "7d"
                        ? "Next 7 days"
                        : pg.periodType === "1m"
                        ? "Next 1 month"
                        : pg.periodType === "3m"
                        ? "Next 3 months"
                        : pg.periodType === "6m"
                        ? "Next 6 months"
                        : pg.periodType === "1y"
                        ? "Next 1 year"
                        : "Custom Period"}
                    </span>
                    <button
                      onClick={() => removeProcessGoal(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={pg.title}
                    onChange={(e) => updateProcessGoal(index, "title", e.target.value)}
                    placeholder="Process goal title..."
                    className="w-full px-3 py-2 border-2 border-orange-200 rounded-lg mb-2 bg-white text-gray-800 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                  <textarea
                    value={pg.description}
                    onChange={(e) => updateProcessGoal(index, "description", e.target.value)}
                    placeholder="Description (optional)..."
                    className="w-full px-3 py-2 border-2 border-orange-200 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    rows={2}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Habit Goals */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                Habit Goals
              </h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              What habits do you need to develop or let go to reach your goal?
            </p>

            <div className="space-y-6">
              {/* Develop Habits */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-green-600 dark:text-green-400">
                    Habits to Develop
                  </h3>
                  <button
                    onClick={() => addHabitGoal("develop")}
                    className="flex items-center gap-2 px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm shadow-md"
                  >
                    <Plus className="w-3 h-3" />
                    Add
                  </button>
                </div>
                <div className="space-y-3">
                  {habitGoals
                    .filter((hg) => hg.type === "develop")
                    .map((hg, index) => {
                      const actualIndex = habitGoals.indexOf(hg);
                      return (
                        <div
                          key={actualIndex}
                          className="border border-green-300 dark:border-green-700 rounded-lg p-3 bg-green-50 dark:bg-green-900/20"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <button
                              onClick={() => removeHabitGoal(actualIndex)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <input
                            type="text"
                            value={hg.title}
                            onChange={(e) => updateHabitGoal(actualIndex, "title", e.target.value)}
                            placeholder="Habit to develop..."
                            className="w-full px-3 py-2 border-2 border-green-300 rounded-lg mb-2 bg-white text-gray-800 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          />
                          <textarea
                            value={hg.description}
                            onChange={(e) =>
                              updateHabitGoal(actualIndex, "description", e.target.value)
                            }
                            placeholder="Description (optional)..."
                            className="w-full px-3 py-2 border-2 border-green-300 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            rows={2}
                          />
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Let Go Habits */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-red-600 dark:text-red-400">
                    Habits to Let Go
                  </h3>
                  <button
                    onClick={() => addHabitGoal("let_go")}
                    className="flex items-center gap-2 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm shadow-md"
                  >
                    <Plus className="w-3 h-3" />
                    Add
                  </button>
                </div>
                <div className="space-y-3">
                  {habitGoals
                    .filter((hg) => hg.type === "let_go")
                    .map((hg, index) => {
                      const actualIndex = habitGoals.indexOf(hg);
                      return (
                        <div
                          key={actualIndex}
                          className="border border-red-300 dark:border-red-700 rounded-lg p-3 bg-red-50 dark:bg-red-900/20"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <Target className="w-5 h-5 text-red-500" />
                            <button
                              onClick={() => removeHabitGoal(actualIndex)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <input
                            type="text"
                            value={hg.title}
                            onChange={(e) => updateHabitGoal(actualIndex, "title", e.target.value)}
                            placeholder="Habit to let go..."
                            className="w-full px-3 py-2 border-2 border-red-300 rounded-lg mb-2 bg-white text-gray-800 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                          />
                          <textarea
                            value={hg.description}
                            onChange={(e) =>
                              updateHabitGoal(actualIndex, "description", e.target.value)
                            }
                            placeholder="Description (optional)..."
                            className="w-full px-3 py-2 border-2 border-red-300 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                            rows={2}
                          />
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg hover:from-orange-700 hover:to-red-700 disabled:opacity-50 transition-all shadow-md"
            >
              <Save className="w-5 h-5" />
              {saving ? "Saving..." : "Save & Continue"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

