"use client";

import React, { useState, useMemo } from "react";
import { SubmissionTabs } from "@/components/submissions/SubmissionTabs";
import { PioneerSubmissionsTable } from "@/components/submissions/PioneerSubmissionsTable";
import { ProductSubmissionsTable } from "@/components/submissions/ProductSubmissionsTable";
import { Pagination } from "@/components/ui/Pagination";
import {
  MOCK_PIONEER_SUBMISSIONS,
  MOCK_PRODUCT_SUBMISSIONS,
} from "@/constants/submissionsData";
import { SubmissionTab } from "@/types/submission";

const ITEMS_PER_PAGE = 5;

export default function SubmissionsPage() {
  const [activeTab, setActiveTab] = useState<SubmissionTab>("Missing Pioneers");
  const [currentPage, setCurrentPage] = useState(1);

  const pioneerPendingCount = useMemo(() => {
    return MOCK_PIONEER_SUBMISSIONS.filter((p) => p.status === "Pending").length;
  }, []);

  const productPendingCount = useMemo(() => {
    return MOCK_PRODUCT_SUBMISSIONS.filter((p) => p.status === "Pending").length;
  }, []);

  // Pagination for currently active tab
  const totalItems =
    activeTab === "Missing Pioneers"
      ? MOCK_PIONEER_SUBMISSIONS.length
      : MOCK_PRODUCT_SUBMISSIONS.length;

  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));

  const paginatedPioneers = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return MOCK_PIONEER_SUBMISSIONS.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage]);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return MOCK_PRODUCT_SUBMISSIONS.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage]);

  return (
    <div className="w-full space-y-4">
      {/* 1. Tabs */}
      <SubmissionTabs
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setCurrentPage(1);
        }}
        pioneerPendingCount={pioneerPendingCount}
        productPendingCount={productPendingCount}
      />

      {/* 2. Tables */}
      {activeTab === "Missing Pioneers" ? (
        <PioneerSubmissionsTable submissions={paginatedPioneers} />
      ) : (
        <ProductSubmissionsTable submissions={paginatedProducts} />
      )}

      {/* 3. Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={setCurrentPage}
        entityName={activeTab === "Missing Pioneers" ? "pioneer submissions" : "product submissions"}
      />
    </div>
  );
}
