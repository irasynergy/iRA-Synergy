import Link from "next/link";
import { ArrowRight, Award, CheckCircle2, MapPin, Smile } from "lucide-react";
import ScrollReveal from "./ui/ScrollReveal";

export default function StatsBanner() {
  return (
    <section className="py-8">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="bg-[#052615] rounded-xl shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between p-6 lg:p-8 lg:px-12">
            
            {/* Stats Items */}
            <div className="grid grid-cols-2 md:flex md:flex-row items-center justify-between w-full lg:w-auto flex-grow gap-6 md:gap-0 md:divide-x divide-white/10">
              
              <div className="flex items-center gap-3 md:gap-4 px-2 lg:px-6">
                <div className="w-10 h-10 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-inner">
                  <Award className="text-[#052615] w-5 h-5 md:w-7 md:h-7" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-xl md:text-2xl lg:text-3xl font-extrabold text-white leading-none mb-1">10+</div>
                  <div className="text-[10px] md:text-xs text-white/90 font-medium">Years of Experience</div>
                </div>
              </div>

              <div className="flex items-center gap-3 md:gap-4 px-2 lg:px-6">
                <div className="w-10 h-10 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-inner">
                  <CheckCircle2 className="text-[#052615] w-5 h-5 md:w-7 md:h-7" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-xl md:text-2xl lg:text-3xl font-extrabold text-white leading-none mb-1">500+</div>
                  <div className="text-[10px] md:text-xs text-white/90 font-medium">Successful Projects</div>
                </div>
              </div>

              <div className="flex items-center gap-3 md:gap-4 px-2 lg:px-6">
                <div className="w-10 h-10 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-inner">
                  <MapPin className="text-[#052615] w-5 h-5 md:w-7 md:h-7" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-xl md:text-2xl lg:text-3xl font-extrabold text-white leading-none mb-1">25+</div>
                  <div className="text-[10px] md:text-xs text-white/90 font-medium">States Covered</div>
                </div>
              </div>

              <div className="flex items-center gap-3 md:gap-4 px-2 lg:px-6">
                <div className="w-10 h-10 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-inner">
                  <Smile className="text-[#052615] w-5 h-5 md:w-7 md:h-7" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-xl md:text-2xl lg:text-3xl font-extrabold text-white leading-none mb-1">1000+</div>
                  <div className="text-[10px] md:text-xs text-white/90 font-medium">Happy Clients</div>
                </div>
              </div>

            </div>

            {/* Divider between stats and CTA */}
            <div className="hidden lg:block w-px h-16 bg-white/10 mx-8"></div>

            {/* CTA Side */}
            <div className="flex flex-col items-center lg:items-start flex-shrink-0 mt-6 lg:mt-0 lg:w-64 relative z-10 pt-6 lg:pt-0 border-t border-white/10 lg:border-t-0 w-full lg:w-auto">
              <p className="text-white font-bold text-sm lg:text-[15px] mb-3 text-center lg:text-left leading-snug">
                Transforming Ideas into<br className="hidden lg:block" /> Sustainable Infrastructure
              </p>
              <Link href="/about" className="bg-[#5B9A27] hover:bg-[#4d8221] transition-colors text-white text-[11px] font-bold px-5 py-2.5 rounded flex items-center gap-2 tracking-wide">
                KNOW MORE ABOUT US
                <ArrowRight size={14} />
              </Link>
            </div>

          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
