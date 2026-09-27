"use client";

import React, { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import {
  MOCK_PIONEER_SUBMISSIONS,
  MOCK_PRODUCT_SUBMISSIONS,
} from "@/constants/submissionsData";
import { SubmissionStatus } from "@/types/submission";

export default function ReviewSubmissionPage() {
  const params = useParams();
  const id = params?.id as string;

  // Find either product submission or pioneer submission
  const productSub = MOCK_PRODUCT_SUBMISSIONS.find((p) => p.id === id);
  const pioneerSub = MOCK_PIONEER_SUBMISSIONS.find((p) => p.id === id);

  // Default fallback if not found
  const isProduct = Boolean(productSub) || !pioneerSub;
  const item = productSub || pioneerSub || MOCK_PRODUCT_SUBMISSIONS[1]; // fallback to i-Limb Quantum

  const [status, setStatus] = useState<SubmissionStatus>(item.status);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  }, []);

  const handleApprove = () => {
    setStatus("Approved");
    showToast("Submission has been approved successfully.");
  };

  const handleReject = () => {
    setStatus("Rejected");
    showToast("Submission has been marked as rejected.");
  };

  const title = isProduct
    ? "Review Product Submission"
    : "Review Pioneer Submission";

  const productName = "productName" in item ? (item.productName as string) : "";
  const pioneerName = "pioneerName" in item ? (item.pioneerName as string) : "";

  return (
    <div className="w-full space-y-4">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#161820] border border-[#2B2E3C] text-white text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <span className="w-2 h-2 rounded-full bg-[#10B981]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Back Link */}
      <div>
        <Link
          href="/submissions"
          className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Submissions</span>
        </Link>
      </div>

      <div className="max-w-xl space-y-4">
        {/* Card 1: Top Header Info */}
        <div className="bg-[#121316] border border-[#1E2026] rounded-xl p-5 md:p-6 space-y-1">
          <h1 className="text-base font-semibold text-white tracking-tight">
            {title}
          </h1>
          <p className="text-xs text-gray-400">
            Submitted by {item.submittedBy} on {item.date}
          </p>
        </div>

        {/* Card 2: Submission Details */}
        <div className="bg-[#121316] border border-[#1E2026] rounded-xl p-5 md:p-6 space-y-5">
          <h2 className="text-sm font-semibold text-white tracking-wide">
            Submission Details
          </h2>

          <div className="space-y-4">
            {/* If product, show Product Name box */}
            {isProduct && (
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">
                  Product Name
                </label>
                <div className="w-full bg-[#161820] border border-[#232630] text-gray-200 rounded-lg px-3.5 py-2.5 text-xs select-text">
                  {productName}
                </div>
              </div>
            )}

            {/* If pioneer only, show Pioneer Name box */}
            {!isProduct && (
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">
                  Pioneer Name
                </label>
                <div className="w-full bg-[#161820] border border-[#232630] text-gray-200 rounded-lg px-3.5 py-2.5 text-xs select-text">
                  {pioneerName}
                </div>
              </div>
            )}

            {/* If product, show Pioneer Name as label + text */}
            {isProduct && (
              <div>
                <p className="text-xs font-medium text-gray-400">Pioneer Name</p>
                <p className="text-xs text-gray-200 mt-1">{pioneerName}</p>
              </div>
            )}

            {/* Website */}
            <div>
              <p className="text-xs font-medium text-gray-400">Website</p>
              <a
                href={`https://${item.website}`}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-[#3B82F6] hover:underline inline-block mt-1"
              >
                {item.website}
              </a>
            </div>

            {/* Submitted By */}
            <div>
              <p className="text-xs font-medium text-gray-400">Submitted By</p>
              <p className="text-xs text-gray-200 mt-1">
                {item.submittedBy} · {item.date}
              </p>
            </div>
          </div>

          {/* Action buttons if status is Pending or allow toggling */}
          {status === "Pending" && (
            <div className="flex items-center gap-3 pt-3 border-t border-[#1E2026]">
              <button
                type="button"
                onClick={handleApprove}
                className="px-4 py-2 text-xs font-semibold text-black bg-[#10B981] hover:bg-[#059669] rounded-lg transition-colors cursor-pointer"
              >
                Approve Submission
              </button>
              <button
                type="button"
                onClick={handleReject}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#EF4444] hover:bg-[#DC2626] rounded-lg transition-colors cursor-pointer"
              >
                Reject Submission
              </button>
            </div>
          )}

          {status !== "Pending" && (
            <div className="pt-2 flex items-center gap-2">
              <span className="text-xs text-gray-400">Current Status:</span>
              {status === "Approved" ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#0D261E] text-[#10B981] border border-[#10B981]/20">
                  Approved
                </span>
              ) : (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#2D1619] text-[#F87171] border border-[#F87171]/20">
                  Rejected
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
