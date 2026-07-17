"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { products as staticProducts } from "@/data/products";
import type { Product } from "@/types";

type ProductsContextType = {
  products: Product[];
  isLoading: boolean;
};

const ProductsContext = createContext<ProductsContextType>({
  products: staticProducts as Product[],
  isLoading: true,
});

export const ProductsProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(staticProducts as Product[]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      // Only fetch if Supabase is properly configured
      const hasUrl = !!(process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL);
      const hasKey = !!(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_PUBLISHABLE_KEY);
      const isSupabaseConfigured = hasUrl && hasKey;
      
      if (!isSupabaseConfigured) {
        setIsLoading(false);
        return;
      }

      try {
        const { data: dbProducts, error } = await supabase
          .from("products")
          .select("*")
          .order("created_at", { ascending: true });

        if (dbProducts && !error && dbProducts.length > 0) {
          const mappedProducts = dbProducts.map((dbP: any) => ({
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

          setProducts(mappedProducts);
        }
      } catch (e) {
        console.warn("Background global Supabase sync failed", e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, isLoading }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
