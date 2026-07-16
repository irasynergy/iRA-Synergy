import { supabase } from "@/lib/supabase";
import { products as staticProducts } from "@/data/products";
import ProductDetailClient from "./ProductDetailClient";
import type { Product } from "@/types";

export const revalidate = 60; // Revalidate every minute

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  let initialProducts = staticProducts as Product[];
  let isFromDb = false;

  return (
    <ProductDetailClient
      params={params}
      initialProducts={initialProducts}
      isFromDb={isFromDb}
    />
  );
}
