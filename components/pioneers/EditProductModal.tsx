"use client";

import React, { memo, useState, useEffect } from "react";
import { X } from "lucide-react";
import { PioneerProduct } from "@/types/pioneer";

interface EditProductModalProps {
  isOpen: boolean;
  product: PioneerProduct | null;
  onClose: () => void;
  onSave: (updated: PioneerProduct) => void;
}

export const EditProductModal = memo(function EditProductModal({
  isOpen,
  product,
  onClose,
  onSave,
}: EditProductModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    status: "Active" as "Active" | "Inactive",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        category: product.category,
        status: product.status,
      });
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...product,
      name: formData.name,
      category: formData.category,
      status: formData.status,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-md bg-[#131418] border border-[#20222B] rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#20222B]">
          <h3 className="text-sm font-semibold text-white tracking-wide">
            Edit Product
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">
              Product Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-[#181A20] border border-[#262833] text-gray-200 rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#FFC800] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">
              Category
            </label>
            <input
              type="text"
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-[#181A20] border border-[#262833] text-gray-200 rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#FFC800] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as "Active" | "Inactive" })}
              className="w-full bg-[#181A20] border border-[#262833] text-gray-200 rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#FFC800] transition-colors"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-gray-300 hover:text-white bg-[#1A1C24] hover:bg-[#222530] border border-[#282B37] rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-black bg-[#FFC800] hover:bg-[#E5B400] rounded-lg transition-colors cursor-pointer"
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});

export default EditProductModal;
