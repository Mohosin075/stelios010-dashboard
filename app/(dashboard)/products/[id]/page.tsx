"use client";

import React, { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { MOCK_PRODUCTS_DATA } from "@/constants/productsData";
import { BionicProductItem, LimbCategory, ProductType } from "@/types/product";
import { cn } from "@/lib/utils";

const LIMB_CATEGORIES: LimbCategory[] = ["Upper Limb", "Lower Limb"];
const PRODUCT_TYPES: ProductType[] = [
  "Bionic Hand",
  "Bionic Elbow",
  "Bionic Knee",
  "Bionic Foot",
];

const PIONEER_OPTIONS = [
  "Open Bionics",
  "Ottobock",
  "Össur",
  "Steeper Group",
];

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id as string;

  const initialProduct = useMemo(() => {
    return (
      MOCK_PRODUCTS_DATA.find((p) => p.id === productId) ||
      MOCK_PRODUCTS_DATA[0]
    );
  }, [productId]);

  const [product, setProduct] = useState<BionicProductItem>(initialProduct);
  const [name, setName] = useState(initialProduct.name);
  const [pioneerName, setPioneerName] = useState(initialProduct.pioneerName);
  const [description, setDescription] = useState(initialProduct.description);
  const [limbCategory, setLimbCategory] = useState<LimbCategory>(initialProduct.limbCategory);
  const [productType, setProductType] = useState<ProductType>(initialProduct.productType);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  React.useEffect(() => {
    setProduct(initialProduct);
    setName(initialProduct.name);
    setPioneerName(initialProduct.pioneerName);
    setDescription(initialProduct.description);
    setLimbCategory(initialProduct.limbCategory);
    setProductType(initialProduct.productType);
  }, [initialProduct]);

  const isDirty = useMemo(() => {
    return (
      name !== product.name ||
      pioneerName !== product.pioneerName ||
      description !== product.description ||
      limbCategory !== product.limbCategory ||
      productType !== product.productType
    );
  }, [name, pioneerName, description, limbCategory, productType, product]);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setProduct((prev) => ({
      ...prev,
      name,
      pioneerName,
      description,
      limbCategory,
      productType,
    }));
    showToast("Product changes saved successfully.");
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
          href="/products"
          className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Products</span>
        </Link>
      </div>

      {/* 2-Column Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Media & Voice of User Summary (approx 5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* 1. Product Media Card */}
          <div className="card-depth rounded-xl p-5 md:p-6 space-y-4 overflow-hidden">
            <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
            <h2 className="text-sm font-semibold text-white tracking-wide">
              Product Media
            </h2>

            {/* Upload product image box */}
            <div className="border border-dashed border-white/[0.1] rounded-xl p-8 flex flex-col items-center justify-center gap-2.5 hover:border-white/20 bg-[#0D0E12]/60 transition-colors cursor-pointer group">
              <div className="w-8 h-8 border border-white/20 group-hover:border-[#FFC800] rotate-45 flex items-center justify-center transition-colors" />
              <p className="text-xs text-gray-500 group-hover:text-gray-300 transition-colors">
                Upload product image
              </p>
            </div>

            {/* Upload product video box */}
            <div className="border border-dashed border-white/[0.1] rounded-xl p-6 flex flex-col items-center justify-center gap-2 hover:border-white/20 bg-[#0D0E12]/60 transition-colors cursor-pointer group">
              <p className="text-xs text-gray-500 group-hover:text-gray-300 transition-colors">
                Upload product video
              </p>
            </div>
          </div>

          {/* 2. Voice of User Summary Card */}
          <div className="card-depth rounded-xl p-5 md:p-6 space-y-4 overflow-hidden">
            <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
            <h2 className="text-sm font-semibold text-white tracking-wide">
              Voice of User Summary
            </h2>

            {/* Tag Pills */}
            <div className="flex flex-wrap gap-2 pt-1">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-[#FFC800]/10 text-[#FFC800] border border-[#FFC800]/30 shadow-[0_0_8px_rgba(255,200,0,0.1)] select-none"
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-xs text-gray-500 pt-2">
              {product.verifiedReviewsCount} verified reviews
            </p>
          </div>
        </div>

        {/* Right Column: Edit Product Form (approx 7 cols) */}
        <div className="lg:col-span-7">
          <div className="card-depth rounded-xl p-5 md:p-6 overflow-hidden">
            <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
            <h2 className="text-sm font-semibold text-white tracking-wide mb-5">
              Edit Product
            </h2>

            <form onSubmit={handleSave} className="space-y-5">
              {/* Product Name */}
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">
                  Product Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#161820] border border-[#232630] text-gray-200 rounded-lg px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#FFC800] transition-colors"
                />
              </div>

              {/* Pioneer Select */}
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">
                  Pioneer
                </label>
                <div className="relative">
                  <select
                    value={pioneerName}
                    onChange={(e) => setPioneerName(e.target.value)}
                    className="w-full appearance-none bg-[#161820] border border-[#232630] text-gray-200 rounded-lg px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#FFC800] cursor-pointer transition-colors"
                  >
                    {PIONEER_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Product Description */}
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">
                  Product Description
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-[#161820] border border-[#232630] text-gray-200 rounded-lg p-3 text-xs focus:outline-none focus:border-[#FFC800] transition-colors resize-none"
                />
              </div>

              {/* Limb Category Toggle Buttons */}
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">
                  Limb Category
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {LIMB_CATEGORIES.map((cat) => {
                    const isSelected = limbCategory === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setLimbCategory(cat)}
                        className={cn(
                          "py-3 px-4 rounded-xl text-xs font-semibold transition-all cursor-pointer text-center",
                          isSelected
                            ? "bg-[#252110] border border-[#FFC800] text-[#FFC800] shadow-xs"
                            : "bg-[#161820] border border-[#232630] text-gray-400 hover:text-gray-200 hover:bg-[#1A1D26]"
                        )}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Product Type 2x2 Grid Buttons */}
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">
                  Product Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {PRODUCT_TYPES.map((type) => {
                    const isSelected = productType === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setProductType(type)}
                        className={cn(
                          "py-3 px-4 rounded-xl text-xs font-semibold transition-all cursor-pointer text-center",
                          isSelected
                            ? "bg-[#252110] border border-[#FFC800] text-[#FFC800] shadow-xs"
                            : "bg-[#161820] border border-[#232630] text-gray-400 hover:text-gray-200 hover:bg-[#1A1D26]"
                        )}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Form Action Buttons */}
              <div className="flex items-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => router.push("/products")}
                  className="bg-white/[0.05] border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.09] text-gray-200 hover:text-white rounded-lg px-4 py-2 text-xs font-medium transition-all cursor-pointer active:scale-95"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!isDirty}
                  className={cn(
                    "text-xs font-semibold transition-all duration-150 rounded-lg active:scale-95",
                    isDirty
                      ? "px-5 py-2 text-black bg-[#FFC800] hover:bg-[#F5BF00] cursor-pointer shadow-[0_2px_12px_rgba(255,200,0,0.25)]"
                      : "text-gray-500 hover:text-gray-400 px-4 py-2 cursor-pointer border border-white/[0.06] bg-white/[0.02]"
                  )}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
