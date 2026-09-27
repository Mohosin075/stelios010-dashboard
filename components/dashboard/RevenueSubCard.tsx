import React, { memo } from "react";
import { RevenueMetric } from "@/types/dashboard";
import { cn } from "@/lib/utils";

interface RevenueSubCardProps {
  item: RevenueMetric;
  className?: string;
}

export const RevenueSubCard = memo(function RevenueSubCard({
  item,
  className,
}: RevenueSubCardProps) {
  return (
    <div
      className={cn(
        "bg-[#15171D]/90 border border-white/[0.06] rounded-xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 hover:border-white/15 hover:bg-[#181A22]",
        className
      )}
    >
      <div className="text-xs font-medium text-gray-400">
        {item.title}
      </div>
      <div className="text-2xl sm:text-[28px] font-bold text-[#FFC800] my-2 tracking-tight">
        {item.amount}
      </div>
      <div className="text-xs text-gray-400 font-normal">
        {item.detail}
      </div>
    </div>
  );
});

export default RevenueSubCard;
