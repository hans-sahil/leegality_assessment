"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FiltersState = {
  page: number;
  category: string;
  brand: string;
  minPrice: string;
  maxPrice: string;
  sort: string;
};

type Props = {
  categories: Array<{ slug: string; name: string }>;
  brands: string[];
  filters: FiltersState;
  setFilters: (v: FiltersState) => void;
};

const ALL = "all";

export function Filters({ categories, brands, filters, setFilters }: Props) {
  const [open, setOpen] = useState({
    category: true,
    brand: true,
    price: true,
    sort: true,
  });

  const toggle = (key: keyof typeof open) => {
    setOpen((p) => ({ ...p, [key]: !p[key] }));
  };

  const update = (key: keyof FiltersState, value: string) => {
    setFilters({
      ...filters,
      [key]: value,
      page: 1,
    });
  };

  const toggleBrand = (brand: string) => {
    const current = filters.brand ? filters.brand.split(",") : [];

    const updated = current.includes(brand)
      ? current.filter((b) => b !== brand)
      : [...current, brand];

    update("brand", updated.join(","));
  };

  const selectedBrands = filters.brand ? filters.brand.split(",") : [];

  return (
    <aside className="w-full lg:w-72 shrink-0">
      <div className="rounded-2xl border bg-background p-5 space-y-6 shadow-sm">
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h2 className="font-semibold">Filters</h2>
          <button
            onClick={() =>
              setFilters({
                page: 1,
                category: "all",
                brand: "",
                minPrice: "",
                maxPrice: "",
                sort: "",
              })
            }
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Reset
          </button>
        </div>

        {/* CATEGORY */}
        <div>
          <button
            onClick={() => toggle("category")}
            className="flex justify-between w-full text-sm font-medium"
          >
            Category
            <ChevronDown
              className={open.category ? "rotate-180" : ""}
              size={16}
            />
          </button>

          {open.category && (
            <Select
              value={filters.category}
              onValueChange={(v) => update("category", v === ALL ? "all" : v)}
            >
              <SelectTrigger className="w-full mt-2">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value={ALL}>All Categories</SelectItem>

                {categories.map((c) => (
                  <SelectItem key={c.slug} value={c.slug}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        {/* BRAND */}
        <div>
          <button
            onClick={() => toggle("brand")}
            className="flex justify-between w-full text-sm font-medium"
          >
            Brand
            <ChevronDown className={open.brand ? "rotate-180" : ""} size={16} />
          </button>

          {open.brand && (
            <div className="mt-2 space-y-2 max-h-48 overflow-auto">
              {brands.map((b) => (
                <label key={b} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(b)}
                    onChange={() => toggleBrand(b)}
                  />
                  {b}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* PRICE */}
        <div>
          <button
            onClick={() => toggle("price")}
            className="flex justify-between w-full text-sm font-medium"
          >
            Price
            <ChevronDown className={open.price ? "rotate-180" : ""} size={16} />
          </button>

          {open.price && (
            <div className="flex gap-2 mt-2">
              <input
                type="number"
                placeholder="Min"
                value={filters.minPrice}
                onChange={(e) => update("minPrice", e.target.value)}
                className="w-full border rounded px-2 py-1 text-sm"
              />
              <input
                type="number"
                placeholder="Max"
                value={filters.maxPrice}
                onChange={(e) => update("maxPrice", e.target.value)}
                className="w-full border rounded px-2 py-1 text-sm"
              />
            </div>
          )}
        </div>

        {/* SORT */}
        <div>
          <button
            onClick={() => toggle("sort")}
            className="flex justify-between w-full text-sm font-medium"
          >
            Sort
            <ChevronDown className={open.sort ? "rotate-180" : ""} size={16} />
          </button>

          {open.sort && (
            <Select
              value={filters.sort}
              onValueChange={(v) => update("sort", v)}
            >
              <SelectTrigger className="w-full mt-2">
                <SelectValue placeholder="Default" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="price-asc">Low → High</SelectItem>
                <SelectItem value="price-desc">High → Low</SelectItem>
                <SelectItem value="rating-desc">Rating</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
      </div>
    </aside>
  );
}

// "use client";

// import { useRouter, useSearchParams } from "next/navigation";
// import { useMemo, useState } from "react";
// import { ChevronDown } from "lucide-react";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// type Props = {
//   categories: Array<{ slug: string; name: string }>;
//   brands: string[];
// };

// const ALL = "all";

// export function Filters({ categories, brands }: Props) {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const [openSections, setOpenSections] = useState({
//     category: true,
//     brand: true,
//     price: true,
//     sort: true,
//   });

//   const toggle = (key: keyof typeof openSections) => {
//     setOpenSections((prev) => ({
//       ...prev,
//       [key]: !prev[key],
//     }));
//   };

//   const updateParams = (updates: Record<string, string | null>) => {
//     const params = new URLSearchParams(searchParams.toString());

//     Object.entries(updates).forEach(([key, value]) => {
//       if (value) params.set(key, value);
//       else params.delete(key);
//     });

//     params.set("page", "1");
//     router.push(`/?${params.toString()}`);
//   };

//   const selectedBrands = useMemo(() => {
//     return searchParams.get("brand")?.split(",") || [];
//   }, [searchParams]);

//   const toggleBrand = (brand: string) => {
//     const current = selectedBrands;

//     const updated = current.includes(brand)
//       ? current.filter((b) => b !== brand)
//       : [...current, brand];

//     updateParams({
//       brand: updated.length ? updated.join(",") : null,
//     });
//   };

//   const minPrice = searchParams.get("minPrice") || "";
//   const maxPrice = searchParams.get("maxPrice") || "";

//   const categoryValue = searchParams.get("category") || ALL;
//   const sortValue = searchParams.get("sort") || ALL;

//   return (
//     <aside className="w-full lg:w-72 shrink-0">
//       <div className="rounded-2xl border bg-background p-5 space-y-6 shadow-sm">
//         {/* Header */}
//         <div className="flex items-center justify-between">
//           <h2 className="font-semibold text-base">Filters</h2>

//           <button
//             onClick={() => router.push("/")}
//             className="text-xs text-muted-foreground hover:text-foreground"
//           >
//             Reset
//           </button>
//         </div>

//         {/* CATEGORY */}
//         <div className="space-y-2">
//           <button
//             onClick={() => toggle("category")}
//             className="flex items-center justify-between w-full text-sm font-medium"
//           >
//             Category
//             <ChevronDown
//               size={16}
//               className={`transition ${
//                 openSections.category ? "rotate-180" : ""
//               }`}
//             />
//           </button>

//           {openSections.category && (
//             <Select
//               value={categoryValue}
//               onValueChange={(value) =>
//                 updateParams({
//                   category: value === ALL ? null : value,
//                 })
//               }
//             >
//               <SelectTrigger className="w-full">
//                 <SelectValue placeholder="All Categories" />
//               </SelectTrigger>

//               <SelectContent>
//                 <SelectItem value={ALL}>All Categories</SelectItem>

//                 {categories.map((cat) => (
//                   <SelectItem key={cat.slug} value={cat.slug}>
//                     {cat.name}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           )}
//         </div>

//         {/* BRAND */}
//         <div className="space-y-2">
//           <button
//             onClick={() => toggle("brand")}
//             className="flex items-center justify-between w-full text-sm font-medium"
//           >
//             Brand
//             <ChevronDown
//               size={16}
//               className={`transition ${openSections.brand ? "rotate-180" : ""}`}
//             />
//           </button>

//           {openSections.brand && (
//             <div className="space-y-2 max-h-48 overflow-auto pr-1">
//               {brands.map((brand) => (
//                 <label
//                   key={brand}
//                   className="flex items-center gap-2 text-sm cursor-pointer hover:bg-muted/40 px-2 py-1 rounded"
//                 >
//                   <input
//                     type="checkbox"
//                     checked={selectedBrands.includes(brand)}
//                     onChange={() => toggleBrand(brand)}
//                     className="accent-primary"
//                   />
//                   {brand}
//                 </label>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* PRICE */}
//         <div className="space-y-2">
//           <button
//             onClick={() => toggle("price")}
//             className="flex items-center justify-between w-full text-sm font-medium"
//           >
//             Price Range
//             <ChevronDown
//               size={16}
//               className={`transition ${openSections.price ? "rotate-180" : ""}`}
//             />
//           </button>

//           {openSections.price && (
//             <div className="flex gap-2">
//               <input
//                 type="number"
//                 placeholder="Min"
//                 value={minPrice}
//                 className="w-full border rounded-lg px-2 py-2 text-sm"
//                 onChange={(e) =>
//                   updateParams({ minPrice: e.target.value || null })
//                 }
//               />
//               <input
//                 type="number"
//                 placeholder="Max"
//                 value={maxPrice}
//                 className="w-full border rounded-lg px-2 py-2 text-sm"
//                 onChange={(e) =>
//                   updateParams({ maxPrice: e.target.value || null })
//                 }
//               />
//             </div>
//           )}
//         </div>

//         {/* SORT */}
//         <div className="space-y-2">
//           <button
//             onClick={() => toggle("sort")}
//             className="flex items-center justify-between w-full text-sm font-medium"
//           >
//             Sort By
//             <ChevronDown
//               size={16}
//               className={`transition ${openSections.sort ? "rotate-180" : ""}`}
//             />
//           </button>

//           {openSections.sort && (
//             <Select
//               value={sortValue}
//               onValueChange={(value) =>
//                 updateParams({ sort: value === ALL ? null : value })
//               }
//             >
//               <SelectTrigger className="w-full">
//                 <SelectValue placeholder="Default" />
//               </SelectTrigger>

//               <SelectContent>
//                 <SelectItem value={ALL}>Default</SelectItem>
//                 <SelectItem value="price-asc">Price: Low → High</SelectItem>
//                 <SelectItem value="price-desc">Price: High → Low</SelectItem>
//                 <SelectItem value="rating-desc">Rating</SelectItem>
//               </SelectContent>
//             </Select>
//           )}
//         </div>
//       </div>
//     </aside>
//   );
// }
