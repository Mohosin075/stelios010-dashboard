"use client";

import React, { memo } from "react";
import Link from "next/link";
import { ProductSubmissionItem } from "@/types/submission";

interface ProductSubmissionsTableProps {
  submissions: ProductSubmissionItem[];
  className?: string;
}

export const ProductSubmissionsTable = memo(function ProductSubmissionsTable({
  submissions,
  className,
}: ProductSubmissionsTableProps) {
  return (
    <div className="bg-[#121316] border border-[#1E2026] rounded-xl overflow-x-auto">
      <table className="w-full text-left text-xs whitespace-nowrap">
        <thead>
          <tr className="border-b border-[#1E2026] text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
            <th className="py-3.5 px-5">PRODUCT NAME</th>
            <th className="py-3.5 px-4">PIONEER NAME</th>
            <th className="py-3.5 px-4">WEBSITE</th>
            <th className="py-3.5 px-4">SUBMITTED BY</th>
            <th className="py-3.5 px-4">DATE</th>
            <th className="py-3.5 px-4">STATUS</th>
            <th className="py-3.5 px-5 text-left">REVIEW</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#1A1C22]">
          {submissions.length === 0 ? (
            <tr>
              <td colSpan={7} className="py-8 text-center text-gray-500">
                No product submissions found.
              </td>
            </tr>
          ) : (
            submissions.map((sub) => (
              <tr
                key={sub.id}
                className="hover:bg-white/[0.015] transition-colors"
              >
                {/* Product Name */}
                <td className="py-3.5 px-5 font-medium text-white">
                  {sub.productName}
                </td>

                {/* Pioneer Name */}
                <td className="py-3.5 px-4 text-gray-300">{sub.pioneerName}</td>

                {/* Website (Blue link text) */}
                <td className="py-3.5 px-4">
                  <span className="text-[#3B82F6] hover:underline cursor-pointer">
                    {sub.website}
                  </span>
                </td>

                {/* Submitted By */}
                <td className="py-3.5 px-4 text-gray-300">{sub.submittedBy}</td>

                {/* Date */}
                <td className="py-3.5 px-4 text-gray-400">{sub.date}</td>

                {/* Status */}
                <td className="py-3.5 px-4">
                  {sub.status === "Pending" && (
                    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-medium bg-[#28220F] text-[#FACC15] border border-[#FACC15]/20">
                      Pending
                    </span>
                  )}
                  {sub.status === "Approved" && (
                    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-medium bg-[#0D261E] text-[#10B981] border border-[#10B981]/20">
                      Approved
                    </span>
                  )}
                  {sub.status === "Rejected" && (
                    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-medium bg-[#2D1619] text-[#F87171] border border-[#F87171]/20">
                      Rejected
                    </span>
                  )}
                </td>

                {/* Review */}
                <td className="py-3.5 px-5">
                  {sub.status !== "Pending" ? (
                    <Link
                      href={`/submissions/${sub.id}`}
                      className="bg-[#161820] border border-[#272A36] hover:border-gray-500 text-white rounded-lg px-3.5 py-1 text-xs font-medium transition-all hover:bg-[#1E212B] inline-block cursor-pointer"
                    >
                      View
                    </Link>
                  ) : null}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
});

export default ProductSubmissionsTable;
