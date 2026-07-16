import { supabase } from "@/lib/supabase";
import { products as staticProducts } from "@/data/products";
import ProductsClient from "./ProductsClient";
import type { Product } from "@/types";

export const revalidate = 60; // Revalidate every minute

export default async function ProductsPage() {
  let initialProducts = staticProducts as Product[];

  const isSupabaseConfigured =
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Since you want 0 latency and all 34 products instantly without waiting for 
  // Next.js production builds, we skip the Supabase fetch and directly use the 
  // 34 products we just downloaded into src/data/products.ts.
  let isFromDb = false;

  return <ProductsClient initialProducts={initialProducts} isFromDb={isFromDb} />;
}
