"use client";

import { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { use } from "react";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  Shield,
  Phone,
  Send,
  MessageCircle,
  Download,
  Flag,
  ChevronDown,
  ChevronUp,
  Building2,
  Zap,
  Recycle,
  HeartPulse,
  Dumbbell,
  GraduationCap,
  Share2,
  X,
  Maximize2,
  SlidersHorizontal,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProductCard from "@/components/ProductCard";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { products } from "@/data/products";
import { solutions } from "@/data/solutions";
import { supabase } from "@/lib/supabase";
import { companyInfo } from "@/data/company";

const categoryIcons: Record<string, React.ElementType> = {
  "Smart City": Building2,
  "Renewable Energy": Zap,
  "Waste Management": Recycle,
  "Public Health": HeartPulse,
  "Fitness": Dumbbell,
  "Education": GraduationCap,
};

// FAQ data per category
const categoryFAQs: Record<string, { q: string; a: string }[]> = {
  "Smart City": [
    { q: "What is the typical lead time for Smart City products?", a: "Standard lead time is 4-8 weeks depending on customization and quantity. Expedited delivery is available for urgent government orders." },
    { q: "Do you offer installation services?", a: "Yes, we provide end-to-end installation, commissioning, and training services across India. Our certified engineers handle everything from foundation work to IoT integration." },
    { q: "Are these products GeM-listed?", a: "Most of our Smart City products are listed on the Government e-Marketplace (GeM). We can provide GeM product links and assist with procurement through the platform." },
  ],
  "Renewable Energy": [
    { q: "What warranties do you offer on solar products?", a: "Solar panels carry a 25-year performance warranty. Batteries have 3-5 year warranties. Structural components are warranted for 10 years against manufacturing defects." },
    { q: "Can these be integrated with existing infrastructure?", a: "Absolutely. Our renewable energy solutions are designed for retrofit installation. We conduct site surveys to ensure seamless integration with existing electrical and structural systems." },
  ],
  "Waste Management": [
    { q: "Do your incinerators meet CPCB emission norms?", a: "Yes, all our incinerators are CPCB-approved and meet the latest emission standards. We provide emission test certificates and assist with NOC applications." },
    { q: "What after-sales support do you provide?", a: "We offer comprehensive AMC packages including preventive maintenance, spare parts supply, operator training, and 24/7 technical support." },
  ],
  "Public Health": [
    { q: "Can these be deployed in rural areas?", a: "Yes, all our public health products are designed for both urban and rural deployment. Solar-powered variants are available for areas with unreliable grid connectivity." },
  ],
  "Fitness": [
    { q: "What is the expected lifespan of outdoor gym equipment?", a: "With proper maintenance, our outdoor gym equipment lasts 15-20 years. Hot-dip galvanized and powder-coated construction ensures resistance to weather and corrosion." },
  ],
  "Education": [
    { q: "Do you offer bulk pricing for schools?", a: "Yes, we offer special pricing for government schools and bulk orders. Contact us for a customized quotation based on your requirements." },
  ],
};

import { useProducts } from "@/components/ProductsProvider";
import type { Product } from "@/types";

export default function ProductDetailClient({
  params,
  initialProducts,
  isFromDb = false,
}: {
  params: Promise<{ slug: string }>;
  initialProducts: Product[];
  isFromDb?: boolean;
}) {
  const { slug } = use(params);
  const decodedSlug = decodeURIComponent(slug);
  const { products: allProducts, isLoading } = useProducts();
  const product = allProducts.find((p) => p.slug === decodedSlug);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({});
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [quoteForm, setQuoteForm] = useState({
    name: "",
    organization: "",
    phone: "",
    email: "",
    quantity: "",
    message: "",
  });

  if (!product) {
    if (isLoading) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-ira-primary border-t-transparent rounded-full animate-spin" />
        </div>
      );
    }
    notFound();
  }

  const CatIcon = categoryIcons[product.category] || Building2;

  const parentSolutions = solutions.filter((s) => s.relatedProductSlugs.includes(product.slug));

  // Get related products from same category (excluding current)
  const relatedProducts = allProducts.filter(
    (p) => p.category === product.category && p.slug !== product.slug
  ).slice(0, 4);

  // Also get explicitly related products
  const explicitRelated = product.relatedProductSlugs
    .map((s) => allProducts.find((p) => p.slug === s))
    .filter(Boolean);

  // Merge and deduplicate
  const allRelated = Array.from(
    new Map(
      [...explicitRelated, ...relatedProducts]
        .filter((p): p is NonNullable<typeof p> => p !== undefined)
        .map((p) => [p.id, p])
    ).values()
  ).slice(0, 4);

  const faqs = categoryFAQs[product.category] || [];

  const whatsappText = encodeURIComponent(
    `Hi iRA Synergy, I'm interested in "${product.name}" (${product.category}). Please share details, pricing, and availability.`
  );

  function handleQuoteSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Phase 2: wire to /api/quote
    setQuoteSubmitted(true);
    setTimeout(() => setQuoteSubmitted(false), 6000);
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(2.5)",
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transformOrigin: "center center",
      transform: "scale(1)",
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow pt-20 lg:pt-44 pb-16">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <Breadcrumb
            items={[
              { label: "Products", href: "/products" },
              { label: product.category, href: `/products?category=${encodeURIComponent(product.category)}` },
              { label: product.name },
            ]}
          />
        </div>

        {/* Main Product Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
            {/* Image Gallery - Left */}
            <div className="lg:col-span-5">
              <ScrollReveal variant="left">
                {/* Main Image */}
                <div className="relative bg-white rounded-xl border border-gray-200 overflow-hidden mb-3 group">

                  <div 
                    className="aspect-[4/3] flex items-center justify-center p-6 overflow-hidden cursor-crosshair relative"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => setIsFullscreen(true)}
                  >
                    <button 
                      className="absolute bottom-4 right-4 z-20 bg-white/80 backdrop-blur p-2 rounded-full shadow-sm text-gray-700 hover:text-ira-primary hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                      onClick={(e) => { e.stopPropagation(); setIsFullscreen(true); }}
                      aria-label="View fullscreen"
                    >
                      <Maximize2 size={16} />
                    </button>
                    {product.images && product.images.length > 0 ? (
                      <Image
                        src={product.images[activeImageIndex] || product.images[0]}
                        alt={`${product.name} — ${product.category} Product View ${activeImageIndex + 1} | iRA Synergy`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-contain transition-transform duration-200 ease-out p-6"
                        style={zoomStyle}
                        priority
                      />
                    ) : (
                      <CatIcon size={80} className="text-gray-200" strokeWidth={1} />
                    )}
                  </div>
                </div>

                {/* Thumbnail Strip */}
                {product.images && product.images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {product.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative w-20 h-16 flex-shrink-0 rounded-lg border-2 overflow-hidden transition-all ${
                          idx === activeImageIndex
                            ? "border-ira-primary shadow-md ring-2 ring-ira-primary/20"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`${product.name} — Angle ${idx + 1} | iRA Synergy`}
                          fill
                          sizes="80px"
                          className="object-contain p-1"
                        />
                      </button>
                    ))}
                  </div>
                )}
                
                {/* Full Description (Desktop Only) */}
                <div className="hidden lg:block mt-8 pt-8 border-t border-gray-200">
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">About this Product</h3>
                  <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                    {product.description}
                  </p>
                </div>
              </ScrollReveal>
            </div>

            {/* Product Info - Right */}
            <div className="lg:col-span-7">
              <ScrollReveal variant="right">
                {/* Category & Badges */}
                <div className="flex items-center flex-wrap gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-ira-primary/10 text-ira-primary">
                    <CatIcon size={12} />
                    {product.category}
                  </span>
                  {product.certifications.slice(0, 3).map((cert, i) => (
                    <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gray-100 text-gray-600 border border-gray-200">
                      <Shield size={10} />
                      {cert}
                    </span>
                  ))}
                </div>

                {/* Product Name */}
                <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2 tracking-tight leading-tight">
                  {product.name}
                </h1>

                {/* Parent Solutions */}
                {parentSolutions.length > 0 && (
                  <div className="flex items-center gap-2 mb-4 flex-wrap">
                    <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Solutions:</span>
                    <div className="flex flex-wrap gap-2">
                      {parentSolutions.map((sol) => (
                        <Link
                          key={sol.id}
                          href={`/solutions/${sol.slug}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-ira-primary/5 hover:bg-ira-primary/10 text-ira-primary border border-ira-primary/10 transition-colors"
                        >
                          {sol.shortTitle}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Short Description */}
                {product.shortDescription && (
                  <p className="text-gray-800 text-base font-semibold leading-relaxed mb-3">
                    {product.shortDescription}
                  </p>
                )}


                {/* Price & Stock */}
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                  <div>
                    <span className="text-xs text-gray-400 uppercase tracking-wider font-medium">Price</span>
                    <p className="text-xl font-extrabold text-ira-primary-dark">{product.price || "On Request"}</p>
                  </div>
                  {product.inStock && (
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                      ✓ In Stock & Ready to Ship
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 mb-6 pb-6 border-b border-gray-200">
                  <a href="#quote-form" className="inline-flex items-center gap-2 px-6 py-3 bg-ira-primary hover:bg-ira-primary-dark text-white text-sm font-bold rounded-lg transition-colors shadow-md hover:shadow-lg">
                    <Send size={16} />
                    Request a Quote
                  </a>
                  {product.brochureUrl && (
                    <a
                      href={product.brochureUrl}
                      download={`${product.name.replace(/[^a-zA-Z0-9]/g, "_")}_Brochure.pdf`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-lg transition-colors shadow-md hover:shadow-lg"
                    >
                      <Download size={16} />
                      Download Brochure
                    </a>
                  )}
                  <a
                    href={`tel:${companyInfo.phone}`}
                    className="inline-flex items-center gap-2 px-5 py-3 bg-white border-2 border-gray-200 hover:border-ira-primary text-gray-700 hover:text-ira-primary text-sm font-bold rounded-lg transition-all"
                  >
                    <Phone size={16} />
                    Call Now
                  </a>
                  <a
                    href={`https://wa.me/${companyInfo.whatsapp}?text=${whatsappText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-[#25D366] hover:bg-[#20BD5A] text-white text-sm font-bold rounded-lg transition-colors shadow-md"
                  >
                    <MessageCircle size={16} fill="white" />
                    WhatsApp
                  </a>
                </div>

                {/* Key Features */}
                <div className="mb-6">
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Key Features</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {product.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 size={14} className="text-ira-accent mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-gray-700 leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Full Description (Mobile Only) */}
                <div className="mb-6 pb-6 border-b border-gray-200 lg:hidden">
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">About this Product</h3>
                  <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                    {product.description}
                  </p>
                </div>



                {/* Quick Specs Preview */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Quick Specifications</h3>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                    {product.specs.slice(0, 6).map((spec, i) => (
                      <div key={i} className="flex items-baseline gap-2 py-1">
                        <span className="text-xs text-gray-400 font-medium min-w-0">{spec.label}</span>
                        <span className="text-xs text-gray-900 font-semibold">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Full Specifications Table */}
          <ScrollReveal>
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <SlidersHorizontal size={24} className="text-ira-primary" />
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Technical Specifications</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0 border-t border-gray-200">
                {product.specs.map((spec, i) => (
                  <div key={i} className="py-2.5 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 border-b border-gray-100 hover:bg-gray-50/80 transition-colors px-2">
                    <span className="sm:w-2/5 text-xs sm:text-sm font-medium text-gray-500">{spec.label}</span>
                    <span className="sm:w-3/5 text-xs sm:text-sm text-gray-900 font-semibold">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Certifications */}
          <ScrollReveal>
            <div className="mb-12">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Certifications & Compliance</h2>
              <div className="flex flex-wrap gap-3">
                {product.certifications.map((cert, i) => (
                  <div key={i} className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-gray-200 shadow-sm hover:border-ira-primary/30 transition-colors">
                    <Shield size={14} className="text-ira-accent" />
                    <span className="text-sm font-medium text-gray-800">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Request a Quote Form */}
          <ScrollReveal>
            <div id="quote-form" className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-12 shadow-sm scroll-mt-32">
              <div className="px-6 py-4 bg-ira-primary-dark text-white flex items-center gap-3">
                <Send size={18} />
                <h2 className="text-base font-bold">Request a Quote — {product.name}</h2>
              </div>
              <div className="p-6 md:p-8">
                {quoteSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto rounded-full bg-ira-accent/10 flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 text-ira-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Enquiry Submitted!</h4>
                    <p className="text-gray-500 text-sm">Our team will contact you within 24 hours with a detailed quotation.</p>
                  </div>
                ) : (
                  <form onSubmit={handleQuoteSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="quote-name" className="block text-sm font-semibold text-gray-700 mb-1.5">
                          Full Name *
                        </label>
                        <input
                          id="quote-name"
                          type="text"
                          required
                          value={quoteForm.name}
                          onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:border-ira-primary focus:ring-2 focus:ring-ira-primary/10 outline-none transition-all"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label htmlFor="quote-org" className="block text-sm font-semibold text-gray-700 mb-1.5">
                          Organization *
                        </label>
                        <input
                          id="quote-org"
                          type="text"
                          required
                          value={quoteForm.organization}
                          onChange={(e) => setQuoteForm({ ...quoteForm, organization: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:border-ira-primary focus:ring-2 focus:ring-ira-primary/10 outline-none transition-all"
                          placeholder="Company / Municipality / Department"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="quote-phone" className="block text-sm font-semibold text-gray-700 mb-1.5">
                          Phone Number *
                        </label>
                        <input
                          id="quote-phone"
                          type="tel"
                          required
                          value={quoteForm.phone}
                          onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:border-ira-primary focus:ring-2 focus:ring-ira-primary/10 outline-none transition-all"
                          placeholder="+91 XXXXX XXXXX"
                        />
                      </div>
                      <div>
                        <label htmlFor="quote-email" className="block text-sm font-semibold text-gray-700 mb-1.5">
                          Email *
                        </label>
                        <input
                          id="quote-email"
                          type="email"
                          required
                          value={quoteForm.email}
                          onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:border-ira-primary focus:ring-2 focus:ring-ira-primary/10 outline-none transition-all"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="quote-qty" className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Quantity / Requirement
                      </label>
                      <input
                        id="quote-qty"
                        type="text"
                        value={quoteForm.quantity}
                        onChange={(e) => setQuoteForm({ ...quoteForm, quantity: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:border-ira-primary focus:ring-2 focus:ring-ira-primary/10 outline-none transition-all"
                        placeholder="e.g. 10 units for Nashik Municipal Corporation"
                      />
                    </div>

                    <div>
                      <label htmlFor="quote-message" className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Additional Message
                      </label>
                      <textarea
                        id="quote-message"
                        rows={3}
                        value={quoteForm.message}
                        onChange={(e) => setQuoteForm({ ...quoteForm, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:border-ira-primary focus:ring-2 focus:ring-ira-primary/10 outline-none transition-all resize-none"
                        placeholder="Any specific customization, delivery location, or timeline requirements..."
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <button type="submit" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-ira-primary hover:bg-ira-primary-dark text-white text-sm font-bold rounded-lg transition-colors shadow-md hover:shadow-lg">
                        <Send size={16} />
                        Submit Enquiry
                      </button>
                      <a
                        href={`https://wa.me/${companyInfo.whatsapp}?text=${whatsappText}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#25D366] hover:bg-[#20BD5A] text-white text-sm font-bold rounded-lg transition-colors"
                      >
                        <MessageCircle size={16} fill="white" />
                        Quick Enquiry via WhatsApp
                      </a>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </ScrollReveal>

          {/* FAQ Accordion */}
          {faqs.length > 0 && (
            <ScrollReveal>
              <div className="mb-12">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                <div className="space-y-3">
                  {faqs.map((faq, i) => (
                    <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                      <button
                        onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-sm font-semibold text-gray-800 pr-4">{faq.q}</span>
                        {openFAQ === i ? (
                          <ChevronUp size={18} className="text-ira-primary flex-shrink-0" />
                        ) : (
                          <ChevronDown size={18} className="text-gray-400 flex-shrink-0" />
                        )}
                      </button>
                      {openFAQ === i && (
                        <div className="px-6 pb-4 border-t border-gray-100 pt-3">
                          <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* Related Products */}
          {allRelated.length > 0 && (
            <ScrollReveal>
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-gray-900">Related Products</h2>
                  <Link
                    href="/products"
                    className="text-xs font-bold text-ira-primary hover:underline flex items-center gap-1"
                  >
                    View All Products <ArrowRight size={12} />
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {allRelated.map((rp) => (
                    <ProductCard key={rp.id} product={rp} />
                  ))}
                </div>
              </div>
            </ScrollReveal>
          )}
        </div>
      </main>
      <Footer />
      <WhatsAppButton />

      {/* Fullscreen Image Popup */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm">
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-6 right-6 text-white/70 hover:text-white p-2 bg-black/50 hover:bg-black/80 rounded-full transition-all"
            aria-label="Close fullscreen"
          >
            <X size={24} />
          </button>
          
          <div className="relative w-full h-full max-w-6xl max-h-[90vh] flex items-center justify-center p-4" onClick={() => setIsFullscreen(false)}>
            <div className="relative w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
              <Image
                src={product.images[activeImageIndex] || product.images[0]}
                alt={`${product.name} — ${product.category} Full Resolution | iRA Synergy`}
                fill
                sizes="100vw"
                className="object-contain cursor-default"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
