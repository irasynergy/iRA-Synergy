import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, User } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { blogs as staticBlogs } from "@/data/blogs";
import { supabase } from "@/lib/supabase";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Insights & Engineering Blog | iRA Synergy",
  description: "Read the latest insights on smart city infrastructure, renewable energy, and heavy engineering.",
};

export default async function BlogHubPage() {
  let allBlogs = staticBlogs;

  const isSupabaseConfigured =
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (isSupabaseConfigured) {
    try {
      const { data: dbBlogs } = await supabase
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: false });

      if (dbBlogs && dbBlogs.length > 0) {
        const mapped = dbBlogs.map((dbB: any) => ({
          id: dbB.id,
          slug: dbB.slug,
          title: dbB.title,
          excerpt: dbB.excerpt || "",
          content: dbB.content || "",
          coverImage: dbB.cover_image || "",
          author: dbB.author || "Admin",
          date: dbB.date || "",
          readTime: dbB.read_time || "",
          category: dbB.category || "",
          relatedSolutionSlug: dbB.related_solution_slug || "",
        }));

        const combined = [...staticBlogs];
        for (const item of mapped) {
          const idx = combined.findIndex((b) => b.id === item.id);
          if (idx >= 0) combined[idx] = item;
          else combined.unshift(item);
        }
        allBlogs = combined;
      }
    } catch (e) {
      console.warn("Supabase fetch failed for blogs, falling back to static blogs", e);
    }
  }

  const featuredBlog = allBlogs[0];
  const regularBlogs = allBlogs.slice(1);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-grow pt-20 lg:pt-44 pb-24">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight mb-6">
                Insights & <span className="text-ira-primary">Engineering.</span>
              </h1>
              <p className="text-xl text-gray-500 font-medium leading-relaxed">
                Expert perspectives on the future of heavy infrastructure, sustainable technology, and smart city deployments.
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Featured Article - Magazine Hero Style */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <ScrollReveal>
            <Link href={`/blog/${featuredBlog.slug}`} className="group block">
              <div className="relative h-[500px] md:h-[600px] w-full rounded-[2rem] overflow-hidden shadow-2xl">
                <Image 
                  src={featuredBlog.coverImage}
                  alt={featuredBlog.title}
                  fill
                  sizes="100vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  priority
                />
                {/* Heavy bottom gradient for legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
                
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
                  <div className="max-w-4xl">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="bg-ira-primary text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                        {featuredBlog.category}
                      </span>
                      <span className="text-white/80 text-sm font-medium flex items-center gap-1.5">
                        <Clock size={14} />
                        {featuredBlog.readTime}
                      </span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6 group-hover:underline decoration-ira-primary underline-offset-4">
                      {featuredBlog.title}
                    </h2>
                    <p className="text-lg md:text-xl text-gray-300 font-light mb-8 line-clamp-2 md:line-clamp-none max-w-3xl">
                      {featuredBlog.excerpt}
                    </p>
                    <div className="flex items-center justify-between border-t border-white/20 pt-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                          <User size={18} className="text-white" />
                        </div>
                        <div>
                          <p className="text-white font-medium text-sm">{featuredBlog.author}</p>
                          <p className="text-white/60 text-xs">{featuredBlog.date}</p>
                        </div>
                      </div>
                      <div className="hidden sm:flex items-center gap-2 text-ira-primary font-bold">
                        Read Full Article
                        <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </ScrollReveal>
        </div>

        {/* Regular Article Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-10">
            <h3 className="text-2xl font-bold text-gray-900">Latest Dispatches</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {regularBlogs.map((blog, idx) => (
              <ScrollReveal key={blog.id} delay={idx * 100}>
                <Link href={`/blog/${blog.slug}`} className="group block h-full flex flex-col">
                  <div className="relative h-64 w-full rounded-2xl overflow-hidden mb-6 shadow-md">
                    <Image 
                      src={blog.coverImage}
                      alt={blog.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-gray-900 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
                      {blog.category}
                    </div>
                  </div>
                  
                  <div className="flex flex-col flex-grow">
                    <div className="flex items-center gap-3 text-xs font-medium text-gray-500 mb-3">
                      <span className="flex items-center gap-1"><Clock size={12}/> {blog.readTime}</span>
                      <span>•</span>
                      <span>{blog.date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-ira-primary transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                      {blog.excerpt}
                    </p>
                    
                    <div className="flex items-center gap-2 text-sm font-bold text-gray-900 mt-auto">
                      Read Article
                      <ArrowRight size={16} className="text-ira-primary group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>

      </main>
      
      <CTABanner />
      <Footer />
    </div>
  );
}
