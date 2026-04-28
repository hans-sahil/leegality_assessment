// lib/api.ts
import { ProductFilters } from "@/src/types/FilterTypes";
import { Product } from "@/src/types/Product";

const LIMIT = 20;

export async function fetchProducts(filters: ProductFilters) {
  const page = Number(filters.page || 1);
  const skip = (page - 1) * LIMIT;

  let url = `https://dummyjson.com/products?limit=${LIMIT}&skip=${skip}`;

  if (filters.category && filters.category !== "all") {
    url = `https://dummyjson.com/products/category/${filters.category}?limit=${LIMIT}&skip=${skip}`;
  }

  const res = await fetch(url);
  const data = await res.json();
  const products: Product[] = data.products;
  return {
    products,
    total: data.total,
  };
}