import { ContactMessageItem } from "@/types/contact";

export const MOCK_CONTACT_MESSAGES: ContactMessageItem[] = [
  {
    id: "msg-1",
    sender: "Marcus Chen",
    email: "marcus.chen@email.com",
    type: "Bug",
    messagePreview: "The verification video upload is failing on iO...",
    fullMessage:
      "The verification video upload is failing on iOS 17.2. I have tried multiple times and the upload completes but then the status shows as failed.",
    hasAttachment: true,
    date: "2024-11-29",
    status: "Unread",
  },
  {
    id: "msg-2",
    sender: "Aisha Al-Farsi",
    email: "aisha.alfarsi@email.com",
    type: "Suggestion",
    messagePreview: "It would be really helpful to have an Arabic t...",
    fullMessage:
      "It would be really helpful to have an Arabic translation option for users in the Middle East region.",
    hasAttachment: false,
    date: "2024-11-28",
    status: "Unread",
  },
  {
    id: "msg-3",
    sender: "James Okafor",
    email: "james.okafor@email.com",
    type: "Idea",
    messagePreview: "What about having a Pioneer of the Month...",
    fullMessage:
      "What about having a Pioneer of the Month spotlight? It could help smaller prosthetics companies get more visibility among users.",
    hasAttachment: false,
    date: "2024-11-25",
    status: "Read",
  },
  {
    id: "msg-4",
    sender: "Lena Müller",
    email: "lena.mueller@email.com",
    type: "Bug",
    messagePreview: "The community meet map view is not loadi...",
    fullMessage:
      "The community meet map view is not loading correctly on my Android device.",
    hasAttachment: true,
    date: "2024-11-20",
    status: "Resolved",
  },
];
