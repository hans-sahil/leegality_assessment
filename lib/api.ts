// lib/api.ts
import { Product } from "@/src/types/Product";

const LIMIT = 8;

export async function fetchProducts(filters: Record<string, any>) {
  const page = Number(filters.page || 1);
  const skip = (page - 1) * LIMIT;

  let url = `https://dummyjson.com/products?limit=${LIMIT}&skip=${skip}`;

  if (filters.category && filters.category !== "all") {
    url = `https://dummyjson.com/products/category/${filters.category}?limit=${LIMIT}&skip=${skip}`;
  }

  const res = await fetch(url);
  const data = await res.json();

  let products: Product[] = data.products;

  console.log("PRODUCTS AFTER CALLING THE API ",products)

  // ✅ BRAND FILTER
  if (filters.brand) {
    const brands = filters.brand.split(",");
    products = products.filter((p) =>
      p.brand ? brands.includes(p.brand) : false
    );
  }

  console.log("PROD AFTER BRAND : ",products)

  // ✅ PRICE VALIDATION (FIXED)
  const min =
  filters.minPrice !== "" ? Number(filters.minPrice) : null;

  const max =
    filters.maxPrice !== "" ? Number(filters.maxPrice) : null;

  if (min !== null && !isNaN(min)) {
    products = products.filter((p) => p.price >= min);
  }

  if (max !== null && !isNaN(max)) {
    products = products.filter((p) => p.price <= max);
  }

    console.log("PROD AFTER MIN AND MAX PRICE : ",products)


  // SORT
  if (filters.sort === "price-asc") {
    products.sort((a, b) => a.price - b.price);
  }

  if (filters.sort === "price-desc") {
    products.sort((a, b) => b.price - a.price);
  }

  if (filters.sort === "rating-desc") {
    products.sort((a, b) => b.rating - a.rating);
  }

    console.log("PROD AFTER SOR : ",products)


  return {
    products,
    total: data.total,
  };
}