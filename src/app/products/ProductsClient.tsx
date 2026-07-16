"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Building2, Zap, Recycle, HeartPulse, Dumbbell, GraduationCap, SlidersHorizontal, LayoutGrid, List, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProductCard from "@/components/ProductCard";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { products as staticProducts, productCategories } from "@/data/products";
import { useProducts } from "@/components/ProductsProvider";
import type { Product } from "@/types";

const categoryIcons: Record<string, React.ElementType> = {
  "Smart City": Building2,
  "Renewable Energy": Zap,
  "Waste Management": Recycle,
  "Public Health": HeartPulse,
  "Fitness": Dumbbell,
  "Education": GraduationCap,
};

const categorySolutionMap: Record<string, string> = {
  "Smart City": "smart-city-csr-projects",
  "Renewable Energy": "renewable-energy-solutions",
  "Waste Management": "waste-management-systems",
  "Public Health": "public-health-hygiene",
  "Fitness": "fitness-play-equipment",
  "Education": "smart-school-infrastructure",
};

export default function ProductsClient({ 
  initialProducts, 
  isFromDb = false 
}: { 
  initialProducts: Product[],
  isFromDb?: boolean 
}) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const { products } = useProducts();

  const filtered = products.filter((p) => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Count products per category
  const categoryCounts: Record<string, number> = { All: products.length };
  productCategories.forEach((cat) => {
    categoryCounts[cat] = products.filter((p) => p.category === cat).length;
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow pb-20">
        {/* Page Header */}
        <div className="bg-ira-primary-dark relative overflow-hidden pt-[100px] lg:pt-[130px]">
          <div className="absolute inset-0 pattern-grid opacity-10" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3 tracking-tight">
              Products & Equipment
            </h1>
            <p className="text-white/70 max-w-2xl text-sm md:text-base">
              Browse our complete catalog of {products.length}+ certified products across {productCategories.length} categories.
              All products are designed, manufactured, and assembled in India.
            </p>

            {/* Search Bar */}
            <div className="mt-6 relative max-w-lg">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by product name, category, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-lg border-0 bg-white text-sm focus:ring-2 focus:ring-ira-accent outline-none shadow-lg"
              />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          {/* Category Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 hide-scrollbar -mx-1 px-1">
            <button
              onClick={() => setActiveCategory("All")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all border ${
                activeCategory === "All"
                  ? "bg-ira-primary text-white border-ira-primary shadow-md"
                  : "bg-white text-gray-600 border-gray-200 hover:border-ira-primary/30 hover:text-ira-primary"
              }`}
            >
              <SlidersHorizontal size={14} />
              All ({categoryCounts.All})
            </button>
            {productCategories.map((cat) => {
              const Icon = categoryIcons[cat] || Building2;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all border ${
                    activeCategory === cat
                      ? "bg-ira-primary text-white border-ira-primary shadow-md"
                      : "bg-white text-gray-600 border-gray-200 hover:border-ira-primary/30 hover:text-ira-primary"
                  }`}
                >
                  <Icon size={14} />
                  {cat} ({categoryCounts[cat]})
                </button>
              );
            })}
          </div>

          {/* Results Info */}
          <div className="flex items-center justify-between py-4 border-b border-gray-200 mb-6">
            <p className="text-sm text-gray-500">
              Showing <span className="font-bold text-gray-800">{filtered.length}</span> product{filtered.length !== 1 ? "s" : ""}
              {activeCategory !== "All" && (
                <span> in <span className="font-semibold text-ira-primary">{activeCategory}</span></span>
              )}
            </p>
          </div>

          {/* Related Solution Banner */}
          {activeCategory !== "All" && categorySolutionMap[activeCategory] && (
            <div className="mb-8 p-5 bg-ira-primary/5 rounded-2xl border border-ira-primary/10 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
              <div>
                <h4 className="text-sm sm:text-base font-bold text-gray-900">Looking for a complete installation?</h4>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">We offer turnkey planning, supply, setup, and maintenance for {activeCategory} projects.</p>
              </div>
              <Link
                href={`/solutions/${categorySolutionMap[activeCategory]}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-ira-primary hover:bg-ira-primary-dark text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 self-start md:self-auto"
              >
                Explore {activeCategory} Solutions
                <ArrowRight size={16} />
              </Link>
            </div>
          )}

          {/* Product Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-4">
            {filtered.map((product, idx) => (
              <ScrollReveal key={product.slug} delay={Math.min(idx * 40, 320)}>
                <ProductCard product={product} />
              </ScrollReveal>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <Search size={24} className="text-gray-300" />
              </div>
              <p className="text-gray-400 text-lg mb-2">No products found</p>
              <p className="text-gray-400 text-sm mb-4">Try a different search term or category</p>
              <button
                onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
                className="text-ira-primary font-semibold hover:underline text-sm"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
