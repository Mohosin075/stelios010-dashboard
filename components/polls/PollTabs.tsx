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
    <div className="tab-depth rounded-xl p-1.5 flex items-center gap-1.5 w-fit">
      {TABS.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <button
            key={tab}
            type="button"
            onClick={() => onTabChange(tab)}
            className={cn(
              "px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer select-none active:scale-95",
              isActive
                ? "bg-[#FFC800] text-black shadow-[0_2px_10px_rgba(255,200,0,0.3)] font-bold"
                : "text-gray-400 hover:text-white hover:bg-white/[0.04]"
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
