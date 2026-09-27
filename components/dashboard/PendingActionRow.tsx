import React, { memo } from "react";
import { PendingAction } from "@/types/dashboard";
import { cn } from "@/lib/utils";

interface PendingActionRowProps {
  action: PendingAction;
  onActionClick?: (action: PendingAction) => void;
  className?: string;
}

const badgeVariants: Record<PendingAction["badgeType"], string> = {
  yellow: "bg-[#FFC800]/10 text-[#FFC800] border border-[#FFC800]/30 shadow-[0_0_8px_rgba(255,200,0,0.12)]",
  purple: "bg-[#818CF8]/10 text-[#818CF8] border border-[#818CF8]/30 shadow-[0_0_8px_rgba(129,140,248,0.12)]",
  red: "bg-[#F87171]/10 text-[#F87171] border border-[#F87171]/30 shadow-[0_0_8px_rgba(248,113,113,0.12)]",
  green: "bg-[#34D399]/10 text-[#34D399] border border-[#34D399]/30 shadow-[0_0_8px_rgba(52,211,153,0.12)]",
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
        "group flex items-center justify-between px-4 py-3 bg-[#15171D]/80 border border-white/[0.06] rounded-xl hover:border-white/15 hover:bg-[#191B24] transition-all duration-150 cursor-pointer active:scale-[0.99]",
        className
      )}
    >
      <span className="text-xs sm:text-sm font-medium text-gray-300 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-150">
        {action.title}
      </span>
      <span
        className={cn(
          "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-transform duration-150 group-hover:scale-105",
          badgeVariants[action.badgeType]
        )}
      >
        {action.count}
      </span>
    </div>
  );
});

export default PendingActionRow;
