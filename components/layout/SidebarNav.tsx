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
        "flex-1 overflow-y-auto px-3 py-4 space-y-4 min-h-0 scrollbar-thin scrollbar-thumb-gray-800",
        className
      )}
    >
      {sections.map((section) => (
        <div key={section.title}>
          <div className="text-[10px] font-bold tracking-wider text-gray-400 uppercase px-3 mb-1.5 select-none">
            {section.title}
          </div>
          <div className="space-y-0.5">
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
                    "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 text-left cursor-pointer",
                    isActive
                      ? "bg-[#252110] text-[#FFC800] border border-[#FFC800]/25 shadow-xs font-semibold"
                      : "text-gray-400 hover:text-gray-200 hover:bg-[#15171D] border border-transparent"
                  )}
                >
                  <Icon
                    className={cn(
                      "w-3.5 h-3.5 shrink-0",
                      isActive ? "text-[#FFC800]" : "text-gray-400"
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
