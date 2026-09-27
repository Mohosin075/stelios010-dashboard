"use client";

import React, { memo } from "react";
import { X, Calendar, MapPin, ShieldCheck, User, Sparkles } from "lucide-react";
import { UserItem } from "@/types/user";
import { cn } from "@/lib/utils";

interface ViewUserModalProps {
  user: UserItem | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenManage?: (user: UserItem) => void;
}

export const ViewUserModal = memo(function ViewUserModal({
  user,
  isOpen,
  onClose,
  onOpenManage,
}: ViewUserModalProps) {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-[#121316] border border-[#1E2026] rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1E2026]">
          <h3 className="text-base font-semibold text-white tracking-wide">
            User Profile Details
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* User summary row */}
          <div className="flex items-center gap-4">
            <div
              className={cn(
                "w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg shrink-0",
                user.isYellowAvatar
                  ? "bg-[#252110] text-[#FFC800] border border-[#FFC800]/40"
                  : "bg-[#1E2026] text-gray-200 border border-gray-700/60"
              )}
            >
              {user.initials}
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-lg font-bold text-white tracking-tight truncate">
                {user.name}
              </h4>
              <p className="text-xs text-gray-400 truncate">{user.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <span
                  className={cn(
                    "inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium",
                    user.profileType === "Active User"
                      ? "bg-[#0D261E] text-[#10B981] border border-[#10B981]/30"
                      : "bg-[#1A1B30] text-[#818CF8] border border-[#818CF8]/30"
                  )}
                >
                  {user.profileType}
                </span>

                <span
                  className={cn(
                    "inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium",
                    user.accountStatus === "Active"
                      ? "bg-green-950/40 text-[#10B981] border border-green-800/40"
                      : "bg-red-950/40 text-[#EF4444] border border-red-800/40"
                  )}
                >
                  {user.accountStatus}
                </span>
              </div>
            </div>
          </div>

          {/* Detailed Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 bg-[#181A1F] border border-[#22252E] rounded-xl p-4">
            <div className="space-y-1">
              <span className="text-[11px] text-gray-400 font-medium flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-gray-500" />
                Location
              </span>
              <p className="text-xs font-semibold text-gray-200">{user.location}</p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] text-gray-400 font-medium flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-gray-500" />
                Bionic / Looking For
              </span>
              <p
                className={cn(
                  "text-xs font-semibold",
                  user.isBionicProduct ? "text-[#818CF8]" : "text-gray-200"
                )}
              >
                {user.bionicLookingFor}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] text-gray-400 font-medium flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-gray-500" />
                Verification Status
              </span>
              <p className="text-xs font-semibold text-gray-200">
                {user.verificationStatus}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] text-gray-400 font-medium flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-gray-500" />
                Joined Platform
              </span>
              <p className="text-xs font-semibold text-gray-200">{user.joinedDate}</p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#1E2026] bg-[#101114]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            Close
          </button>
          {onOpenManage && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenManage(user);
              }}
              className="bg-[#FFC800] hover:bg-[#F2BD00] text-black font-semibold text-xs px-4 py-2 rounded-lg transition-all cursor-pointer shadow-sm"
            >
              Manage Account
            </button>
          )}
        </div>
      </div>
    </div>
  );
});

export default ViewUserModal;
