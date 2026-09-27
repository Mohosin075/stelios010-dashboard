import React from "react";
import { RecentActivityItem } from "@/types/dashboard";
import {
  ShieldCheck,
  MessageSquare,
  Sparkles,
  AlertCircle,
  Gem,
} from "lucide-react";

interface RecentActivityCardProps {
  activities: RecentActivityItem[];
}

export default function RecentActivityCard({
  activities,
}: RecentActivityCardProps) {
  const getIconConfig = (type: RecentActivityItem["type"]) => {
    switch (type) {
      case "verification":
        return {
          icon: ShieldCheck,
          className: "bg-[#232012] text-[#FFC800] border border-[#FFC800]/30",
        };
      case "contact":
        return {
          icon: MessageSquare,
          className: "bg-[#122620] text-[#34D399] border border-[#34D399]/30",
        };
      case "subscription":
        return {
          icon: Sparkles,
          className: "bg-[#232012] text-[#FFC800] border border-[#FFC800]/30",
        };
      case "report":
        return {
          icon: AlertCircle,
          className: "bg-[#2D1619] text-[#F87171] border border-[#F87171]/30",
        };
      case "pioneer":
        return {
          icon: Gem,
          className: "bg-[#1C1D33] text-[#818CF8] border border-[#818CF8]/30",
        };
      default:
        return {
          icon: Sparkles,
          className: "bg-gray-800 text-gray-300 border border-gray-700",
        };
    }
  };

  return (
    <div className="bg-[#121316] border border-[#1E2026] rounded-xl p-5 sm:p-6">
      <h2 className="text-sm sm:text-base font-semibold text-gray-200 mb-5 tracking-wide">
        Recent Admin-Relevant Activity
      </h2>

      <div className="divide-y divide-[#1B1D25]">
        {activities.map((item) => {
          const config = getIconConfig(item.type);
          const Icon = config.icon;

          return (
            <div
              key={item.id}
              className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-4 hover:bg-white/[0.015] transition-colors rounded-lg px-2 -mx-2"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${config.className}`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white tracking-tight truncate">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5 truncate">
                    {item.subtitle}
                  </p>
                </div>
              </div>

              <span className="text-xs text-gray-500 whitespace-nowrap shrink-0">
                {item.timestamp}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
