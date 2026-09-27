export type ClaimedStatus = "Claimed" | "Unclaimed";
export type SubscriptionStatus = "Active" | "None" | "Expired";
export type PioneerVerificationStatus = "Verified" | "Unverified";

export interface PioneerProduct {
  id: string;
  name: string;
  category: string;
  status: "Active" | "Inactive";
}

export interface PioneerItem {
  id: string;
  initials: string;
  name: string;
  website: string;
  location: string;
  productCount: number;
  claimedStatus: ClaimedStatus;
  subscriptionStatus: SubscriptionStatus;
  verificationStatus: PioneerVerificationStatus;
  createdAt: string;
  bio?: string;
  country?: string;
  region?: string;
  city?: string;
  products?: PioneerProduct[];
  subscriptionPlan?: string;
  subscriptionStartDate?: string;
  subscriptionRenewalDate?: string;
}
