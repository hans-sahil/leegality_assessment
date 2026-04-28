"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  images: string[];
  thumbnail: string;
  title: string;
};

export function ProductGallery({ images, thumbnail, title }: Props) {
  const allImages = images?.length ? images : [thumbnail];
  const [active, setActive] = useState(0);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square rounded-2xl bg-muted/50 border border-border overflow-hidden flex items-center justify-center p-8">
        <Image
          src={allImages[active]}
          alt={title}
          fill
          className="object-contain transition-all"
        />
      </div>

      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {allImages.slice(0, 5).map((img, i) => (
            <button
              title="button"
              key={i}
              onClick={() => setActive(i)}
              className={`relative aspect-square rounded-lg p-2 bg-muted/50 transition border
                ${
                  i === active
                    ? "border-brand-primary border-2"
                    : "border-border hover:border-border/40"
                }`}
            >
              <Image src={img} alt="" fill className="object-contain" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
