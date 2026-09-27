import React, { memo } from "react";
import { SubscriptionStats } from "@/types/subscription";

interface SubscriptionStatsCardsProps {
  stats: SubscriptionStats;
}

export const SubscriptionStatsCards = memo(function SubscriptionStatsCards({
  stats,
}: SubscriptionStatsCardsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 w-full">
      {/* 1. Active Subscriptions */}
      <div className="bg-[#121316] border border-[#1E2026] rounded-xl p-4 sm:p-5">
        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
          ACTIVE SUBSCRIPTIONS
        </p>
        <p className="text-2xl sm:text-3xl font-bold text-[#FFC800] mt-2">
          {stats.activeSubscriptions}
        </p>
      </div>

      {/* 2. Monthly Plans */}
      <div className="bg-[#121316] border border-[#1E2026] rounded-xl p-4 sm:p-5">
        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
          MONTHLY PLANS
        </p>
        <p className="text-2xl sm:text-3xl font-bold text-white mt-2">
          {stats.monthlyPlans}
        </p>
      </div>

      {/* 3. Annual Plans */}
      <div className="bg-[#121316] border border-[#1E2026] rounded-xl p-4 sm:p-5">
        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
          ANNUAL PLANS
        </p>
        <p className="text-2xl sm:text-3xl font-bold text-white mt-2">
          {stats.annualPlans}
        </p>
      </div>

      {/* 4. Monthly Revenue */}
      <div className="bg-[#121316] border border-[#1E2026] rounded-xl p-4 sm:p-5 flex flex-col justify-between">
        <div>
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
            MONTHLY REVENUE
          </p>
          <p className="text-2xl sm:text-3xl font-bold text-[#10B981] mt-2">
            {stats.monthlyRevenue}
          </p>
        </div>
        <p className="text-[11px] text-gray-500 mt-2">$500/month each</p>
      </div>

      {/* 5. Annual Revenue */}
      <div className="bg-[#121316] border border-[#1E2026] rounded-xl p-4 sm:p-5 flex flex-col justify-between">
        <div>
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
            ANNUAL REVENUE
          </p>
          <p className="text-2xl sm:text-3xl font-bold text-[#10B981] mt-2">
            {stats.annualRevenue}
          </p>
        </div>
        <p className="text-[11px] text-gray-500 mt-2">$5,500/year each</p>
      </div>
    </div>
  );
});

export default SubscriptionStatsCards;
