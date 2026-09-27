"use client";

import React, { memo } from "react";
import { ChevronDown } from "lucide-react";

interface ProductFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  pioneer: string;
  onPioneerChange: (value: string) => void;
  pioneersList: string[];
}

export const ProductFilters = memo(function ProductFilters({
  searchQuery,
  onSearchChange,
  category,
  onCategoryChange,
  pioneer,
  onPioneerChange,
  pioneersList,
}: ProductFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 w-full">
      {/* Search Input */}
      <div className="relative w-full sm:w-64">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search products..."
          className="w-full bg-[#121316] border border-[#1E2026] text-gray-200 placeholder-gray-500 rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-[#FFC800] focus:ring-1 focus:ring-[#FFC800] transition-colors"
        />
      </div>

      {/* Category Dropdown */}
      <div className="relative">
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="appearance-none bg-[#121316] border border-[#1E2026] text-gray-300 rounded-lg pl-3.5 pr-8 py-2.5 text-xs focus:outline-none focus:border-[#FFC800] cursor-pointer hover:border-gray-600 transition-colors"
        >
          <option value="ALL">Category</option>
          <option value="Upper Limb">Upper Limb</option>
          <option value="Lower Limb">Lower Limb</option>
        </select>
        <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>

      {/* Pioneer Dropdown */}
      <div className="relative">
        <select
          value={pioneer}
          onChange={(e) => onPioneerChange(e.target.value)}
          className="appearance-none bg-[#121316] border border-[#1E2026] text-gray-300 rounded-lg pl-3.5 pr-8 py-2.5 text-xs focus:outline-none focus:border-[#FFC800] cursor-pointer hover:border-gray-600 transition-colors"
        >
          <option value="ALL">Pioneer</option>
          {pioneersList.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
    </div>
  );
});

export default ProductFilters;
