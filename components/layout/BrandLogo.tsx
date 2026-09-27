import React, { memo } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  showBadge?: boolean;
}

export const BrandLogo = memo(function BrandLogo({
  className,
  showBadge = true,
}: BrandLogoProps) {
  return (
    <Link
      href="/dashboard"
      className={cn("flex items-center gap-2.5 select-none group", className)}
    >
      <div className="w-8 h-8 rounded-lg bg-[#FFC800] text-black font-black text-sm flex items-center justify-center tracking-tighter shadow-sm transition-transform group-hover:scale-105">
        GB
      </div>
      <span className="text-[#FFC800] font-bold text-sm tracking-wider uppercase">
        GENB
      </span>
      {showBadge && (
        <span className="text-[10px] font-mono font-medium text-gray-400 border border-gray-800 bg-[#14151A] px-1.5 py-0.5 rounded tracking-wider">
          ADMIN
        </span>
      )}
    </Link>
  );
});

export default BrandLogo;
