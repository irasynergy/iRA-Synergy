import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, User, ArrowRight, Layers } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import { blogs as staticBlogs, type BlogPost } from "@/data/blogs";
import { solutions } from "@/data/solutions";
import { supabase } from "@/lib/supabase";

export const dynamicParams = true;
export const revalidate = 0;

export async function generateStaticParams() {
  return staticBlogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Try Supabase first, then fall back to static
  let blog: BlogPost | undefined;

  const isSupabaseConfigured =
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (isSupabaseConfigured) {
    try {
      const { data: dbBlog } = await supabase
        .from("blogs")
        .select("*")
        .eq("slug", slug)
        .single();

      if (dbBlog) {
        blog = {
          id: dbBlog.id,
          slug: dbBlog.slug,
          title: dbBlog.title,
          excerpt: dbBlog.excerpt || "",
          content: dbBlog.content || "",
          coverImage: dbBlog.cover_image || "",
          author: dbBlog.author || "Admin",
          date: dbBlog.date || "",
          readTime: dbBlog.read_time || "",
          category: dbBlog.category || "",
          relatedSolutionSlug: dbBlog.related_solution_slug || "",
        };
      }
    } catch (e) {
      // Supabase fetch failed, will fall back to static
    }
  }

  // Fall back to static data
  if (!blog) {
    blog = staticBlogs.find((b) => b.slug === slug);
  }

  if (!blog) {
    notFound();
  }

  // Find the related solution for the CTA at the bottom
  const relatedSolution = solutions.find((s) => s.slug === blog.relatedSolutionSlug);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      
      <main className="flex-grow pt-20 lg:pt-44 pb-20">
        
        {/* Editorial Header */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-10">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-ira-primary hover:text-ira-primary-dark transition-colors mb-8">
            <ArrowLeft size={16} />
            Back to Insights
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <span className="bg-gray-100 text-gray-600 text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
              {blog.category}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.1] tracking-tight mb-8">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-gray-500 border-b border-gray-100 pb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <User size={14} className="text-gray-600" />
              </div>
              <span className="text-gray-900">{blog.author}</span>
            </div>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-gray-300"></div>
            <span className="flex items-center gap-1.5">
              <Clock size={16} />
              {blog.readTime}
            </span>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-gray-300"></div>
            <span>{blog.date}</span>
          </div>
        </div>

        {/* Massive Featured Image */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="relative w-full h-[400px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
            <Image 
              src={blog.coverImage}
              alt={blog.title}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Article Body */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <article 
            className="prose prose-lg prose-gray max-w-none 
                       prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-gray-900 
                       prose-p:text-gray-600 prose-p:leading-relaxed 
                       prose-a:text-ira-primary prose-a:no-underline hover:prose-a:underline
                       prose-img:rounded-2xl prose-img:shadow-lg
                       mb-20"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Solution CTA Block */}
          {relatedSolution && (
            <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8 md:p-10 mb-20 shadow-inner text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <div className="flex items-center justify-center md:justify-start gap-2 text-ira-primary font-bold uppercase tracking-widest text-xs mb-3">
                  <Layers size={16} />
                  Related Solution
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{relatedSolution.title}</h3>
                <p className="text-gray-500 text-sm max-w-md">
                  Interested in implementing the technology discussed in this article? Explore our turnkey {relatedSolution.title.toLowerCase()} solution.
                </p>
              </div>
              <Link 
                href={`/solutions/${relatedSolution.slug}`}
                className="flex-shrink-0 flex items-center justify-center gap-2 bg-ira-primary text-white font-bold px-8 py-4 rounded-xl hover:bg-ira-primary-dark transition-all hover:scale-105 shadow-md w-full md:w-auto"
              >
                Explore Solution
                <ArrowRight size={18} />
              </Link>
            </div>
          )}

        </div>

      </main>
      
      <CTABanner />
      <Footer />
    </div>
  );
}
