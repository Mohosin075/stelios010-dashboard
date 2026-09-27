import { GenbDashboardStats } from "@/types/dashboard";

export const INITIAL_GENB_STATS: GenbDashboardStats = {
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
  recentActivities: [
    {
      id: "act-1",
      title: "New verification submitted",
      subtitle: "Sofia Reyes — X3 Knee by Ottobock",
      timestamp: "2 hours ago",
      type: "verification",
    },
    {
      id: "act-2",
      title: "New Contact GENB message",
      subtitle: "Bug report from Marcus Chen",
      timestamp: "3 hours ago",
      type: "contact",
    },
    {
      id: "act-3",
      title: "Pioneer subscription activated",
      subtitle: "Open Bionics — Annual Plan",
      timestamp: "1 day ago",
      type: "subscription",
    },
    {
      id: "act-4",
      title: "Report received",
      subtitle: "Profile reported by Marcus Chen",
      timestamp: "1 day ago",
      type: "report",
    },
    {
      id: "act-5",
      title: "New Pioneer submitted",
      subtitle: "Naked Prosthetics — submitted by Marcus Chen",
      timestamp: "2 days ago",
      type: "pioneer",
    },
    {
      id: "act-6",
      title: "New verification submitted",
      subtitle: "Marcus Chen — Michelangelo Hand by Ottobock",
      timestamp: "2 days ago",
      type: "verification",
    },
  ],
};
