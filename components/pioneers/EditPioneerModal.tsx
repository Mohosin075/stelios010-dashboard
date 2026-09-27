"use client";

import React, { memo, useState, useEffect } from "react";
import { X } from "lucide-react";
import { PioneerItem } from "@/types/pioneer";

interface EditPioneerModalProps {
  isOpen: boolean;
  pioneer: PioneerItem;
  onClose: () => void;
  onSave: (updated: Partial<PioneerItem>) => void;
}

export const EditPioneerModal = memo(function EditPioneerModal({
  isOpen,
  pioneer,
  onClose,
  onSave,
}: EditPioneerModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    country: "",
    region: "",
    city: "",
    website: "",
  });

  useEffect(() => {
    if (pioneer) {
      setFormData({
        name: pioneer.name || "",
        bio: pioneer.bio || "",
        country: pioneer.country || "",
        region: pioneer.region || "",
        city: pioneer.city || "",
        website: pioneer.website || "",
      });
    }
  }, [pioneer]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-lg bg-[#131418] border border-[#20222B] rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#20222B]">
          <h3 className="text-sm font-semibold text-white tracking-wide">
            Edit Pioneer Information
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
              Company Name
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
              Short Bio
            </label>
            <textarea
              rows={3}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full bg-[#181A20] border border-[#262833] text-gray-200 rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#FFC800] transition-colors resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Country
              </label>
              <input
                type="text"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="w-full bg-[#181A20] border border-[#262833] text-gray-200 rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#FFC800] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Region
              </label>
              <input
                type="text"
                value={formData.region}
                onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                className="w-full bg-[#181A20] border border-[#262833] text-gray-200 rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#FFC800] transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                City
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full bg-[#181A20] border border-[#262833] text-gray-200 rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#FFC800] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Website
              </label>
              <input
                type="text"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="w-full bg-[#181A20] border border-[#262833] text-gray-200 rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#FFC800] transition-colors"
              />
            </div>
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});

export default EditPioneerModal;
