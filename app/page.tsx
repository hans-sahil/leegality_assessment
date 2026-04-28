"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";

import { ProductCard } from "@/src/components/ProductCard";
import { Filters } from "@/src/components/SidebarFilters";
import { Pagination } from "@/src/components/Pagination";
import { Product } from "@/src/types/Product";
import SkeletonGrid from "@/components/skeletons/ProductCardGrid";
import { ProductFilters } from "@/src/types/FilterTypes";

const LIMIT = 20;

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
  const searchParams = useSearchParams();
  const router = useRouter();

  const [showFilters, setShowFilters] = useState(false);
  const [brands, setBrands] = useState<string[]>([]);

  // READ FILTERS FROM URL
  const filters: ProductFilters = {
    page: Number(searchParams.get("page") || 1),
    category: searchParams.get("category") || "all",
    brand: searchParams.get("brand")
      ? searchParams.get("brand")!.split(",")
      : [],
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    sort:
      (searchParams.get("sort") as
        | ""
        | "price-asc"
        | "price-desc"
        | "rating-desc") || "",
  };

  // UPDATE PARAMS
  const updateParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value && value !== "") params.set(key, value);
      else params.delete(key);
    });

    // reset page if filters change
    if (!("page" in updates)) {
      params.set("page", "1");
    }

    router.push(`/?${params.toString()}`);
  };

  const { data, isLoading } = useProducts(filters);
  const { data: categories } = useCategories();

  const filteredProductsWithTotalCount = useMemo(() => {
    let products: Product[] = data ? (data.products as Product[]) : [];

    // ⚠️ IMPORTANT:
    // `totalCount` comes from the backend and represents total products for the selected category only.
    // Client-side filters (brand, price range, sorting) are applied AFTER fetching,
    // so this count does NOT reflect the filtered results. Dummy json api doesn't have
    // support for these filterings

    // Because of this, pagination may show inconsistent page counts
    // (e.g., fewer products displayed than expected on some pages).

    const totalCount = data?.total ?? 0;
    // BRAND FILTER
    if (filters.brand && filters.brand.length > 0) {
      const brands = filters.brand || [];
      products = products.filter((p) =>
        p.brand ? brands.includes(p.brand) : false,
      );
    }

    // PRICE VALIDATION
    const min = filters.minPrice !== "" ? Number(filters.minPrice) : null;
    const max = filters.maxPrice !== "" ? Number(filters.maxPrice) : null;

    if (min !== null && !isNaN(min)) {
      products = products.filter((p) => p.price >= min);
    }

    if (max !== null && !isNaN(max)) {
      products = products.filter((p) => p.price <= max);
    }

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

    return {
      products,
      total: totalCount,
    };
    // eslint-disable-next-line react-hooks/use-memo, react-hooks/exhaustive-deps
  }, [data, JSON.stringify(filters)]);

  const products = filteredProductsWithTotalCount.products;

  const totalPages = useMemo(
    () => Math.ceil(filteredProductsWithTotalCount.total / LIMIT),
    [filteredProductsWithTotalCount],
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBrands([]); // reset when category changes
    updateParams({ brand: null, page: "1" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.category]);

  useEffect(() => {
    if (!data?.products) return;

    const newBrands = Array.from(
      new Set(data.products.map((p: Product) => p.brand).filter(Boolean)),
    ) as string[];

    // this is not a vry good solution to get the brands but we
    // don't have any api support of fetching the brands across a category
    // Also I have mentioned an issue regarding this brands in the Readme.md file
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBrands((prev) => {
      const merged = new Set([...prev, ...newBrands]);
      return Array.from(merged);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(data?.products)]);

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
        <div className="hidden lg:block relative">
          <div className="sticky top-25">
            <Filters
              categories={categories ?? []}
              brands={brands}
              filters={filters}
              updateParams={updateParams}
            />
          </div>
        </div>

        {/* MOBILE FILTER DRAWER */}
        {showFilters && (
          <div className="fixed inset-0 z-50 bg-black/40 lg:hidden">
            <div className="absolute left-0 top-0 h-full w-80 bg-background p-4 overflow-y-auto">
              <Filters
                categories={categories ?? []}
                brands={brands}
                filters={filters}
                updateParams={updateParams}
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
                currentPage={filters.page as number}
                totalPages={totalPages}
                onPageChange={(page) => updateParams({ page: String(page) })}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
