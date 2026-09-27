import { ReportItem } from "@/types/report";

export const MOCK_REPORTS_DATA: ReportItem[] = [
  {
    id: "rep-1",
    reportedItem: "User profile: @trollaccount99",
    type: "Profile",
    reportedBy: "Marcus Chen",
    reason: "Impersonation",
    date: "2024-11-28",
    status: "Open",
  },
  {
    id: "rep-2",
    reportedItem: "Post in Immediate Support gr...",
    type: "Support Discussion",
    reportedBy: "Sofia Reyes",
    reason: "Harmful advice",
    date: "2024-11-27",
    status: "Open",
  },
  {
    id: "rep-3",
    reportedItem: "Spam message in P2P Marketplace",
    type: "Support Discussion",
    reportedBy: "Lena Müller",
    reason: "Spam advertising",
    date: "2024-11-15",
    status: "Resolved",
  },
];
