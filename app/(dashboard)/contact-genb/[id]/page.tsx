"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { MOCK_CONTACT_MESSAGES } from "@/constants/contactData";
import { ContactMessageStatus } from "@/types/contact";
import { cn } from "@/lib/utils";

export default function ContactMessageDetailsPage() {
  const params = useParams();
  const id = params?.id as string;

  const initialMessage = useMemo(() => {
    return (
      MOCK_CONTACT_MESSAGES.find((m) => m.id === id) ||
      MOCK_CONTACT_MESSAGES[0]
    );
  }, [id]);

  const [message, setMessage] = useState(initialMessage);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    setMessage(initialMessage);
  }, [initialMessage]);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  }, []);

  const handleMarkResolved = () => {
    setMessage((prev) => ({
      ...prev,
      status: "Resolved" as ContactMessageStatus,
    }));
    showToast("Message marked as resolved.");
  };

  return (
    <div className="w-full space-y-4">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#161820] border border-[#2B2E3C] text-white text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <span className="w-2 h-2 rounded-full bg-[#10B981]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Back Link */}
      <div>
        <Link
          href="/contact-genb"
          className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Contact GENB</span>
        </Link>
      </div>

      <div className="max-w-2xl">
        {/* Main Message Card */}
        <div className="card-depth rounded-xl p-5 md:p-6 space-y-5 overflow-hidden">
          <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
          {/* Header Row */}
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <h1 className="text-base font-bold text-white tracking-tight">
                  {message.sender}
                </h1>
                {message.type === "Bug" && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#2D1619] text-[#F87171] border border-[#F87171]/20">
                    Bug
                  </span>
                )}
                {message.type === "Suggestion" && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#FFC800]/10 text-[#FFC800] border border-[#FFC800]/25">
                    Suggestion
                  </span>
                )}
                {message.type === "Idea" && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#0D261E] text-[#10B981] border border-[#10B981]/20">
                    Idea
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-400">{message.email}</p>
              <p className="text-xs text-gray-500">{message.date}</p>
            </div>

            <span
              className={cn(
                "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border shrink-0",
                message.status === "Unread" &&
                  "bg-[#28220F] text-[#FACC15] border-[#FACC15]/20",
                message.status === "Read" &&
                  "bg-[#122238] text-[#38BDF8] border-[#38BDF8]/20",
                message.status === "Resolved" &&
                  "bg-[#0D261E] text-[#10B981] border-[#10B981]/20"
              )}
            >
              {message.status}
            </span>
          </div>

          {/* Message Content Box */}
          <div className="bg-[#0D0E12]/85 border border-white/[0.08] rounded-xl p-4 text-xs text-gray-200 leading-relaxed">
            {message.fullMessage}
          </div>

          {/* Attachments Section */}
          {message.hasAttachment && (
            <div className="space-y-2 pt-1">
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                ATTACHMENTS
              </p>
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.06] flex items-center justify-center text-gray-300 transition-all cursor-pointer active:scale-95">
                  <div className="w-4 h-4 bg-gray-300 rounded-xs" />
                </div>
                <div className="w-14 h-14 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.06] flex items-center justify-center text-gray-300 transition-all cursor-pointer active:scale-95">
                  <div className="w-4 h-4 bg-gray-300 rounded-xs" />
                </div>
              </div>
            </div>
          )}

          {/* Bottom Action: Mark Resolved / Mark Unresolved */}
          <div className="pt-2">
            {message.status === "Resolved" ? (
              <button
                type="button"
                onClick={() => {
                  setMessage((prev) => ({ ...prev, status: "Read" }));
                  showToast("Message marked as unresolved.");
                }}
                className="bg-white/[0.05] border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.09] text-gray-200 hover:text-white rounded-lg px-4 py-1.5 text-xs font-semibold transition-all cursor-pointer active:scale-95"
              >
                Mark Unresolved
              </button>
            ) : (
              <button
                type="button"
                onClick={handleMarkResolved}
                className="bg-white/[0.05] border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.09] text-gray-200 hover:text-white rounded-lg px-4 py-1.5 text-xs font-semibold transition-all cursor-pointer active:scale-95"
              >
                Mark Resolved
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
