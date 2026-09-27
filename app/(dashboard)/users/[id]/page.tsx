"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { MOCK_USERS_DATA } from "@/constants/usersData";
import { SuspendUserModal } from "@/components/users/SuspendUserModal";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function UserDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params?.id as string;

  // Find user or default to Marcus Chen (first user)
  const baseUser = useMemo(() => {
    return MOCK_USERS_DATA.find((u) => u.id === userId) || MOCK_USERS_DATA[0];
  }, [userId]);

  const [user, setUser] = useState(baseUser);
  const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false);

  const handleConfirmSuspend = (reason: string) => {
    setUser((prev) => ({
      ...prev,
      accountStatus: "Suspended",
    }));
    toast.error(`Account for ${user.name} suspended: "${reason}"`);
  };

  const handleReactivate = () => {
    setUser((prev) => ({
      ...prev,
      accountStatus: "Active",
    }));
    toast.success(`Account for ${user.name} has been reactivated`);
  };

  const products = user.bionicProducts || [];
  const indicators = user.masterIndicators || {
    originOfAmputation: "Traumatic",
    anatomicalBaseline: "Transradial",
  };

  return (
    <div className="w-full space-y-5">
      {/* Back Button */}
      <div>
        <Link
          href="/users"
          className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span>Back to Users</span>
        </Link>
      </div>

      {/* 1. Header Profile Card */}
      <div className="card-depth rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 overflow-hidden">
        <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg shrink-0 select-none",
              user.isYellowAvatar
                ? "bg-[#FFC800]/15 text-[#FFC800] border border-[#FFC800]/30 shadow-[0_0_12px_rgba(255,200,0,0.15)]"
                : "bg-[#1C1E26] text-gray-200 border border-white/[0.08]"
            )}
          >
            {user.initials}
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              {user.name}
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">{user.email}</p>
            <div className="flex flex-wrap items-center gap-2 mt-2.5">
              {/* Profile Type */}
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-[#0D261E] text-[#10B981] border border-[#10B981]/30">
                {user.profileType}
              </span>

              {/* Status */}
              <span
                className={cn(
                  "inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium",
                  user.accountStatus === "Active"
                    ? "bg-[#0D261E] text-[#10B981] border border-[#10B981]/30"
                    : "bg-red-950/40 text-[#EF4444] border border-red-800/40"
                )}
              >
                {user.accountStatus}
              </span>

              {/* Verification */}
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-[#0D261E] text-[#10B981] border border-[#10B981]/30">
                {user.verificationStatus}
              </span>

              {/* Joined */}
              <span className="text-xs text-gray-500 ml-1">
                Joined {user.joinedDate}
              </span>
            </div>
          </div>
        </div>

        {/* Suspend or Reactivate button */}
        <div>
          {user.accountStatus === "Active" ? (
            <button
              type="button"
              onClick={() => setIsSuspendModalOpen(true)}
              className="border border-red-500/30 text-red-400 hover:bg-red-500/10 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer active:scale-95"
            >
              Suspend Account
            </button>
          ) : (
            <button
              type="button"
              onClick={handleReactivate}
              className="border border-green-500/30 text-[#10B981] hover:bg-green-500/10 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer active:scale-95"
            >
              Reactivate Account
            </button>
          )}
        </div>
      </div>

      {/* 2. Main Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
        {/* Left Column: Personal Information */}
        <div className="card-depth rounded-2xl p-6 space-y-4 overflow-hidden">
          <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
          <h3 className="text-sm font-semibold text-white tracking-wide">
            Personal Information
          </h3>

          <div className="space-y-4 pt-1">
            <div>
              <span className="text-xs text-gray-500 font-medium">Full Name</span>
              <p className="text-sm font-medium text-gray-200 mt-0.5">
                {user.name}
              </p>
            </div>

            <div>
              <span className="text-xs text-gray-500 font-medium">Age</span>
              <p className="text-sm font-medium text-gray-200 mt-0.5">
                {user.age || 34}
              </p>
            </div>

            <div>
              <span className="text-xs text-gray-500 font-medium">Country</span>
              <p className="text-sm font-medium text-gray-200 mt-0.5">
                {user.country || "United States"}
              </p>
            </div>

            <div>
              <span className="text-xs text-gray-500 font-medium">Region</span>
              <p className="text-sm font-medium text-gray-200 mt-0.5">
                {user.region || "California"}
              </p>
            </div>

            <div>
              <span className="text-xs text-gray-500 font-medium">City</span>
              <p className="text-sm font-medium text-gray-200 mt-0.5">
                {user.city || "San Francisco"}
              </p>
            </div>

            <div>
              <span className="text-xs text-gray-500 font-medium">Bio</span>
              <p className="text-sm font-medium text-gray-200 mt-0.5 leading-relaxed">
                {user.bio || "Upper limb amputee. Passionate about bionic technology."}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Bionic Products & Master Indicators */}
        <div className="space-y-4">
          {/* Bionic Products Card */}
          <div className="card-depth rounded-2xl p-6 space-y-3 overflow-hidden">
            <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
            <h3 className="text-sm font-semibold text-white tracking-wide">
              Bionic Products ({products.length})
            </h3>

            {products.length === 0 ? (
              <p className="text-xs text-gray-500 py-3">
                No bionic products currently registered for this user.
              </p>
            ) : (
              <div className="space-y-2.5 pt-1">
                {products.map((prod) => (
                  <div
                    key={prod.id}
                    className="bg-[#0D0E12]/80 border border-white/[0.06] rounded-xl p-4 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {prod.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {prod.brand} · {prod.category}
                      </p>
                    </div>

                    <span
                      className={cn(
                        "text-xs px-2.5 py-0.5 rounded-md font-medium",
                        prod.status === "Verified"
                          ? "bg-[#0D261E] text-[#10B981] border border-[#10B981]/30"
                          : "bg-[#28220F] text-[#FACC15] border border-[#FACC15]/30"
                      )}
                    >
                      {prod.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Master Indicators Card */}
          <div className="card-depth rounded-2xl p-6 overflow-hidden">
            <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
            <h3 className="text-sm font-semibold text-white tracking-wide mb-3">
              Master Indicators
            </h3>

            <div className="divide-y divide-white/[0.04]">
              <div className="flex items-center justify-between py-3 text-xs">
                <span className="text-gray-500 font-medium">
                  Origin of Amputation
                </span>
                <span className="text-gray-200 font-semibold">
                  {indicators.originOfAmputation}
                </span>
              </div>

              <div className="flex items-center justify-between py-3 text-xs">
                <span className="text-gray-500 font-medium">
                  Anatomical Baseline
                </span>
                <span className="text-gray-200 font-semibold">
                  {indicators.anatomicalBaseline}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Suspend Account Confirmation Modal */}
      <SuspendUserModal
        isOpen={isSuspendModalOpen}
        userName={user.name}
        onClose={() => setIsSuspendModalOpen(false)}
        onConfirmSuspend={handleConfirmSuspend}
      />
    </div>
  );
}
