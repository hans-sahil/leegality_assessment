"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function Pagination({ currentPage, totalPages, onPageChange }: Props) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }).slice(
    Math.max(0, currentPage - 3),
    Math.min(totalPages, currentPage + 2),
  );

  return (
    <div className="flex justify-center mt-12">
      <div className="flex items-center gap-2 bg-background/70 backdrop-blur px-4 py-2 rounded-2xl shadow-sm border border-border">
        {/* Prev */}
        <button
          title="previous"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 rounded-lg flex items-center text-sm transition disabled:opacity-40 hover:bg-muted"
        >
          <ChevronLeft size={16} />
        </button>

        {/* Pages */}
        {pages.map((_, idx) => {
          const page = Math.max(1, currentPage - 2) + idx;

          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm
                ${
                  currentPage === page
                    ? "bg-brand-primary text-white shadow"
                    : "hover:bg-muted"
                }`}
            >
              {page}
            </button>
          );
        })}

        {/* Next */}
        <button
          title="Next"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 rounded-lg flex items-center text-sm transition disabled:opacity-40 hover:bg-muted"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
