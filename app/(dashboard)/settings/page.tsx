"use client";

import React, { useState, useCallback } from "react";
import { Pencil } from "lucide-react";

export default function SettingsPage() {
  const [name, setName] = useState("Admin");
  const [email, setEmail] = useState("admin@genb.com");
  const [currentPassword, setCurrentPassword] = useState("••••••••");
  const [newPassword, setNewPassword] = useState("••••••••");
  const [confirmPassword, setConfirmPassword] = useState("••••••••");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  }, []);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Profile updated successfully.");
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Password updated successfully.");
  };

  return (
    <div className="w-full space-y-4">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#161820] border border-[#2B2E3C] text-white text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <span className="w-2 h-2 rounded-full bg-[#10B981]" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-xl space-y-4">
        {/* Card 1: Admin Account */}
        <div className="card-depth rounded-xl p-5 md:p-6 space-y-5 overflow-hidden">
          <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
          <h2 className="text-sm font-semibold text-white tracking-wide">
            Admin Account
          </h2>

          {/* Profile Header with Avatar & Edit Badge */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 rounded-xl bg-[#FFC800]/15 text-[#FFC800] border border-[#FFC800]/30 shadow-[0_0_12px_rgba(255,200,0,0.15)] flex items-center justify-center font-bold text-xl select-none">
                A
              </div>
              <button
                type="button"
                onClick={() => showToast("Avatar upload feature opened.")}
                className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#FFC800] text-black flex items-center justify-center shadow-xs hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                title="Edit avatar"
              >
                <Pencil className="w-2.5 h-2.5" />
              </button>
            </div>

            <div>
              <p className="text-sm font-bold text-white tracking-tight">Admin</p>
              <p className="text-xs text-gray-500">admin@genb.com</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSaveProfile} className="space-y-4 pt-1">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full input-depth text-gray-200 rounded-lg px-3.5 py-2.5 text-xs focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full input-depth text-gray-200 rounded-lg px-3.5 py-2.5 text-xs focus:outline-none"
              />
            </div>

            <div className="pt-1 flex justify-end">
              <button
                type="submit"
                className="bg-white/[0.05] border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.09] text-gray-200 hover:text-white rounded-lg px-4 py-2 text-xs font-semibold transition-all active:scale-95 cursor-pointer"
              >
                Save Profile
              </button>
            </div>
          </form>
        </div>

        {/* Card 2: Security */}
        <div className="card-depth rounded-xl p-5 md:p-6 space-y-5 overflow-hidden">
          <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
          <h2 className="text-sm font-semibold text-white tracking-wide">
            Security
          </h2>

          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">
                Current Password
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full input-depth text-gray-200 rounded-lg px-3.5 py-2.5 text-xs focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full input-depth text-gray-200 rounded-lg px-3.5 py-2.5 text-xs focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full input-depth text-gray-200 rounded-lg px-3.5 py-2.5 text-xs focus:outline-none"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="bg-white/[0.05] border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.09] text-gray-200 hover:text-white rounded-lg px-4 py-2 text-xs font-semibold transition-all active:scale-95 cursor-pointer"
              >
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
