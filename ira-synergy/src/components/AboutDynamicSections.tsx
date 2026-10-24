"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { companyInfo, teamMembers as staticTeamMembers } from "@/data/company";
import { supabase } from "@/lib/supabase";
import type { TeamMember } from "@/types";

export default function AboutDynamicSections() {
  const [directors, setDirectors] = useState(companyInfo.directors);
  const [teamMembers, setTeamMembers] = useState(staticTeamMembers);

  useEffect(() => {
    const fetchDynamicData = async () => {
      try {
        const hasUrl = !!(process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL);
        const hasKey = !!(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_PUBLISHABLE_KEY);
        
        if (hasUrl && hasKey) {
          // Fetch Team
          const { data: teamData } = await supabase
            .from("gallery")
            .select("*")
            .eq("category", "Team")
            .order("uploaded_at", { ascending: true });

          if (teamData && teamData.length > 0) {
            setTeamMembers(teamData.map((img: any) => ({
              id: img.id,
              name: img.title || "Unknown",
              role: img.caption || "Team Member",
              bio: "",
              image: img.src,
              email: "",
              linkedin: "#",
            })));
          }

          // Fetch Directors
          const { data: directorData } = await supabase
            .from("gallery")
            .select("*")
            .eq("category", "Director")
            .order("uploaded_at", { ascending: true });

          if (directorData && directorData.length > 0) {
            setDirectors(directorData.map((img: any) => ({
              name: img.title || "Unknown",
              title: img.caption?.split('|')[0]?.trim() || "Director",
              quote: img.caption?.split('|')[1]?.trim() || "Leading with excellence.",
              description: img.caption?.split('|')[2]?.trim() || "",
              image: img.src,
            })));
          }
        }
      } catch (err) {
        console.error("Failed to fetch dynamic about data", err);
      }
    };
    fetchDynamicData();
  }, []);

  return (
    <>
      {/* Directors' Vision */}
      <section className="py-24 md:py-32 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {directors?.map((director, index) => (
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
            {teamMembers.map((member, idx) => (
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
    </>
  );
}
