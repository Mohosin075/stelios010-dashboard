import {
  Sparkles,
  Users,
  CheckCircle2,
  Gem,
  Package,
  Send,
  PieChart,
  BarChart3,
  MessageSquare,
  Flag,
  Headphones,
  Bell,
  Sliders,
} from "lucide-react";
import { NavSection } from "@/types/navigation";

export const DASHBOARD_NAV_SECTIONS: readonly NavSection[] = [
  {
    title: "OVERVIEW",
    items: [
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: Sparkles,
      },
    ],
  },
  {
    title: "MANAGEMENT",
    items: [
      { label: "Users", href: "/users", icon: Users },
      { label: "Verifications", href: "/verifications", icon: CheckCircle2 },
      { label: "Pioneers", href: "/pioneers", icon: Gem },
      { label: "Products", href: "/products", icon: Package },
      { label: "Submissions", href: "/dashboard", icon: Send },
    ],
  },
  {
    title: "BUSINESS",
    items: [
      { label: "Subscriptions", href: "/dashboard", icon: PieChart },
    ],
  },
  {
    title: "COMMUNITY",
    items: [
      { label: "Polls", href: "/dashboard", icon: BarChart3 },
      { label: "Community", href: "/dashboard", icon: MessageSquare },
      { label: "Reports", href: "/dashboard", icon: Flag },
      { label: "Contact GENB", href: "/dashboard", icon: Headphones },
    ],
  },
  {
    title: "SYSTEM",
    items: [
      { label: "Notifications", href: "/dashboard", icon: Bell },
      { label: "Settings", href: "/dashboard", icon: Sliders },
    ],
  },
] as const;
