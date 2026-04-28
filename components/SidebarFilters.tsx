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
import { ProductFilters } from "../types/FilterTypes";

type Props = {
  categories: Array<{ slug: string; name: string }>;
  brands: string[];
  filters: ProductFilters;
  updateParams: (updates: Record<string, string | null>) => void;
};

const ALL = "all";

export function Filters({ categories, brands, filters, updateParams }: Props) {
  const [open, setOpen] = useState({
    category: true,
    brand: true,
    price: true,
    sort: true,
  });

  const [localMin, setLocalMin] = useState(filters.minPrice || "");
  const [localMax, setLocalMax] = useState(filters.maxPrice || "");

  const applyPrice = () => {
    updateParams({
      minPrice: localMin || null,
      maxPrice: localMax || null,
      page: "1",
    });
  };

  const toggleSection = (key: keyof typeof open) => {
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // helpers
  const selectedBrands = filters.brand ? filters.brand : [];

  const toggleBrand = (brand: string) => {
    const current = selectedBrands;

    const updated = current.includes(brand)
      ? current.filter((b) => b !== brand)
      : [...current, brand];

    updateParams({
      brand: updated.join(","),
      page: "1",
    });
  };

  const resetFilters = () => {
    updateParams({
      page: "1",
      category: null,
      brand: null,
      minPrice: null,
      maxPrice: null,
      sort: null,
    });
  };

  return (
    <aside className="w-full lg:w-72 shrink-0">
      <div className="rounded-2xl border bg-background p-5 space-y-6 shadow-sm">
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h2 className="font-semibold">Filters</h2>

          <button
            onClick={resetFilters}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Reset
          </button>
        </div>

        {/* CATEGORY */}
        <div>
          <button
            onClick={() => toggleSection("category")}
            className="flex justify-between w-full text-sm font-medium"
          >
            Category
            <ChevronDown
              size={16}
              className={open.category ? "rotate-180 transition" : "transition"}
            />
          </button>

          {open.category && (
            <Select
              value={filters.category || ALL}
              onValueChange={(v) =>
                updateParams({
                  category: v === ALL ? null : v,
                  page: "1",
                })
              }
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
        {brands.length > 0 && (
          <div>
            <button
              onClick={() => toggleSection("brand")}
              className="flex justify-between w-full text-sm font-medium"
            >
              Brand
              <ChevronDown
                size={16}
                className={open.brand ? "rotate-180 transition" : "transition"}
              />
            </button>

            {open.brand && (
              <div className="mt-2 space-y-2 max-h-48 overflow-auto">
                {brands.map((b) => (
                  <label
                    key={b}
                    className="flex items-center gap-2 text-sm cursor-pointer"
                  >
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
        )}

        {/* PRICE */}
        <div>
          <button
            onClick={() => toggleSection("price")}
            className="flex justify-between w-full text-sm font-medium"
          >
            Price
            <ChevronDown
              size={16}
              className={open ? "rotate-180 transition" : "transition"}
            />
          </button>

          {open.price && (
            <div className="flex flex-col gap-3 mt-2">
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={localMin}
                  onChange={(e) => setLocalMin(e.target.value)}
                  className="w-full border rounded px-2 py-1 text-sm"
                />

                <input
                  type="number"
                  placeholder="Max"
                  value={localMax}
                  onChange={(e) => setLocalMax(e.target.value)}
                  className="w-full border rounded px-2 py-1 text-sm"
                />
              </div>

              <button
                onClick={applyPrice}
                className="w-full bg-primary text-white py-2 rounded-lg text-sm hover:opacity-90"
              >
                Apply
              </button>
            </div>
          )}
        </div>

        {/* SORT */}
        <div>
          <button
            onClick={() => toggleSection("sort")}
            className="flex justify-between w-full text-sm font-medium"
          >
            Sort
            <ChevronDown
              size={16}
              className={open.sort ? "rotate-180 transition" : "transition"}
            />
          </button>

          {open.sort && (
            <Select
              value={filters.sort || ALL}
              onValueChange={(v) =>
                updateParams({
                  sort: v === ALL ? null : v,
                  page: "1",
                })
              }
            >
              <SelectTrigger className="w-full mt-2">
                <SelectValue placeholder="Default" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value={ALL}>Default</SelectItem>
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

// import { useState } from "react";
// import { ChevronDown } from "lucide-react";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// type FiltersState = {
//   page: number;
//   category: string;
//   brand: string[];
//   minPrice: string;
//   maxPrice: string;
//   sort: "price-asc" | "price-desc" | "rating-desc" | "";
// };

// type Props = {
//   categories: Array<{ slug: string; name: string }>;
//   brands: string[];
//   filters: FiltersState;
//   setFilters: React.Dispatch<React.SetStateAction<FiltersState>>;
// };

// const ALL = "all";

// export function Filters({ categories, brands, filters, setFilters }: Props) {
//   const [open, setOpen] = useState({
//     category: true,
//     brand: true,
//     price: true,
//     sort: true,
//   });

//   const [localMin, setLocalMin] = useState(filters.minPrice);
//   const [localMax, setLocalMax] = useState(filters.maxPrice);

//   const applyPrice = () => {
//     setFilters((prev) => ({
//       ...prev,
//       minPrice: localMin,
//       maxPrice: localMax,
//       page: 1,
//     }));
//   };

//   const toggle = (key: keyof typeof open) => {
//     setOpen((prev) => ({ ...prev, [key]: !prev[key] }));
//   };

//   // ✅ SAFE updater (no stale state bugs)
//   const update = (key: keyof FiltersState, value: string) => {
//     setFilters((prev) => ({
//       ...prev,
//       [key]: value,
//       page: 1,
//     }));
//   };

//   const toggleBrand = (brand: string) => {
//     setFilters((prev) => {
//       const current = prev.brand ?? [];

//       const updated = current.includes(brand)
//         ? current.filter((b) => b !== brand)
//         : [...current, brand];

//       return {
//         ...prev,
//         brand: updated,
//         page: 1,
//       };
//     });
//   };

//   const selectedBrands = filters.brand ? filters.brand : [];

//   const resetFilters = () =>
//     setFilters({
//       page: 1,
//       category: "all",
//       brand: [],
//       minPrice: "",
//       maxPrice: "",
//       sort: "",
//     });

//   return (
//     <aside className="w-full lg:w-72 shrink-0">
//       <div className="rounded-2xl border bg-background p-5 space-y-6 shadow-sm">
//         {/* HEADER */}
//         <div className="flex justify-between items-center">
//           <h2 className="font-semibold">Filters</h2>

//           <button
//             onClick={resetFilters}
//             className="text-xs text-muted-foreground hover:text-foreground"
//           >
//             Reset
//           </button>
//         </div>

//         {/* CATEGORY */}
//         <div>
//           <button
//             onClick={() => toggle("category")}
//             className="flex justify-between w-full text-sm font-medium"
//           >
//             Category
//             <ChevronDown
//               size={16}
//               className={open.category ? "rotate-180" : ""}
//             />
//           </button>

//           {open.category && (
//             <Select
//               value={filters.category}
//               onValueChange={(v) => update("category", v === ALL ? "all" : v)}
//             >
//               <SelectTrigger className="w-full mt-2">
//                 <SelectValue placeholder="All Categories" />
//               </SelectTrigger>

//               <SelectContent>
//                 <SelectItem value={ALL}>All Categories</SelectItem>

//                 {categories.map((c) => (
//                   <SelectItem key={c.slug} value={c.slug}>
//                     {c.name}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           )}
//         </div>

//         {/* BRAND */}
//         <div>
//           <button
//             onClick={() => toggle("brand")}
//             className="flex justify-between w-full text-sm font-medium"
//           >
//             Brand
//             <ChevronDown size={16} className={open.brand ? "rotate-180" : ""} />
//           </button>

//           {open.brand && (
//             <div className="mt-2 space-y-2 max-h-48 overflow-auto">
//               {brands.map((b) => (
//                 <label
//                   key={b}
//                   className="flex items-center gap-2 text-sm cursor-pointer"
//                 >
//                   <input
//                     type="checkbox"
//                     checked={selectedBrands.includes(b)}
//                     onChange={() => toggleBrand(b)}
//                   />
//                   {b}
//                 </label>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* PRICE */}
//         <div>
//           <button
//             onClick={() => toggle("price")}
//             className="flex justify-between w-full text-sm font-medium"
//           >
//             Price
//             <ChevronDown size={16} className={open.price ? "rotate-180" : ""} />
//           </button>

//           {open.price && (
//             <div className="flex flex-col gap-3 mt-2">
//               <div className="flex gap-2">
//                 <input
//                   type="number"
//                   placeholder="Min"
//                   value={localMin}
//                   onChange={(e) => setLocalMin(e.target.value)}
//                   className="w-full border rounded px-2 py-1 text-sm"
//                 />
//                 <input
//                   type="number"
//                   placeholder="Max"
//                   value={localMax}
//                   onChange={(e) => setLocalMax(e.target.value)}
//                   className="w-full border rounded px-2 py-1 text-sm"
//                 />
//               </div>

//               <button
//                 onClick={applyPrice}
//                 className="w-full bg-primary text-white py-2 rounded-lg text-sm hover:opacity-90"
//               >
//                 Apply
//               </button>
//             </div>
//           )}
//         </div>

//         {/* SORT */}
//         <div>
//           <button
//             onClick={() => toggle("sort")}
//             className="flex justify-between w-full text-sm font-medium"
//           >
//             Sort
//             <ChevronDown size={16} className={open.sort ? "rotate-180" : ""} />
//           </button>

//           {open.sort && (
//             <Select
//               value={filters.sort}
//               onValueChange={(v) => update("sort", v)}
//             >
//               <SelectTrigger className="w-full mt-2">
//                 <SelectValue placeholder="Default" />
//               </SelectTrigger>

//               <SelectContent>
//                 <SelectItem value="default">Default</SelectItem>
//                 <SelectItem value="price-asc">Low → High</SelectItem>
//                 <SelectItem value="price-desc">High → Low</SelectItem>
//                 <SelectItem value="rating-desc">Rating</SelectItem>
//               </SelectContent>
//             </Select>
//           )}
//         </div>
//       </div>
//     </aside>
//   );
// }
