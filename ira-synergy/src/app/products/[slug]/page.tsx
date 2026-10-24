import { products } from "@/data/products";
import ProductDetailClient from "./ProductDetailClient";
import type { Product } from "@/types";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <ProductDetailClient
      params={params}
      initialProducts={products as Product[]}
      isFromDb={true}
    />
  );
}

