import type { Metadata } from "next";
import Image from "next/image";
import { ShieldCheck, Lightbulb, Leaf, Users, Handshake, Award, Target, Eye, Heart, Shield, FileCheck, Building2, Rocket, Briefcase, Package, MapPin, Flag } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CTABanner from "@/components/CTABanner";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CountUp from "@/components/ui/CountUp";
import { companyInfo, certifications, coreValues, companyStats, platforms, teamMembers as staticTeamMembers } from "@/data/company";
import { supabase } from "@/lib/supabase";
import type { TeamMember } from "@/types";

export const metadata: Metadata = {
  title: "About Us — iRA Synergy",
  description:
    "Learn about iRA Synergy — our mission, team, and commitment to supplying quality infrastructure and sustainability products to government and institutional buyers across India.",
  alternates: { canonical: "https://irasynergy.com/about" },
};

const valueIcons: Record<string, React.ElementType> = {
  ShieldCheck, Lightbulb, Leaf, Users, Handshake, Award,
};

const certIcons: Record<string, React.ElementType> = {
  Shield, Leaf, FileCheck, Building2, Rocket, Award, ShieldCheck
};

const statIcons: Record<string, React.ElementType> = {
  Briefcase, Package, MapPin, Flag
};

export const revalidate = 60; // Revalidate every 60 seconds

export default async function AboutPage() {
  let dynamicTeamMembers: TeamMember[] = [];
  let dynamicDirectors: typeof companyInfo.directors = [];

  try {
    const { data: teamData } = await supabase
      .from("gallery")
      .select("*")
      .eq("category", "Team")
      .order("uploaded_at", { ascending: true });

    if (teamData && teamData.length > 0) {
      dynamicTeamMembers = teamData.map((img: any) => ({
        id: img.id,
        name: img.title || "Unknown",
        role: img.caption || "Team Member",
        bio: "",
        image: img.src,
        email: "",
        linkedin: "#",
      }));
    }

    const { data: directorData } = await supabase
      .from("gallery")
      .select("*")
      .eq("category", "Director")
      .order("uploaded_at", { ascending: true });

    if (directorData && directorData.length > 0) {
      dynamicDirectors = directorData.map((img: any) => ({
        name: img.title || "Unknown",
        title: img.caption?.split('|')[0]?.trim() || "Director",
        quote: img.caption?.split('|')[1]?.trim() || "Leading with excellence.",
        image: img.src,
      }));
    }
  } catch (err) {
    console.error("Failed to fetch team/director images:", err);
  }

  const finalTeamMembers = dynamicTeamMembers.length > 0 ? dynamicTeamMembers : staticTeamMembers;
  const finalDirectors = dynamicDirectors.length > 0 ? dynamicDirectors : companyInfo.directors;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-grow">

        {/* Compact Hero Section */}
        <section className="relative w-full pt-32 pb-24 md:pt-48 md:pb-32 border-b border-gray-800 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/team/about-image.jpeg"
              alt="Corporate Profile"
              fill
              className="object-cover object-center"
              priority
            />
            {/* Dark overlay filter for text readability */}
            <div className="absolute inset-0 bg-black/60" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
            <ScrollReveal>
              <span className="text-emerald-400 font-bold tracking-[0.4em] uppercase mb-4 block text-sm md:text-base drop-shadow-sm">
                Corporate Profile
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-white leading-[1.1] tracking-tight mb-6 drop-shadow-lg">
                Pioneering India's <br /> Infrastructure Evolution.
              </h1>
              <p className="text-lg md:text-xl text-gray-200 font-light max-w-3xl mx-auto drop-shadow-md">
                {companyInfo.mission}
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Expansive Corporate Story */}
        <section className="py-24 md:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

              <div className="lg:w-1/3">
                <ScrollReveal variant="left">
                  <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight sticky top-32">
                    Who <br className="hidden lg:block" /> We Are.
                  </h2>
                </ScrollReveal>
              </div>

              <div className="lg:w-2/3 space-y-8 text-lg md:text-xl text-gray-600 font-light leading-relaxed">
                <ScrollReveal>
                  <p className="first-letter:text-7xl first-letter:font-black first-letter:text-ira-primary first-letter:mr-3 first-letter:float-left">
                    {companyInfo.storyParagraph1}
                  </p>
                </ScrollReveal>
                <ScrollReveal delay={100}>
                  <p>{companyInfo.storyParagraph2}</p>
                </ScrollReveal>
                <ScrollReveal delay={200}>
                  <p>{companyInfo.storyParagraph3}</p>
                </ScrollReveal>
              </div>

            </div>
          </div>
        </section>

        {/* The Scale of Synergy (Dark Numbers Block) */}
        <section className="py-24 bg-[#050505] text-white border-y border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="text-center mb-16">
                <span className="text-ira-primary font-bold tracking-[0.3em] uppercase text-sm mb-4 block">Our Impact</span>
                <h2 className="text-4xl md:text-5xl font-black">The Scale of Synergy</h2>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 divide-x divide-white/10">
              {companyStats.map((stat, idx) => {
                const Icon = statIcons[stat.icon] || Target;
                return (
                  <ScrollReveal key={stat.id} delay={idx * 100} className="text-center px-4">
                    <div className="flex justify-center mb-6">
                      <Icon className="text-gray-500" size={32} />
                    </div>
                    <div className="text-5xl md:text-7xl font-black text-white mb-2 tracking-tighter">
                      <CountUp end={stat.value} duration={2.5} />
                      <span className="text-ira-primary">{stat.suffix}</span>
                    </div>
                    <p className="text-sm md:text-base text-gray-400 font-bold uppercase tracking-widest">{stat.label}</p>
                  </ScrollReveal>
                )
              })}
            </div>
          </div>
        </section>

        {/* Directors' Vision */}
        <section className="py-24 md:py-32 bg-gray-50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            {finalDirectors?.map((director, index) => (
              <div key={index} className="bg-white rounded-[3rem] shadow-xl border border-gray-100 overflow-hidden">
                <div className={`flex flex-col ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>

                  {/* Director Image */}
                  <div className="lg:w-2/5 relative h-[400px] lg:h-[600px]">
                    <Image
                      src={director.image}
                      alt={director.name}
                      fill
                      className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-8 left-8 text-white">
                      <p className="text-3xl font-black mb-1">{director.name}</p>
                      <p className="text-ira-primary font-bold tracking-widest uppercase text-sm">{director.title}</p>
                    </div>
                  </div>

                  {/* Quote Content */}
                  <div className="lg:w-3/5 p-8 sm:p-12 md:p-16 lg:p-20 flex flex-col justify-center">
                    <ScrollReveal>
                      <span className="text-7xl sm:text-9xl text-gray-200 leading-none block h-12 sm:h-20 font-serif">"</span>
                      <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-gray-900 leading-tight mb-6 sm:mb-8">
                        {director.quote}
                      </h3>
                      <div className="w-16 sm:w-20 h-1 bg-ira-primary mb-6 sm:mb-8" />
                      <p className="text-sm sm:text-base text-gray-500 font-medium">
                        {director.description || "At iRA Synergy, we don't just supply equipment. We act as strategic engineering partners for India's largest civic and corporate entities, ensuring that every rupee invested yields a generation of value."}
                      </p>
                    </ScrollReveal>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Leadership Team / Key Personnel */}
        <section className="py-20 md:py-24 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="text-center mb-16">
                <span className="text-ira-primary font-bold tracking-[0.3em] uppercase text-sm mb-4 block">Leadership</span>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900">Key Personnel</h2>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {finalTeamMembers.map((member, idx) => (
                <ScrollReveal key={member.id} delay={idx * 100}>
                  <div className="flex flex-col items-center text-center group cursor-default">
                    <div className="relative w-32 h-32 md:w-40 md:h-40 mb-6 rounded-full overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300 border-4 border-gray-50 group-hover:border-ira-primary/20">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                      />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900">{member.name}</h4>
                    <p className="text-xs sm:text-sm font-bold text-ira-primary mb-2 uppercase tracking-wide">{member.role}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Trust & Compliance Grid */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="text-center max-w-3xl mx-auto mb-12">
              <ScrollReveal>
                <span className="text-ira-primary font-bold tracking-[0.3em] uppercase text-xs mb-2 block">Compliance</span>
                <h2 className="text-3xl font-black text-gray-900 mb-4">Certified Reliability.</h2>
                <p className="text-sm text-gray-500">
                  Our operations adhere to the strictest international and domestic quality standards, ensuring absolute compliance for government procurement.
                </p>
              </ScrollReveal>
            </div>
            <ScrollReveal delay={200}>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-3 sm:gap-4 items-center justify-items-center py-2">
                {[
                  "08_client.png",
                  "ISO_9001.png",
                  "45001-2018.jpeg",
                  "ISO-14001-15.jpg",
                  "ohsas-iso-18001.png",
                  "tuv-1.png",
                  "gmp-quality.png",
                  "ICE.png",
                  "images.jpg",
                  "mh-logo.png",
                  "zgold-logo.png",
                  "nabl-india-seeklogo.png",
                  "newNS.png",
                  "qa-certificate.jpeg",
                  "1673846.jpg",
                  "CVC.png",
                  "gem-logo.png"
                ].map((logo, index) => (
                  <div key={index} className="w-full flex items-center justify-center bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow aspect-square relative overflow-hidden group">
                    <Image
                      src={`/images/brands/${logo}`}
                      alt={`Compliance Certificate ${index + 1}`}
                      fill
                      className="object-contain p-3 mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Platforms We Are Available On */}
            <div className="mt-20 text-center max-w-3xl mx-auto mb-10">
              <ScrollReveal>
                <span className="text-ira-primary font-bold tracking-[0.3em] uppercase text-xs mb-2 block">Availability</span>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900">Platforms we are available on.</h2>
              </ScrollReveal>
            </div>

            <ScrollReveal delay={200}>
              <div className="flex flex-wrap justify-center gap-4 sm:gap-8 py-2">
                {[
                  { file: "amazon.svg", name: "Amazon" },
                  { file: "indiamart.png", name: "IndiaMART" },
                  { file: "tradeindia1.png", name: "Trade India" },
                  { file: "gem-logo.png", name: "GeM" },
                ].map((platform, index) => (
                  <div key={`platform-${index}`} className="w-32 sm:w-48 flex items-center justify-center bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow aspect-[4/3] relative overflow-hidden group">
                    <Image
                      src={`/images/brands/${platform.file}`}
                      alt={platform.name}
                      fill
                      className="object-contain p-3 mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </ScrollReveal>

          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
