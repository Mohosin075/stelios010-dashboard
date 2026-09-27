"use client";

import React, { memo } from "react";
import Link from "next/link";
import { BionicProductItem, ProductType } from "@/types/product";
import { cn } from "@/lib/utils";

interface ProductTableProps {
  products: BionicProductItem[];
  className?: string;
}

const getProductTypeBadge = (type: ProductType) => {
  switch (type) {
    case "Bionic Hand":
      return "bg-[#0D261E] text-[#10B981] border-[#10B981]/20";
    case "Bionic Knee":
      return "bg-[#122238] text-[#38BDF8] border-[#38BDF8]/20";
    case "Bionic Foot":
      return "bg-[#28220F] text-[#FACC15] border-[#FACC15]/20";
    case "Bionic Elbow":
      return "bg-[#231A38] text-[#C084FC] border-[#C084FC]/20";
    default:
      return "bg-[#1C1E24] text-gray-300 border-gray-700/40";
  }
};

export const ProductTable = memo(function ProductTable({
  products,
  className,
}: ProductTableProps) {
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
            <th className="py-3.5 px-5">PRODUCT</th>
            <th className="py-3.5 px-4">PIONEER</th>
            <th className="py-3.5 px-4">LIMB CATEGORY</th>
            <th className="py-3.5 px-4">PRODUCT TYPE</th>
            <th className="py-3.5 px-4">ACTIVE USERS</th>
            <th className="py-3.5 px-4">STATUS</th>
            <th className="py-3.5 px-5 text-left">ACTIONS</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#1A1C22]">
          {products.length === 0 ? (
            <tr>
              <td colSpan={7} className="py-8 text-center text-gray-500">
                No products found matching your filters.
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-white/[0.015] transition-colors"
              >
                {/* Product Name with Diamond Icon */}
                <td className="py-3.5 px-5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#20232A] border border-gray-700/40 flex items-center justify-center shrink-0">
                      <div className="w-3.5 h-3.5 border border-gray-400 rotate-45" />
                    </div>
                    <p className="font-semibold text-white tracking-tight text-xs sm:text-sm">
                      {product.name}
                    </p>
                  </div>
                </td>

                {/* Pioneer */}
                <td className="py-3.5 px-4 text-gray-300">{product.pioneerName}</td>

                {/* Limb Category */}
                <td className="py-3.5 px-4 text-gray-300">{product.limbCategory}</td>

                {/* Product Type */}
                <td className="py-3.5 px-4">
                  <span
                    className={cn(
                      "inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-medium border",
                      getProductTypeBadge(product.productType)
                    )}
                  >
                    {product.productType}
                  </span>
                </td>

                {/* Active Users (Yellow font matching screenshot) */}
                <td className="py-3.5 px-4 font-bold text-xs text-[#FFC800]">
                  {product.activeUsers}
                </td>

                {/* Status */}
                <td className="py-3.5 px-4">
                  {product.status === "Active" ? (
                    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-medium bg-[#0D261E] text-[#10B981] border border-[#10B981]/20">
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-medium bg-[#1C1E24] text-gray-400 border border-gray-700/40">
                      Inactive
                    </span>
                  )}
                </td>

                {/* Actions */}
                <td className="py-3.5 px-5">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/products/${product.id}`}
                      className="bg-[#161820] border border-[#272A36] hover:border-gray-500 text-white rounded-lg px-3.5 py-1 text-xs font-medium transition-all hover:bg-[#1E212B] inline-block cursor-pointer"
                    >
                      View
                    </Link>
                    <Link
                      href={`/products/${product.id}`}
                      className="bg-[#161820] border border-[#272A36] hover:border-gray-500 text-white rounded-lg px-3.5 py-1 text-xs font-medium transition-all hover:bg-[#1E212B] inline-block cursor-pointer"
                    >
                      Edit
                    </Link>
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

export default ProductTable;
