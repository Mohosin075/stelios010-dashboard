import { PioneerSubmissionItem, ProductSubmissionItem } from "@/types/submission";

export const MOCK_PIONEER_SUBMISSIONS: PioneerSubmissionItem[] = [
  {
    id: "pioneer-sub-1",
    pioneerName: "Naked Prosthetics",
    website: "npdevices.com",
    submittedBy: "Marcus Chen",
    date: "2024-11-29",
    status: "Pending",
  },
  {
    id: "pioneer-sub-2",
    pioneerName: "Fillauer",
    website: "fillauer.com",
    submittedBy: "James Okafor",
    date: "2024-11-20",
    status: "Approved",
  },
];

export const MOCK_PRODUCT_SUBMISSIONS: ProductSubmissionItem[] = [
  {
    id: "product-sub-1",
    productName: "Symbionic Leg",
    pioneerName: "Össur",
    website: "ossur.com",
    submittedBy: "Sofia Reyes",
    date: "2024-11-27",
    status: "Pending",
  },
  {
    id: "product-sub-2",
    productName: "i-Limb Quantum",
    pioneerName: "Touch Bionics",
    website: "touchbionics.com",
    submittedBy: "Lena Müller",
    date: "2024-11-10",
    status: "Rejected",
  },
];
