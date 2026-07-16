"use client";

import { useState, useEffect } from "react";
import { Search, Download, FileText, FileSpreadsheet, File, FolderDown } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { downloads as staticDownloads } from "@/data/downloads";
import { supabase } from "@/lib/supabase";
import type { Product } from "@/types";

export default function DownloadsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function loadProducts() {
      const isSupabaseConfigured =
        process.env.NEXT_PUBLIC_SUPABASE_URL &&
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (isSupabaseConfigured) {
        try {
          const { data: dbProducts, error } = await supabase
            .from("products")
            .select("*")
            .order("created_at", { ascending: false });

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
            setProducts(mapped);
            return;
          }
        } catch (e) {
          console.warn("Supabase fetch failed", e);
        }
      }

      try {
        const stored = localStorage.getItem("ira_admin_products");
        if (stored) {
          setProducts(JSON.parse(stored));
        }
      } catch (e) {}
    }
    loadProducts();
  }, []);

  // Map products with brochures into the download format
  const dynamicBrochures = products
    .filter(p => p.brochureUrl)
    .map(p => ({
      id: `prod-brochure-${p.id}`,
      title: `${p.name} Brochure`,
      description: p.shortDescription || p.description,
      category: p.category, // e.g. "Waste Management"
      fileType: "PDF",
      fileSize: "PDF File",
      url: p.brochureUrl as string,
      lastUpdated: new Date().toISOString(),
      previewImage: p.images?.[0] || null, // The preview!
      downloadName: `${p.name.replace(/[^a-zA-Z0-9]/g, "_")}_Brochure.pdf`
    }));

  const allDownloads = [...staticDownloads, ...dynamicBrochures];

  // Derive unique categories from all downloads
  const uniqueCategories = Array.from(new Set(allDownloads.map(d => d.category)));
  const categories = ["All", ...uniqueCategories];

  const filteredDownloads = allDownloads.filter((item) => {
    const matchesTab = activeTab === "All" || item.category === activeTab;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  // Group by category for the structured layout
  const groupedDownloads = filteredDownloads.reduce((acc, doc) => {
    if (!acc[doc.category]) {
      acc[doc.category] = [];
    }
    acc[doc.category].push(doc);
    return acc;
  }, {} as Record<string, typeof allDownloads>);

  const getFileIcon = (type: string) => {
    switch (type) {
      case "PDF":
        return <FileText className="text-red-500" size={32} />;
      case "XLSX":
        return <FileSpreadsheet className="text-emerald-500" size={32} />;
      case "DOCX":
        return <FileText className="text-blue-500" size={32} />;
      default:
        return <File className="text-gray-500" size={32} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      
      <main className="flex-grow pt-20 lg:pt-44 pb-24">
        
        {/* Minimalist Hero & Search Section */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <ScrollReveal>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-ira-primary/10 text-ira-primary mb-6">
              <FolderDown size={32} />
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight mb-6">
              Resource Center
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed mb-10">
              Instant access to our comprehensive library of product brochures, technical specifications, and ready-to-use BOQ quotations.
            </p>

            {/* Centered Search Bar */}
            <div className="relative max-w-2xl mx-auto shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl overflow-hidden mb-10">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <Search className="h-6 w-6 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-14 pr-6 py-5 bg-white border border-gray-100 text-base focus:ring-0 focus:outline-none transition-all placeholder-gray-400"
                placeholder="Search for documents, templates, or brochures..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Clean Pill Tabs */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveTab(category)}
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                    activeTab === category 
                      ? "bg-gray-900 text-white shadow-md" 
                      : "bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Spacious Cloud Drive Grid Layout */}
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
          
          {Object.keys(groupedDownloads).length > 0 ? (
            <div className="space-y-20">
              {Object.entries(groupedDownloads).map(([category, docs]) => (
                <div key={category}>
                  {/* Category Section Header */}
                  <div className="flex items-center gap-4 mb-8">
                    <h2 className="text-2xl font-black text-gray-900 tracking-tight">{category}</h2>
                    <div className="h-px bg-gray-100 flex-grow"></div>
                    <span className="text-sm font-bold text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
                      {docs.length} files
                    </span>
                  </div>

                  {/* Clean Grid of Files */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {docs.map((doc, docIdx) => (
                      <ScrollReveal key={doc.id} delay={(docIdx % 10) * 40}>
                        <div className="bg-white rounded-3xl p-6 border border-gray-100 hover:border-ira-primary/30 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-300 group flex flex-col h-full relative overflow-hidden">
                          
                          {/* File Type Badge */}
                          <div className="absolute top-4 left-4 z-10">
                            <span className="px-2 py-1 rounded text-[9px] font-black uppercase tracking-widest bg-gray-50/90 backdrop-blur text-gray-500 shadow-sm border border-gray-100">
                              {doc.fileType}
                            </span>
                          </div>

                          {/* Preview / Icon */}
                          <div className="w-full h-32 mx-auto rounded-2xl bg-gray-50 flex items-center justify-center mb-6 mt-4 group-hover:scale-[1.02] transition-transform duration-500 overflow-hidden">
                            {doc.previewImage ? (
                              <img src={doc.previewImage} alt={doc.title} className="w-full h-full object-contain p-2" />
                            ) : (
                              getFileIcon(doc.fileType)
                            )}
                          </div>

                          {/* File Details */}
                          <div className="text-center flex-grow flex flex-col">
                            <h3 className="text-sm font-bold text-gray-900 mb-2 line-clamp-2 leading-snug">
                              {doc.title}
                            </h3>
                            <p className="text-xs text-gray-400 mb-6 flex-grow line-clamp-2">
                              {doc.description || doc.fileSize}
                            </p>

                            {/* Download Action */}
                            <a 
                              href={doc.url} 
                              download={doc.downloadName} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gray-50 text-gray-500 font-bold text-xs group-hover:bg-ira-primary group-hover:text-white transition-colors duration-300"
                            >
                              <Download size={14} />
                              Download
                            </a>
                          </div>

                        </div>
                      </ScrollReveal>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            
            // Empty State
            <div className="max-w-lg mx-auto bg-gray-50 rounded-3xl border border-gray-100 p-16 text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Search className="text-gray-300" size={32} />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3">No files found</h3>
              <p className="text-gray-500 leading-relaxed mb-8">
                We couldn't find any documents matching your search query. Try adjusting your filters.
              </p>
              <button 
                onClick={() => { setSearchQuery(""); setActiveTab("All"); }}
                className="bg-ira-primary text-white font-bold px-6 py-3 rounded-xl hover:bg-ira-primary-dark transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}

        </div>
      </main>
      
      <CTABanner />
      <Footer />
    </div>
  );
}
