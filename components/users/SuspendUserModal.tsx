"use client";

import React, { memo, useState } from "react";
import { X } from "lucide-react";

interface SuspendUserModalProps {
  isOpen: boolean;
  userName: string;
  onClose: () => void;
  onConfirmSuspend: (reason: string) => void;
}

export const SuspendUserModal = memo(function SuspendUserModal({
  isOpen,
  userName,
  onClose,
  onConfirmSuspend,
}: SuspendUserModalProps) {
  const [reason, setReason] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirmSuspend(reason);
    setReason("");
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
            Suspend Account
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
              Reason for suspension
            </label>
            <textarea
              rows={4}
              required
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Explain why this account is being suspended..."
              className="w-full bg-[#181A20] border border-[#262833] text-gray-200 placeholder-gray-500 rounded-xl p-3 text-xs focus:outline-none focus:border-red-500/60 focus:ring-1 focus:ring-red-500/50 transition-colors resize-none"
            />
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-gray-300 hover:text-white bg-[#1A1C24] hover:bg-[#222530] border border-[#282B37] rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-red-500 hover:text-red-400 bg-red-950/20 hover:bg-red-950/40 border border-red-500/40 rounded-lg transition-colors cursor-pointer"
            >
              Suspend Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});

export default SuspendUserModal;
