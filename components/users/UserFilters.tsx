import React, { memo } from "react";
import { Search } from "lucide-react";
import { UserTabFilter, AccountStatus, VerificationStatus } from "@/types/user";
import { cn } from "@/lib/utils";

interface UserFiltersProps {
  activeTab: UserTabFilter;
  onTabChange: (tab: UserTabFilter) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  accountStatusFilter: string;
  onAccountStatusChange: (status: string) => void;
  verificationFilter: string;
  onVerificationChange: (status: string) => void;
  className?: string;
}

const tabs: readonly UserTabFilter[] = [
  "All Users",
  "Active Users",
  "Future Users",
] as const;

export const UserFilters = memo(function UserFilters({
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
  accountStatusFilter,
  onAccountStatusChange,
  verificationFilter,
  onVerificationChange,
  className,
}: UserFiltersProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {/* 1. Tab Bar */}
      <div className="bg-[#121316] border border-[#1E2026] rounded-xl p-1.5 flex gap-2 w-fit">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => onTabChange(tab)}
              className={cn(
                "px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer select-none",
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

      {/* 2. Search & Select Filters */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search Input */}
        <div className="relative w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search users..."
            className="w-full bg-[#121316] border border-[#1E2026] text-gray-200 placeholder-gray-500 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-[#FFC800] focus:ring-1 focus:ring-[#FFC800] transition-colors"
          />
        </div>

        {/* Account Status Filter */}
        <div className="relative">
          <select
            value={accountStatusFilter}
            onChange={(e) => onAccountStatusChange(e.target.value)}
            className="appearance-none bg-[#121316] border border-[#1E2026] text-gray-300 rounded-lg pl-3.5 pr-8 py-2 text-xs focus:outline-none focus:border-[#FFC800] cursor-pointer"
          >
            <option value="All">Account Status</option>
            <option value="Active">Active</option>
            <option value="Suspended">Suspended</option>
          </select>
          <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 text-[10px]">
            ▼
          </span>
        </div>

        {/* Verification Status Filter */}
        <div className="relative">
          <select
            value={verificationFilter}
            onChange={(e) => onVerificationChange(e.target.value)}
            className="appearance-none bg-[#121316] border border-[#1E2026] text-gray-300 rounded-lg pl-3.5 pr-8 py-2 text-xs focus:outline-none focus:border-[#FFC800] cursor-pointer"
          >
            <option value="All">Verification Status</option>
            <option value="Verified">Verified</option>
            <option value="Pending">Pending</option>
            <option value="Unverified">Unverified</option>
          </select>
          <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 text-[10px]">
            ▼
          </span>
        </div>
      </div>
    </div>
  );
});

export default UserFilters;
