"use client";

import React, { memo } from "react";
import Link from "next/link";
import { PollItem } from "@/types/poll";
import { cn } from "@/lib/utils";

interface PollsTableProps {
  polls: PollItem[];
  onEndPoll?: (poll: PollItem) => void;
  className?: string;
}

export const PollsTable = memo(function PollsTable({
  polls,
  onEndPoll,
  className,
}: PollsTableProps) {
  return (
    <div
      className={cn(
        "bg-[#121316] border border-[#1E2026] rounded-xl overflow-x-auto",
        className
      )}
    >
      <table className="w-full text-left text-xs whitespace-nowrap">
        <thead>
          <tr className="border-b border-[#1E2026] text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
            <th className="py-3.5 px-5">POLL QUESTION</th>
            <th className="py-3.5 px-4">AUDIENCE</th>
            <th className="py-3.5 px-4">RESPONSES</th>
            <th className="py-3.5 px-4">CREATED</th>
            <th className="py-3.5 px-4">END DATE</th>
            <th className="py-3.5 px-4">STATUS</th>
            <th className="py-3.5 px-5 text-left">ACTIONS</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#1A1C22]">
          {polls.length === 0 ? (
            <tr>
              <td colSpan={7} className="py-8 text-center text-gray-500">
                No polls found in this category.
              </td>
            </tr>
          ) : (
            polls.map((poll) => (
              <tr
                key={poll.id}
                className="hover:bg-white/[0.015] transition-colors"
              >
                {/* Poll Question */}
                <td className="py-3.5 px-5 font-medium text-white max-w-md truncate">
                  {poll.question}
                </td>

                {/* Audience */}
                <td className="py-3.5 px-4 text-gray-300">{poll.audience}</td>

                {/* Responses (Yellow font) */}
                <td className="py-3.5 px-4 font-bold text-xs text-[#FFC800]">
                  {poll.responses}
                </td>

                {/* Created Date */}
                <td className="py-3.5 px-4 text-gray-400">{poll.createdDate}</td>

                {/* End Date */}
                <td className="py-3.5 px-4 text-gray-400">{poll.endDate}</td>

                {/* Status */}
                <td className="py-3.5 px-4">
                  {poll.status === "Active" && (
                    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-medium bg-[#0D261E] text-[#10B981] border border-[#10B981]/20">
                      Active
                    </span>
                  )}
                  {poll.status === "Scheduled" && (
                    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-medium bg-[#1A1B30] text-[#818CF8] border border-[#818CF8]/20">
                      Scheduled
                    </span>
                  )}
                  {poll.status === "Completed" && (
                    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-medium bg-[#1C1E24] text-gray-400 border border-gray-700/40">
                      Completed
                    </span>
                  )}
                </td>

                {/* Actions */}
                <td className="py-3.5 px-5">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/polls/${poll.id}`}
                      className="bg-[#161820] border border-[#272A36] hover:border-gray-500 text-white rounded-lg px-3.5 py-1 text-xs font-medium transition-all hover:bg-[#1E212B] inline-block cursor-pointer"
                    >
                      Results
                    </Link>
                    <button
                      type="button"
                      onClick={() => onEndPoll?.(poll)}
                      className="bg-[#161820] border border-[#272A36] hover:border-red-500/50 text-[#EF4444] rounded-lg px-3.5 py-1 text-xs font-medium transition-all hover:bg-red-950/20 cursor-pointer"
                    >
                      End Poll
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
});

export default PollsTable;
