"use client";

import React, { useState, useMemo, useCallback } from "react";
import { Pagination } from "@/components/ui/Pagination";
import { MOCK_REPORTS_DATA } from "@/constants/reportsData";
import { ReportItem, ReportStatus } from "@/types/report";
import { cn } from "@/lib/utils";

const ITEMS_PER_PAGE = 5;

export default function ReportsPage() {
  const [reports, setReports] = useState<ReportItem[]>(MOCK_REPORTS_DATA);
  const [activeTab, setActiveTab] = useState<ReportStatus>("Open");
  const [currentPage, setCurrentPage] = useState(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  }, []);

  const openCount = useMemo(() => {
    return reports.filter((r) => r.status === "Open").length;
  }, [reports]);

  const resolvedCount = useMemo(() => {
    return reports.filter((r) => r.status === "Resolved").length;
  }, [reports]);

  const handleResolve = useCallback((id: string) => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "Resolved" as ReportStatus } : r))
    );
    showToast("Report marked as resolved.");
  }, [showToast]);

  const filteredReports = useMemo(() => {
    return reports.filter((r) => r.status === activeTab);
  }, [reports, activeTab]);

  const totalItems = filteredReports.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const paginatedReports = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredReports.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredReports, currentPage]);

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
        <button
          type="button"
          onClick={() => {
            setActiveTab("Open");
            setCurrentPage(1);
          }}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer select-none",
            activeTab === "Open"
              ? "bg-[#FFC800] text-black shadow-xs font-bold"
              : "text-gray-400 hover:text-white"
          )}
        >
          <span>Open</span>
          <span
            className={cn(
              "w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold",
              activeTab === "Open" ? "bg-black/20 text-black" : "bg-white/10 text-gray-400"
            )}
          >
            {openCount}
          </span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab("Resolved");
            setCurrentPage(1);
          }}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer select-none",
            activeTab === "Resolved"
              ? "bg-[#FFC800] text-black shadow-xs font-bold"
              : "text-gray-400 hover:text-white"
          )}
        >
          <span>Resolved</span>
          <span
            className={cn(
              "w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold",
              activeTab === "Resolved" ? "bg-black/20 text-black" : "bg-white/10 text-gray-400"
            )}
          >
            {resolvedCount}
          </span>
        </button>
      </div>

      {/* 2. Table */}
      <div className="bg-[#121316] border border-[#1E2026] rounded-xl overflow-x-auto">
        <table className="w-full text-left text-xs whitespace-nowrap">
          <thead>
            <tr className="border-b border-[#1E2026] text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
              <th className="py-3.5 px-5">REPORTED ITEM</th>
              <th className="py-3.5 px-4">TYPE</th>
              <th className="py-3.5 px-4">REPORTED BY</th>
              <th className="py-3.5 px-4">REASON</th>
              <th className="py-3.5 px-4">DATE</th>
              <th className="py-3.5 px-4">STATUS</th>
              <th className="py-3.5 px-5 text-left">REVIEW</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1A1C22]">
            {paginatedReports.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-gray-500">
                  No {activeTab.toLowerCase()} reports found.
                </td>
              </tr>
            ) : (
              paginatedReports.map((report) => (
                <tr
                  key={report.id}
                  className="hover:bg-white/[0.015] transition-colors"
                >
                  {/* Reported Item */}
                  <td className="py-3.5 px-5 font-semibold text-white">
                    {report.reportedItem}
                  </td>

                  {/* Type Badge */}
                  <td className="py-3.5 px-4">
                    {report.type === "Profile" ? (
                      <span className="inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-medium bg-[#252110] text-[#FFC800] border border-[#FFC800]/25">
                        Profile
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-medium bg-[#2D1619] text-[#F87171] border border-[#F87171]/20">
                        Support Discussion
                      </span>
                    )}
                  </td>

                  {/* Reported By */}
                  <td className="py-3.5 px-4 text-gray-300">
                    {report.reportedBy}
                  </td>

                  {/* Reason */}
                  <td className="py-3.5 px-4 text-gray-300">{report.reason}</td>

                  {/* Date */}
                  <td className="py-3.5 px-4 text-gray-400">{report.date}</td>

                  {/* Status */}
                  <td className="py-3.5 px-4">
                    {report.status === "Open" ? (
                      <span className="inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-medium bg-[#28220F] text-[#FACC15] border border-[#FACC15]/20">
                        Open
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-medium bg-[#0D261E] text-[#10B981] border border-[#10B981]/20">
                        Resolved
                      </span>
                    )}
                  </td>

                  {/* Review Action */}
                  <td className="py-3.5 px-5">
                    {report.status === "Open" ? (
                      <button
                        type="button"
                        onClick={() => handleResolve(report.id)}
                        className="bg-[#161820] border border-[#272A36] hover:border-gray-500 text-white rounded-lg px-3.5 py-1 text-xs font-medium transition-all hover:bg-[#1E212B] cursor-pointer"
                      >
                        Resolve
                      </button>
                    ) : (
                      <span className="text-gray-500 text-xs">—</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 3. Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={setCurrentPage}
        entityName="reports"
      />
    </div>
  );
}
