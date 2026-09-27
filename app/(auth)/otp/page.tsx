"use client";

import React, { useState, useRef, KeyboardEvent, ClipboardEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const OTP_LENGTH = 6;

export default function OTPPage() {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resent, setResent] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    const cleaned = value.replace(/\D/g, "").slice(-1);
    const newOtp = [...otp];
    newOtp[index] = cleaned;
    setOtp(newOtp);
    if (cleaned && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    const newOtp = Array(OTP_LENGTH).fill("");
    pasted.split("").forEach((char, i) => {
      newOtp[i] = char;
    });
    setOtp(newOtp);
    const nextEmpty = pasted.length < OTP_LENGTH ? pasted.length : OTP_LENGTH - 1;
    inputRefs.current[nextEmpty]?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.join("").length < OTP_LENGTH) return;
    setIsLoading(true);
    setTimeout(() => {
      router.push("/reset");
    }, 700);
  };

  const handleResend = () => {
    setIsResending(true);
    setTimeout(() => {
      setIsResending(false);
      setResent(true);
      setOtp(Array(OTP_LENGTH).fill(""));
      inputRefs.current[0]?.focus();
      setTimeout(() => setResent(false), 3000);
    }, 1000);
  };

  const isComplete = otp.join("").length === OTP_LENGTH;

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
          Verify OTP
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">
          Enter the 6-digit code sent to your email
        </p>
      </div>

      {/* Card */}
      <div className="w-full bg-[#121316] border border-[#1E2026] rounded-2xl p-6 sm:p-7 shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* OTP inputs */}
          <div className="flex justify-between gap-2">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => {
                  inputRefs.current[i] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                onPaste={handlePaste}
                autoFocus={i === 0}
                className="w-11 h-12 text-center text-lg font-bold text-white bg-[#181A1F] border border-[#232630] rounded-lg focus:outline-none focus:border-[#FFC800] focus:ring-1 focus:ring-[#FFC800] transition-colors"
              />
            ))}
          </div>

          {/* Resend status */}
          <div className="text-center">
            {resent ? (
              <span className="text-xs text-[#10B981]">
                ✓ A new code has been sent!
              </span>
            ) : (
              <p className="text-xs text-gray-400">
                Didn&apos;t get the code?{" "}
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={isResending}
                  className="text-[#FFC800] hover:underline font-medium"
                >
                  {isResending ? "Resending…" : "Resend OTP"}
                </button>
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={!isComplete || isLoading}
              className="w-full bg-[#FFC800] hover:bg-[#F2BD00] text-black font-semibold text-sm py-2.5 px-4 rounded-lg transition-all duration-150 active:scale-[0.99] shadow-md flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Verifying…
                </>
              ) : (
                "Verify Code"
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 pt-4 border-t border-[#1C1E26] text-center">
          <Link
            href="/forgot"
            className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-[#FFC800] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Email
          </Link>
        </div>
      </div>
    </div>
  );
}
