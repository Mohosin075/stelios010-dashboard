import React, { memo } from "react";
import { RecentActivityItem } from "@/types/dashboard";
import {
  ShieldCheck,
  MessageSquare,
  Sparkles,
  AlertCircle,
  Gem,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ActivityRowProps {
  activity: RecentActivityItem;
  className?: string;
}

const activityConfig: Record<
  RecentActivityItem["type"],
  { icon: React.ElementType; badgeClass: string }
> = {
  verification: {
    icon: ShieldCheck,
    badgeClass: "bg-[#FFC800]/10 text-[#FFC800] border border-[#FFC800]/25 shadow-[0_0_8px_rgba(255,200,0,0.12)]",
  },
  contact: {
    icon: MessageSquare,
    badgeClass: "bg-[#34D399]/10 text-[#34D399] border border-[#34D399]/25 shadow-[0_0_8px_rgba(52,211,153,0.12)]",
  },
  subscription: {
    icon: Sparkles,
    badgeClass: "bg-[#FFC800]/10 text-[#FFC800] border border-[#FFC800]/25 shadow-[0_0_8px_rgba(255,200,0,0.12)]",
  },
  report: {
    icon: AlertCircle,
    badgeClass: "bg-[#F87171]/10 text-[#F87171] border border-[#F87171]/25 shadow-[0_0_8px_rgba(248,113,113,0.12)]",
  },
  pioneer: {
    icon: Gem,
    badgeClass: "bg-[#818CF8]/10 text-[#818CF8] border border-[#818CF8]/25 shadow-[0_0_8px_rgba(129,140,248,0.12)]",
  },
};

export const ActivityRow = memo(function ActivityRow({
  activity,
  className,
}: ActivityRowProps) {
  const config = activityConfig[activity.type] || activityConfig.verification;
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "py-3.5 first:pt-1 last:pb-1 flex items-center justify-between gap-4 hover:bg-white/[0.03] transition-all duration-150 rounded-lg px-2.5 -mx-2.5",
        className
      )}
    >
      <div className="flex items-center gap-3.5 min-w-0">
        <div
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
            config.badgeClass
          )}
        >
          <Icon className="w-4 h-4" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-white tracking-tight truncate">
            {activity.title}
          </p>
          <p className="text-xs text-gray-400 mt-0.5 truncate">
            {activity.subtitle}
          </p>
        </div>
      </div>

      <span className="text-xs text-gray-500 whitespace-nowrap shrink-0">
        {activity.timestamp}
      </span>
    </div>
  );
});

export default ActivityRow;
