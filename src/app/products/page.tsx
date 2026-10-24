import { products } from "@/data/products";
import ProductsClient from "./ProductsClient";
import type { Product } from "@/types";

export default function ProductsPage() {
  return <ProductsClient initialProducts={products as Product[]} isFromDb={true} />;
}

