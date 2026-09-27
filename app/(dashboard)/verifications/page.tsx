"use client";

import React, { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { Pagination } from "@/components/ui/Pagination";
import { MOCK_VERIFICATIONS_DATA } from "@/constants/verificationsData";
import { VerificationTab, VerificationItem } from "@/types/verification";
import { cn } from "@/lib/utils";

const ITEMS_PER_PAGE = 5;

export default function VerificationsPage() {
  const [activeTab, setActiveTab] = useState<VerificationTab>("Pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Counts for each tab
  const counts = useMemo(() => {
    return {
      Pending: MOCK_VERIFICATIONS_DATA.filter((v) => v.status === "Pending").length,
      Approved: MOCK_VERIFICATIONS_DATA.filter((v) => v.status === "Approved").length,
      Unsuccessful: MOCK_VERIFICATIONS_DATA.filter((v) => v.status === "Unsuccessful").length,
    };
  }, []);

  // Filtered verifications
  const filteredList = useMemo(() => {
    return MOCK_VERIFICATIONS_DATA.filter((item) => {
      if (item.status !== activeTab) return false;

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesUser = item.userName.toLowerCase().includes(query);
        const matchesProduct = item.productName.toLowerCase().includes(query);
        const matchesBrand = item.brand.toLowerCase().includes(query);
        if (!matchesUser && !matchesProduct && !matchesBrand) return false;
      }

      return true;
    });
  }, [activeTab, searchQuery]);

  // Pagination calculations
  const totalItems = filteredList.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const paginatedList = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredList.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredList, currentPage]);

  const handleTabChange = useCallback((tab: VerificationTab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  }, []);

  return (
    <div className="w-full space-y-4">
      {/* 1. Tabs */}
      <div className="tab-depth rounded-xl p-1.5 flex gap-1.5 w-fit">
        {(["Pending", "Approved", "Unsuccessful"] as const).map((tab) => {
          const isActive = activeTab === tab;
          const count = counts[tab];

          return (
            <button
              key={tab}
              type="button"
              onClick={() => handleTabChange(tab)}
              className={cn(
                "flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer select-none active:scale-95",
                isActive
                  ? "bg-[#FFC800] text-black shadow-[0_2px_10px_rgba(255,200,0,0.3)] font-bold"
                  : "text-gray-400 hover:text-white hover:bg-white/[0.04]"
              )}
            >
              <span>{tab}</span>
              <span
                className={cn(
                  "px-1.5 py-0.2 rounded-full text-[10px] font-bold",
                  isActive
                    ? "bg-black/20 text-black"
                    : "bg-white/10 text-gray-400"
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 2. Search Box */}
      <div className="w-64">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          placeholder="Search by user or product..."
          className="w-full input-depth text-gray-200 placeholder-gray-500 rounded-lg px-3.5 py-2 text-xs focus:outline-none"
        />
      </div>

      {/* 3. Verifications Table */}
      <div className="table-depth">
        <table className="w-full text-left text-xs whitespace-nowrap">
          <thead>
            <tr className="border-b border-white/[0.06] bg-white/[0.02] text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
              <th className="py-3.5 px-5">USER</th>
              <th className="py-3.5 px-4">BIONIC PRODUCT</th>
              <th className="py-3.5 px-4">LIMB</th>
              <th className="py-3.5 px-4">SUBMISSION DATE</th>
              <th className="py-3.5 px-4">STATUS</th>
              <th className="py-3.5 px-5 text-left">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {paginatedList.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-gray-500">
                  No verifications found in this category.
                </td>
              </tr>
            ) : (
              paginatedList.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-white/[0.015] transition-colors"
                >
                  {/* User Column */}
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 select-none",
                          item.isYellowAvatar
                            ? "bg-[#252110] text-[#FFC800] border border-[#FFC800]/30"
                            : "bg-[#1E2026] text-gray-300 border border-gray-700/50"
                        )}
                      >
                        {item.userInitials}
                      </div>
                      <div>
                        <p className="font-semibold text-white tracking-tight text-xs sm:text-sm">
                          {item.userName}
                        </p>
                        <p className="text-[11px] text-gray-500">
                          {item.userLocation}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Bionic Product */}
                  <td className="py-3.5 px-4">
                    <p className="font-semibold text-white tracking-tight">
                      {item.productName}
                    </p>
                    <p className="text-[11px] text-gray-500">{item.brand}</p>
                  </td>

                  {/* Limb */}
                  <td className="py-3.5 px-4 text-gray-300">{item.limb}</td>

                  {/* Submission Date */}
                  <td className="py-3.5 px-4 text-gray-400">
                    {item.submissionDate}
                  </td>

                  {/* Status Badge */}
                  <td className="py-3.5 px-4">
                    {item.status === "Pending" && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-[#28220F] text-[#FACC15] border border-[#FACC15]/20">
                        Pending
                      </span>
                    )}
                    {item.status === "Approved" && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-[#0D261E] text-[#10B981] border border-[#10B981]/20">
                        Approved
                      </span>
                    )}
                    {item.status === "Unsuccessful" && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-[#2D1619] text-[#F87171] border border-[#F87171]/20">
                        Unsuccessful
                      </span>
                    )}
                  </td>

                  {/* Action Link */}
                  <td className="py-3.5 px-5">
                    <Link
                      href={`/verifications/${item.id}`}
                      className="bg-white/[0.05] border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.09] text-gray-200 hover:text-white rounded-lg px-3 py-1 text-xs font-medium transition-all inline-block cursor-pointer active:scale-95"
                    >
                      Review
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 4. Reusable Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={setCurrentPage}
        entityName="verifications"
      />
    </div>
  );
}
