"use client";

import { Trophy, Target, Flame, Star } from "lucide-react";

interface Badge {
  id: string;
  type: string;
  title: string;
  description: string | null;
  earnedAt: Date;
}

interface BadgesDisplayProps {
  badges: Badge[];
}

export default function BadgesDisplay({ badges }: BadgesDisplayProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "goal_complete":
        return <Trophy className="w-8 h-8 text-yellow-500" />;
      case "process_complete":
        return <Target className="w-8 h-8 text-blue-500" />;
      case "habit_streak":
        return <Flame className="w-8 h-8 text-orange-500" />;
      case "milestone":
        return <Star className="w-8 h-8 text-purple-500" />;
      default:
        return <Star className="w-8 h-8 text-gray-500" />;
    }
  };

  if (badges.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Your Badges
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-center py-8">
          No badges yet. Complete goals and milestones to earn badges!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
        Your Badges ({badges.length})
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className="border border-yellow-300 dark:border-yellow-700 rounded-lg p-4 bg-yellow-50 dark:bg-yellow-900/20 hover:shadow-lg transition-all"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">{getIcon(badge.type)}</div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 dark:text-white mb-1">
                  {badge.title}
                </h3>
                {badge.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {badge.description}
                  </p>
                )}
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  Earned: {new Date(badge.earnedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



