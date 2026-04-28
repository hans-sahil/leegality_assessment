export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand?: string;
  category: string;
  thumbnail: string;
  images: string[];
  tags: string[];
  reviews: Array<{
    rating: number;
    comment: string;
    date: Date;
    reviewerName: string;
    reviewerEmail: string;
  }>;
};