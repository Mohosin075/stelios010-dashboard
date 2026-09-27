import React from "react";
import { GenbDashboardStats } from "@/types/dashboard";

interface TopStatsGridProps {
  stats: GenbDashboardStats;
}

export default function TopStatsGrid({ stats }: TopStatsGridProps) {
  const cards = [
    {
      label: stats.totalUsers.label,
      value: stats.totalUsers.value,
      subtext: stats.totalUsers.subtext,
      colorClass: "text-white",
    },
    {
      label: stats.activeUsers.label,
      value: stats.activeUsers.value,
      subtext: stats.activeUsers.subtext,
      colorClass: "text-[#10B981]",
    },
    {
      label: stats.futureUsers.label,
      value: stats.futureUsers.value,
      subtext: stats.futureUsers.subtext,
      colorClass: "text-[#6366F1]",
    },
    {
      label: stats.pioneers.label,
      value: stats.pioneers.value,
      subtext: stats.pioneers.subtext,
      colorClass: "text-[#FFC800]",
    },
    {
      label: stats.pendingVerif.label,
      value: stats.pendingVerif.value,
      subtext: stats.pendingVerif.subtext,
      colorClass: "text-[#FFC800]",
    },
    {
      label: stats.activeSubscriptions.label,
      value: stats.activeSubscriptions.value,
      subtext: stats.activeSubscriptions.subtext,
      colorClass: "text-[#FFC800]",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3.5">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="bg-[#121316] border border-[#1E2026] rounded-xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 hover:border-[#2C303B]"
        >
          <div className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase">
            {card.label}
          </div>
          <div className={`text-2xl sm:text-3xl font-extrabold mt-3 tracking-tight ${card.colorClass}`}>
            {card.value}
          </div>
          <div className="text-xs text-gray-400 font-normal mt-2">
            {card.subtext}
          </div>
        </div>
      ))}
    </div>
  );
}
