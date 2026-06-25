"use client";

import { useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import ScrollReveal from "./ui/ScrollReveal";
import { getFeaturedProducts } from "@/data/products";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function FeaturedProducts() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [featuredProducts, setFeaturedProducts] = useState(getFeaturedProducts());

  useEffect(() => {
    async function loadFeatured() {
      const isSupabaseConfigured =
        process.env.NEXT_PUBLIC_SUPABASE_URL &&
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (isSupabaseConfigured) {
        try {
          const { data: dbProducts, error } = await supabase
            .from("products")
            .select("*")
            .order("created_at", { ascending: false })
            .limit(8);

          if (dbProducts && !error) {
            const mapped = dbProducts.map((dbP: any) => ({
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
            setFeaturedProducts(mapped);
            return;
          }
        } catch (e) {
          console.warn("Supabase fetch failed for featured products", e);
        }
      }

      // LocalStorage fallback
      try {
        const stored = localStorage.getItem("ira_admin_products");
        if (stored) {
          const parsedStored = JSON.parse(stored);
          setFeaturedProducts(parsedStored.slice(0, 8));
        }
      } catch (e) {
        console.error(e);
      }
    }
    loadFeatured();
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = current.clientWidth > 768 ? 350 : 280;
      current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-10 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
            <div className="flex items-center gap-4">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 uppercase">
                Featured Products
              </h2>
              <div className="h-px bg-gray-300 w-12 md:w-32 hidden sm:block"></div>
            </div>
            <Link href="/products" className="text-sm font-bold text-ira-primary-dark hover:text-ira-accent transition-colors flex items-center gap-1">
              VIEW ALL PRODUCTS
              <ArrowRight size={16} />
            </Link>
          </div>
        </ScrollReveal>

        <div className="relative group">
          {/* Scroll Buttons */}
          <button 
            onClick={() => scroll("left")}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-gray-500 hover:text-ira-primary focus:outline-none hidden md:flex transition-transform opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={() => scroll("right")}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-gray-500 hover:text-ira-primary focus:outline-none hidden md:flex transition-transform opacity-0 group-hover:opacity-100"
          >
            <ChevronRight size={24} />
          </button>

          {/* Carousel Container */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 pt-2 px-2 -mx-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {featuredProducts.map((product, idx) => (
              <ScrollReveal key={product.slug} delay={idx * 100} className="snap-start shrink-0 w-[240px] md:w-[260px]">
                <div 
                  onClick={() => router.push(`/products/${product.slug}`)}
                  className="bg-white rounded-lg border border-gray-100 shadow-sm h-full flex flex-col hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
                >
                  {/* Product Image Area */}
                  <div className="h-40 bg-gray-50 relative overflow-hidden">
                    <div className="absolute inset-0 bg-ira-primary/5 group-hover:bg-transparent transition-colors z-10 pointer-events-none" />
                    {product.images && product.images.length > 0 && (
                      <img 
                        src={product.images[0]} 
                        alt={product.name}
                        className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="p-5 flex-grow flex flex-col">
                    <h3 className="text-base font-bold text-gray-900 mb-3 text-center line-clamp-2">
                      {product.name}
                    </h3>
                    
                    <p className="text-sm text-gray-600 mb-6 flex-grow line-clamp-2 text-center">
                      {product.shortDescription}
                    </p>
                    
                    <div 
                      onClick={(e) => { e.stopPropagation(); router.push(`/products/${product.slug}`); }}
                      className="w-full py-2 border border-gray-200 hover:border-ira-accent text-gray-700 hover:bg-ira-accent hover:text-white transition-all duration-300 rounded text-xs font-bold text-center flex items-center justify-center gap-1"
                    >
                      VIEW DETAILS
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
