// lib/api.ts
import { ProductFilters } from "@/types/FilterTypes";
import { Product } from "@/types/Product";

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