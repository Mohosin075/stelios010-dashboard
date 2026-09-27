"use client";

import React, { memo } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PioneerSubmissionItem } from "@/types/submission";

interface PioneerSubmissionsTableProps {
  submissions: PioneerSubmissionItem[];
  className?: string;
}

export const PioneerSubmissionsTable = memo(function PioneerSubmissionsTable({
  submissions,
  className,
}: PioneerSubmissionsTableProps) {
  return (
    <div className={cn("table-depth", className)}>
      <table className="w-full text-left text-xs whitespace-nowrap">
        <thead>
          <tr className="border-b border-white/[0.06] bg-white/[0.02] text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
            <th className="py-3.5 px-5">PIONEER NAME</th>
            <th className="py-3.5 px-4">WEBSITE</th>
            <th className="py-3.5 px-4">SUBMITTED BY</th>
            <th className="py-3.5 px-4">DATE</th>
            <th className="py-3.5 px-4">STATUS</th>
            <th className="py-3.5 px-5 text-left">REVIEW</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.04]">
          {submissions.length === 0 ? (
            <tr>
              <td colSpan={6} className="py-8 text-center text-gray-500">
                No pioneer submissions found.
              </td>
            </tr>
          ) : (
            submissions.map((sub) => (
              <tr
                key={sub.id}
                className="hover:bg-white/[0.015] transition-colors"
              >
                {/* Pioneer Name */}
                <td className="py-3.5 px-5 font-medium text-white">
                  {sub.pioneerName}
                </td>

                {/* Website (Blue link text) */}
                <td className="py-3.5 px-4">
                  <span className="text-[#3B82F6] hover:underline cursor-pointer">
                    {sub.website}
                  </span>
                </td>

                {/* Submitted By */}
                <td className="py-3.5 px-4 text-gray-300">{sub.submittedBy}</td>

                {/* Date */}
                <td className="py-3.5 px-4 text-gray-400">{sub.date}</td>

                {/* Status */}
                <td className="py-3.5 px-4">
                  {sub.status === "Pending" && (
                    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-medium bg-[#28220F] text-[#FACC15] border border-[#FACC15]/20">
                      Pending
                    </span>
                  )}
                  {sub.status === "Approved" && (
                    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-medium bg-[#0D261E] text-[#10B981] border border-[#10B981]/20">
                      Approved
                    </span>
                  )}
                  {sub.status === "Rejected" && (
                    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-medium bg-[#2D1619] text-[#F87171] border border-[#F87171]/20">
                      Rejected
                    </span>
                  )}
                </td>

                {/* Review */}
                <td className="py-3.5 px-5">
                  {sub.status !== "Pending" ? (
                    <Link
                      href={`/submissions/${sub.id}`}
                      className="bg-white/[0.05] border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.09] text-gray-200 hover:text-white rounded-lg px-3 py-1 text-xs font-medium transition-all inline-block cursor-pointer active:scale-95"
                    >
                      View
                    </Link>
                  ) : null}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
});

export default PioneerSubmissionsTable;
