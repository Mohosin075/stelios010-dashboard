import React from "react";
import { GenbDashboardStats } from "@/types/dashboard";

interface PioneerRevenueCardProps {
  revenue: GenbDashboardStats["pioneerRevenue"];
}

export default function PioneerRevenueCard({ revenue }: PioneerRevenueCardProps) {
  const items = [
    revenue.monthlyRevenue,
    revenue.annualRevenue,
    revenue.activeMonthlyPlans,
    revenue.activeAnnualPlans,
  ];

  return (
    <div className="bg-[#121316] border border-[#1E2026] rounded-xl p-5 sm:p-6 flex flex-col h-full">
      <h2 className="text-sm font-semibold text-gray-200 mb-4 tracking-wide">
        Pioneer Subscription Revenue
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 flex-1">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="bg-[#181A1F] border border-[#22252E] rounded-xl p-4 sm:p-5 flex flex-col justify-between transition-colors hover:border-[#2E3340]"
          >
            <div className="text-xs font-medium text-gray-400">
              {item.title}
            </div>
            <div className="text-2xl sm:text-[28px] font-bold text-[#FFC800] my-2 tracking-tight">
              {item.amount}
            </div>
            <div className="text-xs text-gray-400 font-normal">
              {item.detail}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
