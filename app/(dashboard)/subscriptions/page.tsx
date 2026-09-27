"use client";

import React, { useState, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import { SubscriptionStatsCards } from "@/components/subscriptions/SubscriptionStatsCards";
import { SubscriptionPlanBanners } from "@/components/subscriptions/SubscriptionPlanBanners";
import { SubscriptionTable } from "@/components/subscriptions/SubscriptionTable";
import { Pagination } from "@/components/ui/Pagination";
import {
  MOCK_SUBSCRIPTIONS_DATA,
  SUBSCRIPTION_STATS,
} from "@/constants/subscriptionsData";
import { SubscriptionRow } from "@/types/subscription";

const ITEMS_PER_PAGE = 5;

export default function SubscriptionsPage() {
  const [subscriptions] = useState<SubscriptionRow[]>(MOCK_SUBSCRIPTIONS_DATA);
  const [planFilter, setPlanFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter subscriptions
  const filteredList = useMemo(() => {
    return subscriptions.filter((item) => {
      if (planFilter !== "ALL" && item.plan !== planFilter) {
        return false;
      }
      if (statusFilter !== "ALL" && item.status !== statusFilter) {
        return false;
      }
      return true;
    });
  }, [subscriptions, planFilter, statusFilter]);

  // Pagination
  const totalItems = filteredList.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const paginatedList = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredList.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredList, currentPage]);

  return (
    <div className="w-full space-y-5">
      {/* 1. Top 5 Stats Cards */}
      <SubscriptionStatsCards stats={SUBSCRIPTION_STATS} />

      {/* 2. Middle 2 Plan Banners */}
      <SubscriptionPlanBanners />

      {/* 3. Filters Row */}
      <div className="flex items-center gap-3">
        {/* Plan Type Dropdown */}
        <div className="relative">
          <select
            value={planFilter}
            onChange={(e) => {
              setPlanFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="appearance-none bg-[#121316] border border-[#1E2026] text-gray-300 rounded-lg pl-3.5 pr-8 py-2.5 text-xs focus:outline-none focus:border-[#FFC800] cursor-pointer hover:border-gray-600 transition-colors"
          >
            <option value="ALL">Plan Type</option>
            <option value="Monthly">Monthly</option>
            <option value="Annual">Annual</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Status Dropdown */}
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="appearance-none bg-[#121316] border border-[#1E2026] text-gray-300 rounded-lg pl-3.5 pr-8 py-2.5 text-xs focus:outline-none focus:border-[#FFC800] cursor-pointer hover:border-gray-600 transition-colors"
          >
            <option value="ALL">Status</option>
            <option value="Active">Active</option>
            <option value="Expired">Expired</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* 4. Table */}
      <SubscriptionTable subscriptions={paginatedList} />

      {/* 5. Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={setCurrentPage}
        entityName="subscriptions"
      />
    </div>
  );
}
