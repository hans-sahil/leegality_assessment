import { Star } from "lucide-react";

type Props = {
  rating: number; // e.g. 4.3
  max?: number; // default 5
  size?: number;
  className?: string;
};

export function StarRating({
  rating,
  max = 5,
  size = 16,
  className = "",
}: Props) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {Array.from({ length: max }).map((_, i) => {
        const fillPercentage = Math.min(Math.max(rating - i, 0), 1);

        return (
          <div key={i} className="relative">
            {/* Empty Star */}
            <Star size={size} className="text-muted-foreground" />

            {/* Filled Star (clipped precisely) */}
            {fillPercentage > 0 && (
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${fillPercentage * 100}%` }}
              >
                <Star
                  size={size}
                  fill="currentColor"
                  className="text-yellow-500"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
