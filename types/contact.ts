export type ContactMessageType = "Bug" | "Suggestion" | "Idea";
export type ContactMessageStatus = "Unread" | "Read" | "Resolved";

export interface ContactMessageItem {
  id: string;
  sender: string;
  email: string;
  type: ContactMessageType;
  messagePreview: string;
  fullMessage: string;
  hasAttachment: boolean;
  date: string;
  status: ContactMessageStatus;
}
