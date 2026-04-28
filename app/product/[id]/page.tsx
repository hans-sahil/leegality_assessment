import { Suspense } from "react";
import ProductDetails from "./ProductDetails";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductDetails params={params} />
    </Suspense>
  );
}
