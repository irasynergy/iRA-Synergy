import { supabase } from "@/lib/supabase";
import { products as staticProducts } from "@/data/products";
import ProductsClient from "./ProductsClient";
import type { Product } from "@/types";

export const revalidate = 60; // Revalidate every minute

export default async function ProductsPage() {
  let initialProducts = staticProducts as Product[];

  const hasUrl = !!(process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL);
  const hasKey = !!(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_PUBLISHABLE_KEY);
  const isSupabaseConfigured = hasUrl && hasKey;

  let isFromDb = false;

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (!error && data && data.length > 0) {
        initialProducts = data.map((dbP: any) => ({
          id: dbP.id,
          slug: dbP.slug,
          name: dbP.name,
          category: dbP.category,
          description: dbP.description,
          shortDescription: dbP.short_description || "",
          features: dbP.features || [],
          specs: dbP.specs || [],
          certifications: dbP.certifications || [],
          images: dbP.images || [],
          price: dbP.price || "On Request",
          inStock: dbP.in_stock ?? true,
          badge: dbP.badge || undefined,
          relatedProductSlugs: dbP.related_product_slugs || [],
          brochureUrl: dbP.brochure_url || undefined,
        }));
        isFromDb = true;
      }
    } catch (err) {
      console.error('Failed to fetch from Supabase:', err);
    }
  }

  return <ProductsClient initialProducts={initialProducts} isFromDb={isFromDb} />;
}
