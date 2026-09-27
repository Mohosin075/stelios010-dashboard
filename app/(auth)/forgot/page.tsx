"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("admin@genb.com");
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSent(true);
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
          Reset Password
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">
          Enter your email to receive recovery instructions
        </p>
      </div>

      {/* Card */}
      <div className="w-full bg-[#121316] border border-[#1E2026] rounded-2xl p-6 sm:p-7 shadow-2xl">
        {!sent ? (
          <form onSubmit={handleSubmit} className="space-y-4">
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

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#FFC800] hover:bg-[#F2BD00] text-black font-semibold text-sm py-2.5 px-4 rounded-lg transition-all duration-150 active:scale-[0.99] shadow-md flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    Sending Link…
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-2 space-y-4">
            <div className="w-12 h-12 bg-[#122A1E] text-[#10B981] border border-[#10B981]/30 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Reset Link Sent</h2>
              <p className="text-xs text-gray-400 mt-1">
                We sent instructions to <span className="text-gray-200">{email}</span>
              </p>
            </div>
            <Link
              href="/otp"
              className="w-full block bg-[#FFC800] hover:bg-[#F2BD00] text-black font-semibold text-sm py-2.5 px-4 rounded-lg text-center transition-all shadow-md"
            >
              Enter OTP Code
            </Link>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-[#1C1E26] text-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-[#FFC800] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
