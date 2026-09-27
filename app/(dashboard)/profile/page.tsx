"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminProfilePage() {
  const router = useRouter();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    showToast("Logging out...");
    setTimeout(() => {
      router.push("/login");
    }, 600);
  };

  return (
    <div className="w-full">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#161820] border border-[#2B2E3C] text-white text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <span className="w-2 h-2 rounded-full bg-[#10B981]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Admin Profile Card */}
      <div className="max-w-md bg-[#121316] border border-[#1E2026] rounded-2xl p-7 flex flex-col items-center text-center space-y-6">
        {/* Avatar */}
        <div className="w-20 h-20 rounded-2xl bg-[#252110] border border-[#FFC800]/30 flex items-center justify-center font-bold text-3xl text-[#FFC800] select-none shadow-xs">
          A
        </div>

        {/* User Info */}
        <div className="space-y-1">
          <h2 className="text-base font-bold text-white tracking-tight">Admin</h2>
          <p className="text-xs text-gray-500">admin@genb.com</p>
        </div>

        {/* Action Buttons Stack */}
        <div className="w-full space-y-3 pt-2">
          {/* Edit Profile */}
          <Link
            href="/settings"
            className="w-full block py-2.5 px-4 bg-[#161820] border border-[#272A36] hover:border-gray-500 text-white rounded-xl text-xs font-medium transition-all hover:bg-[#1E212B] cursor-pointer text-center"
          >
            Edit Profile
          </Link>

          {/* Change Password */}
          <Link
            href="/settings"
            className="w-full block py-2.5 px-4 bg-[#161820] border border-[#272A36] hover:border-gray-500 text-white rounded-xl text-xs font-medium transition-all hover:bg-[#1E212B] cursor-pointer text-center"
          >
            Change Password
          </Link>

          {/* Log Out */}
          <button
            type="button"
            onClick={handleLogout}
            className="w-full py-2.5 px-4 bg-[#161820] border border-[#272A36] hover:border-red-500/50 text-[#EF4444] rounded-xl text-xs font-medium transition-all hover:bg-red-950/20 cursor-pointer text-center"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
