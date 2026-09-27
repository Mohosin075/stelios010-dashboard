import React from "react";
import { PendingAction } from "@/types/dashboard";

interface PendingActionsCardProps {
  actions: PendingAction[];
}

export default function PendingActionsCard({ actions }: PendingActionsCardProps) {
  const getBadgeClasses = (type: PendingAction["badgeType"]) => {
    switch (type) {
      case "yellow":
        return "bg-[#282310] text-[#FFC800] border border-[#FFC800]/30";
      case "purple":
        return "bg-[#1C1D33] text-[#818CF8] border border-[#818CF8]/30";
      case "red":
        return "bg-[#30161A] text-[#F87171] border border-[#F87171]/30";
      case "green":
        return "bg-[#112920] text-[#34D399] border border-[#34D399]/30";
      default:
        return "bg-gray-800 text-gray-200 border border-gray-700";
    }
  };

  return (
    <div className="bg-[#121316] border border-[#1E2026] rounded-xl p-5 sm:p-6 flex flex-col h-full">
      <h2 className="text-sm font-semibold text-gray-200 mb-4 tracking-wide">
        Pending Actions
      </h2>

      <div className="flex flex-col gap-2.5 flex-1 justify-between">
        {actions.map((action) => (
          <div
            key={action.id}
            className="group flex items-center justify-between px-4 py-3.5 bg-[#181A1F] border border-[#22252E] rounded-xl hover:border-[#2E3340] transition-colors cursor-pointer"
          >
            <span className="text-xs sm:text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
              {action.title}
            </span>
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${getBadgeClasses(
                action.badgeType
              )}`}
            >
              {action.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
