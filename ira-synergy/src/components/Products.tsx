"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Search, Zap, Recycle, Building2, HeartPulse, Dumbbell, GraduationCap } from "lucide-react";
import ScrollReveal from "./ui/ScrollReveal";
import CategoryFilter from "./ui/CategoryFilter";
import { productCategories } from "@/data/products";
import { useProducts } from "./ProductsProvider";
const categoryIcons: Record<string, React.ElementType> = {
  "Smart City": Building2,
  "Renewable Energy": Zap,
  "Waste Management": Recycle,
  "Public Health": HeartPulse,
  "Fitness": Dumbbell,
  "Education": GraduationCap,
};

const categoryColors: Record<string, string> = {
  "Smart City": "bg-cat-smartcity",
  "Renewable Energy": "bg-cat-renewable",
  "Waste Management": "bg-cat-waste",
  "Public Health": "bg-cat-health",
  "Fitness": "bg-cat-fitness",
  "Education": "bg-cat-education",
};

export default function Products() {
  const { products } = useProducts();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = products.filter((p) => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Show first 9 on homepage
  const displayProducts = filtered.slice(0, 9);

  return (
    <section id="products" className="section-padding bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div>
              <div className="section-label bg-ira-steel/10 text-ira-steel inline-flex">
                <span className="w-2 h-2 rounded-full bg-ira-amber" />
                Our Catalog
              </div>
              <h2 className="section-title text-gray-900 mt-2">Products & Equipment</h2>
              <p className="text-gray-500 mt-2 max-w-xl">
                50+ innovative products across 6 categories — all designed, supplied,
                installed, and maintained by iRA Synergy.
              </p>
            </div>
            <Link
              href="/products"
              className="btn-outline self-start lg:self-auto flex-shrink-0"
            >
              View Full Catalog
              <ArrowRight size={16} />
            </Link>
          </div>
        </ScrollReveal>

        {/* Filters */}
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-10">
            <CategoryFilter
              categories={productCategories}
              active={activeCategory}
              onChange={setActiveCategory}
            />
          </div>
        </ScrollReveal>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayProducts.map((product, idx) => {
            const CatIcon = categoryIcons[product.category] || Building2;
            const catColor = categoryColors[product.category] || "bg-gray-600";

            return (
              <ScrollReveal key={product.slug} delay={idx * 80}>
                <Link
                  href={`/products/${product.slug}`}
                  className="group block h-full"
                >
                  <div className="relative h-full bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-premium card-hover">
                    {/* Image placeholder with gradient + icon */}
                    <div className={`relative h-48 ${catColor} flex items-center justify-center overflow-hidden`}>
                      <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent" />
                      <div className="absolute inset-0 pattern-grid opacity-20" />
                      <CatIcon size={64} className="text-white/30 relative z-10" strokeWidth={1} />

                      {/* Badge */}
                      {product.badge && (
                        <span className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full text-xs font-bold bg-white text-gray-900 shadow-md">
                          {product.badge}
                        </span>
                      )}

                      {/* Category tag */}
                      <span className="absolute bottom-4 left-4 z-20 px-3 py-1 rounded-full text-xs font-semibold bg-black/40 text-white backdrop-blur-sm">
                        {product.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-ira-primary transition-colors line-clamp-2 leading-snug">
                        {product.name}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">
                        {product.shortDescription}
                      </p>

                      {/* Key specs */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {product.specs.slice(0, 2).map((spec: any, i: number) => (
                          <span
                            key={i}
                            className="inline-flex px-2.5 py-1 rounded-md bg-gray-50 text-xs text-gray-600 font-medium"
                          >
                            {spec.label}: {spec.value}
                          </span>
                        ))}
                      </div>

                      {/* CTA */}
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400 font-medium">
                          {product.certifications[0]}
                        </span>
                        <span className="flex items-center gap-1 text-ira-primary text-sm font-semibold group-hover:gap-2 transition-all">
                          Details
                          <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Show more */}
        {filtered.length > 9 && (
          <div className="text-center mt-10">
            <Link href="/products" className="btn-green">
              View All {filtered.length} Products
              <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
