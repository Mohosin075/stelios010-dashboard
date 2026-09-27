import React, { memo } from "react";
import { X } from "lucide-react";
import { DASHBOARD_NAV_SECTIONS } from "@/constants/navigation";
import { BrandLogo } from "./BrandLogo";
import { SidebarNav } from "./SidebarNav";
import { UserProfile } from "./UserProfile";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  currentPath: string;
  onClose: () => void;
  onLogout: () => void;
  className?: string;
}

export const Sidebar = memo(function Sidebar({
  isOpen,
  currentPath,
  onClose,
  onLogout,
  className,
}: SidebarProps) {
  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-40 lg:hidden backdrop-blur-xs transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Fixed Full-Height Sidebar Container */}
      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 z-50 w-60 h-screen bg-[#0D0E12] border-r border-[#191B22] flex flex-col justify-between shrink-0 transform transition-transform duration-200 ease-in-out lg:static lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
          className
        )}
      >
        {/* Top Header with Brand */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-[#191B22]/70 shrink-0">
          <BrandLogo />
          <button
            type="button"
            onClick={onClose}
            className="lg:hidden text-gray-400 hover:text-white p-1"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Nav Item Area */}
        <SidebarNav
          sections={DASHBOARD_NAV_SECTIONS}
          currentPath={currentPath}
          onNavigate={onClose}
        />

        {/* Pinned Bottom User & Logout Actions */}
        <UserProfile onLogout={onLogout} />
      </aside>
    </>
  );
});

export default Sidebar;
