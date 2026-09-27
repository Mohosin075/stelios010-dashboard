"use client";

import React, { memo } from "react";
import Link from "next/link";
import { SubscriptionRow } from "@/types/subscription";
import { cn } from "@/lib/utils";

interface SubscriptionTableProps {
  subscriptions: SubscriptionRow[];
  className?: string;
}

export const SubscriptionTable = memo(function SubscriptionTable({
  subscriptions,
  className,
}: SubscriptionTableProps) {
  return (
    <div
      className={cn(
        "table-depth",
        className
      )}
    >
      <table className="w-full text-left text-xs whitespace-nowrap">
        <thead>
          <tr className="border-b border-white/[0.06] bg-white/[0.02] text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
            <th className="py-3.5 px-5">PIONEER</th>
            <th className="py-3.5 px-4">PLAN</th>
            <th className="py-3.5 px-4">AMOUNT</th>
            <th className="py-3.5 px-4">START DATE</th>
            <th className="py-3.5 px-4">RENEWAL DATE</th>
            <th className="py-3.5 px-4">STATUS</th>
            <th className="py-3.5 px-5 text-left">ACTIONS</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.04]">
          {subscriptions.length === 0 ? (
            <tr>
              <td colSpan={7} className="py-8 text-center text-gray-500">
                No subscriptions found.
              </td>
            </tr>
          ) : (
            subscriptions.map((sub) => (
              <tr
                key={sub.id}
                className="hover:bg-white/[0.025] transition-colors duration-150"
              >
                {/* Pioneer */}
                <td className="py-3.5 px-5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#FFC800]/15 text-[#FFC800] border border-[#FFC800]/30 shadow-[0_0_8px_rgba(255,200,0,0.12)] flex items-center justify-center font-bold text-xs shrink-0 select-none">
                      {sub.pioneerInitials}
                    </div>
                    <span className="font-semibold text-white tracking-tight text-xs sm:text-sm">
                      {sub.pioneerName}
                    </span>
                  </div>
                </td>

                {/* Plan */}
                <td className="py-3.5 px-4">
                  {sub.plan === "Annual" ? (
                    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-medium bg-[#252110] text-[#FFC800] border border-[#FFC800]/25">
                      Annual
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-medium bg-[#122238] text-[#38BDF8] border border-[#38BDF8]/20">
                      Monthly
                    </span>
                  )}
                </td>

                {/* Amount (Yellow font) */}
                <td className="py-3.5 px-4 font-bold text-xs text-[#FFC800]">
                  {sub.amount}
                </td>

                {/* Start Date */}
                <td className="py-3.5 px-4 text-gray-400">{sub.startDate}</td>

                {/* Renewal Date */}
                <td className="py-3.5 px-4 text-gray-400">{sub.renewalDate}</td>

                {/* Status */}
                <td className="py-3.5 px-4">
                  {sub.status === "Active" ? (
                    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-medium bg-[#0D261E] text-[#10B981] border border-[#10B981]/20">
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-medium bg-[#2D1619] text-[#F87171] border border-[#F87171]/20">
                      Expired
                    </span>
                  )}
                </td>

                {/* Actions */}
                <td className="py-3.5 px-5">
                  <Link
                    href={`/pioneers/${sub.pioneerId}`}
                    className="bg-white/[0.05] border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.09] text-gray-200 hover:text-white rounded-lg px-3 py-1 text-xs font-medium transition-all inline-block cursor-pointer active:scale-95"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
});

export default SubscriptionTable;
