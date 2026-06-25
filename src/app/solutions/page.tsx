import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { School, Recycle, Sun, HeartPulse, Dumbbell, Building2, ArrowRight, CheckCircle2, Shield } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CTABanner from "@/components/CTABanner";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { solutions } from "@/data/solutions";

export const metadata: Metadata = {
  title: "Solutions — Smart Infrastructure & Sustainability",
  description:
    "End-to-end infrastructure and sustainability solutions for government — smart schools, waste management, renewable energy, public health, fitness equipment, and smart city projects across India.",
  alternates: { canonical: "https://irasynergy.com/solutions" },
};

const iconMap: Record<string, React.ElementType> = {
  School, Recycle, Sun, HeartPulse, Dumbbell, Building2,
};

export default function SolutionsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow pt-20 lg:pt-44">
        
        {/* Spacious Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 text-center">
          <Breadcrumb items={[{ label: "Solutions" }]} />
          <ScrollReveal>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mt-6 mb-6 tracking-tight">
              Our <span className="text-ira-primary">Solutions</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
              End-to-end infrastructure and sustainability solutions engineered for modern government, institutions, and visionary communities across India.
            </p>
          </ScrollReveal>
        </div>

        {/* Premium Alternating Full-Width Sections */}
        <div className="flex flex-col">
          {solutions.map((solution, index) => {
            const Icon = iconMap[solution.icon] || Building2;
            const isEven = index % 2 === 0;

            return (
              <section 
                key={solution.id} 
                className={`py-24 ${isEven ? 'bg-gray-50' : 'bg-white'} border-b border-gray-100 last:border-0`}
              >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <ScrollReveal>
                    <div className={`flex flex-col lg:flex-row items-center gap-16 lg:gap-24 ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                      
                      {/* Image / Visual Side */}
                      <div className="w-full lg:w-5/12">
                        <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl group border border-gray-100">
                          <Image 
                            src={solution.image} 
                            alt={solution.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-in-out"
                          />
                          <div className={`absolute inset-0 opacity-20 mix-blend-multiply ${solution.color}`}></div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                          
                          {/* Floating Glass Icon */}
                          <div className={`absolute top-6 left-6 w-16 h-16 rounded-2xl ${solution.color} backdrop-blur-md bg-opacity-90 flex items-center justify-center shadow-2xl border border-white/20`}>
                            <Icon size={32} className="text-white" strokeWidth={1.5} />
                          </div>

                          {/* Stats overlay inside image */}
                          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-4">
                            {solution.stats.slice(0, 2).map((stat, i) => (
                              <div key={i} className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">
                                <div className="text-xl font-bold text-white">{stat.value}</div>
                                <div className="text-xs text-white/80 font-medium uppercase tracking-wider">{stat.label}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Content Side */}
                      <div className="w-full lg:w-7/12 flex flex-col justify-center">
                        <div className="mb-4">
                          <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${solution.color} text-white shadow-sm`}>
                            {solution.shortTitle}
                          </span>
                        </div>
                        
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">
                          {solution.title}
                        </h2>
                        
                        <p className="text-lg text-gray-600 leading-relaxed mb-8">
                          {solution.longDescription}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mb-10">
                          {solution.features.slice(0, 6).map((feat, i) => (
                            <div key={i} className="flex items-start gap-3">
                              <CheckCircle2 size={20} className="text-ira-accent mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700 font-medium">{feat}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-gray-100">
                          <Link 
                            href={`/solutions/${solution.slug}`}
                            className="inline-flex items-center gap-2 px-8 py-4 bg-ira-primary text-white rounded-xl font-bold hover:bg-ira-primary-dark transition-all hover:shadow-xl hover:-translate-y-1"
                          >
                            Explore Deep Dive
                            <ArrowRight size={20} />
                          </Link>
                          
                          <div className="flex items-center gap-3">
                            <Shield size={24} className="text-gray-400" />
                            <span className="text-sm text-gray-500 font-semibold tracking-wide">
                              {solution.certifications.slice(0, 2).join(" • ")}
                            </span>
                          </div>
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
      <WhatsAppButton />
    </div>
  );
}
