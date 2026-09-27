"use client";

import React, { useState, useMemo } from "react";
import { Pagination } from "@/components/ui/Pagination";
import { MOCK_NOTIFICATIONS_DATA } from "@/constants/notificationsData";
import { NotificationItem } from "@/types/notification";

const ITEMS_PER_PAGE = 5;

export default function NotificationsPage() {
  const [notifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS_DATA);
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = notifications.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const paginatedList = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return notifications.slice(start, start + ITEMS_PER_PAGE);
  }, [notifications, currentPage]);

  return (
    <div className="w-full space-y-4">
      {/* Notifications Table */}
      <div className="bg-[#121316] border border-[#1E2026] rounded-xl overflow-x-auto">
        <table className="w-full text-left text-xs whitespace-nowrap">
          <thead>
            <tr className="border-b border-[#1E2026] text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
              <th className="py-3.5 px-5">TITLE</th>
              <th className="py-3.5 px-4">AUDIENCE</th>
              <th className="py-3.5 px-4">DATE</th>
              <th className="py-3.5 px-5 text-left">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1A1C22]">
            {paginatedList.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-gray-500">
                  No notifications found.
                </td>
              </tr>
            ) : (
              paginatedList.map((notif) => (
                <tr
                  key={notif.id}
                  className="hover:bg-white/[0.015] transition-colors"
                >
                  {/* Title & Description */}
                  <td className="py-3.5 px-5 max-w-md">
                    <p className="font-semibold text-white tracking-tight">
                      {notif.title}
                    </p>
                    <p className="text-[11px] text-gray-500 truncate mt-0.5">
                      {notif.description}
                    </p>
                  </td>

                  {/* Audience */}
                  <td className="py-3.5 px-4 text-gray-300">{notif.audience}</td>

                  {/* Date */}
                  <td className="py-3.5 px-4 text-gray-400">{notif.date}</td>

                  {/* Status */}
                  <td className="py-3.5 px-5">
                    {notif.status === "Sent" ? (
                      <span className="inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-medium bg-[#0D261E] text-[#10B981] border border-[#10B981]/20">
                        Sent
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-medium bg-[#28220F] text-[#FACC15] border border-[#FACC15]/20">
                        Scheduled
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={setCurrentPage}
        entityName="notifications"
      />
    </div>
  );
}
