export type SubmissionTab = "Missing Pioneers" | "Missing Products";
export type SubmissionStatus = "Pending" | "Approved" | "Rejected";

export interface PioneerSubmissionItem {
  id: string;
  pioneerName: string;
  website: string;
  submittedBy: string;
  date: string;
  status: SubmissionStatus;
}

export interface ProductSubmissionItem {
  id: string;
  productName: string;
  pioneerName: string;
  website: string;
  submittedBy: string;
  date: string;
  status: SubmissionStatus;
}
