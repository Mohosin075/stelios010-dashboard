export type ProfileType = "Active User" | "Future User";
export type VerificationStatus = "Verified" | "Pending" | "Unverified";
export type AccountStatus = "Active" | "Suspended";

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
}

export type UserTabFilter = "All Users" | "Active Users" | "Future Users";
