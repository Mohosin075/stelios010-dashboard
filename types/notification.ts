export type NotificationStatus = "Sent" | "Scheduled";

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  audience: string;
  date: string;
  status: NotificationStatus;
}
