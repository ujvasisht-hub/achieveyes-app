"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft, Target, Calendar } from "lucide-react";

type Step = "goal" | "why1" | "why2" | "why3" | "why4" | "why5" | "realGoal" | "deadline" | "processHabits";

export default function NewGoalPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("goal");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    initialGoal: "",
    why1: "",
    why2: "",
    why3: "",
    why4: "",
    why5: "",
    realGoal: "",
    deadline: "",
  });

  const steps: Step[] = ["goal", "why1", "why2", "why3", "why4", "why5", "realGoal", "deadline", "processHabits"];

  const handleNext = () => {
    const currentIndex = steps.indexOf(step);
    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1]);
      setError("");
    }
  };

  const handleBack = () => {
    const currentIndex = steps.indexOf(step);
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1]);
      setError("");
    }
  };

  const handleSubmit = async () => {
    if (!formData.realGoal || !formData.deadline) {
      setError("Please complete all required fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          initialGoal: formData.initialGoal,
          realGoal: formData.realGoal,
          deadline: formData.deadline,
          why1: formData.why1,
          why2: formData.why2,
          why3: formData.why3,
          why4: formData.why4,
          why5: formData.why5,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create goal");
      }

      const goal = await res.json();
      router.push(`/goals/${goal.id}/setup`);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const renderStep = () => {
    switch (step) {
      case "goal":
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Target className="w-16 h-16 text-orange-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                What is your goal?
              </h2>
              <p className="text-gray-600">
                Write down the goal you want to achieve
              </p>
            </div>
            <textarea
              value={formData.initialGoal}
              onChange={(e) => updateFormData("initialGoal", e.target.value)}
              placeholder="e.g., I want to lose weight, I want to start a business..."
              className="w-full h-32 px-4 py-3 border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-800 resize-none"
            />
          </div>
        );

      case "why1":
      case "why2":
      case "why3":
      case "why4":
      case "why5":
        const whyNumber = parseInt(step.replace("why", ""));
        const whyKey = step as keyof typeof formData;
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Why #{whyNumber}?
              </h2>
              <p className="text-gray-600">
                {whyNumber === 1
                  ? "Why do you want to achieve this goal?"
                  : `Why is that important to you? (Drill deeper)`}
              </p>
            </div>
            <textarea
              value={formData[whyKey]}
              onChange={(e) => updateFormData(whyKey, e.target.value)}
              placeholder="Think deeply about your motivation..."
              className="w-full h-32 px-4 py-3 border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-800 resize-none"
            />
          </div>
        );

      case "realGoal":
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                What is your real goal?
              </h2>
              <p className="text-gray-600">
                Based on your 5 whys, what is the deeper, real goal you want to achieve?
              </p>
            </div>
            <textarea
              value={formData.realGoal}
              onChange={(e) => updateFormData("realGoal", e.target.value)}
              placeholder="Write your refined, real goal here..."
              className="w-full h-32 px-4 py-3 border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-800 resize-none"
            />
          </div>
        );

      case "deadline":
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Calendar className="w-16 h-16 text-orange-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                When do you want to achieve this?
              </h2>
              <p className="text-gray-600">
                Set a deadline for your goal
              </p>
            </div>
            <input
              type="date"
              value={formData.deadline}
              onChange={(e) => updateFormData("deadline", e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-800 text-lg"
            />
          </div>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (step) {
      case "goal":
        return formData.initialGoal.trim().length > 0;
      case "why1":
      case "why2":
      case "why3":
      case "why4":
      case "why5":
        const whyKey = step as keyof typeof formData;
        return formData[whyKey].trim().length > 0;
      case "realGoal":
        return formData.realGoal.trim().length > 0;
      case "deadline":
        return formData.deadline.length > 0;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-sm w-full max-w-2xl p-8 mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Step {steps.indexOf(step) + 1} of {steps.length}</span>
            <span>{Math.round(((steps.indexOf(step) + 1) / steps.length) * 100)}%</span>
          </div>
          <div className="w-full bg-orange-100 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-orange-600 to-red-600 h-2 rounded-full transition-all"
              style={{ width: `${((steps.indexOf(step) + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border-2 border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {renderStep()}

        <div className="flex justify-between mt-8">
          <button
            onClick={handleBack}
            disabled={step === "goal"}
            className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          {step === "deadline" ? (
            <button
              onClick={handleSubmit}
              disabled={!canProceed() || loading}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg hover:from-orange-700 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
            >
              {loading ? "Creating..." : "Continue to Setup"}
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg hover:from-orange-700 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}



