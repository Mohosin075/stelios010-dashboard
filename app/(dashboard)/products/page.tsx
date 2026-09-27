"use client";

import React, { useState, useMemo } from "react";
import { ProductFilters } from "@/components/products/ProductFilters";
import { ProductTable } from "@/components/products/ProductTable";
import { Pagination } from "@/components/ui/Pagination";
import { MOCK_PRODUCTS_DATA } from "@/constants/productsData";
import { BionicProductItem } from "@/types/product";

const ITEMS_PER_PAGE = 6;

export default function ProductsPage() {
  const [products] = useState<BionicProductItem[]>(MOCK_PRODUCTS_DATA);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [pioneerFilter, setPioneerFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);

  // Extract unique pioneers for filter dropdown
  const pioneersList = useMemo(() => {
    const unique = Array.from(new Set(products.map((p) => p.pioneerName)));
    return unique.sort();
  }, [products]);

  // Filter products
  const filteredList = useMemo(() => {
    return products.filter((item) => {
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesPioneer = item.pioneerName.toLowerCase().includes(query);
        const matchesType = item.productType.toLowerCase().includes(query);
        if (!matchesName && !matchesPioneer && !matchesType) return false;
      }

      // Category filter
      if (categoryFilter !== "ALL" && item.limbCategory !== categoryFilter) {
        return false;
      }

      // Pioneer filter
      if (pioneerFilter !== "ALL" && item.pioneerName !== pioneerFilter) {
        return false;
      }

      return true;
    });
  }, [products, searchQuery, categoryFilter, pioneerFilter]);

  // Pagination calculations
  const totalItems = filteredList.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const paginatedList = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredList.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredList, currentPage]);

  return (
    <div className="w-full space-y-4">
      {/* 1. Filters Row */}
      <ProductFilters
        searchQuery={searchQuery}
        onSearchChange={(val) => {
          setSearchQuery(val);
          setCurrentPage(1);
        }}
        category={categoryFilter}
        onCategoryChange={(val) => {
          setCategoryFilter(val);
          setCurrentPage(1);
        }}
        pioneer={pioneerFilter}
        onPioneerChange={(val) => {
          setPioneerFilter(val);
          setCurrentPage(1);
        }}
        pioneersList={pioneersList}
      />

      {/* 2. Products Table */}
      <ProductTable products={paginatedList} />

      {/* 3. Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={setCurrentPage}
        entityName="products"
      />
    </div>
  );
}
