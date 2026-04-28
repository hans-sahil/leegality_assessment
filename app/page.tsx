import { Suspense } from "react";
import ProductListingPage from "./ProductListingPage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductListingPage />
    </Suspense>
  );
}
