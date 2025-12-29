"use client";

import { signIn, getSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (isSignUp) {
        // Register new user
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, name }),
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Registration failed");
        }
      }

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    await signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="bg-gray-900 border-2 border-red-500/50 p-8 md:p-12 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-6xl md:text-7xl font-bebas tracking-tight mb-2">
            <span className="bg-gradient-to-r from-red-500 via-orange-500 to-red-600 bg-clip-text text-transparent">
              ACHIEVE
            </span>
            <span className="text-white">YES</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-bold mt-4">
            {isSignUp
              ? "Start your journey to achieve your goals"
              : "Sign in to track your goals"}
          </p>
        </div>

        {error && (
          <div className="bg-red-950/50 border-2 border-red-500 text-red-300 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleEmailSignIn} className="space-y-6">
          {isSignUp && (
            <div>
              <label className="block text-sm font-bold text-gray-300 mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-black border-2 border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-red-500 focus:outline-none transition-colors"
                placeholder="Your full name"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-gray-300 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-black border-2 border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-red-500 focus:outline-none transition-colors"
              placeholder="your@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-300 mb-2">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-black border-2 border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-red-500 focus:outline-none transition-colors"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-4 px-8 rounded-lg font-bold hover:from-red-700 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 animate-glow"
          >
            {isLoading
              ? "LOADING..."
              : isSignUp
              ? "SIGN UP"
              : "SIGN IN"}
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gray-900 text-gray-400 font-bold">
                Or continue with
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="mt-6 w-full bg-black border-2 border-gray-700 text-gray-300 py-3 px-4 rounded-lg font-bold hover:border-red-500 hover:text-white transition-all"
          >
            Google
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-400">
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError("");
            }}
            className="text-red-500 hover:text-red-400 hover:underline font-bold"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}



