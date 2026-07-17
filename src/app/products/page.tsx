import { supabase } from "@/lib/supabase";
import { products as staticProducts } from "@/data/products";
import ProductsClient from "./ProductsClient";
import type { Product } from "@/types";

export const revalidate = 60; // Revalidate every minute

export default function ProductsPage() {
  let initialProducts = staticProducts as Product[];

  return <ProductsClient initialProducts={initialProducts} isFromDb={false} />;
}
