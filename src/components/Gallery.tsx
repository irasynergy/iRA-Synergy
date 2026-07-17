"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import ScrollReveal from "./ui/ScrollReveal";
import { solutions } from "@/data/solutions";
import { useProducts } from "./ProductsProvider";
import { Solution } from "@/types";

export default function Gallery({ galleryImages = [] }: { galleryImages?: { src: string; category: string }[] }) {
  const [activeSolution, setActiveSolution] = useState<Solution | null>(null);
  const { products } = useProducts();

  // Aggregate images for a specific solution
  const getAggregatedImages = (solution: Solution) => {
    const relatedProducts = solution.relatedProductSlugs
      .map(slug => products.find(p => p.slug === slug))
      .filter(Boolean);

    const productImages = relatedProducts.flatMap(p => p!.images);
    
    // Find gallery images that match the solution category
    const dynamicGalleryImages = galleryImages
      .filter(img => img.category === solution.title || img.category === solution.shortTitle)
      .map(img => img.src);
    
    const extraImages = solution.extraImages || [];

    // Combine main solution image with all product/machinery images and dynamic gallery images, filtering duplicates
    return Array.from(new Set([solution.image, ...productImages, ...dynamicGalleryImages, ...extraImages]));
  };

  return (
    <section className="py-16 bg-[#0a0a0a] border-y-8 border-ira-primary relative">
      <div className="max-w-[100rem] mx-auto px-0 sm:px-6 lg:px-8 flex flex-col gap-10">
        
        <ScrollReveal>
          <div className="text-center px-4">
            <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest inline-block relative">
              HEAVY INFRASTRUCTURE
              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 h-[3px] bg-ira-primary"></span>
            </h2>
            <p className="text-xs md:text-sm text-gray-400 mt-6 max-w-3xl mx-auto font-medium uppercase tracking-wider">
              Explore our industrial-grade solutions. Click on any sector to view detailed machinery and infrastructure photos.
            </p>
          </div>
        </ScrollReveal>

        {/* Industrial Sliding Panel Accordion */}
        <div className="flex w-full h-[400px] md:h-[600px] overflow-hidden bg-[#111] border-y border-gray-800 sm:border sm:border-gray-800 p-1 sm:p-2 gap-1 sm:gap-2">
          {solutions.map((solution, idx) => (
            <div 
              key={solution.id} 
              onClick={() => setActiveSolution(solution)}
              className="relative flex-1 hover:flex-[4] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer overflow-hidden group border border-gray-800 bg-black"
            >
              <div className="absolute inset-0 bg-black/60 group-hover:bg-transparent transition-colors duration-500 z-10" />
              
              <Image 
                src={solution.image} 
                alt={solution.title}
                fill
                className="absolute inset-0 object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                loading="lazy"
              />

              {/* Industrial Label Overlay */}
              <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-20 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  <div className={`w-2 h-2 ${solution.color.replace('bg-', 'bg-').replace('900', '500')} bg-white`} />
                  <h3 className="text-white font-bold tracking-widest text-xs md:text-sm uppercase whitespace-nowrap">
                    {solution.shortTitle}
                  </h3>
                </div>
              </div>

              {/* Vertical Text when collapsed */}
              <div className="absolute inset-0 flex items-center justify-center z-20 group-hover:opacity-0 transition-opacity duration-300">
                <span className="text-gray-400 font-bold tracking-widest text-[10px] md:text-xs uppercase -rotate-90 whitespace-nowrap drop-shadow-md">
                  {solution.shortTitle}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activeSolution && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col overflow-hidden animate-in fade-in duration-300">
          
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 bg-gradient-to-b from-black to-transparent z-10">
            <div className="flex flex-col">
              <span className="text-ira-primary font-bold tracking-widest text-xs uppercase mb-1">Infrastructure Gallery</span>
              <h2 className="text-white text-2xl md:text-3xl font-extrabold">{activeSolution.title}</h2>
            </div>
            <button 
              onClick={() => setActiveSolution(null)}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Modal Content - Scrollable Grid */}
          <div className="flex-1 overflow-y-auto p-4 md:p-8 hide-scrollbar">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {getAggregatedImages(activeSolution).map((imgUrl, i) => (
                <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden bg-white/5 border border-white/10 group">
                  <Image 
                    src={imgUrl}
                    alt={`${activeSolution.shortTitle} photo ${i + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
