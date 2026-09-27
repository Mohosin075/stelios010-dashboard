"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { MOCK_POLLS_DATA } from "@/constants/pollsData";
import { cn } from "@/lib/utils";

export default function PollResultsPage() {
  const params = useParams();
  const id = params?.id as string;

  const poll = useMemo(() => {
    return MOCK_POLLS_DATA.find((p) => p.id === id) || MOCK_POLLS_DATA[0];
  }, [id]);

  const options = poll.options || [];
  const breakdown = poll.audienceBreakdown || {
    activeUsers: 294,
    futureUsers: 172,
    pioneers: 40,
  };

  return (
    <div className="w-full space-y-4">
      {/* Back Link */}
      <div>
        <Link
          href="/polls"
          className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Polls</span>
        </Link>
      </div>

      <div className="max-w-2xl space-y-4">
        {/* Card 1: Poll Results Details */}
        <div className="card-depth relative rounded-xl p-5 md:p-6 space-y-5 overflow-hidden before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent">
          {/* Header Title + Status */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-base font-semibold text-white tracking-tight">
                {poll.question}
              </h1>
              <p className="text-xs text-gray-400 mt-1.5">
                Audience: {poll.audience}{" "}
                <span className="ml-3">
                  Total Responses:{" "}
                  <span className="font-bold text-[#FFC800]">{poll.responses}</span>
                </span>
              </p>
            </div>

            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/25 shrink-0 shadow-[0_0_10px_rgba(16,185,129,0.12)]">
              {poll.status}
            </span>
          </div>

          {/* Options Progress List */}
          <div className="space-y-4 pt-1">
            {options.map((opt) => (
              <div key={opt.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-300 font-medium">{opt.text}</span>
                  <span className="text-gray-400">
                    <span className="font-medium text-gray-300">{opt.votes} votes</span>{" "}
                    <span className="font-bold text-gray-200 ml-1">{opt.percentage}%</span>
                  </span>
                </div>

                {/* Progress Bar Track */}
                <div className="w-full h-2 bg-white/[0.04] rounded-full overflow-hidden border border-white/[0.04]">
                  <div
                    style={{ width: `${opt.percentage}%` }}
                    className={cn(
                      "h-full rounded-full transition-all duration-500",
                      opt.isHighest
                        ? "bg-[#FFC800] shadow-[0_0_10px_rgba(255,200,0,0.5)]"
                        : "bg-white/20"
                    )}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card 2: Audience Breakdown */}
        <div className="card-depth relative rounded-xl p-5 md:p-6 space-y-4 overflow-hidden before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent">
          <h2 className="text-sm font-semibold text-white tracking-wide">
            Audience Breakdown
          </h2>

          <div className="grid grid-cols-3 gap-3 pt-1">
            {/* Active Users */}
            <div className="bg-[#0D0E12]/80 border border-white/[0.06] rounded-xl p-4 text-center transition-transform duration-200 hover:-translate-y-0.5">
              <p className="text-2xl font-bold text-[#10B981] drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]">
                {breakdown.activeUsers}
              </p>
              <p className="text-xs text-gray-400 mt-1 font-medium">Active Users</p>
            </div>

            {/* Future Users */}
            <div className="bg-[#0D0E12]/80 border border-white/[0.06] rounded-xl p-4 text-center transition-transform duration-200 hover:-translate-y-0.5">
              <p className="text-2xl font-bold text-[#818CF8] drop-shadow-[0_0_8px_rgba(129,140,248,0.3)]">
                {breakdown.futureUsers}
              </p>
              <p className="text-xs text-gray-400 mt-1 font-medium">Future Users</p>
            </div>

            {/* Pioneers */}
            <div className="bg-[#0D0E12]/80 border border-white/[0.06] rounded-xl p-4 text-center transition-transform duration-200 hover:-translate-y-0.5">
              <p className="text-2xl font-bold text-[#FFC800] drop-shadow-[0_0_8px_rgba(255,200,0,0.3)]">
                {breakdown.pioneers}
              </p>
              <p className="text-xs text-gray-400 mt-1 font-medium">Pioneers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
