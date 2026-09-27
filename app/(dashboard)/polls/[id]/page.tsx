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
        <div className="bg-[#121316] border border-[#1E2026] rounded-xl p-5 md:p-6 space-y-5">
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

            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#0D261E] text-[#10B981] border border-[#10B981]/20 shrink-0">
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
                <div className="w-full h-1.5 bg-[#181A20] rounded-full overflow-hidden">
                  <div
                    style={{ width: `${opt.percentage}%` }}
                    className={cn(
                      "h-full rounded-full transition-all duration-500",
                      opt.isHighest
                        ? "bg-[#FFC800]"
                        : "bg-[#2A2E3B]"
                    )}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card 2: Audience Breakdown */}
        <div className="bg-[#121316] border border-[#1E2026] rounded-xl p-5 md:p-6 space-y-4">
          <h2 className="text-sm font-semibold text-white tracking-wide">
            Audience Breakdown
          </h2>

          <div className="grid grid-cols-3 gap-3 pt-1">
            {/* Active Users */}
            <div className="bg-[#161820] border border-[#232630] rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-[#10B981]">
                {breakdown.activeUsers}
              </p>
              <p className="text-xs text-gray-400 mt-1">Active Users</p>
            </div>

            {/* Future Users */}
            <div className="bg-[#161820] border border-[#232630] rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-[#818CF8]">
                {breakdown.futureUsers}
              </p>
              <p className="text-xs text-gray-400 mt-1">Future Users</p>
            </div>

            {/* Pioneers */}
            <div className="bg-[#161820] border border-[#232630] rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-[#FFC800]">
                {breakdown.pioneers}
              </p>
              <p className="text-xs text-gray-400 mt-1">Pioneers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
