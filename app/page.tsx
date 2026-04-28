"use client";

import { useState, useMemo } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "@/src/components/ProductCard";
import { Filters } from "@/src/components/SidebarFilters";
import { Pagination } from "@/src/components/Pagination";
import { useCategories } from "@/hooks/useCategories";
import { Product } from "@/src/types/Product";

type FiltersState = {
  page: number;
  category: string;
  brand: string;
  minPrice: string;
  maxPrice: string;
  sort: string;
};

const initialFilters: FiltersState = {
  page: 1,
  category: "all",
  brand: "",
  minPrice: "",
  maxPrice: "",
  sort: "",
};

function EmptyState() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
      <div className="text-4xl mb-2">🛍️</div>
      <h2 className="text-lg font-semibold">No products found</h2>
      <p className="text-muted-foreground text-sm">
        Try adjusting filters or clearing them
      </p>
    </div>
  );
}

export default function Home() {
  const [filters, setFilters] = useState<FiltersState>(initialFilters);

  const debouncedFilters = useDebounce(filters, 400);
  const { data, isLoading } = useProducts(debouncedFilters);
  const { data: categories } = useCategories();

  const products = data?.products ?? [];

  console.log("PRODUCTS : ", data);
  const totalPages = useMemo(
    () => Math.ceil((data?.total ?? 0) / 8),
    [data?.total],
  );

  return (
    <div className="container mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8">
      <Filters
        categories={categories ?? []}
        brands={
          Array.from(
            new Set(
              data?.products.map((p: Product) => p.brand).filter(Boolean),
            ),
          ) as string[]
        }
        filters={filters}
        setFilters={setFilters}
      />

      <div className="flex-1">
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : products.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr">
              {products.map((p) => (
                <ProductCard key={p.id} {...p} />
              ))}
            </div>

            <Pagination currentPage={filters.page} totalPages={totalPages} />
          </>
        )}
      </div>
    </div>
  );
}
