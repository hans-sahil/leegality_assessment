"use client";
import { ShoppingBag, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Product } from "../types/Product";

export function Header() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Debounce search
  useEffect(() => {
    if (!query.trim()) return;

    const delay = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${query}`,
        );
        const data = await res.json();
        setResults((data.products || []).slice(0, 5));
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(delay);
  }, [query]);

  // Outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setResults([]);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {" "}
        {/* Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="bg-brand-primary w-9 h-9 rounded-xl text-white flex items-center justify-center shadow-sm">
            <ShoppingBag size={18} strokeWidth={2.5} />
          </div>

          {/* Hide subtitle on mobile */}
          <div className="hidden sm:block leading-tight">
            <div className="font-semibold text-sm">Leegality Marketplace</div>
            <div className="text-[10px] uppercase text-muted-foreground">
              Curated goods
            </div>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <div ref={wrapperRef} className="relative w-full max-w-lg">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />

            <input
              value={query}
              onChange={(e) => {
                const value = e.target.value;
                setQuery(value);

                if (!value.trim()) {
                  setResults([]);
                }
              }}
              placeholder="Search products..."
              className="w-full h-11 pl-9 pr-4 rounded-xl 
              bg-muted/50 text-sm
              border border-transparent
              focus:outline-none 
              focus:bg-background
              focus:ring-2 focus:ring-brand-primary/30
              transition-all"
            />

            {/* Dropdown */}
            {query && (
              <div className="absolute top-full mt-2 w-full rounded-xl border border-border bg-background shadow-lg overflow-hidden z-50">
                {loading && (
                  <div className="p-4 text-sm text-muted-foreground">
                    Searching...
                  </div>
                )}

                {!loading && results.length === 0 && (
                  <div className="p-4 text-sm text-muted-foreground">
                    No products found
                  </div>
                )}

                {!loading &&
                  results.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        router.push(`/product/${item.id}`);
                        setQuery("");
                        setResults([]);
                      }}
                      className="flex items-center gap-3 w-full px-4 py-3 hover:bg-muted transition text-left"
                    >
                      <div className="relative w-10 h-10">
                        <Image
                          src={item.thumbnail}
                          alt={item.title}
                          fill
                          className="object-contain rounded"
                        />
                      </div>

                      <div className="flex-1">
                        <p className="text-sm font-medium line-clamp-1">
                          {item.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          ${item.price}
                        </p>
                      </div>
                    </button>
                  ))}
              </div>
            )}
          </div>
        </div>
        <div className="w-9 sm:w-32" />
      </div>
    </header>
  );
}
