"use client";

import React, { memo } from "react";
import { PollStatus } from "@/types/poll";
import { cn } from "@/lib/utils";

interface PollTabsProps {
  activeTab: PollStatus;
  onTabChange: (tab: PollStatus) => void;
}

const TABS: PollStatus[] = ["Active", "Scheduled", "Completed"];

export const PollTabs = memo(function PollTabs({
  activeTab,
  onTabChange,
}: PollTabsProps) {
  return (
    <div className="bg-[#121316] border border-[#1E2026] rounded-xl p-1.5 flex items-center gap-2 w-fit">
      {TABS.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <button
            key={tab}
            type="button"
            onClick={() => onTabChange(tab)}
            className={cn(
              "px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer select-none",
              isActive
                ? "bg-[#FFC800] text-black shadow-xs font-bold"
                : "text-gray-400 hover:text-white"
            )}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
});

export default PollTabs;
