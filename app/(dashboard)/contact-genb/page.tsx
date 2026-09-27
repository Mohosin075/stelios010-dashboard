"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Paperclip } from "lucide-react";
import { Pagination } from "@/components/ui/Pagination";
import { MOCK_CONTACT_MESSAGES } from "@/constants/contactData";
import { ContactMessageItem } from "@/types/contact";
import { cn } from "@/lib/utils";

type FilterTab = "All" | "Unread" | "Bugs" | "Suggestions" | "Ideas" | "Resolved";

const TABS: FilterTab[] = ["All", "Unread", "Bugs", "Suggestions", "Ideas", "Resolved"];
const ITEMS_PER_PAGE = 5;

export default function ContactGenbPage() {
  const [messages] = useState<ContactMessageItem[]>(MOCK_CONTACT_MESSAGES);
  const [activeTab, setActiveTab] = useState<FilterTab>("All");
  const [currentPage, setCurrentPage] = useState(1);

  const totalCount = messages.length;
  const unreadCount = useMemo(
    () => messages.filter((m) => m.status === "Unread").length,
    [messages]
  );

  const filteredMessages = useMemo(() => {
    return messages.filter((m) => {
      if (activeTab === "All") return true;
      if (activeTab === "Unread") return m.status === "Unread";
      if (activeTab === "Bugs") return m.type === "Bug";
      if (activeTab === "Suggestions") return m.type === "Suggestion";
      if (activeTab === "Ideas") return m.type === "Idea";
      if (activeTab === "Resolved") return m.status === "Resolved";
      return true;
    });
  }, [messages, activeTab]);

  const totalItems = filteredMessages.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const paginatedMessages = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredMessages.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredMessages, currentPage]);

  return (
    <div className="w-full space-y-4">
      {/* 1. Tabs */}
      <div className="tab-depth rounded-2xl p-1.5 flex items-center gap-1.5 w-full overflow-x-auto">
        {TABS.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => {
                setActiveTab(tab);
                setCurrentPage(1);
              }}
              className={cn(
                "flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer select-none shrink-0 active:scale-95",
                isActive
                  ? "bg-[#FFC800] text-black shadow-[0_2px_10px_rgba(255,200,0,0.3)] font-bold"
                  : "text-gray-400 hover:text-white hover:bg-white/[0.04]"
              )}
            >
              <span>{tab}</span>
              {tab === "All" && (
                <span
                  className={cn(
                    "w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold",
                    isActive ? "bg-black/20 text-black" : "bg-white/10 text-gray-400"
                  )}
                >
                  {totalCount}
                </span>
              )}
              {tab === "Unread" && (
                <span
                  className={cn(
                    "w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold",
                    isActive ? "bg-black/20 text-black" : "bg-white/10 text-gray-400"
                  )}
                >
                  {unreadCount}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 2. Table */}
      <div className="table-depth">
        <table className="w-full text-left text-xs whitespace-nowrap">
          <thead>
            <tr className="border-b border-white/[0.06] bg-white/[0.02] text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
              <th className="py-3.5 px-5">SENDER</th>
              <th className="py-3.5 px-4">EMAIL</th>
              <th className="py-3.5 px-4">TYPE</th>
              <th className="py-3.5 px-4">MESSAGE PREVIEW</th>
              <th className="py-3.5 px-4">ATTACHMENT</th>
              <th className="py-3.5 px-4">DATE</th>
              <th className="py-3.5 px-5 text-left">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {paginatedMessages.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-gray-500">
                  No messages found in this category.
                </td>
              </tr>
            ) : (
              paginatedMessages.map((msg) => (
                <tr
                  key={msg.id}
                  className="hover:bg-white/[0.015] transition-colors cursor-pointer"
                >
                  {/* Sender */}
                  <td className="py-3.5 px-5 font-semibold text-white">
                    <Link href={`/contact-genb/${msg.id}`} className="hover:underline">
                      {msg.sender}
                    </Link>
                  </td>

                  {/* Email */}
                  <td className="py-3.5 px-4 text-gray-400">{msg.email}</td>

                  {/* Type */}
                  <td className="py-3.5 px-4">
                    {msg.type === "Bug" && (
                      <span className="inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-medium bg-[#2D1619] text-[#F87171] border border-[#F87171]/20">
                        Bug
                      </span>
                    )}
                    {msg.type === "Suggestion" && (
                      <span className="inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-medium bg-[#252110] text-[#FFC800] border border-[#FFC800]/25">
                        Suggestion
                      </span>
                    )}
                    {msg.type === "Idea" && (
                      <span className="inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-medium bg-[#0D261E] text-[#10B981] border border-[#10B981]/20">
                        Idea
                      </span>
                    )}
                  </td>

                  {/* Message Preview */}
                  <td className="py-3.5 px-4 text-gray-300 max-w-xs truncate">
                    <Link href={`/contact-genb/${msg.id}`}>
                      {msg.messagePreview}
                    </Link>
                  </td>

                  {/* Attachment */}
                  <td className="py-3.5 px-4 text-gray-400">
                    {msg.hasAttachment ? (
                      <Paperclip className="w-3.5 h-3.5 text-gray-300" />
                    ) : (
                      <span>—</span>
                    )}
                  </td>

                  {/* Date */}
                  <td className="py-3.5 px-4 text-gray-400">{msg.date}</td>

                  {/* Status */}
                  <td className="py-3.5 px-5">
                    {msg.status === "Unread" && (
                      <span className="inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-medium bg-[#28220F] text-[#FACC15] border border-[#FACC15]/20">
                        Unread
                      </span>
                    )}
                    {msg.status === "Read" && (
                      <span className="inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-medium bg-[#122238] text-[#38BDF8] border border-[#38BDF8]/20">
                        Read
                      </span>
                    )}
                    {msg.status === "Resolved" && (
                      <span className="inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-medium bg-[#0D261E] text-[#10B981] border border-[#10B981]/20">
                        Resolved
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 3. Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={setCurrentPage}
        entityName="messages"
      />
    </div>
  );
}
