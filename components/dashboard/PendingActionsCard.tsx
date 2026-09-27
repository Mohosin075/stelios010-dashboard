import React, { memo } from "react";
import { PendingAction } from "@/types/dashboard";
import { PendingActionRow } from "./PendingActionRow";

interface PendingActionsCardProps {
  actions: PendingAction[];
  onActionClick?: (action: PendingAction) => void;
}

export const PendingActionsCard = memo(function PendingActionsCard({
  actions,
  onActionClick,
}: PendingActionsCardProps) {
  return (
    <div className="card-depth rounded-xl p-5 sm:p-6 flex flex-col h-full overflow-hidden">
      <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
      <h2 className="text-sm font-semibold text-gray-200 mb-4 tracking-wide">
        Pending Actions
      </h2>

      <div className="flex flex-col gap-2.5 flex-1 justify-between">
        {actions.map((action) => (
          <PendingActionRow
            key={action.id}
            action={action}
            onActionClick={onActionClick}
          />
        ))}
      </div>
    </div>
  );
});

export default PendingActionsCard;
