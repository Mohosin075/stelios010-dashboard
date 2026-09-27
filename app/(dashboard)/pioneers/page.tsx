"use client";

import React, { useState, useMemo, useCallback } from "react";
import { PioneerFilters } from "@/components/pioneers/PioneerFilters";
import { PioneerTable } from "@/components/pioneers/PioneerTable";
import { ManagePioneerModal } from "@/components/pioneers/ManagePioneerModal";
import { Pagination } from "@/components/ui/Pagination";
import { MOCK_PIONEERS_DATA } from "@/constants/pioneersData";
import { PioneerItem, ClaimedStatus, SubscriptionStatus, PioneerVerificationStatus } from "@/types/pioneer";

const ITEMS_PER_PAGE = 5;

export default function PioneersPage() {
  const [pioneers, setPioneers] = useState<PioneerItem[]>(MOCK_PIONEERS_DATA);
  const [searchQuery, setSearchQuery] = useState("");
  const [claimedFilter, setClaimedFilter] = useState("ALL");
  const [subscriptionFilter, setSubscriptionFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);

  // Manage modal state
  const [selectedPioneer, setSelectedPioneer] = useState<PioneerItem | null>(null);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  }, []);

  // Filtered pioneers list
  const filteredList = useMemo(() => {
    return pioneers.filter((item) => {
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesWebsite = item.website.toLowerCase().includes(query);
        const matchesLocation = item.location.toLowerCase().includes(query);
        if (!matchesName && !matchesWebsite && !matchesLocation) return false;
      }

      // Claimed status filter
      if (claimedFilter !== "ALL" && item.claimedStatus !== claimedFilter) {
        return false;
      }

      // Subscription filter
      if (subscriptionFilter !== "ALL" && item.subscriptionStatus !== subscriptionFilter) {
        return false;
      }

      return true;
    });
  }, [pioneers, searchQuery, claimedFilter, subscriptionFilter]);

  // Pagination calculations
  const totalItems = filteredList.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const paginatedList = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredList.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredList, currentPage]);

  const handleOpenManage = useCallback((pioneer: PioneerItem) => {
    setSelectedPioneer(pioneer);
    setIsManageModalOpen(true);
  }, []);

  const handleSavePioneer = useCallback(
    (updated: {
      id: string;
      claimedStatus: ClaimedStatus;
      subscriptionStatus: SubscriptionStatus;
      verificationStatus: PioneerVerificationStatus;
    }) => {
      setPioneers((prev) =>
        prev.map((item) =>
          item.id === updated.id
            ? {
                ...item,
                claimedStatus: updated.claimedStatus,
                subscriptionStatus: updated.subscriptionStatus,
                verificationStatus: updated.verificationStatus,
              }
            : item
        )
      );
      showToast(`Pioneer settings updated successfully.`);
    },
    [showToast]
  );

  return (
    <div className="w-full space-y-4">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#161820] border border-[#2B2E3C] text-white text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <span className="w-2 h-2 rounded-full bg-[#10B981]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Filters Row */}
      <PioneerFilters
        searchQuery={searchQuery}
        onSearchChange={(val) => {
          setSearchQuery(val);
          setCurrentPage(1);
        }}
        claimedStatus={claimedFilter}
        onClaimedStatusChange={(val) => {
          setClaimedFilter(val);
          setCurrentPage(1);
        }}
        subscriptionStatus={subscriptionFilter}
        onSubscriptionStatusChange={(val) => {
          setSubscriptionFilter(val);
          setCurrentPage(1);
        }}
      />

      {/* 2. Pioneer Table */}
      <PioneerTable
        pioneers={paginatedList}
        onManagePioneer={handleOpenManage}
      />

      {/* 3. Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={setCurrentPage}
        entityName="pioneers"
      />

      {/* 4. Manage Modal */}
      <ManagePioneerModal
        isOpen={isManageModalOpen}
        pioneer={selectedPioneer}
        onClose={() => setIsManageModalOpen(false)}
        onSave={handleSavePioneer}
      />
    </div>
  );
}
