export type CommunityTab = "Support Groups" | "Community Meets";

export interface SupportGroupItem {
  id: string;
  title: string;
  description: string;
  membersCount: number;
  status: "Active" | "Disabled";
}

export interface CommunityMeetItem {
  id: string;
  title: string;
  host: string;
  date: string;
  location: string;
  participantsCount: number;
  status: "Upcoming" | "Completed";
}
