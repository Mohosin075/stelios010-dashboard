"use client";

import React, { memo, useState, useEffect } from "react";
import { X, ShieldAlert, Check } from "lucide-react";
import { UserItem, ProfileType, VerificationStatus, AccountStatus } from "@/types/user";

interface ManageUserModalProps {
  user: UserItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedUser: UserItem) => void;
}

export const ManageUserModal = memo(function ManageUserModal({
  user,
  isOpen,
  onClose,
  onSave,
}: ManageUserModalProps) {
  const [formData, setFormData] = useState<UserItem | null>(null);

  useEffect(() => {
    if (user) {
      setFormData({ ...user });
    }
  }, [user]);

  if (!isOpen || !formData) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleToggleSuspend = () => {
    setFormData((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        accountStatus: prev.accountStatus === "Active" ? "Suspended" : "Active",
      };
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-[#121316] border border-[#1E2026] rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1E2026]">
          <div>
            <h3 className="text-base font-semibold text-white tracking-wide">
              Manage User Account
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Edit user settings, permissions and verification status
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800">
            {/* Name */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-[#181A1F] border border-[#232630] text-gray-200 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-[#FFC800] transition-colors"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full bg-[#181A1F] border border-[#232630] text-gray-200 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-[#FFC800] transition-colors"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">
                Location
              </label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="w-full bg-[#181A1F] border border-[#232630] text-gray-200 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-[#FFC800] transition-colors"
              />
            </div>

            {/* Selects Grid: Profile Type & Verification */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">
                  Profile Type
                </label>
                <select
                  value={formData.profileType}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      profileType: e.target.value as ProfileType,
                    })
                  }
                  className="w-full bg-[#181A1F] border border-[#232630] text-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#FFC800] cursor-pointer"
                >
                  <option value="Active User">Active User</option>
                  <option value="Future User">Future User</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">
                  Verification Status
                </label>
                <select
                  value={formData.verificationStatus}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      verificationStatus: e.target.value as VerificationStatus,
                    })
                  }
                  className="w-full bg-[#181A1F] border border-[#232630] text-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#FFC800] cursor-pointer"
                >
                  <option value="Verified">Verified</option>
                  <option value="Pending">Pending</option>
                  <option value="Unverified">Unverified</option>
                </select>
              </div>
            </div>

            {/* Bionic / Looking For */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">
                Bionic / Looking For
              </label>
              <input
                type="text"
                required
                value={formData.bionicLookingFor}
                onChange={(e) =>
                  setFormData({ ...formData, bionicLookingFor: e.target.value })
                }
                className="w-full bg-[#181A1F] border border-[#232630] text-gray-200 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-[#FFC800] transition-colors"
              />
            </div>

            {/* Quick Status Control */}
            <div className="pt-2">
              <div className="flex items-center justify-between p-3.5 bg-[#181A1F] border border-[#22252E] rounded-xl">
                <div>
                  <p className="text-xs font-semibold text-white">
                    Account Status:{" "}
                    <span
                      className={
                        formData.accountStatus === "Active"
                          ? "text-[#10B981]"
                          : "text-[#EF4444]"
                      }
                    >
                      {formData.accountStatus}
                    </span>
                  </p>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    {formData.accountStatus === "Active"
                      ? "User has full access to the portal."
                      : "User is temporarily prevented from signing in."}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleToggleSuspend}
                  className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-colors cursor-pointer ${
                    formData.accountStatus === "Active"
                      ? "bg-red-950/40 text-red-400 border-red-800/50 hover:bg-red-900/50"
                      : "bg-green-950/40 text-green-400 border-green-800/50 hover:bg-green-900/50"
                  }`}
                >
                  {formData.accountStatus === "Active" ? "Suspend" : "Activate"}
                </button>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#1E2026] bg-[#101114]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#FFC800] hover:bg-[#F2BD00] text-black font-semibold text-xs px-4 py-2 rounded-lg transition-all cursor-pointer shadow-sm flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});

export default ManageUserModal;
