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
    <div className="bg-[#121316] border border-[#1E2026] rounded-xl p-5 sm:p-6 flex flex-col h-full">
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
