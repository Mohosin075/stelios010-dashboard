"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, CheckCircle2 } from "lucide-react";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const isMismatch = confirmPassword.length > 0 && newPassword !== confirmPassword;
  const isMatch = newPassword.length > 0 && newPassword === confirmPassword;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isMatch) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 1500);
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
          Set New Password
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">
          Create a secure password for your account
        </p>
      </div>

      {/* Card */}
      <div className="w-full bg-[#121316] border border-[#1E2026] rounded-2xl p-6 sm:p-7 shadow-2xl">
        {!success ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* New Password */}
            <div>
              <label
                htmlFor="newPassword"
                className="block text-xs font-medium text-gray-400 mb-1.5"
              >
                New Password
              </label>
              <div className="relative">
                <input
                  id="newPassword"
                  type={showNew ? "text" : "password"}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full bg-[#181A1F] border border-[#232630] text-gray-100 rounded-lg pl-3.5 pr-10 py-2.5 text-sm placeholder-gray-500 focus:outline-none focus:border-[#FFC800] focus:ring-1 focus:ring-[#FFC800] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                >
                  {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-xs font-medium text-gray-400 mb-1.5"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className={`w-full bg-[#181A1F] border ${
                    isMismatch ? "border-red-500/70" : "border-[#232630]"
                  } text-gray-100 rounded-lg pl-3.5 pr-10 py-2.5 text-sm placeholder-gray-500 focus:outline-none focus:border-[#FFC800] focus:ring-1 focus:ring-[#FFC800] transition-colors`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                >
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {isMismatch && (
                <p className="text-xs text-red-400 mt-1">Passwords do not match</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={!isMatch || isLoading}
                className="w-full bg-[#FFC800] hover:bg-[#F2BD00] text-black font-semibold text-sm py-2.5 px-4 rounded-lg transition-all duration-150 active:scale-[0.99] shadow-md flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    Updating Password…
                  </>
                ) : (
                  "Update Password"
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-4 space-y-4">
            <div className="w-12 h-12 bg-[#122A1E] text-[#10B981] border border-[#10B981]/30 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Password Updated!</h2>
              <p className="text-xs text-gray-400 mt-1">
                Your password has been reset successfully. Redirecting to sign in…
              </p>
            </div>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-[#1C1E26] text-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-[#FFC800] transition-colors"
          >
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
