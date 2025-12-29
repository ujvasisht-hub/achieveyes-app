"use client";

import { useEffect, useState } from "react";
import { Trophy, CheckCircle2, Star, Sparkles } from "lucide-react";

interface CelebrationProps {
  message: string;
  type: "success" | "milestone" | "goal" | "habit";
  onClose: () => void;
}

export default function Celebration({ message, type, onClose }: CelebrationProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onClose, 500);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const getIcon = () => {
    switch (type) {
      case "goal":
        return <Trophy className="w-16 h-16 text-yellow-500" />;
      case "milestone":
        return <Star className="w-16 h-16 text-purple-500" />;
      case "habit":
        return <Sparkles className="w-16 h-16 text-green-500" />;
      default:
        return <CheckCircle2 className="w-16 h-16 text-green-500" />;
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-500 ${
        show ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-8 max-w-md mx-4 transform transition-all duration-500 scale-100 animate-celebrate">
        <div className="text-center">
          <div className="flex justify-center mb-4 animate-bounce-slow">
            {getIcon()}
          </div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            🎉 Congratulations! 🎉
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">{message}</p>
        </div>
      </div>
    </div>
  );
}



