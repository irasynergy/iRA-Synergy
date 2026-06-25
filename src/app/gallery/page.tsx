import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ui/ScrollReveal";
import GalleryGrid from "@/components/GalleryGrid";
import { solutions } from "@/data/solutions";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Gallery | iRA Synergy",
  description: "Explore our massive, real-world deployments of heavy infrastructure and sustainable smart city solutions.",
};

// Aggregate images for the Bento Grid
const getGalleryItems = () => {
  const items: Array<{ src: string; title: string; category: string; bentoSpan: string }> = [];

  // Solutions (Hero Items - Large Squares)
  solutions.forEach((s) => {
    if (s.image) {
      items.push({
        src: s.image,
        title: s.title,
        category: "Sector Deployment",
        bentoSpan: "col-span-2 row-span-2", // Big 2x2 block
      });
    }
  });

  // Products (Fillers - Wide, Tall, or Small Squares)
  products.forEach((p, idx) => {
    p.images.forEach((img, imgIdx) => {
      // Avoid duplicates
      if (!items.find(i => i.src === img)) {
        
        let span = "col-span-1 row-span-1"; // Standard 1x1 block
        
        if (imgIdx === 0 && idx % 4 === 0) {
          span = "col-span-2 row-span-1"; // Wide horizontal block
        } else if (imgIdx === 0 && idx % 3 === 0) {
          span = "col-span-1 row-span-2"; // Tall vertical block
        }

        items.push({
          src: img,
          title: p.name,
          category: p.category,
          bentoSpan: span,
        });
      }
    });
  });

  return items;
};

export default function GalleryPage() {
  const items = getGalleryItems();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      
      <main className="flex-grow pt-20 lg:pt-44 pb-32">
        
        {/* Minimalist Light Hero Section - UNTOUCHED HEADLINE AS REQUESTED */}
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 border-b border-gray-100 pb-12">
              <div className="max-w-4xl">
                <span className="text-ira-primary text-xs font-black tracking-[0.4em] uppercase mb-6 block">
                  Exhibition
                </span>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] text-gray-900 uppercase">
                  Engineering <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-200 font-light">Scale.</span>
                </h1>
              </div>
              <div className="max-w-md">
                <p className="text-gray-500 text-sm md:text-base font-medium leading-relaxed">
                  A curated visual showcase of our industrial-grade deployments across India. Designed for high impact, engineered for absolute permanence.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Masonry Layout with Category Filtering */}
        <div className="max-w-[100rem] mx-auto px-2 sm:px-6 lg:px-8">
          <GalleryGrid items={items} />
        </div>

      </main>
      
      <Footer />
    </div>
  );
}
