import React, { memo } from "react";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserProfileProps {
  name?: string;
  initial?: string;
  onLogout: () => void;
  className?: string;
}

export const UserProfile = memo(function UserProfile({
  name = "Admin",
  initial = "A",
  onLogout,
  className,
}: UserProfileProps) {
  return (
    <div
      className={cn(
        "p-3.5 border-t border-[#1C1E26] space-y-2 shrink-0 bg-[#0D0E12]",
        className
      )}
    >
      {/* Admin User Info */}
      <Link
        href="/profile"
        className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-gray-300 hover:text-white hover:bg-white/[0.04] transition-colors cursor-pointer select-none"
      >
        <div className="w-6 h-6 rounded-full bg-[#201D10] text-[#FFC800] border border-[#FFC800]/30 flex items-center justify-center font-bold text-[10px]">
          {initial}
        </div>
        <span className="text-gray-200 font-medium">{name}</span>
      </Link>

      {/* Log Out Action */}
      <button
        type="button"
        onClick={onLogout}
        id="sidebar-logout-button"
        className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium text-gray-400 hover:text-white hover:bg-white/[0.04] transition-colors cursor-pointer group"
      >
        <div className="w-5 h-5 rounded bg-[#0A2533] border border-[#0284C7]/40 text-[#38BDF8] flex items-center justify-center shrink-0 group-hover:border-[#38BDF8]">
          <LogOut className="w-3 h-3" />
        </div>
        <span className="group-hover:text-gray-100">Log Out</span>
      </button>
    </div>
  );
});

export default UserProfile;
