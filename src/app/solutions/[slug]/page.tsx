import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, Shield, PlayCircle, BookOpen, Atom, Microscope, Building, Settings } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { solutions, getSolutionBySlug, getAllSolutionSlugs } from "@/data/solutions";
import { products } from "@/data/products";
import { supabase } from "@/lib/supabase";
import type { Product } from "@/types";

const indicatorColors: Record<string, string> = {
  "bg-blue-900": "bg-blue-600",
  "bg-green-700": "bg-green-600",
  "bg-amber-600": "bg-amber-500",
  "bg-rose-600": "bg-rose-500",
  "bg-teal-600": "bg-teal-500",
  "bg-indigo-700": "bg-indigo-600",
};

export const revalidate = 0;
export const dynamicParams = true;


export async function generateStaticParams() {
  return getAllSolutionSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);
  if (!solution) return {};
  return {
    title: `${solution.title} | iRA Synergy`,
    description: solution.description,
  };
}

export default async function SolutionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);

  if (!solution) notFound();

  // Find related products
  let relatedProducts = solution.relatedProductSlugs
    .map((ps) => products.find((p) => p.slug === ps))
    .filter(Boolean);

  const isSupabaseConfigured =
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (isSupabaseConfigured) {
    try {
      const { data: dbProducts } = await supabase
        .from("products")
        .select("*")
        .in("slug", solution.relatedProductSlugs);

      if (dbProducts && dbProducts.length > 0) {
        // Map dbProducts to match the order of relatedProductSlugs
        relatedProducts = solution.relatedProductSlugs
          .map((slug) => {
            const dbP = dbProducts.find((p) => p.slug === slug);
            if (dbP) {
              const mappedP: Product = {
                id: dbP.id,
                slug: dbP.slug,
                name: dbP.name,
                category: dbP.category as any,
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
              };
              return mappedP;
            }
            return products.find((p) => p.slug === slug); // fallback to static product
          })
          .filter(Boolean) as Product[];
      }
    } catch (e) {
      console.warn("Supabase fetch failed for solutions, falling back to static products", e);
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow pt-20 lg:pt-44">

        {/* Custom Premium Hero with Dynamic Theme */}
        <div className={`relative overflow-hidden ${solution.color} text-white`}>
          <div className="absolute inset-0 pattern-grid opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-transparent to-transparent" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <Breadcrumb
                items={[
                  { label: "Solutions", href: "/solutions" },
                  { label: solution.shortTitle },
                ]}
              />
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight mt-6">
                {solution.title.split(" ").slice(0, -1).join(" ")}{" "}
                <span className="text-white/80">{solution.title.split(" ").slice(-1)}</span>
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-10 leading-relaxed">
                {solution.description}
              </p>

              {/* Stats Row */}
              <div className="flex flex-wrap gap-4 sm:gap-8 mb-8">
                {solution.stats.map((stat, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-3xl font-extrabold text-white">{stat.value}</span>
                    <span className="text-sm text-white/70 uppercase tracking-wide">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Image / Graphic */}
            <div className="flex-1 w-full max-w-lg hidden md:block">
              <div className="relative aspect-square rounded-full bg-white/5 border border-white/10 p-8 shadow-2xl flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-dashed border-white/20 animate-spin-slow"></div>
                <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl">
                  <Image
                    src={solution.image}
                    alt={solution.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Overview Section */}
        <section className="py-20 bg-white border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <ScrollReveal>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Solution Overview</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {solution.longDescription}
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Video Explanation Section */}
        <section className="py-20 bg-gray-50 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Experience the Future</h2>
              <p className="text-gray-600 text-lg">
                Watch how our integrated {solution.shortTitle} solutions revolutionize the landscape, providing sustainable and innovative infrastructure.
              </p>
            </div>

            <ScrollReveal>
              <div className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl bg-gray-900 aspect-video ring-4 ring-white">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/yXu1wtSQ28Y?si=Onrxbv_BO1xpSZ9B" // Using a placeholder video link
                  title={`${solution.title} Overview`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Core Products Grid Section (Compact) */}
        <section className="py-20 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 uppercase tracking-wider">Core Products</h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Discover the high-quality, certified products that power our {solution.shortTitle} installations.
              </p>
              <div className={`w-24 h-1 ${indicatorColors[solution.color] || 'bg-ira-primary'} mx-auto rounded-full mt-4`}></div>
            </div>

            {/* Changed to 2-3-4 cols for more compact layout */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((product) => {
                if (!product) return null;
                return (
                  <ScrollReveal key={product.slug}>
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-ira-primary/30 transition-all duration-300 flex flex-col h-full group">
                      {/* Product Image - Smaller aspect ratio */}
                      <div className="relative aspect-video bg-gray-50 overflow-hidden border-b border-gray-100 flex items-center justify-center p-2">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                        />
                        {product.badge && (
                          <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded text-[9px] font-bold bg-ira-accent text-white uppercase tracking-wider shadow-sm">
                            {product.badge}
                          </span>
                        )}
                      </div>

                      {/* Product Content - Reduced padding and text sizes */}
                      <div className="p-4 flex flex-col flex-grow">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-ira-primary mb-1 block truncate">
                          {product.category}
                        </span>
                        <h3 className="text-sm font-bold text-gray-900 group-hover:text-ira-primary transition-colors line-clamp-2 mb-2 min-h-[40px]">
                          {product.name}
                        </h3>

                        {/* Hidden short description on mobile, 2 lines on desktop */}
                        <p className="hidden sm:block text-[11px] text-gray-500 leading-relaxed line-clamp-2 mb-3 flex-grow">
                          {product.shortDescription}
                        </p>

                        {/* View Details Link */}
                        <Link
                          href={`/products/${product.slug}`}
                          className="mt-auto inline-flex items-center justify-center gap-1 w-full py-2 bg-gray-50 hover:bg-ira-primary text-gray-700 hover:text-white text-[11px] font-bold rounded-lg transition-colors border border-gray-200 hover:border-ira-primary"
                        >
                          View Details
                          <ArrowRight size={12} />
                        </Link>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Solution Details: Features & Use Cases */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

              {/* Features Column */}
              <div className="lg:col-span-7">
                <ScrollReveal variant="left">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <CheckCircle2 className="text-ira-primary" size={24} />
                    Key Features & Technical Capabilities
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                    {solution.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-white border border-gray-100 hover:border-ira-primary/20 transition-all shadow-sm">
                        <CheckCircle2 size={16} className="text-ira-accent mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700 leading-snug">{feature}</span>
                      </div>
                    ))}
                  </div>
                </ScrollReveal>
              </div>

              {/* Use Cases Column */}
              <div className="lg:col-span-5">
                <ScrollReveal variant="right">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Building className="text-ira-primary" size={24} />
                    Target Sectors
                  </h3>

                  <div className="space-y-3">
                    {solution.useCases.map((useCase, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                        <div className={`w-6 h-6 rounded flex items-center justify-center bg-ira-primary/10 text-ira-primary font-bold text-xs`}>
                          {i + 1}
                        </div>
                        <span className="text-sm font-medium text-gray-800">{useCase}</span>
                      </div>
                    ))}
                  </div>
                </ScrollReveal>
              </div>

            </div>
          </div>
        </section>

        {/* Certifications and CTA Banner */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`${solution.color} rounded-3xl p-8 md:p-16 relative overflow-hidden shadow-2xl text-white`}>
              <div className="absolute inset-0 pattern-grid opacity-20" />
              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
                <div className="max-w-2xl">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to upgrade your infrastructure?</h2>
                  <p className="text-white/80 text-lg mb-8">
                    Get a comprehensive audit and custom proposal for your project. Our setups are fully compliant with all relevant industry standards.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    {solution.certifications.map((cert, i) => (
                      <div key={i} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                        <Shield size={16} className="text-white/90" />
                        <span className="text-sm font-medium">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex-shrink-0 w-full lg:w-auto">
                  <Link href="/contact" className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-xl font-bold hover:bg-gray-50 transition-colors shadow-xl">
                    Request a Proposal
                    <ArrowRight size={20} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
