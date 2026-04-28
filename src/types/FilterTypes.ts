export type ProductFilters = {
  page?: number;
  category?: string;
  brand?: string[];
  minPrice?: string;
  maxPrice?: string;
  sort?: "price-asc" | "price-desc" | "rating-desc" | "";
};