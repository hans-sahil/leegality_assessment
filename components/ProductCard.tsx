import Image from "next/image";
import { Star } from "lucide-react";
import Link from "next/link";
import { Product } from "../types/Product";

export function ProductCard({
  id,
  title,
  price,
  thumbnail,
  rating,
  reviews,
}: Product) {
  const fullStars = Math.floor(rating);

  return (
    <Link href={`/product/${id}`}>
      <div className="w-full group rounded-2xl bg-background p-4 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
        {/* Image */}
        <div className="relative w-full h-44 mb-4 overflow-hidden rounded-xl bg-muted/30">
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Title */}
        <h3 className="text-sm font-medium text-foreground line-clamp-2">
          {title}
        </h3>

        {/* Price + Rating */}
        <div className="flex items-center justify-between mt-3">
          <div className="text-lg font-semibold">${price}</div>

          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <div className="flex text-yellow-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={13}
                  fill={i < fullStars ? "currentColor" : "none"}
                />
              ))}
            </div>
            <span>({reviews.length})</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
