export interface MetricStat {
  label: string;
  value: string | number;
  subtext: string;
  valueColor?: "white" | "green" | "blue" | "yellow";
}

export interface RevenueMetric {
  title: string;
  amount: string | number;
  detail: string;
}

export interface PendingAction {
  id: string;
  title: string;
  count: number;
  badgeType: "yellow" | "purple" | "red" | "green";
  link?: string;
}

export interface GenbDashboardStats {
  totalUsers: MetricStat;
  activeUsers: MetricStat;
  futureUsers: MetricStat;
  pioneers: MetricStat;
  pendingVerif: MetricStat;
  activeSubscriptions: MetricStat;
  pioneerRevenue: {
    monthlyRevenue: RevenueMetric;
    annualRevenue: RevenueMetric;
    activeMonthlyPlans: RevenueMetric;
    activeAnnualPlans: RevenueMetric;
  };
  pendingActions: PendingAction[];
}
