"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  currentPage: number;
  totalPages: number;
};

export function Pagination({ currentPage, totalPages }: Props) {
  const searchParams = useSearchParams();

  const createPageLink = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    return `/?${params.toString()}`;
  };

  return (
    <div className="flex justify-center mt-12">
      <div className="flex items-center gap-2 bg-background/70 backdrop-blur px-4 py-2 rounded-2xl shadow-sm border border-border">
        {/* Prev */}
        <Link
          href={createPageLink(currentPage - 1)}
          className={`px-3 py-2 rounded-lg flex items-center gap-1 text-sm transition
            ${
              currentPage === 1
                ? "pointer-events-none opacity-40"
                : "hover:bg-muted"
            }`}
        >
          <ChevronLeft size={16} />
        </Link>

        {/* Pages */}
        {Array.from({ length: totalPages })
          .slice(0, 5)
          .map((_, i) => {
            const page = i + 1;

            return (
              <Link
                key={page}
                href={createPageLink(page)}
                className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm
                ${
                  currentPage === page
                    ? "bg-brand-primary text-white shadow"
                    : "hover:bg-muted"
                }`}
              >
                {page}
              </Link>
            );
          })}

        {/* Next */}
        <Link
          href={createPageLink(currentPage + 1)}
          className={`px-3 py-2 rounded-lg flex items-center gap-1 text-sm transition
            ${
              currentPage === totalPages
                ? "pointer-events-none opacity-40"
                : "hover:bg-muted"
            }`}
        >
          <ChevronRight size={16} />
        </Link>
      </div>
    </div>
  );
}
