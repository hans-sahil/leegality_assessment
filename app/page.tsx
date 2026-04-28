import { Pagination } from "@/src/components/Pagination";
import { ProductCard } from "@/src/components/ProductCard";
import { Filters } from "@/src/components/SidebarFilters";

type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  rating: number;
  reviews: Array<{
    rating: number;
    comment: string;
    date: Date;
    reviewerName: string;
    reviewerEmail: string;
  }>;
};

const LIMIT = 8;

async function getCategories() {
  const res = await fetch("https://dummyjson.com/products/categories");
  return res.json();
}

async function getProducts(params: Promise<{ page?: string }>) {
  const paramsRes = await params;
  const page = Number(paramsRes.page) || 1;
  const skip = (page - 1) * LIMIT;

  console.log("PARAMS RES  : ", paramsRes);

  let url = `https://dummyjson.com/products?limit=${LIMIT}&skip=${skip}`;

  // Category
  if (paramsRes.category) {
    url = `https://dummyjson.com/products/category/${params.category}?limit=${LIMIT}&skip=${skip}`;
  }

  const res = await fetch(url, { cache: "no-store" });
  const data = await res.json();

  let products = data.products;

  // Price filtering (client-side since API doesn’t support it)
  if (paramsRes.minPrice) {
    products = products.filter(
      (p: Product) => p.price >= Number(paramsRes.minPrice),
    );
  }
  if (paramsRes.maxPrice) {
    products = products.filter(
      (p: Product) => p.price <= Number(paramsRes.maxPrice),
    );
  }

  // Sorting
  if (paramsRes.sort === "price-asc") {
    products.sort((a: Product, b: Product) => a.price - b.price);
  }
  if (paramsRes.sort === "price-desc") {
    products.sort((a: Product, b: Product) => b.price - a.price);
  }
  if (paramsRes.sort === "rating-desc") {
    products.sort((a: Product, b: Product) => b.rating - a.rating);
  }

  return { ...data, products };
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const searchParamsRes = await searchParams;
  console.log(searchParamsRes);
  const currentPage = Number(searchParamsRes.page) || 1;

  const [categories, data] = await Promise.all([
    getCategories(),
    getProducts(searchParams),
  ]);
  const products = data.products;
  const total = data.total;

  const totalPages = Math.ceil(total / LIMIT);

  return (
    <div className="container py-8 flex gap-8">
      <Filters categories={categories} />

      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product: Product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              image={product.thumbnail}
              rating={product.rating}
              reviews={product.reviews.length || 0}
            />
          ))}
        </div>

        {/* Pagination */}
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </div>
  );
}
