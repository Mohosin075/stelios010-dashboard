import React, { memo } from "react";
import Link from "next/link";
import { Bell, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  title: string;
  notificationCount?: number;
  userInitial?: string;
  onOpenMobileMenu: () => void;
  className?: string;
}

export const Header = memo(function Header({
  title,
  notificationCount = 3,
  userInitial = "A",
  onOpenMobileMenu,
  className,
}: HeaderProps) {
  return (
    <header
      className={cn(
        "h-16 px-6 lg:px-8 flex items-center justify-between border-b border-white/[0.06] bg-[#0A0B0D]/85 backdrop-blur-xl shrink-0 sticky top-0 z-30 transition-all",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 active:scale-95 transition-all cursor-pointer"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Notification Bell with Badge */}
        <Link
          href="/notifications"
          className="relative cursor-pointer p-2 text-gray-400 hover:text-white hover:bg-white/[0.04] rounded-lg transition-all active:scale-95"
          aria-label={`${notificationCount} new notifications`}
        >
          <Bell className="w-4.5 h-4.5" />
          {notificationCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#FFC800] text-black text-[10px] font-black flex items-center justify-center shadow-[0_0_8px_rgba(255,200,0,0.5)]">
              {notificationCount}
            </span>
          )}
        </Link>

        {/* User Profile Avatar */}
        <Link
          href="/profile"
          className="w-8 h-8 rounded-full bg-[#181A20] hover:bg-[#20222A] hover:border-[#FFC800]/40 text-gray-200 border border-white/10 flex items-center justify-center font-semibold text-xs select-none cursor-pointer transition-all hover:scale-105 active:scale-95 shadow-sm"
        >
          {userInitial}
        </Link>
      </div>
    </header>
  );
});

export default Header;
