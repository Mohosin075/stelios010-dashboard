"use client";

import React, { memo, useState, useEffect } from "react";
import { X } from "lucide-react";
import { PioneerItem, ClaimedStatus, SubscriptionStatus, PioneerVerificationStatus } from "@/types/pioneer";

interface ManagePioneerModalProps {
  isOpen: boolean;
  pioneer: PioneerItem | null;
  onClose: () => void;
  onSave: (updated: {
    id: string;
    claimedStatus: ClaimedStatus;
    subscriptionStatus: SubscriptionStatus;
    verificationStatus: PioneerVerificationStatus;
  }) => void;
}

export const ManagePioneerModal = memo(function ManagePioneerModal({
  isOpen,
  pioneer,
  onClose,
  onSave,
}: ManagePioneerModalProps) {
  const [claimedStatus, setClaimedStatus] = useState<ClaimedStatus>("Claimed");
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus>("Active");
  const [verificationStatus, setVerificationStatus] = useState<PioneerVerificationStatus>("Verified");

  useEffect(() => {
    if (pioneer) {
      setClaimedStatus(pioneer.claimedStatus);
      setSubscriptionStatus(pioneer.subscriptionStatus);
      setVerificationStatus(pioneer.verificationStatus);
    }
  }, [pioneer]);

  if (!isOpen || !pioneer) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: pioneer.id,
      claimedStatus,
      subscriptionStatus,
      verificationStatus,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-md bg-[#131418] border border-[#20222B] rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#20222B]">
          <h3 className="text-sm font-semibold text-white tracking-wide">
            Manage Pioneer: {pioneer.name}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">
              Claimed Status
            </label>
            <select
              value={claimedStatus}
              onChange={(e) => setClaimedStatus(e.target.value as ClaimedStatus)}
              className="w-full bg-[#181A20] border border-[#262833] text-gray-200 rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#FFC800] transition-colors"
            >
              <option value="Claimed">Claimed</option>
              <option value="Unclaimed">Unclaimed</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">
              Subscription Status
            </label>
            <select
              value={subscriptionStatus}
              onChange={(e) => setSubscriptionStatus(e.target.value as SubscriptionStatus)}
              className="w-full bg-[#181A20] border border-[#262833] text-gray-200 rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#FFC800] transition-colors"
            >
              <option value="Active">Active</option>
              <option value="None">None</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">
              Verification Status
            </label>
            <select
              value={verificationStatus}
              onChange={(e) => setVerificationStatus(e.target.value as PioneerVerificationStatus)}
              className="w-full bg-[#181A20] border border-[#262833] text-gray-200 rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#FFC800] transition-colors"
            >
              <option value="Verified">Verified</option>
              <option value="Unverified">Unverified</option>
            </select>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-gray-300 hover:text-white bg-[#1A1C24] hover:bg-[#222530] border border-[#282B37] rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-black bg-[#FFC800] hover:bg-[#E5B400] rounded-lg transition-colors cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});

export default ManagePioneerModal;
