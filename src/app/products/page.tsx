import { supabase } from "@/lib/supabase";
import { products as staticProducts } from "@/data/products";
import ProductsClient from "./ProductsClient";
import type { Product } from "@/types";

export const revalidate = 0; // Disable static caching completely
export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  let initialProducts = staticProducts as Product[];
  let isFromDb = false;

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
      }));
      isFromDb = true;
    }
  } catch (err) {
    console.error("Failed to fetch products on server:", err);
  }

  return <ProductsClient initialProducts={initialProducts} isFromDb={isFromDb} />;
}
