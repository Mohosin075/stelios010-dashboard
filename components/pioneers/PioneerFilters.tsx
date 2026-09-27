"use client";

import React, { memo } from "react";
import { Search, ChevronDown } from "lucide-react";
import { ClaimedStatus, SubscriptionStatus } from "@/types/pioneer";

interface PioneerFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  claimedStatus: string;
  onClaimedStatusChange: (status: string) => void;
  subscriptionStatus: string;
  onSubscriptionStatusChange: (status: string) => void;
}

export const PioneerFilters = memo(function PioneerFilters({
  searchQuery,
  onSearchChange,
  claimedStatus,
  onClaimedStatusChange,
  subscriptionStatus,
  onSubscriptionStatusChange,
}: PioneerFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 w-full">
      {/* Search Input */}
      <div className="relative w-full sm:w-64">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search pioneers..."
          className="w-full bg-[#121316] border border-[#1E2026] text-gray-200 placeholder-gray-500 rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-[#FFC800] focus:ring-1 focus:ring-[#FFC800] transition-colors"
        />
      </div>

      {/* Claimed Status Dropdown */}
      <div className="relative">
        <select
          value={claimedStatus}
          onChange={(e) => onClaimedStatusChange(e.target.value)}
          className="appearance-none bg-[#121316] border border-[#1E2026] text-gray-300 rounded-lg pl-3.5 pr-8 py-2.5 text-xs focus:outline-none focus:border-[#FFC800] cursor-pointer hover:border-gray-600 transition-colors"
        >
          <option value="ALL">Claimed Status</option>
          <option value="Claimed">Claimed</option>
          <option value="Unclaimed">Unclaimed</option>
        </select>
        <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>

      {/* Subscription Dropdown */}
      <div className="relative">
        <select
          value={subscriptionStatus}
          onChange={(e) => onSubscriptionStatusChange(e.target.value)}
          className="appearance-none bg-[#121316] border border-[#1E2026] text-gray-300 rounded-lg pl-3.5 pr-8 py-2.5 text-xs focus:outline-none focus:border-[#FFC800] cursor-pointer hover:border-gray-600 transition-colors"
        >
          <option value="ALL">Subscription</option>
          <option value="Active">Active</option>
          <option value="None">None</option>
        </select>
        <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
    </div>
  );
});

export default PioneerFilters;
