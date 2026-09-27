export type LimbCategory = "Upper Limb" | "Lower Limb";
export type ProductType = "Bionic Hand" | "Bionic Knee" | "Bionic Foot" | "Bionic Elbow";
export type ProductStatus = "Active" | "Inactive";

export interface BionicProductItem {
  id: string;
  name: string;
  pioneerName: string;
  limbCategory: LimbCategory;
  productType: ProductType;
  activeUsers: number;
  status: ProductStatus;
  description: string;
  tags: string[];
  verifiedReviewsCount: number;
  imageUrl?: string;
  videoUrl?: string;
}
