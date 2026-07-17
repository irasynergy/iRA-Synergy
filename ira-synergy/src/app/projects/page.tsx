import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { MapPin, TrendingUp, Quote, ExternalLink, Calendar, Target, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { projects } from "@/data/projects";
import { supabase } from "@/lib/supabase";
import { products as staticProducts } from "@/data/products";

export const metadata: Metadata = {
  title: "Projects & Case Studies — Real-World Impact",
  description:
    "Explore iRA Synergy's infrastructure and sustainability projects across India — case studies with measurable results for government departments, PSUs, and municipalities.",
  alternates: { canonical: "https://irasynergy.com/projects" },
};

export default async function ProjectsPage() {
  let products = staticProducts;
  
  const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase.from('products').select('*');
      if (!error && data && data.length > 0) {
        products = data;
      }
    } catch (e) {
      console.warn("Failed to fetch products on projects page", e);
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-grow pt-[100px] lg:pt-[130px]">
        {/* Light Hero Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
          <ScrollReveal>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight uppercase">
              Real World <span className="text-transparent bg-clip-text bg-gradient-to-r from-ira-primary to-ira-accent">Impact</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
              We engineer entire ecosystems. Explore our full-scale deployments across India and see how our infrastructure performs in the wild.
            </p>
          </ScrollReveal>
        </div>

        {/* Editorial Magazine Layout */}
        <div className="w-full pb-24">
          {projects.map((project, idx) => {
            const linkedProducts = project.productsUsed
              .map(prodName => products.find((p: any) => p.name === prodName))
              .filter(Boolean);

            const isEven = idx % 2 === 0;

            return (
              <section 
                key={project.id} 
                className={`py-24 border-t border-gray-100 ${isEven ? 'bg-white' : 'bg-gray-50'}`}
              >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <ScrollReveal>
                    
                    {/* Centered Project Header */}
                    <div className="text-center max-w-4xl mx-auto mb-12">
                      <div className="flex justify-center items-center gap-3 mb-6">
                        <span className="inline-flex px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-ira-primary/10 text-ira-primary">
                          {project.category}
                        </span>
                        {project.completionDate && (
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500">
                            <Calendar size={14} className="text-gray-400" />
                            {new Date(project.completionDate).getFullYear()}
                          </span>
                        )}
                      </div>
                      
                      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                        {project.title}
                      </h2>
                      
                      <div className="flex justify-center items-center gap-2 text-gray-600 font-medium tracking-wide text-sm">
                        <MapPin size={18} className="text-ira-accent" />
                        {project.location}
                      </div>
                    </div>

                    {/* Massive Banner Image */}
                    <div className="w-full h-[400px] md:h-[600px] relative rounded-[2rem] overflow-hidden shadow-xl mb-16">
                      {project.images?.[0] ? (
                        <Image 
                          src={project.images[0]} 
                          alt={project.title}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-1000"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-ira-primary to-ira-primary-dark"></div>
                      )}
                      <div className="absolute inset-0 bg-black/5"></div>
                    </div>

                    {/* 3-Column Editorial Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                      
                      {/* Column 1: Project Details (25%) */}
                      <div className="lg:col-span-3 space-y-8">
                        <div>
                          <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Client</h3>
                          <p className="text-gray-900 font-bold text-lg leading-snug">{project.client}</p>
                        </div>
                        
                        <div className="h-px bg-gray-200 w-full"></div>
                        
                        {/* Testimonial pulled to left column */}
                        {project.testimonial && (
                          <blockquote className="relative bg-gray-50/50 rounded-2xl p-6 border border-gray-100">
                            <Quote size={24} className="text-ira-primary/20 mb-3" />
                            <p className="text-gray-800 font-medium italic leading-relaxed text-sm mb-4">
                              "{project.testimonial.quote}"
                            </p>
                            <footer>
                              <strong className="text-gray-900 text-sm block">{project.testimonial.author}</strong>
                              <span className="text-gray-500 text-xs">{project.testimonial.role}</span>
                            </footer>
                          </blockquote>
                        )}
                      </div>

                      {/* Column 2: The Story (40%) */}
                      <div className="lg:col-span-5 space-y-10">
                        <div>
                          <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Target size={18} className="text-ira-primary" /> The Challenge
                          </h3>
                          <p className="text-gray-600 text-lg leading-relaxed">
                            {project.challenge || project.description}
                          </p>
                        </div>
                        {project.solution && (
                          <div>
                            <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                              <CheckCircle2 size={18} className="text-ira-accent" /> The Solution
                            </h3>
                            <p className="text-gray-600 text-lg leading-relaxed">
                              {project.solution}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Column 3: Impact & Products (35%) */}
                      <div className="lg:col-span-4 space-y-10">
                        
                        {/* Impact Metrics */}
                        <div>
                          <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Measurable Impact</h3>
                          <div className="grid grid-cols-2 gap-4">
                            {project.impact.map((imp, i) => (
                              <div key={i} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                                <div className="text-2xl font-black text-ira-primary mb-1">{imp.value}</div>
                                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{imp.metric}</div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Interactive Products Showcase */}
                        <div>
                          <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <TrendingUp size={14} className="text-ira-accent" /> Deployed Infrastructure
                          </h3>
                          
                          {linkedProducts.length > 0 ? (
                            <div className="flex flex-col gap-3">
                              {linkedProducts.map((prod, i) => (
                                <Link 
                                  href={`/products/${prod!.slug}`} 
                                  key={i}
                                  className="group flex items-center gap-4 p-3 rounded-xl border border-gray-100 bg-white hover:border-ira-primary hover:shadow-md transition-all"
                                >
                                  <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                                    <Image 
                                      src={prod!.images[0] || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=200"} 
                                      alt={prod!.name}
                                      fill
                                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                  </div>
                                  <div className="flex-grow min-w-0">
                                    <h4 className="text-sm font-bold text-gray-900 truncate group-hover:text-ira-primary transition-colors">
                                      {prod!.name}
                                    </h4>
                                    <p className="text-xs text-gray-500 truncate mt-0.5">View Specifications</p>
                                  </div>
                                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center mr-1 group-hover:bg-ira-primary/10 transition-colors flex-shrink-0">
                                    <ExternalLink size={14} className="text-gray-400 group-hover:text-ira-primary" />
                                  </div>
                                </Link>
                              ))}
                            </div>
                          ) : (
                            <div className="flex flex-wrap gap-2">
                              {project.productsUsed.map((prodName, i) => (
                                <span key={i} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-gray-100 text-gray-600">
                                  {prodName}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                      </div>

                    </div>
                  </ScrollReveal>
                </div>
              </section>
            );
          })}
        </div>

        <CTABanner />
      </main>
      
      <Footer />
    </div>
  );
}
