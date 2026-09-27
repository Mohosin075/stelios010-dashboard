"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  Users,
  CheckCircle2,
  Gem,
  Package,
  Send,
  PieChart,
  BarChart3,
  MessageSquare,
  Flag,
  Headphones,
  Bell,
  Sliders,
  Menu,
  X,
  LogOut,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    title: "OVERVIEW",
    items: [
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: Sparkles,
      },
    ],
  },
  {
    title: "MANAGEMENT",
    items: [
      { label: "Users", href: "/dashboard", icon: Users },
      { label: "Verifications", href: "/dashboard", icon: CheckCircle2 },
      { label: "Pioneers", href: "/dashboard", icon: Gem },
      { label: "Products", href: "/dashboard", icon: Package },
      { label: "Submissions", href: "/dashboard", icon: Send },
    ],
  },
  {
    title: "BUSINESS",
    items: [
      { label: "Subscriptions", href: "/dashboard", icon: PieChart },
    ],
  },
  {
    title: "COMMUNITY",
    items: [
      { label: "Polls", href: "/dashboard", icon: BarChart3 },
      { label: "Community", href: "/dashboard", icon: MessageSquare },
      { label: "Reports", href: "/dashboard", icon: Flag },
      { label: "Contact GENB", href: "/dashboard", icon: Headphones },
    ],
  },
  {
    title: "SYSTEM",
    items: [
      { label: "Notifications", href: "/dashboard", icon: Bell },
      { label: "Settings", href: "/dashboard", icon: Sliders },
    ],
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Dashboard");

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#0A0B0D] text-gray-100 flex antialiased font-sans">
      {/* Mobile Drawer Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-40 lg:hidden backdrop-blur-xs transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Fixed/Sticky height */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-60 h-screen bg-[#0D0E12] border-r border-[#191B22] flex flex-col justify-between shrink-0 transform transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Top: Brand Header */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-[#191B22]/70 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#FFC800] text-black font-black text-sm flex items-center justify-center tracking-tighter shadow-sm select-none">
              GB
            </div>
            <span className="text-[#FFC800] font-bold text-sm tracking-wider uppercase">
              GENB
            </span>
            <span className="text-[10px] font-mono font-medium text-gray-400 border border-gray-800 bg-[#14151A] px-1.5 py-0.5 rounded tracking-wider">
              ADMIN
            </span>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white p-1"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Middle: Scrollable Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-4 min-h-0 scrollbar-thin scrollbar-thumb-gray-800">
          {navSections.map((section) => (
            <div key={section.title}>
              <div className="text-[10px] font-bold tracking-wider text-gray-400 uppercase px-3 mb-1.5 select-none">
                {section.title}
              </div>
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    activeItem === item.label && pathname.startsWith(item.href);

                  return (
                    <button
                      key={item.label}
                      onClick={() => {
                        setActiveItem(item.label);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 text-left cursor-pointer ${
                        isActive
                          ? "bg-[#252110] text-[#FFC800] border border-[#FFC800]/25 shadow-xs font-semibold"
                          : "text-gray-400 hover:text-gray-200 hover:bg-[#15171D] border border-transparent"
                      }`}
                    >
                      <Icon
                        className={`w-3.5 h-3.5 shrink-0 ${
                          isActive ? "text-[#FFC800]" : "text-gray-400"
                        }`}
                      />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Pinned Section: Admin Profile & Log Out */}
        <div className="p-3.5 border-t border-[#1C1E26] space-y-2 shrink-0 bg-[#0D0E12]">
          {/* Admin User */}
          <div className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-gray-300">
            <div className="w-6 h-6 rounded-full bg-[#201D10] text-[#FFC800] border border-[#FFC800]/30 flex items-center justify-center font-bold text-[10px] select-none">
              A
            </div>
            <span className="text-gray-200 font-medium">Admin</span>
          </div>

          {/* Log Out button */}
          <button
            onClick={handleLogout}
            id="sidebar-logout-button"
            className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium text-gray-400 hover:text-white hover:bg-white/[0.04] transition-colors cursor-pointer group"
          >
            <div className="w-5 h-5 rounded bg-[#0A2533] border border-[#0284C7]/40 text-[#38BDF8] flex items-center justify-center shrink-0 group-hover:border-[#38BDF8]">
              <LogOut className="w-3 h-3" />
            </div>
            <span className="group-hover:text-gray-100">Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Column */}
      <div className="flex-1 flex flex-col h-screen min-w-0 overflow-hidden bg-[#0A0B0D]">
        {/* Top Header Bar - Always fixed */}
        <header className="h-16 px-6 lg:px-8 flex items-center justify-between border-b border-[#161820]/60 bg-[#0A0B0D] shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 cursor-pointer"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              {activeItem}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Notification Bell */}
            <div className="relative cursor-pointer p-1.5 text-gray-300 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-[#FFC800] text-black text-[10px] font-black flex items-center justify-center shadow-xs">
                3
              </span>
            </div>

            {/* User Avatar */}
            <div className="w-8 h-8 rounded-full bg-[#20222A] text-gray-200 border border-[#2D313D] flex items-center justify-center font-semibold text-xs select-none">
              A
            </div>
          </div>
        </header>

        {/* Scrollable Page Body */}
        <main className="flex-1 overflow-y-auto px-6 lg:px-8 py-5">
          {children}
        </main>
      </div>
    </div>
  );
}