import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="relative overflow-hidden">
      <div className="gradient-amber py-20 md:py-24 relative">
        {/* Pattern */}
        <div className="absolute inset-0 pattern-grid opacity-10" />

        {/* Glow effects */}
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-white/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-ira-primary/10 rounded-full blur-[80px]" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight leading-tight">
            Ready to Transform Your
            <br />
            Infrastructure?
          </h2>
          <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            From concept to commissioning — we handle everything. Get a free consultation
            and custom project proposal within 48 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold rounded-xl text-ira-amber bg-white hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              Request Free Consultation
              <ArrowRight size={18} />
            </Link>
            <a
              href="tel:+917588015401"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold rounded-xl text-white bg-white/10 border-2 border-white/30 hover:bg-white/20 transition-all"
            >
              <Phone size={18} />
              Call: +91 75880 15401
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
