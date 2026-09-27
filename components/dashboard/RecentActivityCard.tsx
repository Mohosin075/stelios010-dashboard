import React, { memo } from "react";
import { RecentActivityItem } from "@/types/dashboard";
import { ActivityRow } from "./ActivityRow";

interface RecentActivityCardProps {
  activities: RecentActivityItem[];
}

export const RecentActivityCard = memo(function RecentActivityCard({
  activities,
}: RecentActivityCardProps) {
  return (
    <div className="bg-[#121316] border border-[#1E2026] rounded-xl p-5 sm:p-6">
      <h2 className="text-sm sm:text-base font-semibold text-gray-200 mb-5 tracking-wide">
        Recent Admin-Relevant Activity
      </h2>

      <div className="divide-y divide-[#1B1D25]">
        {activities.map((item) => (
          <ActivityRow key={item.id} activity={item} />
        ))}
      </div>
    </div>
  );
});

export default RecentActivityCard;
