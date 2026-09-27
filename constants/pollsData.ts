import { PollItem } from "@/types/poll";

export const MOCK_POLLS_DATA: PollItem[] = [
  {
    id: "poll-1",
    question: "What feature would you most like to see added to GENB?",
    audience: "All Users",
    responses: 508,
    createdDate: "2024-11-20",
    endDate: "2024-12-20",
    status: "Active",
    options: [
      {
        id: "opt-1",
        text: "Video tutorials from Pioneers",
        votes: 142,
        percentage: 28,
        isHighest: false,
      },
      {
        id: "opt-2",
        text: "Virtual fitting consultations",
        votes: 98,
        percentage: 19,
        isHighest: false,
      },
      {
        id: "opt-3",
        text: "Peer mentor matching",
        votes: 201,
        percentage: 40,
        isHighest: true,
      },
      {
        id: "opt-4",
        text: "Insurance guidance tool",
        votes: 67,
        percentage: 13,
        isHighest: false,
      },
    ],
    audienceBreakdown: {
      activeUsers: 294,
      futureUsers: 172,
      pioneers: 40,
    },
  },
];
