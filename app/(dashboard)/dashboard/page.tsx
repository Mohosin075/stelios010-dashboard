"use client";

import React, { useState } from "react";
import { TopStatsGrid } from "@/components/dashboard/TopStatsGrid";
import { PioneerRevenueCard } from "@/components/dashboard/PioneerRevenueCard";
import { PendingActionsCard } from "@/components/dashboard/PendingActionsCard";
import { RecentActivityCard } from "@/components/dashboard/RecentActivityCard";
import { INITIAL_GENB_STATS } from "@/constants/dashboardData";
import { GenbDashboardStats } from "@/types/dashboard";

export default function DashboardPage() {
  const [stats] = useState<GenbDashboardStats>(INITIAL_GENB_STATS);

  return (
    <div className="w-full space-y-4">
      {/* 1. Top Key Performance Metrics */}
      <TopStatsGrid stats={stats} />

      {/* 2. Middle Operational Analytics (Pioneer Revenue & Pending Actions) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
        <PioneerRevenueCard revenue={stats.pioneerRevenue} />
        <PendingActionsCard actions={stats.pendingActions} />
      </div>

      {/* 3. Bottom Timeline Feed */}
      <RecentActivityCard activities={stats.recentActivities} />
    </div>
  );
}