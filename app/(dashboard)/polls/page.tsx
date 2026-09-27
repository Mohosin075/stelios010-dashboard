"use client";

import React, { useState, useMemo, useCallback } from "react";
import { PollTabs } from "@/components/polls/PollTabs";
import { PollsTable } from "@/components/polls/PollsTable";
import { Pagination } from "@/components/ui/Pagination";
import { MOCK_POLLS_DATA } from "@/constants/pollsData";
import { PollStatus, PollItem } from "@/types/poll";

const ITEMS_PER_PAGE = 5;

export default function PollsPage() {
  const [polls, setPolls] = useState<PollItem[]>(MOCK_POLLS_DATA);
  const [activeTab, setActiveTab] = useState<PollStatus>("Active");
  const [currentPage, setCurrentPage] = useState(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  }, []);

  const handleEndPoll = useCallback(
    (poll: PollItem) => {
      setPolls((prev) =>
        prev.map((p) =>
          p.id === poll.id ? { ...p, status: "Completed" as PollStatus } : p
        )
      );
      showToast(`Poll "${poll.question.slice(0, 30)}..." has been ended.`);
    },
    [showToast]
  );

  const filteredPolls = useMemo(() => {
    return polls.filter((p) => p.status === activeTab);
  }, [polls, activeTab]);

  const totalItems = filteredPolls.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const paginatedPolls = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredPolls.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredPolls, currentPage]);

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
      <PollTabs
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setCurrentPage(1);
        }}
      />

      {/* 2. Table */}
      <PollsTable
        polls={paginatedPolls}
        onEndPoll={handleEndPoll}
      />

      {/* 3. Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={setCurrentPage}
        entityName="polls"
      />
    </div>
  );
}
