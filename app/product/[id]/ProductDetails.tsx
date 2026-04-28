import Link from "next/link";
import { ArrowLeft, AlertCircle, Package, Tag } from "lucide-react";
import { ProductGallery } from "@/components/ProductGallery";
import { Product } from "@/types/Product";
import { StarRating } from "@/components/StarRating";

async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`https://dummyjson.com/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
}

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  let product: Product | null = null;
  let error: string | null = null;

  try {
    const paramsRes = await params;
    product = await getProduct(paramsRes.id);
    console.log("PRODUCT : ", product);
  } catch (e: unknown) {
    if (e instanceof Error) {
      error = e.message;
    } else {
      error = "Something went wrong while fetching the product.";
    }
  }

  return (
    <div className="min-h-screen bg-background p-5 lg:px-16">
      <main className="container py-4">
        {/* Back */}
        <Link
          href="/"
          className="hover:bg-brand-primary inline-flex items-center text-sm mb-2 text-muted-foreground  hover:text-white transition py-2 px-3 rounded-md"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to listing
        </Link>

        {/* Error */}
        {error && (
          <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6 flex items-start gap-3 max-w-xl">
            <AlertCircle className="text-destructive mt-0.5" size={18} />
            <div>
              <p className="font-medium text-destructive">
                Couldn&apos;t load product
              </p>
              <p className="text-sm text-muted-foreground mt-1">{error}</p>
            </div>
          </div>
        )}

        {/* Content */}
        {product && (
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
            {/* Images */}
            <ProductGallery
              images={product.images}
              thumbnail={product.thumbnail}
              title={product.title}
            />

            {/* Info */}
            <div className="space-y-5">
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {product.tags?.length > 1 &&
                  product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-secondary"
                    >
                      <Tag size={12} /> {tag}
                    </span>
                  ))}

                {product.brand && (
                  <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-/10 text-brand-primary">
                    <Package size={12} /> {product.brand}
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="text-sm text-muted-foreground flex gap-2 items-center">
                <StarRating rating={product.rating} />{" "}
                {product.rating.toFixed(2)}
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 pt-2">
                <span className="text-4xl font-bold text-brand-primary tabular-nums">
                  $
                  {(
                    product.price *
                    (1 - product.discountPercentage / 100)
                  ).toFixed(2)}
                </span>

                {product.discountPercentage > 0 && (
                  <>
                    <span className="text-lg line-through text-muted-foreground">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="text-sm font-semibold text-brand-primary">
                      −{product.discountPercentage}%
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <div className="border-t border-border pt-5">
                <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                  Description
                </h2>
                <p className="text-foreground/80 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Meta */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="rounded-lg bg-muted/50 p-4">
                  <p className="text-xs text-muted-foreground">Brand</p>
                  <p className="font-medium mt-1">{product.brand || "—"}</p>
                </div>

                <div className="rounded-lg bg-muted/50 p-4">
                  <p className="text-xs text-muted-foreground">Category</p>
                  <p className="font-medium mt-1 capitalize">
                    {product.category}
                  </p>
                </div>

                <div className="rounded-lg bg-muted/50 p-4">
                  <p className="text-xs text-muted-foreground">Stock</p>
                  <p className="font-medium mt-1">{product.stock} units</p>
                </div>

                <div className="rounded-lg bg-muted/50 p-4">
                  <p className="text-xs text-muted-foreground">Rating</p>
                  <p className="font-medium mt-1">
                    {product.rating.toFixed(2)} / 5
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="border-t border-border pt-5 mb-3">
                <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">
                  Reviews
                </h2>
                <div className="space-y-4">
                  {product.reviews.length === 0 && (
                    <p className="text-sm text-muted-foreground">
                      No reviews yet.
                    </p>
                  )}

                  {product.reviews.map((review, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-border p-4 space-y-3"
                    >
                      {/* Top Row */}
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">
                            {review.reviewerName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(review.date).toLocaleDateString()}
                          </p>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-2">
                          <StarRating rating={review.rating} />
                          <span className="text-sm text-muted-foreground">
                            ({review.rating})
                          </span>
                        </div>
                      </div>

                      {/* Comment */}
                      <p className="text-sm text-foreground/80 leading-relaxed">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
