"use client";

import { useState } from "react";
import { X, CheckCircle2, XCircle } from "lucide-react";
import { isSameDay } from "@/app/lib/utils";

interface CheckInModalProps {
  item: any;
  goalId: string;
  onClose: () => void;
  onComplete: () => void;
}

export default function CheckInModal({
  item,
  goalId,
  onClose,
  onComplete,
}: CheckInModalProps) {
  const [isAccomplished, setIsAccomplished] = useState<boolean | null>(null);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (isAccomplished === null) {
      setError("Please select whether you accomplished this goal");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/checkins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          goalId,
          processGoalId: item.checkInType === "process" ? item.id : null,
          habitGoalId: item.checkInType === "habit" ? item.id : null,
          isAccomplished,
          notes: notes.trim() || null,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to check in");
      }

      onComplete();
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Daily Check-In
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              {item.title}
            </h3>
            {item.description && (
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {item.description}
              </p>
            )}
          </div>

          {error && (
            <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="mb-6">
            <p className="text-gray-700 dark:text-gray-300 mb-4 font-semibold">
              Did you accomplish this today?
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setIsAccomplished(true)}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-lg border-2 transition-all ${
                  isAccomplished === true
                    ? "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300"
                    : "border-gray-300 dark:border-gray-600 hover:border-green-500"
                }`}
              >
                <CheckCircle2 className="w-6 h-6" />
                <span className="font-semibold">Accomplished</span>
              </button>
              <button
                onClick={() => setIsAccomplished(false)}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-lg border-2 transition-all ${
                  isAccomplished === false
                    ? "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300"
                    : "border-gray-300 dark:border-gray-600 hover:border-red-500"
                }`}
              >
                <XCircle className="w-6 h-6" />
                <span className="font-semibold">Not Accomplished</span>
              </button>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Notes (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any notes about your progress..."
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white resize-none"
              rows={3}
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isAccomplished === null || loading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? "Saving..." : "Save Check-In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}



