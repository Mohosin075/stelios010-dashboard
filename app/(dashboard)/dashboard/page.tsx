"use client";

import React, { useState } from "react";
import TopStatsGrid from "@/components/dashboard/TopStatsGrid";
import PioneerRevenueCard from "@/components/dashboard/PioneerRevenueCard";
import PendingActionsCard from "@/components/dashboard/PendingActionsCard";
import { GenbDashboardStats } from "@/types/dashboard";

export const initialGenbStats: GenbDashboardStats = {
  totalUsers: {
    label: "TOTAL USERS",
    value: "2,847",
    subtext: "+34 this week",
    valueColor: "white",
  },
  activeUsers: {
    label: "ACTIVE USERS",
    value: "1,643",
    subtext: "57.7% of total",
    valueColor: "green",
  },
  futureUsers: {
    label: "FUTURE USERS",
    value: "1,204",
    subtext: "42.3% of total",
    valueColor: "blue",
  },
  pioneers: {
    label: "PIONEERS",
    value: "4",
    subtext: "3 subscribed",
    valueColor: "yellow",
  },
  pendingVerif: {
    label: "PENDING VERIF.",
    value: "2",
    subtext: "Needs review",
    valueColor: "yellow",
  },
  activeSubscriptions: {
    label: "ACTIVE SUBSCRIPTIONS",
    value: "3",
    subtext: "↑1 this month",
    valueColor: "yellow",
  },
  pioneerRevenue: {
    monthlyRevenue: {
      title: "Monthly Revenue",
      amount: "$1,000",
      detail: "2 monthly plans",
    },
    annualRevenue: {
      title: "Annual Revenue",
      amount: "$16,500",
      detail: "3 annual plans active",
    },
    activeMonthlyPlans: {
      title: "Active Monthly Plans",
      amount: "2",
      detail: "$500/month each",
    },
    activeAnnualPlans: {
      title: "Active Annual Plans",
      amount: "3",
      detail: "$5,500/year each",
    },
  },
  pendingActions: [
    {
      id: "bionic",
      title: "Bionic Verifications Pending",
      count: 2,
      badgeType: "yellow",
    },
    {
      id: "missing-pioneers",
      title: "Missing Pioneers Pending",
      count: 1,
      badgeType: "purple",
    },
    {
      id: "missing-products",
      title: "Missing Products Pending",
      count: 1,
      badgeType: "purple",
    },
    {
      id: "reports",
      title: "Reports Requiring Review",
      count: 2,
      badgeType: "red",
    },
    {
      id: "contact",
      title: "Contact Messages Unread",
      count: 2,
      badgeType: "green",
    },
  ],
};

export default function DashboardPage() {
  const [stats] = useState<GenbDashboardStats>(initialGenbStats);

  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      {/* Top 6 Stats Cards */}
      <TopStatsGrid stats={stats} />

      {/* Main Grid: Pioneer Revenue & Pending Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
        <PioneerRevenueCard revenue={stats.pioneerRevenue} />
        <PendingActionsCard actions={stats.pendingActions} />
      </div>
    </div>
  );
}