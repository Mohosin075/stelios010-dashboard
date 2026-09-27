import { SupportGroupItem, CommunityMeetItem } from "@/types/community";

export const MOCK_SUPPORT_GROUPS: SupportGroupItem[] = [
  {
    id: "group-1",
    title: "Life Hack Repositories",
    description: "Share practical life hacks for daily living with bionic devices.",
    membersCount: 1243,
    status: "Active",
  },
  {
    id: "group-2",
    title: "Field-Serviceability Support",
    description: "Troubleshooting and maintenance tips from the community.",
    membersCount: 876,
    status: "Active",
  },
  {
    id: "group-3",
    title: "Embodiment Coaching",
    description: "Psychological support and coaching for embodying bionic technology.",
    membersCount: 654,
    status: "Active",
  },
  {
    id: "group-4",
    title: "Immediate Support",
    description: "Urgent peer support for new amputees and device users.",
    membersCount: 2109,
    status: "Active",
  },
  {
    id: "group-5",
    title: "P2P Marketplace",
    description: "Peer-to-peer exchange of compatible accessories and components.",
    membersCount: 789,
    status: "Active",
  },
  {
    id: "group-6",
    title: "About Sockets",
    description: "Dedicated discussions about socket fit, comfort, and adjustments.",
    membersCount: 934,
    status: "Active",
  },
  {
    id: "group-7",
    title: "Users From Nearby Areas",
    description: "Connect with GENB users in your local area.",
    membersCount: 1567,
    status: "Active",
  },
  {
    id: "group-8",
    title: "Future User Questions",
    description: "Space for Future Users to ask questions about bionic technology.",
    membersCount: 445,
    status: "Active",
  },
];

export const MOCK_COMMUNITY_MEETS: CommunityMeetItem[] = [
  {
    id: "meet-1",
    title: "San Francisco Bionic Users Meetup",
    host: "Marcus Chen",
    date: "2024-12-15",
    location: "San Francisco, CA",
    participantsCount: 23,
    status: "Upcoming",
  },
  {
    id: "meet-2",
    title: "Barcelona Upper Limb Users Group",
    host: "Sofia Reyes",
    date: "2024-12-08",
    location: "Barcelona, Spain",
    participantsCount: 15,
    status: "Upcoming",
  },
  {
    id: "meet-3",
    title: "Virtual Global Connect — Q4 2024",
    host: "GENB Community",
    date: "2024-11-30",
    location: "Virtual",
    participantsCount: 187,
    status: "Completed",
  },
];
