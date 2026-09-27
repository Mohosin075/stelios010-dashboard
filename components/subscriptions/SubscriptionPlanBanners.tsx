import React, { memo } from "react";

export const SubscriptionPlanBanners = memo(function SubscriptionPlanBanners() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
      {/* Monthly Plan */}
      <div className="card-depth card-depth-hover rounded-xl p-5 flex items-center justify-between overflow-hidden">
        <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
        <div>
          <h3 className="text-sm font-semibold text-white">Monthly Plan</h3>
          <p className="text-xs text-gray-400 mt-0.5">Billed monthly. Cancel anytime.</p>
        </div>
        <div className="text-lg font-bold text-[#FFC800]">
          $500/month
        </div>
      </div>

      {/* Annual Plan */}
      <div className="card-depth card-depth-hover rounded-xl p-5 flex items-center justify-between overflow-hidden">
        <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
        <div>
          <h3 className="text-sm font-semibold text-white">Annual Plan</h3>
          <p className="text-xs text-gray-400 mt-0.5">Full refund within first 30 days.</p>
        </div>
        <div className="text-lg font-bold text-[#FFC800]">
          $5,500/year
        </div>
      </div>
    </div>
  );
});

export default SubscriptionPlanBanners;
