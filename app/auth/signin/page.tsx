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
    <div className="min-h-screen flex items-center justify-center" style={{ 
      background: 'linear-gradient(to bottom, rgba(251, 146, 60, 0.1), rgba(239, 68, 68, 0.15))',
      paddingLeft: '8rem', 
      paddingRight: '8rem' 
    }}>
      {/* Centered Card with Large Margins */}
      <div className="bg-white rounded-2xl shadow-2xl" style={{ width: '100%', maxWidth: '28rem', padding: '3rem' }}>
        {/* Logo/Title with Orange Branding */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bebas tracking-tight mb-4">
            <span 
              className="block"
              style={{
                color: '#ea580c',
                WebkitTextStroke: '2px white',
                textShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
              } as React.CSSProperties}
            >
              ACHIEVE
            </span>
            <span 
              className="block"
              style={{
                color: 'white',
                WebkitTextStroke: '2px #ea580c',
                textShadow: '0 0 10px rgba(234, 88, 12, 0.5)'
              } as React.CSSProperties}
            >
              YES
            </span>
          </h1>
          <p className="text-gray-700 mt-6 text-sm font-medium">
            {isSignUp
              ? "Create your account to start achieving"
              : "Sign in to continue your journey"}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border-2 border-red-500 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleEmailSignIn} className="space-y-8">
          {isSignUp && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3.5 bg-white border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-all"
                placeholder="Your full name"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3.5 bg-white border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-all"
              placeholder="your@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3.5 bg-white border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-all"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-red-600 via-orange-500 to-red-600 text-white py-4 px-6 rounded-lg font-bold hover:from-red-700 hover:via-orange-600 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] mt-2"
          >
            {isLoading
              ? "Loading..."
              : isSignUp
              ? "Sign Up"
              : "Sign In"}
          </button>
        </form>

        <div className="mt-10">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="mt-6 w-full bg-white border-2 border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:border-orange-500 hover:bg-orange-50 transition-all"
          >
            Google
          </button>
        </div>

        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError("");
            }}
            className="text-sm text-gray-600 hover:text-orange-600 transition-colors"
          >
            {isSignUp ? (
              <>
                Already have an account?{" "}
                <span className="font-bold text-orange-600">Sign In</span>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <span className="font-bold text-orange-600">Sign Up</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}



