"use client";

import React, { memo } from "react";
import Link from "next/link";
import { PioneerItem } from "@/types/pioneer";
import { cn } from "@/lib/utils";

interface PioneerTableProps {
  pioneers: PioneerItem[];
  onManagePioneer?: (pioneer: PioneerItem) => void;
  className?: string;
}

export const PioneerTable = memo(function PioneerTable({
  pioneers,
  onManagePioneer,
  className,
}: PioneerTableProps) {
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
            <th className="py-3.5 px-4">LOCATION</th>
            <th className="py-3.5 px-4">PRODUCTS</th>
            <th className="py-3.5 px-4">CLAIMED</th>
            <th className="py-3.5 px-4">SUBSCRIPTION</th>
            <th className="py-3.5 px-4">VERIFIED</th>
            <th className="py-3.5 px-4">CREATED</th>
            <th className="py-3.5 px-5 text-left">ACTIONS</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.04]">
          {pioneers.length === 0 ? (
            <tr>
              <td colSpan={8} className="py-8 text-center text-gray-500">
                No pioneers found matching your filters.
              </td>
            </tr>
          ) : (
            pioneers.map((pioneer) => (
              <tr
                key={pioneer.id}
                className="hover:bg-white/[0.025] transition-colors duration-150"
              >
                {/* Pioneer avatar + name + website */}
                <td className="py-3.5 px-5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#FFC800]/15 text-[#FFC800] border border-[#FFC800]/30 shadow-[0_0_8px_rgba(255,200,0,0.12)] flex items-center justify-center font-bold text-xs shrink-0 select-none">
                      {pioneer.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-white tracking-tight text-xs sm:text-sm">
                        {pioneer.name}
                      </p>
                      <p className="text-[11px] text-gray-500">{pioneer.website}</p>
                    </div>
                  </div>
                </td>

                {/* Location */}
                <td className="py-3.5 px-4 text-gray-300">{pioneer.location}</td>

                {/* Products */}
                <td className="py-3.5 px-4 text-gray-300">
                  {pioneer.productCount} {pioneer.productCount === 1 ? "product" : "products"}
                </td>

                {/* Claimed */}
                <td className="py-3.5 px-4">
                  {pioneer.claimedStatus === "Claimed" ? (
                    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-medium bg-[#0D261E] text-[#10B981] border border-[#10B981]/20">
                      Claimed
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-medium bg-[#1C1E24] text-gray-400 border border-gray-700/40">
                      Unclaimed
                    </span>
                  )}
                </td>

                {/* Subscription */}
                <td className="py-3.5 px-4">
                  {pioneer.subscriptionStatus === "Active" ? (
                    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-medium bg-[#28220F] text-[#FACC15] border border-[#FACC15]/20">
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-medium bg-[#1C1E24] text-gray-400 border border-gray-700/40">
                      None
                    </span>
                  )}
                </td>

                {/* Verified */}
                <td className="py-3.5 px-4">
                  {pioneer.verificationStatus === "Verified" ? (
                    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-medium bg-[#0D261E] text-[#10B981] border border-[#10B981]/20">
                      Verified
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-medium bg-[#1C1E24] text-gray-400 border border-gray-700/40">
                      Unverified
                    </span>
                  )}
                </td>

                {/* Created */}
                <td className="py-3.5 px-4 text-gray-400">{pioneer.createdAt}</td>

                {/* Actions */}
                <td className="py-3.5 px-5">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/pioneers/${pioneer.id}`}
                      className="bg-white/[0.05] border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.09] text-gray-200 hover:text-white rounded-lg px-3 py-1 text-xs font-medium transition-all inline-block cursor-pointer active:scale-95"
                    >
                      View
                    </Link>
                    <button
                      type="button"
                      onClick={() => onManagePioneer?.(pioneer)}
                      className="bg-white/[0.05] border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.09] text-gray-200 hover:text-white rounded-lg px-3 py-1 text-xs font-medium transition-all cursor-pointer active:scale-95"
                    >
                      Manage
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

export default PioneerTable;
