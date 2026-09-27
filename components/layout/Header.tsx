import React, { memo } from "react";
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
        "h-16 px-6 lg:px-8 flex items-center justify-between border-b border-[#161820]/60 bg-[#0A0B0D] shrink-0",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 cursor-pointer"
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
        <div
          role="button"
          tabIndex={0}
          className="relative cursor-pointer p-1.5 text-gray-300 hover:text-white transition-colors"
          aria-label={`${notificationCount} new notifications`}
        >
          <Bell className="w-5 h-5" />
          {notificationCount > 0 && (
            <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-[#FFC800] text-black text-[10px] font-black flex items-center justify-center shadow-xs">
              {notificationCount}
            </span>
          )}
        </div>

        {/* User Profile Avatar */}
        <div className="w-8 h-8 rounded-full bg-[#20222A] text-gray-200 border border-[#2D313D] flex items-center justify-center font-semibold text-xs select-none">
          {userInitial}
        </div>
      </div>
    </header>
  );
});

export default Header;
