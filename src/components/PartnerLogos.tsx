import ScrollReveal from "./ui/ScrollReveal";

export default function PartnerLogos() {
  return (
    <section className="py-6 border-t border-gray-200 bg-white overflow-hidden">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          {/* Scrollable container for mobile so the logos don't get too tiny */}
          <div className="w-full overflow-x-auto pb-4 no-scrollbar">
            <div className="min-w-[800px] w-full flex justify-center">
              <img 
                src="/images/partner-logos-strip.jpg" 
                alt="Government Initiatives and Partners" 
                className="w-full h-auto object-contain mix-blend-multiply opacity-90 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
