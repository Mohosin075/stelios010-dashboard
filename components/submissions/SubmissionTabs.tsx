"use client";

import React, { memo } from "react";
import { SubmissionTab } from "@/types/submission";
import { cn } from "@/lib/utils";

interface SubmissionTabsProps {
  activeTab: SubmissionTab;
  onTabChange: (tab: SubmissionTab) => void;
  pioneerPendingCount: number;
  productPendingCount: number;
}

export const SubmissionTabs = memo(function SubmissionTabs({
  activeTab,
  onTabChange,
  pioneerPendingCount,
  productPendingCount,
}: SubmissionTabsProps) {
  return (
    <div className="bg-[#121316] border border-[#1E2026] rounded-2xl p-1.5 flex items-center gap-2 w-full">
      {/* Missing Pioneers Tab */}
      <button
        type="button"
        onClick={() => onTabChange("Missing Pioneers")}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer select-none",
          activeTab === "Missing Pioneers"
            ? "bg-[#FFC800] text-black shadow-xs font-bold"
            : "text-gray-400 hover:text-white"
        )}
      >
        <span>Missing Pioneers</span>
        <span
          className={cn(
            "w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold",
            activeTab === "Missing Pioneers"
              ? "bg-black/20 text-black"
              : "bg-white/10 text-gray-400"
          )}
        >
          {pioneerPendingCount}
        </span>
      </button>

      {/* Missing Products Tab */}
      <button
        type="button"
        onClick={() => onTabChange("Missing Products")}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer select-none",
          activeTab === "Missing Products"
            ? "bg-[#FFC800] text-black shadow-xs font-bold"
            : "text-gray-400 hover:text-white"
        )}
      >
        <span>Missing Products</span>
        <span
          className={cn(
            "w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold",
            activeTab === "Missing Products"
              ? "bg-black/20 text-black"
              : "bg-white/10 text-gray-400"
          )}
        >
          {productPendingCount}
        </span>
      </button>
    </div>
  );
});

export default SubmissionTabs;
