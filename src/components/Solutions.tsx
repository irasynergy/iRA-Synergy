"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, Building2, Recycle, Zap, HeartPulse, Dumbbell, Globe } from "lucide-react";
import ScrollReveal from "./ui/ScrollReveal";
import { solutions } from "@/data/solutions";


export default function Solutions() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = current.clientWidth > 768 ? 350 : 280;
      current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section id="solutions" className="pb-10 pt-2 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header line */}
        <ScrollReveal>
          <div className="flex items-center justify-between gap-4 mb-12">
            <div className="flex items-center gap-4">
              <h2 className="text-xl md:text-2xl font-bold text-ira-primary-dark tracking-wide uppercase">
                Our Solutions
              </h2>
              <div className="h-px bg-gray-300 w-12 md:w-32 hidden sm:block"></div>
            </div>
            <Link href="/solutions" className="text-sm font-bold text-gray-800 hover:text-ira-accent transition-colors flex items-center gap-1">
              VIEW ALL
              <ArrowRight size={16} />
            </Link>
          </div>
        </ScrollReveal>

        <div className="relative group">
          {/* Scroll Buttons */}
          <button 
            aria-label="Scroll left"
            onClick={() => scroll("left")}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-gray-500 hover:text-ira-primary focus:outline-none focus:ring-2 focus:ring-ira-primary focus:ring-offset-2 hidden md:flex transition-transform opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            aria-label="Scroll right"
            onClick={() => scroll("right")}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-gray-500 hover:text-ira-primary focus:outline-none focus:ring-2 focus:ring-ira-primary focus:ring-offset-2 hidden md:flex transition-transform opacity-0 group-hover:opacity-100"
          >
            <ChevronRight size={24} />
          </button>

          {/* Carousel Container */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 pt-2 px-2 -mx-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {solutions.map((solution, idx) => {
              return (
                <ScrollReveal key={solution.id} delay={idx * 50} className="snap-start shrink-0 w-[240px] md:w-[260px]">
                  <Link href={`/solutions/${solution.slug}`} className="bg-white rounded-lg border border-gray-100 shadow-sm flex flex-col h-full hover:shadow-xl transition-all duration-300 group overflow-hidden cursor-pointer block">
                    <div className="h-36 w-full relative overflow-hidden">
                      <Image 
                        src={solution.image} 
                        alt={solution.title}
                        fill
                        loading="lazy"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5 text-center flex flex-col items-center flex-grow">
                      <h3 className="text-sm font-bold text-gray-900 mb-2 uppercase h-10 flex items-center justify-center line-clamp-2">
                        {solution.title}
                      </h3>
                      <p className="text-xs text-gray-500 mb-5 flex-grow leading-relaxed line-clamp-3">
                        {solution.description}
                      </p>
                      <div className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-800 group-hover:text-ira-accent transition-colors mt-auto">
                        Explore
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
