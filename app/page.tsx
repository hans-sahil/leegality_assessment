"use client";

import { useState, useMemo } from "react";
import { SlidersHorizontal } from "lucide-react";

import { useDebounce } from "@/hooks/useDebounce";
import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";

import { ProductCard } from "@/src/components/ProductCard";
import { Filters } from "@/src/components/SidebarFilters";
import { Pagination } from "@/src/components/Pagination";
import { Product } from "@/src/types/Product";
import SkeletonGrid from "@/components/skeletons/ProductCardGrid";

type FiltersState = {
  page: number;
  category: string;
  brand: string[];
  minPrice: string;
  maxPrice: string;
  sort: "" | "price-asc" | "price-desc" | "rating-desc";
};

const initialFilters: FiltersState = {
  page: 1,
  category: "all",
  brand: [],
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
  const [filters, setFilters] = useState(initialFilters);
  const [showFilters, setShowFilters] = useState(false);

  const debouncedFilters = useDebounce(filters, 400);
  const { data, isLoading } = useProducts(debouncedFilters);
  const { data: categories } = useCategories();

  const products = data?.products ?? [];

  const totalPages = useMemo(
    () => Math.ceil((data?.total ?? 0) / 8),
    [data?.total],
  );

  const brands = Array.from(
    new Set(data?.products.map((p: Product) => p.brand).filter(Boolean)),
  ) as string[];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
      {/* MOBILE FILTER BUTTON */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setShowFilters(true)}
          className="flex items-center gap-2 px-4 py-2 border rounded-lg bg-background shadow-sm"
        >
          <SlidersHorizontal size={16} />
          Filters
        </button>
      </div>

      <div className="flex gap-8">
        {/* DESKTOP FILTER */}
        <div className="hidden lg:block">
          <Filters
            categories={categories ?? []}
            brands={brands}
            filters={filters}
            setFilters={setFilters}
          />
        </div>

        {/* MOBILE FILTER DRAWER */}
        {showFilters && (
          <div className="fixed inset-0 z-50 bg-black/40 lg:hidden">
            <div className="absolute left-0 top-0 h-full w-80 bg-background p-4 overflow-y-auto">
              <Filters
                categories={categories ?? []}
                brands={brands}
                filters={filters}
                setFilters={setFilters}
              />
              <button
                onClick={() => setShowFilters(false)}
                className="mt-4 w-full py-2 bg-primary text-white rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* PRODUCTS */}
        <div className="flex-1">
          {isLoading ? (
            <SkeletonGrid />
          ) : products.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                {products.map((p) => (
                  <ProductCard key={p.id} {...p} />
                ))}
              </div>
              <Pagination
                currentPage={filters.page}
                totalPages={totalPages}
                onPageChange={(page) =>
                  setFilters((prev) => ({
                    ...prev,
                    page,
                  }))
                }
              />{" "}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
