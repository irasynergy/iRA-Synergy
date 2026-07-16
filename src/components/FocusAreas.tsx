import { GraduationCap, Activity, Leaf, Landmark, Users, Star } from "lucide-react";
import ScrollReveal from "./ui/ScrollReveal";

const focusAreas = [
  {
    id: "01",
    title: "Education Development",
    description: "Providing quality educational resources and programs to empower learners and educators.",
    icon: GraduationCap,
    gradient: "from-focus-edu to-[#2B4A75]",
  },
  {
    id: "02",
    title: "Sports Promotion",
    description: "Promoting fitness, teamwork, and excellence through sports infrastructure and initiatives.",
    icon: Activity,
    gradient: "from-focus-sports to-[#3DBFB0]",
  },
  {
    id: "03",
    title: "Environmental Sustainability",
    description: "Supporting green initiatives and sustainable practices for a cleaner, healthier planet.",
    icon: Leaf,
    gradient: "from-focus-env to-[#66BB6A]",
  },
  {
    id: "04",
    title: "Government Schemes Support",
    description: "Partnering with government departments to execute impactful development projects.",
    icon: Landmark,
    gradient: "from-focus-gov to-[#1D3557]",
  },
  {
    id: "05",
    title: "Community Empowerment",
    description: "Building stronger communities through awareness, inclusivity, and development programs.",
    icon: Users,
    gradient: "from-focus-comm to-[#7E57C2]",
  },
  {
    id: "06",
    title: "Youth Development",
    description: "Nurturing young talent and inspiring the leaders of tomorrow.",
    icon: Star,
    gradient: "from-focus-youth to-[#2E5CB8]",
  },
];

export default function FocusAreas() {
  return (
    <section id="focus" className="section-padding bg-white pattern-dots pt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal>
          <div className="section-header">
            <div className="section-label bg-ira-primary/5 text-ira-primary">
              <span className="w-2 h-2 rounded-full bg-ira-accent" />
              What We Focus On
            </div>
            <h2 className="section-title text-gray-900">
              Our Focus Areas
            </h2>
            <p className="section-subtitle">
              Six Key Areas. One Stronger India.
            </p>
          </div>
        </ScrollReveal>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {focusAreas.map((area, idx) => (
            <ScrollReveal key={area.id} delay={idx * 100}>
              <div className="group relative bg-white rounded-2xl glass-card card-hover card-border-glow overflow-hidden h-full">
                <div className="p-8 flex flex-col items-center text-center">
                  {/* Icon */}
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${area.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-500`}>
                    <area.icon size={36} className="text-white" strokeWidth={1.5} />
                  </div>

                  {/* Number */}
                  <span className="text-5xl font-extrabold text-gray-100 mb-2 font-mono-nums">
                    {area.id}
                  </span>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-ira-primary transition-colors">
                    {area.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {area.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom Banner */}
        <ScrollReveal>
          <div className="gradient-primary rounded-2xl overflow-hidden shadow-premium-lg relative">
            <div className="absolute inset-0 pattern-grid opacity-20" />
            <div className="relative z-10 flex flex-col md:flex-row">
              <div className="md:w-1/3 bg-ira-secondary/30 p-8 flex items-center justify-center border-r border-white/10">
                <div className="text-center md:text-left">
                  <p className="text-sm font-medium text-white/60 tracking-wide mb-1">
                    Focused Today.
                  </p>
                  <p className="text-xl font-bold text-white">
                    Building a Better Tomorrow.
                  </p>
                </div>
              </div>
              <div className="md:w-2/3 p-8 flex flex-wrap items-center justify-around gap-6">
                {[
                  { label: "Sustainable Impact", icon: "🛡️" },
                  { label: "Stronger Communities", icon: "👥" },
                  { label: "Nationwide Growth", icon: "📈" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 text-white">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="font-semibold">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
