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
    badgeClass: "bg-[#232012] text-[#FFC800] border border-[#FFC800]/30",
  },
  contact: {
    icon: MessageSquare,
    badgeClass: "bg-[#122620] text-[#34D399] border border-[#34D399]/30",
  },
  subscription: {
    icon: Sparkles,
    badgeClass: "bg-[#232012] text-[#FFC800] border border-[#FFC800]/30",
  },
  report: {
    icon: AlertCircle,
    badgeClass: "bg-[#2D1619] text-[#F87171] border border-[#F87171]/30",
  },
  pioneer: {
    icon: Gem,
    badgeClass: "bg-[#1C1D33] text-[#818CF8] border border-[#818CF8]/30",
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
        "py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-4 hover:bg-white/[0.015] transition-colors rounded-lg px-2 -mx-2",
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
