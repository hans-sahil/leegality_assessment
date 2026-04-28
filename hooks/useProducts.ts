import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/api";

export function useProducts(filters: any) {
  return useQuery({
    queryKey: ["products", filters],
    queryFn: () => fetchProducts(filters),
    staleTime: 1000 * 60 * 2,
  });
}