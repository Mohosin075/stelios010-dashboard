export type ReportType = "Profile" | "Support Discussion";
export type ReportStatus = "Open" | "Resolved";

export interface ReportItem {
  id: string;
  reportedItem: string;
  type: ReportType;
  reportedBy: string;
  reason: string;
  date: string;
  status: ReportStatus;
}
