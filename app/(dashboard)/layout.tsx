"use client";

import React, { useState, useCallback, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

const routeTitleMap: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/users": "Users",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const pageTitle = useMemo(() => {
    if (pathname.startsWith("/products/") && pathname !== "/products") {
      return "Product Details";
    }
    if (pathname === "/products") {
      return "Bionic Products";
    }
    if (pathname.startsWith("/pioneers/") && pathname !== "/pioneers") {
      return "Pioneer Details";
    }
    if (pathname === "/pioneers") {
      return "Pioneers";
    }
    if (pathname.startsWith("/verifications/") && pathname !== "/verifications") {
      return "Review Verification";
    }
    if (pathname === "/verifications") {
      return "Bionic Verifications";
    }
    if (pathname.startsWith("/users/") && pathname !== "/users") {
      return "User Details";
    }
    if (pathname === "/users") {
      return "Users";
    }
    return "Dashboard";
  }, [pathname]);

  const handleOpenMobileMenu = useCallback(() => setIsMobileMenuOpen(true), []);
  const handleCloseMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  const handleLogout = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    router.push("/login");
  }, [router]);

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#0A0B0D] text-gray-100 flex antialiased font-sans">
      {/* Sidebar with sticky height and pinned bottom */}
      <Sidebar
        isOpen={isMobileMenuOpen}
        currentPath={pathname}
        onClose={handleCloseMobileMenu}
        onLogout={handleLogout}
      />

      {/* Main Content Column */}
      <div className="flex-1 flex flex-col h-screen min-w-0 overflow-hidden bg-[#0A0B0D]">
        <Header
          title={pageTitle}
          notificationCount={3}
          userInitial="A"
          onOpenMobileMenu={handleOpenMobileMenu}
        />

        <main className="flex-1 overflow-y-auto px-6 lg:px-8 py-5">
          {children}
        </main>
      </div>
    </div>
  );
}