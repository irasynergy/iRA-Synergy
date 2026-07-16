"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function GlobalPreloader() {
  useEffect(() => {
    // Only run this once per session to avoid spamming the database
    // We can use a session storage flag to track this
    if (typeof window !== "undefined") {
      const hasPreloaded = sessionStorage.getItem("ira_products_preloaded");
      if (hasPreloaded) return;
      
      const preloadProducts = async () => {
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
            
            // Save to local storage for instant access across the app
            localStorage.setItem("ira_admin_products", JSON.stringify(mappedProducts));
            
            // Mark as preloaded for this session
            sessionStorage.setItem("ira_products_preloaded", "true");
          }
        } catch (e) {
          console.warn("Background global Supabase sync failed", e);
        }
      };

      // Slight delay to prioritize main page rendering
      setTimeout(preloadProducts, 2000);
    }
  }, []);

  return null;
}
