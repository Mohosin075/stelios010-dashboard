import React, { memo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  entityName?: string;
  className?: string;
}

export const Pagination = memo(function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  entityName = "items",
  className,
}: PaginationProps) {
  if (totalItems === 0) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage, "...", totalPages);
      }
    }
    return pages;
  };

  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 bg-gradient-to-b from-[#14161C]/90 to-[#0F1014]/90 border border-white/[0.07] shadow-sm rounded-xl text-xs text-gray-400 select-none",
        className
      )}
    >
      {/* Items count summary */}
      <div className="font-normal text-gray-400">
        Showing <span className="font-semibold text-gray-200">{startItem}</span> to{" "}
        <span className="font-semibold text-gray-200">{endItem}</span> of{" "}
        <span className="font-semibold text-gray-200">{totalItems}</span> {entityName}
      </div>

      {/* Pagination navigation controls */}
      <div className="flex items-center gap-1.5">
        {/* Previous Button */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-white/[0.08] bg-[#15171D] text-gray-300 hover:text-white hover:bg-white/[0.06] hover:border-white/20 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer active:scale-95"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Prev</span>
        </button>

        {/* Page numbers */}
        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, idx) => {
            if (page === "...") {
              return (
                <span
                  key={`ellipsis-${idx}`}
                  className="px-2 py-1 text-gray-600 text-xs"
                >
                  …
                </span>
              );
            }

            const pageNum = Number(page);
            const isActive = pageNum === currentPage;

            return (
              <button
                key={pageNum}
                type="button"
                onClick={() => onPageChange(pageNum)}
                className={cn(
                  "min-w-7 h-7 flex items-center justify-center rounded-lg text-xs font-semibold transition-all cursor-pointer",
                  isActive
                    ? "bg-[#FFC800] text-black shadow-[0_0_12px_rgba(255,200,0,0.3)] font-bold scale-105"
                    : "bg-[#15171D] text-gray-400 border border-white/[0.07] hover:text-white hover:bg-white/[0.06] hover:border-white/20 active:scale-95"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-white/[0.08] bg-[#15171D] text-gray-300 hover:text-white hover:bg-white/[0.06] hover:border-white/20 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer active:scale-95"
          aria-label="Next page"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
});

export default Pagination;
