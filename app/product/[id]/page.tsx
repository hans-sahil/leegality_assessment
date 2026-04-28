import { Suspense } from "react";
import ProductDetails from "./ProductDetails";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <ProductDetails params={params} />
    </Suspense>
  );
}
