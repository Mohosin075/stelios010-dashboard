"use client";

import React, { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { MOCK_PIONEERS_DATA } from "@/constants/pioneersData";
import { PioneerItem, PioneerProduct } from "@/types/pioneer";
import { EditPioneerModal } from "@/components/pioneers/EditPioneerModal";
import { EditProductModal } from "@/components/pioneers/EditProductModal";
import { cn } from "@/lib/utils";

export default function PioneerDetailsPage() {
  const params = useParams();
  const pioneerId = params?.id as string;

  // Find initial pioneer or fallback to first
  const initialPioneer = useMemo(() => {
    return (
      MOCK_PIONEERS_DATA.find((p) => p.id === pioneerId) ||
      MOCK_PIONEERS_DATA[0]
    );
  }, [pioneerId]);

  const [pioneer, setPioneer] = useState<PioneerItem>(initialPioneer);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<PioneerProduct | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  }, []);

  const handleUpdatePioneer = useCallback(
    (updated: Partial<PioneerItem>) => {
      setPioneer((prev) => ({
        ...prev,
        ...updated,
      }));
      showToast("Company information updated successfully.");
    },
    [showToast]
  );

  const handleUpdateProduct = useCallback(
    (updatedProduct: PioneerProduct) => {
      setPioneer((prev) => ({
        ...prev,
        products: prev.products?.map((prod) =>
          prod.id === updatedProduct.id ? updatedProduct : prod
        ),
      }));
      showToast(`Product "${updatedProduct.name}" updated successfully.`);
    },
    [showToast]
  );

  const handleEditProductClick = useCallback((prod: PioneerProduct) => {
    setSelectedProduct(prod);
    setIsProductModalOpen(true);
  }, []);

  const productsList = pioneer.products || [];

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
          href="/pioneers"
          className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Pioneers</span>
        </Link>
      </div>

      {/* Header Profile Hero Card */}
      <div className="bg-[#121316] border border-[#1E2026] rounded-xl p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-5">
        {/* Left: Avatar & Details */}
        <div className="flex items-start sm:items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-[#252110] text-[#FFC800] border border-[#FFC800]/30 flex items-center justify-center font-bold text-xl shrink-0 select-none">
            {pioneer.initials}
          </div>
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-xl font-bold text-white tracking-tight">
                {pioneer.name}
              </h1>
              {pioneer.verificationStatus === "Verified" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#252110] text-[#FFC800] border border-[#FFC800]/30 select-none">
                  <span className="text-[10px]">◆</span> Verified Pioneer
                </span>
              )}
            </div>

            <p className="text-xs text-gray-400">
              {pioneer.location} · {pioneer.website}
            </p>

            <div className="flex items-center gap-2 pt-0.5">
              {pioneer.claimedStatus === "Claimed" ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#0D261E] text-[#10B981] border border-[#10B981]/20">
                  Claimed
                </span>
              ) : (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#1C1E24] text-gray-400 border border-gray-700/40">
                  Unclaimed
                </span>
              )}

              <span
                className={cn(
                  "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                  pioneer.subscriptionStatus === "Active"
                    ? "bg-[#28220F] text-[#FACC15] border border-[#FACC15]/20"
                    : "bg-[#1C1E24] text-gray-400 border border-gray-700/40"
                )}
              >
                Subscription: {pioneer.subscriptionStatus}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => setIsEditModalOpen(true)}
            className="bg-[#161820] border border-[#272A36] hover:border-gray-500 text-white rounded-lg px-4 py-2 text-xs font-medium transition-all hover:bg-[#1E212B] cursor-pointer"
          >
            Edit Pioneer
          </button>
          <button
            type="button"
            onClick={() => {
              if (productsList.length > 0) {
                handleEditProductClick(productsList[0]);
              } else {
                showToast("No products found for this pioneer.");
              }
            }}
            className="bg-[#161820] border border-[#272A36] hover:border-gray-500 text-white rounded-lg px-4 py-2 text-xs font-medium transition-all hover:bg-[#1E212B] cursor-pointer"
          >
            Manage Products
          </button>
          <button
            type="button"
            onClick={() => showToast(`Subscription Plan: ${pioneer.subscriptionPlan || "Annual"}`)}
            className="text-gray-500 hover:text-gray-300 text-xs font-medium px-3 py-2 cursor-pointer transition-colors"
          >
            View Subscription
          </button>
        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Column: Company Information */}
        <div className="bg-[#121316] border border-[#1E2026] rounded-xl p-5 md:p-6 space-y-4">
          <h2 className="text-sm font-semibold text-white tracking-wide">
            Company Information
          </h2>

          <div className="space-y-4 pt-1">
            <div>
              <p className="text-[11px] font-medium text-gray-400">Name</p>
              <p className="text-xs text-gray-200 mt-1">{pioneer.name}</p>
            </div>

            <div>
              <p className="text-[11px] font-medium text-gray-400">Short Bio</p>
              <p className="text-xs text-gray-200 mt-1 leading-relaxed">
                {pioneer.bio || "No description provided."}
              </p>
            </div>

            <div>
              <p className="text-[11px] font-medium text-gray-400">Country</p>
              <p className="text-xs text-gray-200 mt-1">{pioneer.country || "—"}</p>
            </div>

            <div>
              <p className="text-[11px] font-medium text-gray-400">Region</p>
              <p className="text-xs text-gray-200 mt-1">{pioneer.region || "—"}</p>
            </div>

            <div>
              <p className="text-[11px] font-medium text-gray-400">City</p>
              <p className="text-xs text-gray-200 mt-1">{pioneer.city || "—"}</p>
            </div>

            <div>
              <p className="text-[11px] font-medium text-gray-400">Website</p>
              <p className="text-xs text-gray-200 mt-1">{pioneer.website}</p>
            </div>
          </div>
        </div>

        {/* Right Column: Products & Subscription */}
        <div className="space-y-4">
          {/* Products Card */}
          <div className="bg-[#121316] border border-[#1E2026] rounded-xl p-5 md:p-6 space-y-3.5">
            <h2 className="text-sm font-semibold text-white tracking-wide">
              Products ({productsList.length})
            </h2>

            <div className="space-y-2.5 pt-1">
              {productsList.length === 0 ? (
                <p className="text-xs text-gray-500 py-3">No products available.</p>
              ) : (
                productsList.map((product) => (
                  <div
                    key={product.id}
                    className="bg-[#161820] border border-[#222530] rounded-xl p-3.5 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      {/* Product square icon with diamond glyph */}
                      <div className="w-9 h-9 rounded-lg bg-[#20232A] border border-gray-700/40 flex items-center justify-center shrink-0">
                        <div className="w-3 h-3 border border-gray-400 rotate-45" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-white">
                          {product.name}
                        </p>
                        <p className="text-[11px] text-gray-400">
                          {product.category}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#0D261E] text-[#10B981] border border-[#10B981]/20">
                        {product.status}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleEditProductClick(product)}
                        className="bg-[#161820] border border-[#272A36] hover:border-gray-500 text-white rounded-lg px-3 py-1 text-xs font-medium transition-all hover:bg-[#1E212B] cursor-pointer"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Subscription Card */}
          <div className="bg-[#121316] border border-[#1E2026] rounded-xl p-5 md:p-6 space-y-4">
            <h2 className="text-sm font-semibold text-white tracking-wide">
              Subscription
            </h2>

            <div className="divide-y divide-[#1A1C22] pt-1">
              <div className="py-2.5 flex items-center justify-between text-xs">
                <span className="text-gray-400">Plan</span>
                <span className="text-gray-200 font-medium">
                  {pioneer.subscriptionPlan || "Annual"}
                </span>
              </div>

              <div className="py-2.5 flex items-center justify-between text-xs">
                <span className="text-gray-400">Status</span>
                <span
                  className={cn(
                    "font-medium",
                    pioneer.subscriptionStatus === "Active"
                      ? "text-gray-200"
                      : "text-gray-400"
                  )}
                >
                  {pioneer.subscriptionStatus}
                </span>
              </div>

              <div className="py-2.5 flex items-center justify-between text-xs">
                <span className="text-gray-400">Start Date</span>
                <span className="text-gray-200 font-medium">
                  {pioneer.subscriptionStartDate || "2023-06-01"}
                </span>
              </div>

              <div className="py-2.5 flex items-center justify-between text-xs">
                <span className="text-gray-400">Renewal Date</span>
                <span className="text-gray-200 font-medium">
                  {pioneer.subscriptionRenewalDate || "2025-06-01"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Pioneer Modal */}
      <EditPioneerModal
        isOpen={isEditModalOpen}
        pioneer={pioneer}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleUpdatePioneer}
      />

      {/* Edit Product Modal */}
      <EditProductModal
        isOpen={isProductModalOpen}
        product={selectedProduct}
        onClose={() => setIsProductModalOpen(false)}
        onSave={handleUpdateProduct}
      />
    </div>
  );
}
