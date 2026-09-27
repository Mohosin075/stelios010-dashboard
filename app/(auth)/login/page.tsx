"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@genb.com");
  const [password, setPassword] = useState("password123");
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Demo login redirect to /dashboard
    setTimeout(() => {
      if (typeof window !== "undefined") {
        localStorage.setItem("token", "demo-token");
      }
      router.push("/dashboard");
    }, 700);
  };

  return (
    <div className="w-full max-w-[420px] flex flex-col items-center">
      {/* Brand Header */}
      <div className="flex flex-col items-center text-center mb-8">
        <div className="w-14 h-14 bg-[#FFC800] rounded-xl flex items-center justify-center font-black text-black text-xl shadow-lg select-none">
          GB
        </div>
        <span className="text-[#FFC800] font-bold text-xs tracking-widest uppercase mt-3 select-none">
          GENB
        </span>
        <h1 className="text-2xl font-bold text-white mt-1 tracking-tight">
          Admin Portal
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">
          Sign in to manage GENB
        </p>
      </div>

      {/* Login Card */}
      <div className="w-full bg-[#121316] border border-[#1E2026] rounded-2xl p-6 sm:p-7 shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-medium text-gray-400 mb-1.5"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@genb.com"
              className="w-full bg-[#181A1F] border border-[#232630] text-gray-100 rounded-lg px-3.5 py-2.5 text-sm placeholder-gray-500 focus:outline-none focus:border-[#FFC800] focus:ring-1 focus:ring-[#FFC800] transition-colors"
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="password"
                className="block text-xs font-medium text-gray-400"
              >
                Password
              </label>
              <Link
                href="/forgot"
                className="text-xs font-medium text-[#FFC800] hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#181A1F] border border-[#232630] text-gray-100 rounded-lg px-3.5 py-2.5 text-sm placeholder-gray-500 focus:outline-none focus:border-[#FFC800] focus:ring-1 focus:ring-[#FFC800] transition-colors"
            />
          </div>

          {/* Remember me checkbox */}
          <div className="flex items-center gap-2 pt-1">
            <input
              id="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded bg-[#181A1F] border-[#2A2D37] text-[#FFC800] focus:ring-0 focus:ring-offset-0 cursor-pointer accent-[#FFC800]"
            />
            <label
              htmlFor="remember-me"
              className="text-xs text-gray-400 cursor-pointer select-none"
            >
              Remember me
            </label>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#FFC800] hover:bg-[#F2BD00] text-black font-semibold text-sm py-2.5 px-4 rounded-lg transition-all duration-150 active:scale-[0.99] shadow-md flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Signing In…
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
