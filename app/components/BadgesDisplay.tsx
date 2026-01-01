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
      <div className="bg-white rounded-lg shadow-sm p-8 border border-orange-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Your Badges
        </h2>
        <p className="text-gray-600 text-center py-8 px-4">
          No badges yet. Complete goals and milestones to earn badges!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-8 border border-orange-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Your Badges ({badges.length})
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className="border-2 border-yellow-300 rounded-lg p-6 bg-yellow-50 hover:shadow-lg transition-all"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">{getIcon(badge.type)}</div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-1">
                  {badge.title}
                </h3>
                {badge.description && (
                  <p className="text-sm text-gray-600 mb-2">
                    {badge.description}
                  </p>
                )}
                <p className="text-xs text-gray-500">
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



