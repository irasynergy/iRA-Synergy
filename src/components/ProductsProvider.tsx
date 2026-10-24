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

export const ProductsProvider = ({ 
  children,
  initialProducts
}: { 
  children: React.ReactNode;
  initialProducts: Product[];
}) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const hasUrl = !!(process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL);
        const hasKey = !!(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_PUBLISHABLE_KEY);
        
        if (hasUrl && hasKey) {
          const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: true });
          
          if (!error && data && data.length > 0) {
            const dbProducts = data.map((dbP: any) => ({
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
            setProducts(dbProducts);
          }
        }
      } catch (err) {
        console.error('Failed to fetch from Supabase:', err);
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
