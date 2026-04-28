"use client";

import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  categories: Array<{ slug: string; name: string }>;
};

export function Filters({ categories }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) params.set(key, value);
    else params.delete(key);

    params.set("page", "1"); // reset pagination on filter

    router.push(`/?${params.toString()}`);
  };

  console.log("CATEGORIES : ", categories);

  return (
    <div className="w-64 shrink-0 space-y-6">
      {/* Category */}
      <div>
        <h3 className="font-semibold mb-3 text-sm">Category</h3>
        <div className="space-y-2 max-h-60 overflow-auto pr-1">
          {categories.map((cat, idx) => (
            <button
              key={`${cat.name}_${idx}`}
              onClick={() => updateParam("category", cat.name)}
              className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition
                ${
                  searchParams.get("category") === cat.name
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h3 className="font-semibold mb-3 text-sm">Price</h3>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            className="w-full border rounded-lg px-2 py-1 text-sm"
            onBlur={(e) => updateParam("minPrice", e.target.value)}
          />
          <input
            type="number"
            placeholder="Max"
            className="w-full border rounded-lg px-2 py-1 text-sm"
            onBlur={(e) => updateParam("maxPrice", e.target.value)}
          />
        </div>
      </div>

      {/* Sorting */}
      <div>
        <h3 className="font-semibold mb-3 text-sm">Sort By</h3>
        <select
          title="sort-order"
          className="w-full border rounded-lg px-3 py-2 text-sm"
          onChange={(e) => updateParam("sort", e.target.value)}
          defaultValue={searchParams.get("sort") || ""}
        >
          <option value="">Default</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="rating-desc">Rating</option>
        </select>
      </div>

      {/* Clear Filters */}
      <button
        onClick={() => router.push("/")}
        className="w-full text-sm py-2 rounded-lg border hover:bg-muted transition"
      >
        Clear Filters
      </button>
    </div>
  );
}
