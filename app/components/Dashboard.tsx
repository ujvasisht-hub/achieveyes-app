"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
// import { useTheme } from "./ThemeProvider"; // Commented out to prevent SSR issues
import { Plus, LogOut, Trophy, Target, TrendingUp } from "lucide-react";
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
  const [goals, setGoals] = useState<Goal[]>([]);
  const [badges, setBadges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-800 text-xl font-bebas">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b-2 border-orange-300 shadow-lg">
        <div className="max-w-6xl mx-auto px-8 md:px-16 lg:px-24 xl:px-32 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bebas tracking-tight flex items-center gap-2">
                <span className="text-[#ea580c]" style={mounted ? { textShadow: '0 0 10px rgba(234, 88, 12, 0.3)' } : {}}>
                  ACHIEVE
                </span>
                <span className="text-gray-800" style={mounted ? { textShadow: '0 0 10px rgba(0, 0, 0, 0.1)' } : {}}>
                  YES
                </span>
              </h1>
              <p className="text-gray-700 mt-2 font-medium">
                Welcome back, {session?.user?.name || session?.user?.email}!
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => signOut()}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg hover:from-orange-700 hover:to-red-700 transition-all font-bold shadow-md"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-8 md:px-16 lg:px-24 xl:px-32 py-12">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white border-2 border-orange-300 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-bold mb-2">Active Goals</p>
                <p className="text-4xl font-bebas text-[#ea580c]">
                  {goals.filter((g) => !g.isCompleted).length}
                </p>
              </div>
              <Target className="w-12 h-12 text-orange-500" />
            </div>
          </div>
          <div className="bg-white border-2 border-orange-300 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-bold mb-2">Completed</p>
                <p className="text-4xl font-bebas text-orange-600">
                  {goals.filter((g) => g.isCompleted).length}
                </p>
              </div>
              <Trophy className="w-12 h-12 text-orange-600" />
            </div>
          </div>
          <div className="bg-white border-2 border-orange-300 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-bold mb-2">Total Progress</p>
                <p className="text-4xl font-bebas text-[#ea580c]">
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
              <TrendingUp className="w-12 h-12 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Goals Section */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bebas text-gray-800">YOUR GOALS</h2>
          <Link
            href="/goals/new"
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg hover:from-orange-700 hover:to-red-700 transition-all font-bold shadow-md"
          >
            <Plus className="w-5 h-5" />
            NEW GOAL
          </Link>
        </div>

        {goals.length === 0 ? (
          <div className="bg-white border-2 border-orange-300 rounded-xl p-12 text-center shadow-lg">
            <Target className="w-16 h-16 text-orange-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bebas text-gray-800 mb-2">
              NO GOALS YET
            </h3>
            <p className="text-gray-600 mb-8">
              Start your journey by creating your first goal!
            </p>
            <Link
              href="/goals/new"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg hover:from-orange-700 hover:to-red-700 transition-all font-bold shadow-md"
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

