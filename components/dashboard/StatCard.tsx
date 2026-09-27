import React, { memo } from "react";
import { cn } from "@/lib/utils";

export interface StatCardProps {
  label: string;
  value: string | number;
  subtext: string;
  color?: "white" | "green" | "blue" | "yellow";
  className?: string;
}

const colorMap = {
  white: "text-white",
  green: "text-[#10B981]",
  blue: "text-[#6366F1]",
  yellow: "text-[#FFC800]",
} as const;

export const StatCard = memo(function StatCard({
  label,
  value,
  subtext,
  color = "white",
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "card-depth card-depth-hover rounded-xl p-4 sm:p-5 flex flex-col justify-between group overflow-hidden",
        className
      )}
    >
      {/* Subtle top rim light */}
      <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

      <div className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase select-none">
        {label}
      </div>
      <div
        className={cn(
          "text-2xl sm:text-3xl font-extrabold mt-3 tracking-tight transition-transform duration-200 group-hover:translate-x-0.5",
          colorMap[color]
        )}
      >
        {value}
      </div>
      <div className="text-xs text-gray-400 font-normal mt-2">
        {subtext}
      </div>
    </div>
  );
});
