export type ProfileType = "Active User" | "Future User";
export type VerificationStatus = "Verified" | "Pending" | "Unverified";
export type AccountStatus = "Active" | "Suspended";

export interface BionicProduct {
  id: string;
  name: string;
  brand: string;
  category: string;
  status: "Verified" | "Pending";
}

export interface MasterIndicators {
  originOfAmputation: string;
  anatomicalBaseline: string;
}

export interface UserItem {
  id: string;
  name: string;
  email: string;
  initials: string;
  isYellowAvatar?: boolean;
  profileType: ProfileType;
  location: string;
  bionicLookingFor: string;
  isBionicProduct: boolean;
  verificationStatus: VerificationStatus;
  joinedDate: string;
  accountStatus: AccountStatus;
  age?: number;
  country?: string;
  region?: string;
  city?: string;
  bio?: string;
  bionicProducts?: BionicProduct[];
  masterIndicators?: MasterIndicators;
}

export type UserTabFilter = "All Users" | "Active Users" | "Future Users";
