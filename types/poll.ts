export type PollStatus = "Active" | "Scheduled" | "Completed";

export interface PollOption {
  id: string;
  text: string;
  votes: number;
  percentage: number;
  isHighest?: boolean;
}

export interface AudienceBreakdown {
  activeUsers: number;
  futureUsers: number;
  pioneers: number;
}

export interface PollItem {
  id: string;
  question: string;
  audience: string;
  responses: number;
  createdDate: string;
  endDate: string;
  status: PollStatus;
  options?: PollOption[];
  audienceBreakdown?: AudienceBreakdown;
}
