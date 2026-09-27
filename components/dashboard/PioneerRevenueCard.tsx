import React, { memo } from "react";
import { GenbDashboardStats } from "@/types/dashboard";
import { RevenueSubCard } from "./RevenueSubCard";

interface PioneerRevenueCardProps {
  revenue: GenbDashboardStats["pioneerRevenue"];
}

export const PioneerRevenueCard = memo(function PioneerRevenueCard({
  revenue,
}: PioneerRevenueCardProps) {
  const items = [
    revenue.monthlyRevenue,
    revenue.annualRevenue,
    revenue.activeMonthlyPlans,
    revenue.activeAnnualPlans,
  ];

  return (
    <div className="card-depth rounded-xl p-5 sm:p-6 flex flex-col h-full overflow-hidden">
      <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
      <h2 className="text-sm font-semibold text-gray-200 mb-4 tracking-wide">
        Pioneer Subscription Revenue
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 flex-1">
        {items.map((item, idx) => (
          <RevenueSubCard key={idx} item={item} />
        ))}
      </div>
    </div>
  );
});

export default PioneerRevenueCard;
