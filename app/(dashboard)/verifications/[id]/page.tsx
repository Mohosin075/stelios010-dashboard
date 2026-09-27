"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Play,
  CheckCircle2,
  XCircle,
  Gem,
  AlertCircle,
  Square,
} from "lucide-react";
import { MOCK_VERIFICATIONS_DATA } from "@/constants/verificationsData";
import { VerificationItem } from "@/types/verification";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function ReviewVerificationPage() {
  const params = useParams();
  const verifId = params?.id as string;

  // Find verification or default to Ryan Torres (verif-3 from Screenshot 2)
  const baseItem = useMemo(() => {
    return (
      MOCK_VERIFICATIONS_DATA.find((v) => v.id === verifId) ||
      MOCK_VERIFICATIONS_DATA[2] // Ryan Torres
    );
  }, [verifId]);

  const [item, setItem] = useState<VerificationItem>(baseItem);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const handleApprove = () => {
    setItem((prev) => ({
      ...prev,
      status: "Approved",
      unsuccessfulReason: undefined,
    }));
    toast.success(`Verification approved for ${item.userName}`);
  };

  const handleReject = (e: React.FormEvent) => {
    e.preventDefault();
    setItem((prev) => ({
      ...prev,
      status: "Unsuccessful",
      unsuccessfulReason: rejectReason || "Video did not clearly show the prescribed interaction.",
    }));
    setShowRejectModal(false);
    toast.error(`Verification marked unsuccessful for ${item.userName}`);
  };

  const productHistory = item.productHistory || [
    { name: "Hero Arm", status: "Verified" as const },
    { name: "Michelangelo Hand", status: "Unsuccessful" as const },
    { name: item.productName, status: "Unsuccessful" as const },
  ];

  return (
    <div className="w-full space-y-5">
      {/* Back Link */}
      <div>
        <Link
          href="/verifications"
          className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span>Back to Verifications</span>
        </Link>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column (5 cols on lg) */}
        <div className="lg:col-span-4 space-y-4">
          {/* 1. USER Card */}
          <div className="bg-[#121316] border border-[#1E2026] rounded-2xl p-5 space-y-3">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              USER
            </span>
            <div className="flex items-center gap-3 pt-1">
              <div
                className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 select-none",
                  item.isYellowAvatar
                    ? "bg-[#252110] text-[#FFC800] border border-[#FFC800]/30"
                    : "bg-[#1C1E26] text-gray-300 border border-gray-700/50"
                )}
              >
                {item.userInitials}
              </div>
              <div className="min-w-0">
                <p className="font-bold text-white tracking-tight text-sm">
                  {item.userName}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {item.userLocation}
                </p>
              </div>
            </div>
          </div>

          {/* 2. PRODUCT Card */}
          <div className="bg-[#121316] border border-[#1E2026] rounded-2xl p-5 space-y-3">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              PRODUCT
            </span>

            {/* Diamond box placeholder */}
            <div className="w-full h-32 bg-[#181A20] border border-[#232630] rounded-xl flex items-center justify-center">
              <div className="w-10 h-10 border-2 border-gray-600 rotate-45 rounded-sm" />
            </div>

            <div className="space-y-2 pt-1">
              <div>
                <p className="font-bold text-white text-sm">
                  {item.productName}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{item.brand}</p>
              </div>

              <div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-[#1A1C24] text-gray-300 border border-gray-700/50">
                  {item.limb}
                </span>
              </div>
            </div>
          </div>

          {/* 3. VERIFICATION STATUS Card */}
          <div className="bg-[#121316] border border-[#1E2026] rounded-2xl p-5 space-y-3">
            <div>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                VERIFICATION STATUS
              </span>
              <p className="text-xs text-gray-400 mt-0.5">Product 2 of 2</p>
            </div>

            <div className="space-y-2 pt-1">
              {productHistory.map((prod, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between py-2 text-xs border-b border-[#1A1C24] last:border-b-0"
                >
                  <span className="text-gray-300 font-medium">{prod.name}</span>
                  {prod.status === "Verified" && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-[#0D261E] text-[#10B981] border border-[#10B981]/30">
                      Verified
                    </span>
                  )}
                  {prod.status === "Pending" && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-[#28220F] text-[#FACC15] border border-[#FACC15]/30">
                      Pending
                    </span>
                  )}
                  {prod.status === "Unsuccessful" && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-[#2D1619] text-[#F87171] border border-[#F87171]/30">
                      Unsuccessful
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (8 cols on lg) */}
        <div className="lg:col-span-8 space-y-4">
          {/* 1. VIDEO VERIFICATION Container */}
          <div className="bg-[#121316] border border-[#1E2026] rounded-2xl p-6 space-y-4">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              VIDEO VERIFICATION
            </span>

            {/* Video Viewport Box */}
            <div
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-full h-80 sm:h-96 bg-[#16181F] border border-[#222530] rounded-2xl flex flex-col items-center justify-center relative cursor-pointer group overflow-hidden"
            >
              {/* Subtle background glow */}
              <div className="absolute inset-0 bg-radial from-amber-500/5 to-transparent opacity-60" />

              {/* Play button */}
              <div className="w-14 h-14 rounded-full border-2 border-[#FFC800] bg-black/60 text-[#FFC800] flex items-center justify-center transition-transform group-hover:scale-110 shadow-xl relative z-10">
                <Play className="w-6 h-6 ml-0.5 fill-[#FFC800]" />
              </div>

              <p className="text-sm font-semibold text-white mt-4 relative z-10">
                {isPlaying ? "Playing verification video…" : "10-second verification video"}
              </p>
              <p className="text-xs text-gray-500 mt-1 relative z-10">
                {isPlaying ? "Click to pause" : "Click to play"}
              </p>
            </div>
          </div>

          {/* 2. Status / Action Decision Box */}
          {item.status === "Unsuccessful" ? (
            <div className="border border-red-950/70 bg-red-950/15 rounded-2xl p-5 space-y-1.5">
              <h4 className="text-sm font-bold text-red-500">
                Marked Unsuccessful
              </h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                {item.unsuccessfulReason ||
                  "Video did not clearly show the prescribed interaction."}
              </p>
            </div>
          ) : item.status === "Approved" ? (
            <div className="border border-green-950/70 bg-green-950/15 rounded-2xl p-5 space-y-1.5">
              <h4 className="text-sm font-bold text-[#10B981]">
                Verification Approved
              </h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                User successfully completed the prescribed bionic interaction criteria.
              </p>
            </div>
          ) : (
            /* Pending decision action controls */
            <div className="bg-[#121316] border border-[#1E2026] rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-white">Review Decision</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Confirm if the video fulfills the bionic interaction protocol.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setShowRejectModal(true)}
                  className="px-4 py-2 text-xs font-semibold text-red-400 hover:text-red-300 border border-red-500/40 hover:bg-red-500/10 rounded-xl transition-colors cursor-pointer"
                >
                  Mark Unsuccessful
                </button>
                <button
                  type="button"
                  onClick={handleApprove}
                  className="px-4 py-2 text-xs font-semibold text-black bg-[#FFC800] hover:bg-[#F2BD00] rounded-xl transition-all shadow-sm cursor-pointer"
                >
                  Approve Verification
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-150">
          <div
            className="w-full max-w-md bg-[#131418] border border-[#20222B] rounded-2xl shadow-2xl p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-sm font-bold text-white">
              Mark Verification Unsuccessful
            </h3>
            <p className="text-xs text-gray-400">
              Please specify why this video verification did not pass:
            </p>
            <form onSubmit={handleReject} className="space-y-4">
              <textarea
                rows={3}
                required
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Video did not clearly show the prescribed interaction..."
                className="w-full bg-[#181A20] border border-[#262833] text-gray-200 placeholder-gray-500 rounded-xl p-3 text-xs focus:outline-none focus:border-red-500/60 focus:ring-1 focus:ring-red-500/50 transition-colors resize-none"
              />
              <div className="flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowRejectModal(false)}
                  className="px-4 py-2 text-xs font-medium text-gray-300 hover:text-white bg-[#1A1C24] rounded-lg border border-[#282B37]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-red-500 border border-red-500/40 bg-red-950/20 rounded-lg hover:bg-red-950/40"
                >
                  Confirm Reject
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
