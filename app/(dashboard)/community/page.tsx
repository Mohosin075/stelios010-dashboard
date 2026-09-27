"use client";

import React, { useState, useMemo, useCallback } from "react";
import { Pagination } from "@/components/ui/Pagination";
import {
  MOCK_SUPPORT_GROUPS,
  MOCK_COMMUNITY_MEETS,
} from "@/constants/communityData";
import { CommunityTab, SupportGroupItem, CommunityMeetItem } from "@/types/community";
import { cn } from "@/lib/utils";

const ITEMS_PER_PAGE = 8;

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<CommunityTab>("Support Groups");
  const [supportGroups, setSupportGroups] = useState<SupportGroupItem[]>(MOCK_SUPPORT_GROUPS);
  const [communityMeets, setCommunityMeets] = useState<CommunityMeetItem[]>(MOCK_COMMUNITY_MEETS);
  const [currentPage, setCurrentPage] = useState(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  }, []);

  const handleToggleGroup = useCallback((id: string) => {
    setSupportGroups((prev) =>
      prev.map((g) =>
        g.id === id
          ? { ...g, status: g.status === "Active" ? "Disabled" : "Active" }
          : g
      )
    );
    showToast("Support group status updated.");
  }, [showToast]);

  const handleRemoveMeet = useCallback((id: string) => {
    setCommunityMeets((prev) => prev.filter((m) => m.id !== id));
    showToast("Community meetup removed.");
  }, [showToast]);

  // Pagination
  const totalItems =
    activeTab === "Support Groups" ? supportGroups.length : communityMeets.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));

  const paginatedGroups = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return supportGroups.slice(start, start + ITEMS_PER_PAGE);
  }, [supportGroups, currentPage]);

  const paginatedMeets = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return communityMeets.slice(start, start + ITEMS_PER_PAGE);
  }, [communityMeets, currentPage]);

  return (
    <div className="w-full space-y-4">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#161820] border border-[#2B2E3C] text-white text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <span className="w-2 h-2 rounded-full bg-[#10B981]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Tabs */}
      <div className="bg-[#121316] border border-[#1E2026] rounded-2xl p-1.5 flex items-center gap-2 w-full">
        {(["Support Groups", "Community Meets"] as const).map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => {
                setActiveTab(tab);
                setCurrentPage(1);
              }}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer select-none",
                isActive
                  ? "bg-[#FFC800] text-black shadow-xs font-bold"
                  : "text-gray-400 hover:text-white"
              )}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* 2. Content */}
      {activeTab === "Support Groups" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paginatedGroups.map((group) => (
            <div
              key={group.id}
              className="bg-[#121316] border border-[#1E2026] rounded-xl p-5 flex flex-col justify-between space-y-4 hover:border-gray-700/60 transition-colors"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm font-semibold text-white tracking-tight">
                    {group.title}
                  </h3>
                  <span
                    className={cn(
                      "inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium border shrink-0",
                      group.status === "Active"
                        ? "bg-[#0D261E] text-[#10B981] border-[#10B981]/20"
                        : "bg-[#2D1619] text-[#F87171] border-[#F87171]/20"
                    )}
                  >
                    {group.status}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                  {group.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-gray-500">
                  {group.membersCount.toLocaleString()} members
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => showToast(`Opening ${group.title}...`)}
                    className="bg-[#161820] border border-[#272A36] hover:border-gray-500 text-white rounded-lg px-3.5 py-1 text-xs font-medium transition-all hover:bg-[#1E212B] cursor-pointer"
                  >
                    View Group
                  </button>
                  <button
                    type="button"
                    onClick={() => handleToggleGroup(group.id)}
                    className="bg-[#161820] border border-[#272A36] hover:border-red-500/50 text-[#EF4444] rounded-lg px-3.5 py-1 text-xs font-medium transition-all hover:bg-red-950/20 cursor-pointer"
                  >
                    {group.status === "Active" ? "Disable" : "Enable"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {paginatedMeets.map((meet) => (
            <div
              key={meet.id}
              className="bg-[#121316] border border-[#1E2026] rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-gray-700/60 transition-colors"
            >
              <div>
                <h3 className="text-sm font-semibold text-white tracking-tight">
                  {meet.title}
                </h3>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-400 mt-2">
                  <span>Host: {meet.host}</span>
                  <span>{meet.date}</span>
                  <span>{meet.location}</span>
                  <span>{meet.participantsCount} participants</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span
                  className={cn(
                    "inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium border",
                    meet.status === "Upcoming"
                      ? "bg-[#0D261E] text-[#10B981] border-[#10B981]/20"
                      : "bg-[#1C1E24] text-gray-400 border-gray-700/40"
                  )}
                >
                  {meet.status}
                </span>

                <button
                  type="button"
                  onClick={() => showToast(`Viewing meetup "${meet.title}"...`)}
                  className="bg-[#161820] border border-[#272A36] hover:border-gray-500 text-white rounded-lg px-3.5 py-1 text-xs font-medium transition-all hover:bg-[#1E212B] cursor-pointer"
                >
                  View
                </button>

                {meet.status === "Upcoming" && (
                  <button
                    type="button"
                    onClick={() => handleRemoveMeet(meet.id)}
                    className="bg-[#161820] border border-[#272A36] hover:border-red-500/50 text-[#EF4444] rounded-lg px-3.5 py-1 text-xs font-medium transition-all hover:bg-red-950/20 cursor-pointer"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3. Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={setCurrentPage}
        entityName={activeTab === "Support Groups" ? "groups" : "meetups"}
      />
    </div>
  );
}
