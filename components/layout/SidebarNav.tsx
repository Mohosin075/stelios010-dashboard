import React, { memo } from "react";
import Link from "next/link";
import { NavSection, NavItem } from "@/types/navigation";
import { cn } from "@/lib/utils";

interface SidebarNavProps {
  sections: readonly NavSection[];
  currentPath: string;
  onNavigate?: () => void;
  className?: string;
}

export const SidebarNav = memo(function SidebarNav({
  sections,
  currentPath,
  onNavigate,
  className,
}: SidebarNavProps) {
  return (
    <div
      className={cn(
        "flex-1 overflow-y-auto px-3 py-4 space-y-4 min-h-0 scrollbar-thin scrollbar-thumb-gray-800/50",
        className
      )}
    >
      {sections.map((section) => (
        <div key={section.title}>
          <div className="text-[10px] font-bold tracking-wider text-gray-500 uppercase px-3 mb-1.5 select-none">
            {section.title}
          </div>
          <div className="space-y-1">
            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/dashboard"
                  ? currentPath === "/dashboard"
                  : currentPath.startsWith(item.href);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={onNavigate}
                  className={cn(
                    "group relative w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 text-left cursor-pointer active:scale-[0.985]",
                    isActive
                      ? "bg-gradient-to-r from-[#FFC800]/12 via-[#FFC800]/6 to-transparent text-[#FFC800] border border-[#FFC800]/25 font-semibold shadow-[0_0_15px_rgba(255,200,0,0.06)]"
                      : "text-gray-400 hover:text-gray-100 hover:bg-white/[0.04] border border-transparent"
                  )}
                >
                  {/* Left accent indicator bar when active */}
                  {isActive && (
                    <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-[#FFC800] rounded-r-full shadow-[0_0_8px_#FFC800]" />
                  )}
                  <Icon
                    className={cn(
                      "w-3.5 h-3.5 shrink-0 transition-transform duration-150",
                      isActive
                        ? "text-[#FFC800] scale-105"
                        : "text-gray-400 group-hover:text-gray-200 group-hover:translate-x-0.5"
                    )}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
});

export default SidebarNav;
