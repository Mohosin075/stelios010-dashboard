import { NotificationItem } from "@/types/notification";

export const MOCK_NOTIFICATIONS_DATA: NotificationItem[] = [
  {
    id: "notif-1",
    title: "Welcome to the New GENB Dashboard",
    description: "We have updated the platform with new features including imp...",
    audience: "All Users",
    date: "2024-11-01",
    status: "Sent",
  },
  {
    id: "notif-2",
    title: "Holiday Community Meet",
    description: "Join us for a virtual community meet on December 20th. All A...",
    audience: "All Users",
    date: "2024-11-20",
    status: "Sent",
  },
  {
    id: "notif-3",
    title: "New Pioneer Partners",
    description: "We are excited to announce three new Pioneer partners joinin...",
    audience: "All Users",
    date: "2024-12-05",
    status: "Scheduled",
  },
];
