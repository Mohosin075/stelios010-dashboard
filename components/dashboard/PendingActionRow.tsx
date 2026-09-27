import React, { memo } from "react";
import { PendingAction } from "@/types/dashboard";
import { cn } from "@/lib/utils";

interface PendingActionRowProps {
  action: PendingAction;
  onActionClick?: (action: PendingAction) => void;
  className?: string;
}

const badgeVariants: Record<PendingAction["badgeType"], string> = {
  yellow: "bg-[#282310] text-[#FFC800] border border-[#FFC800]/30",
  purple: "bg-[#1C1D33] text-[#818CF8] border border-[#818CF8]/30",
  red: "bg-[#30161A] text-[#F87171] border border-[#F87171]/30",
  green: "bg-[#112920] text-[#34D399] border border-[#34D399]/30",
};

export const PendingActionRow = memo(function PendingActionRow({
  action,
  onActionClick,
  className,
}: PendingActionRowProps) {
  return (
    <div
      onClick={() => onActionClick?.(action)}
      className={cn(
        "group flex items-center justify-between px-4 py-3.5 bg-[#181A1F] border border-[#22252E] rounded-xl hover:border-[#2E3340] transition-colors cursor-pointer",
        className
      )}
    >
      <span className="text-xs sm:text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
        {action.title}
      </span>
      <span
        className={cn(
          "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
          badgeVariants[action.badgeType]
        )}
      >
        {action.count}
      </span>
    </div>
  );
});

export default PendingActionRow;
