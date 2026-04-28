import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/api";
import { ProductFilters } from "@/src/types/FilterTypes";

export function useProducts(filters: ProductFilters) {
  return useQuery({
    queryKey: ["products", filters],
    queryFn: () => fetchProducts(filters),
    staleTime: 1000 * 60 * 2,
  });
}