"use client";

import React, { memo, useState, useMemo } from "react";
import { RecentActivityItem } from "@/types/dashboard";
import { ActivityRow } from "./ActivityRow";
import { Pagination } from "@/components/ui/Pagination";

interface RecentActivityCardProps {
  activities: RecentActivityItem[];
  itemsPerPage?: number;
}

export const RecentActivityCard = memo(function RecentActivityCard({
  activities,
  itemsPerPage = 4,
}: RecentActivityCardProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = activities.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  const paginatedActivities = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return activities.slice(start, start + itemsPerPage);
  }, [activities, currentPage, itemsPerPage]);

  return (
    <div className="bg-[#121316] border border-[#1E2026] rounded-xl p-5 sm:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm sm:text-base font-semibold text-gray-200 tracking-wide">
          Recent Admin-Relevant Activity
        </h2>
        <span className="text-xs text-gray-500 font-normal">
          {totalItems} total events
        </span>
      </div>

      <div className="divide-y divide-[#1B1D25]">
        {paginatedActivities.map((item) => (
          <ActivityRow key={item.id} activity={item} />
        ))}
      </div>

      {/* Pagination component */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        entityName="activities"
        className="mt-4 border-none bg-[#161820] py-2 px-3"
      />
    </div>
  );
});

export default RecentActivityCard;
