"use client";

import React, { useState, useMemo, useCallback } from "react";
import { UserTable } from "@/components/users/UserTable";
import { UserFilters } from "@/components/users/UserFilters";
import { Pagination } from "@/components/ui/Pagination";
import { MOCK_USERS_DATA } from "@/constants/usersData";
import { UserTabFilter, UserItem } from "@/types/user";

const ITEMS_PER_PAGE = 6;

export default function UsersPage() {
  const [activeTab, setActiveTab] = useState<UserTabFilter>("All Users");
  const [searchQuery, setSearchQuery] = useState("");
  const [accountStatusFilter, setAccountStatusFilter] = useState("All");
  const [verificationFilter, setVerificationFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter users based on tabs and dropdown filters
  const filteredUsers = useMemo(() => {
    return MOCK_USERS_DATA.filter((user) => {
      // Tab filter
      if (activeTab === "Active Users" && user.profileType !== "Active User") {
        return false;
      }
      if (activeTab === "Future Users" && user.profileType !== "Future User") {
        return false;
      }

      // Search query filter (name or email or location)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = user.name.toLowerCase().includes(query);
        const matchesEmail = user.email.toLowerCase().includes(query);
        const matchesLocation = user.location.toLowerCase().includes(query);
        if (!matchesName && !matchesEmail && !matchesLocation) return false;
      }

      // Account Status filter
      if (accountStatusFilter !== "All" && user.accountStatus !== accountStatusFilter) {
        return false;
      }

      // Verification Status filter
      if (verificationFilter !== "All" && user.verificationStatus !== verificationFilter) {
        return false;
      }

      return true;
    });
  }, [activeTab, searchQuery, accountStatusFilter, verificationFilter]);

  // Pagination calculation
  const totalItems = filteredUsers.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));

  // Current page users slice
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredUsers.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredUsers, currentPage]);

  const handleTabChange = useCallback((tab: UserTabFilter) => {
    setActiveTab(tab);
    setCurrentPage(1);
  }, []);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, []);

  const handleAccountStatusChange = useCallback((status: string) => {
    setAccountStatusFilter(status);
    setCurrentPage(1);
  }, []);

  const handleVerificationChange = useCallback((status: string) => {
    setVerificationFilter(status);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return (
    <div className="w-full space-y-4">
      {/* 1. Header Filters (Tabs + Search + Selects) */}
      <UserFilters
        activeTab={activeTab}
        onTabChange={handleTabChange}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        accountStatusFilter={accountStatusFilter}
        onAccountStatusChange={handleAccountStatusChange}
        verificationFilter={verificationFilter}
        onVerificationChange={handleVerificationChange}
      />

      {/* 2. User Data Table */}
      <UserTable users={paginatedUsers} />

      {/* 3. Reusable Pagination Component */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={handlePageChange}
        entityName="users"
      />
    </div>
  );
}
