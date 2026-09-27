export type VerificationTab = "Pending" | "Approved" | "Unsuccessful";

export interface VerificationItem {
  id: string;
  userName: string;
  userLocation: string;
  userInitials: string;
  isYellowAvatar?: boolean;
  productName: string;
  brand: string;
  limb: "Upper Limb" | "Lower Limb";
  submissionDate: string;
  status: "Pending" | "Approved" | "Unsuccessful";
  videoUrl?: string;
  videoDuration?: string;
  unsuccessfulReason?: string;
  productHistory?: {
    name: string;
    status: "Verified" | "Unsuccessful" | "Pending";
  }[];
}
