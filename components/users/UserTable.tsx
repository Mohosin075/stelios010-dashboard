import React, { memo } from "react";
import { UserItem } from "@/types/user";
import { cn } from "@/lib/utils";

interface UserTableProps {
  users: UserItem[];
  onViewUser?: (user: UserItem) => void;
  onManageUser?: (user: UserItem) => void;
  className?: string;
}

export const UserTable = memo(function UserTable({
  users,
  onViewUser,
  onManageUser,
  className,
}: UserTableProps) {
  return (
    <div
      className={cn(
        "bg-[#121316] border border-[#1E2026] rounded-xl overflow-x-auto",
        className
      )}
    >
      <table className="w-full text-left text-xs whitespace-nowrap">
        <thead>
          <tr className="border-b border-[#1E2026] text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
            <th className="py-3.5 px-5">USER</th>
            <th className="py-3.5 px-4">PROFILE TYPE</th>
            <th className="py-3.5 px-4">LOCATION</th>
            <th className="py-3.5 px-4">BIONIC / LOOKING FOR</th>
            <th className="py-3.5 px-4">VERIFICATION</th>
            <th className="py-3.5 px-4">JOINED</th>
            <th className="py-3.5 px-4">STATUS</th>
            <th className="py-3.5 px-5 text-right">ACTIONS</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#1A1C22]">
          {users.length === 0 ? (
            <tr>
              <td colSpan={8} className="py-8 text-center text-gray-500">
                No users found matching your filters.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-white/[0.015] transition-colors"
              >
                {/* User avatar + name + email */}
                <td className="py-3.5 px-5">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 select-none",
                        user.isYellowAvatar
                          ? "bg-[#252110] text-[#FFC800] border border-[#FFC800]/30"
                          : "bg-[#1E2026] text-gray-300 border border-gray-700/50"
                      )}
                    >
                      {user.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-white tracking-tight text-xs sm:text-sm">
                        {user.name}
                      </p>
                      <p className="text-[11px] text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </td>

                {/* Profile Type */}
                <td className="py-3.5 px-4">
                  {user.profileType === "Active User" ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-[#0D261E] text-[#10B981] border border-[#10B981]/20">
                      Active User
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-[#1A1B30] text-[#818CF8] border border-[#818CF8]/20">
                      Future User
                    </span>
                  )}
                </td>

                {/* Location */}
                <td className="py-3.5 px-4 text-gray-300">{user.location}</td>

                {/* Bionic / Looking For */}
                <td className="py-3.5 px-4">
                  <span
                    className={cn(
                      "font-medium",
                      user.isBionicProduct ? "text-[#818CF8]" : "text-gray-300"
                    )}
                  >
                    {user.bionicLookingFor}
                  </span>
                </td>

                {/* Verification */}
                <td className="py-3.5 px-4">
                  {user.verificationStatus === "Verified" && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-[#0D261E] text-[#10B981] border border-[#10B981]/20">
                      Verified
                    </span>
                  )}
                  {user.verificationStatus === "Pending" && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-[#28220F] text-[#FACC15] border border-[#FACC15]/20">
                      Pending
                    </span>
                  )}
                  {user.verificationStatus === "Unverified" && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-[#1C1E24] text-gray-400 border border-gray-700/40">
                      Unverified
                    </span>
                  )}
                </td>

                {/* Joined Date */}
                <td className="py-3.5 px-4 text-gray-400">{user.joinedDate}</td>

                {/* Account Status */}
                <td className="py-3.5 px-4 font-medium">
                  {user.accountStatus === "Active" ? (
                    <span className="text-[#10B981]">Active</span>
                  ) : (
                    <span className="text-[#EF4444]">Suspended</span>
                  )}
                </td>

                {/* Actions */}
                <td className="py-3.5 px-5 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onViewUser?.(user)}
                      className="text-gray-400 hover:text-white px-2 py-1 text-xs transition-colors cursor-pointer"
                    >
                      View
                    </button>
                    <button
                      type="button"
                      onClick={() => onManageUser?.(user)}
                      className="bg-[#181A1F] border border-[#232630] hover:border-gray-600 text-gray-200 hover:text-white rounded-lg px-3 py-1 text-xs transition-colors cursor-pointer"
                    >
                      Manage
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
});

export default UserTable;
