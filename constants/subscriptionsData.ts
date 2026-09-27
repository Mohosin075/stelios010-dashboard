import { SubscriptionRow, SubscriptionStats } from "@/types/subscription";

export const SUBSCRIPTION_STATS: SubscriptionStats = {
  activeSubscriptions: 3,
  monthlyPlans: 1,
  annualPlans: 2,
  monthlyRevenue: "$500",
  annualRevenue: "$11000",
};

export const MOCK_SUBSCRIPTIONS_DATA: SubscriptionRow[] = [
  {
    id: "sub-1",
    pioneerId: "open-bionics",
    pioneerName: "Open Bionics",
    pioneerInitials: "OB",
    plan: "Annual",
    amount: "$5,500",
    startDate: "2024-01-15",
    renewalDate: "2025-01-15",
    status: "Active",
  },
  {
    id: "sub-2",
    pioneerId: "ottobock",
    pioneerName: "Ottobock",
    pioneerInitials: "OT",
    plan: "Monthly",
    amount: "$500",
    startDate: "2024-11-01",
    renewalDate: "2024-12-01",
    status: "Active",
  },
  {
    id: "sub-3",
    pioneerId: "steeper-group",
    pioneerName: "Steeper Group",
    pioneerInitials: "SG",
    plan: "Annual",
    amount: "$5,500",
    startDate: "2024-03-10",
    renewalDate: "2025-03-10",
    status: "Active",
  },
  {
    id: "sub-4",
    pioneerId: "ossur",
    pioneerName: "Össur",
    pioneerInitials: "OS",
    plan: "Monthly",
    amount: "$500",
    startDate: "2024-08-01",
    renewalDate: "2024-09-01",
    status: "Expired",
  },
];
