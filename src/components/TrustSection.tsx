"use client";

import { useRef, useEffect } from "react";
import { Shield, Award, Building2, Rocket, FileCheck, Leaf } from "lucide-react";
import ScrollReveal from "./ui/ScrollReveal";
import { certifications } from "@/data/company";

const iconMap: Record<string, React.ElementType> = {
  Shield,
  Award,
  Building2,
  Rocket,
  FileCheck,
  Leaf,
};

const partners = [
  "Government of India",
  "Smart Cities Mission",
  "Swachh Bharat Mission",
  "NITI Aayog",
  "GeM Portal",
  "Make in India",
  "Startup India",
  "MSME",
];

const partnerLogos = [
  "/images/clients/01_client.png",
  "/images/clients/02_client.png",
  "/images/clients/03_client.png",
  "/images/clients/04_client.png",
  "/images/clients/05_client.png",
  "/images/clients/06_client.png",
  "/images/clients/07_client.png",
  "/images/clients/08_client.png",
];

export default function TrustSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const containerCenter = container.getBoundingClientRect().left + container.offsetWidth / 2;
        const items = container.querySelectorAll('.client-logo-wrapper');

        items.forEach((item) => {
          const rect = item.getBoundingClientRect();
          const itemCenter = rect.left + rect.width / 2;
          const distance = Math.abs(containerCenter - itemCenter);
          const maxDistance = container.offsetWidth / 2;

          // scale between 0.6 at edges and 1.2 at center
          let scale = 1.2 - (distance / maxDistance) * 0.6;
          if (scale < 0.6) scale = 0.6;

          // Apply scale to image to avoid changing layout width
          const img = item.querySelector('img');
          if (img) {
            img.style.transform = `scale(${scale})`;
          }
        });
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <section className="bg-ira-surface relative overflow-hidden py-2">
      <div className="absolute inset-0 gradient-mesh" />

      {/* Partner Marquee - Edge to Edge */}
      <div className="border-y border-gray-100 shadow-sm overflow-hidden py-3 sm:py-4 bg-white relative z-10" ref={containerRef}>
        <ScrollReveal>
          <div className="mb-2">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 text-center">
              Our Esteemed Clients
            </p>
          </div>

          {/* Added CSS mask for fading edges and smooth entry/exit */}
          <div
            className="relative overflow-hidden flex group"
            style={{ maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)' }}
          >
            <div className="flex animate-marquee group-hover:[animation-play-state:paused] whitespace-nowrap items-center py-2 sm:py-4" style={{ animationDuration: '40s' }}>
              {partnerLogos.concat(partnerLogos).concat(partnerLogos).concat(partnerLogos).map((logoUrl, idx) => (
                <div key={`client-${idx}`} className="client-logo-wrapper mx-6 sm:mx-10 flex items-center justify-center w-16 h-8 sm:w-24 sm:h-12 flex-shrink-0 cursor-pointer">
                  <img
                    src={logoUrl}
                    alt={`Partner ${idx}`}
                    className="max-w-full max-h-full object-contain mix-blend-multiply will-change-transform opacity-80 hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
