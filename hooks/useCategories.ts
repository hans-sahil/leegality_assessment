import { useQuery } from "@tanstack/react-query";

async function getCategories() {
  const res = await fetch("https://dummyjson.com/products/categories");
  return res.json();
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
    staleTime: 1000 * 60 * 2,
  });
}