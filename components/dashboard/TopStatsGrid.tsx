import React, { memo } from "react";
import { GenbDashboardStats } from "@/types/dashboard";
import { StatCard, StatCardProps } from "./StatCard";

interface TopStatsGridProps {
  stats: GenbDashboardStats;
}

export const TopStatsGrid = memo(function TopStatsGrid({ stats }: TopStatsGridProps) {
  const cards: StatCardProps[] = [
    {
      label: stats.totalUsers.label,
      value: stats.totalUsers.value,
      subtext: stats.totalUsers.subtext,
      color: "white",
    },
    {
      label: stats.activeUsers.label,
      value: stats.activeUsers.value,
      subtext: stats.activeUsers.subtext,
      color: "green",
    },
    {
      label: stats.futureUsers.label,
      value: stats.futureUsers.value,
      subtext: stats.futureUsers.subtext,
      color: "blue",
    },
    {
      label: stats.pioneers.label,
      value: stats.pioneers.value,
      subtext: stats.pioneers.subtext,
      color: "yellow",
    },
    {
      label: stats.pendingVerif.label,
      value: stats.pendingVerif.value,
      subtext: stats.pendingVerif.subtext,
      color: "yellow",
    },
    {
      label: stats.activeSubscriptions.label,
      value: stats.activeSubscriptions.value,
      subtext: stats.activeSubscriptions.subtext,
      color: "yellow",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3.5">
      {cards.map((card, idx) => (
        <StatCard key={idx} {...card} />
      ))}
    </div>
  );
});

export default TopStatsGrid;
