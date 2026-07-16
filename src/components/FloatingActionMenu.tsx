"use client";

import { Phone, MessageCircle, Mail, ArrowUp } from "lucide-react";
import { companyInfo } from "@/data/company";
import { useState, useEffect } from "react";

export default function FloatingActionMenu() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      if (window.scrollY > 400) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (document.documentElement) {
      document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (document.body) {
      document.body.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed z-50 bottom-6 md:bottom-8 right-4 md:right-8 flex flex-col items-center gap-3">
      
      {/* Back To Top Button */}
      <button 
        onClick={scrollTop}
        className={`flex items-center justify-center shadow-lg transition-all duration-300 hover:bg-ira-primary hover:-translate-y-1 w-10 h-10 md:w-12 md:h-12 bg-gray-900 text-white rounded-full ${
          showScroll ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-50 pointer-events-none absolute bottom-0'
        }`}
        aria-label="Back to top"
      >
        <ArrowUp size={20} className="md:w-6 md:h-6" />
      </button>

      {/* Email Button */}
      <a 
        href={`mailto:${companyInfo.email}`}
        aria-label="Email Us"
        className="flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 w-12 h-12 md:w-14 md:h-14 bg-amber-500 hover:bg-amber-600 text-white rounded-full"
      >
        <Mail size={22} className="md:w-6 md:h-6" />
      </a>

      {/* Call Button */}
      <a 
        href={`tel:${companyInfo.phone.replace(/[^0-9+]/g, '')}`}
        aria-label="Call Us"
        className="flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 w-12 h-12 md:w-14 md:h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full"
      >
        <Phone size={22} className="md:w-6 md:h-6" />
      </a>

      {/* WhatsApp Button */}
      <a 
        href={`https://wa.me/${companyInfo.whatsapp}`}
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="WhatsApp Us"
        className="flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 w-14 h-14 md:w-16 md:h-16 bg-green-500 hover:bg-green-600 text-white rounded-full"
      >
        <MessageCircle size={28} className="md:w-8 md:h-8" />
      </a>

    </div>
  );
}
