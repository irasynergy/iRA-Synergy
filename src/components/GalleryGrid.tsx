"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

type GalleryItem = {
  src: string;
  title: string;
  category: string;
  bentoSpan?: string;
};

export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [activeCategory, setActiveCategory] = useState("All");

  // Extract unique categories
  const categories = ["All", ...Array.from(new Set(items.map((i) => i.category)))];

  // Filter items based on active category
  const filteredItems =
    activeCategory === "All"
      ? items
      : items.filter((i) => i.category === activeCategory);

  return (
    <div>
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 mb-10 px-2 sm:px-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 sm:px-6 sm:py-2.5 rounded-full text-[10px] sm:text-xs tracking-wider font-bold uppercase transition-all duration-300 ${
              activeCategory === cat
                ? "bg-ira-primary text-white shadow-md scale-105"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Pinterest-style Masonry Layout */}
      <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-4 sm:gap-6 space-y-4 sm:space-y-6">
        {filteredItems.map((item, idx) => (
          <ScrollReveal 
            key={`${item.src}-${idx}-${activeCategory}`} 
            delay={0}
            className="break-inside-avoid inline-block w-full"
          >
            <div className="group relative w-full flex flex-col cursor-pointer">
              
              {/* Image Container */}
              <div className="relative w-full rounded-2xl overflow-hidden mb-2 bg-gray-100 shadow-sm group-hover:shadow-md transition-all duration-300">
                <img 
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-auto object-cover transition-transform duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] block"
                />
                {/* Subtle dark overlay on hover to mimic Pinterest's save overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                
                {/* Arrow icon that appears on hover like Pinterest's external link icon */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/95 backdrop-blur-sm shadow-sm flex items-center justify-center opacity-0 scale-90 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 z-10">
                  <ArrowUpRight size={16} className="text-gray-900" />
                </div>
              </div>

              {/* Text Content Below Image */}
              <div className="px-1 flex flex-col">
                <h3 className="text-gray-900 text-sm font-bold tracking-tight leading-tight line-clamp-2">
                  {item.title}
                </h3>
                <span className="block text-xs text-gray-500 font-medium mt-0.5">
                  {item.category}
                </span>
              </div>

            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
