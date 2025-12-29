"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import { Moon, Sun, Plus, LogOut, Trophy, Target, TrendingUp } from "lucide-react";
import GoalCard from "./GoalCard";
import BadgesDisplay from "./BadgesDisplay";

interface Goal {
  id: string;
  initialGoal: string;
  realGoal: string;
  deadline: Date;
  isCompleted: boolean;
  processGoals: any[];
  habitGoals: any[];
  checkIns: any[];
}

export default function Dashboard() {
  const { data: session } = useSession();
  const { theme, toggleTheme } = useTheme();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [badges, setBadges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGoals();
    fetchBadges();
  }, []);

  const fetchGoals = async () => {
    try {
      const res = await fetch("/api/goals");
      if (res.ok) {
        const data = await res.json();
        setGoals(data);
      }
    } catch (error) {
      console.error("Error fetching goals:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBadges = async () => {
    try {
      const res = await fetch("/api/badges");
      if (res.ok) {
        const data = await res.json();
        setBadges(data);
      }
    } catch (error) {
      console.error("Error fetching badges:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-white text-xl font-bebas">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-black border-b-2 border-red-500/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bebas tracking-tight">
                <span className="bg-gradient-to-r from-red-500 via-orange-500 to-red-600 bg-clip-text text-transparent">
                  ACHIEVE
                </span>
                <span className="text-white">YES</span>
              </h1>
              <p className="text-gray-300 mt-1">
                Welcome back, {session?.user?.name || session?.user?.email}!
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-900 border-2 border-gray-700 hover:border-red-500 transition-colors"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-300" />
                )}
              </button>
              <button
                onClick={() => signOut()}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg hover:from-red-700 hover:to-orange-700 transition-all font-bold"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-900 border-2 border-red-500/50 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm font-bold">Active Goals</p>
                <p className="text-3xl font-bebas text-red-500">
                  {goals.filter((g) => !g.isCompleted).length}
                </p>
              </div>
              <Target className="w-12 h-12 text-red-500" />
            </div>
          </div>
          <div className="bg-gray-900 border-2 border-orange-500/50 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm font-bold">Completed</p>
                <p className="text-3xl font-bebas text-orange-500">
                  {goals.filter((g) => g.isCompleted).length}
                </p>
              </div>
              <Trophy className="w-12 h-12 text-orange-500" />
            </div>
          </div>
          <div className="bg-gray-900 border-2 border-red-500/50 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm font-bold">Total Progress</p>
                <p className="text-3xl font-bebas text-red-500">
                  {goals.length > 0
                    ? Math.round(
                        (goals.reduce(
                          (acc, goal) =>
                            acc +
                            (goal.processGoals?.filter((pg: any) => pg.isCompleted).length || 0) /
                              Math.max(goal.processGoals?.length || 1, 1),
                          0
                        ) /
                          goals.length) *
                          100
                      )
                    : 0}
                  %
                </p>
              </div>
              <TrendingUp className="w-12 h-12 text-red-500" />
            </div>
          </div>
        </div>

        {/* Goals Section */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bebas text-white">YOUR GOALS</h2>
          <Link
            href="/goals/new"
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg hover:from-red-700 hover:to-orange-700 transition-all font-bold animate-glow"
          >
            <Plus className="w-5 h-5" />
            NEW GOAL
          </Link>
        </div>

        {goals.length === 0 ? (
          <div className="bg-gray-900 border-2 border-red-500/50 rounded-lg p-12 text-center">
            <Target className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bebas text-white mb-2">
              NO GOALS YET
            </h3>
            <p className="text-gray-300 mb-6">
              Start your journey by creating your first goal!
            </p>
            <Link
              href="/goals/new"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg hover:from-red-700 hover:to-orange-700 transition-all font-bold animate-glow"
            >
              <Plus className="w-5 h-5" />
              CREATE YOUR FIRST GOAL
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {goals.map((goal) => (
              <GoalCard key={goal.id} goal={goal} onUpdate={fetchGoals} />
            ))}
          </div>
        )}

        {/* Badges Section */}
        <div className="mt-8">
          <BadgesDisplay badges={badges} />
        </div>
      </main>
    </div>
  );
}

