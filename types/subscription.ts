export type SubscriptionPlanType = "Monthly" | "Annual";
export type SubscriptionRowStatus = "Active" | "Expired" | "Pending";

export interface SubscriptionRow {
  id: string;
  pioneerId: string;
  pioneerName: string;
  pioneerInitials: string;
  plan: SubscriptionPlanType;
  amount: string;
  startDate: string;
  renewalDate: string;
  status: SubscriptionRowStatus;
}

export interface SubscriptionStats {
  activeSubscriptions: number;
  monthlyPlans: number;
  annualPlans: number;
  monthlyRevenue: string;
  annualRevenue: string;
}
