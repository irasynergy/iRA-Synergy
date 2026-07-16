import Link from "next/link";
import { ArrowRight, TrendingUp, MapPin } from "lucide-react";
import ScrollReveal from "./ui/ScrollReveal";
import { getFeaturedProjects } from "@/data/projects";

const projectImages: Record<string, string> = {
  "proj-1": "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=800&auto=format&fit=crop", // Waste Management
  "proj-2": "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=800&auto=format&fit=crop", // Solar City
  "proj-3": "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop", // Smart School
};

export default function CaseStudiesPreview() {
  const featured = getFeaturedProjects(3);

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div>
              <div className="section-label bg-ira-primary/5 text-ira-primary inline-flex">
                <span className="w-2 h-2 rounded-full bg-ira-accent" />
                Our Impact
              </div>
              <h2 className="section-title text-gray-900 mt-2">
                Featured Projects
              </h2>
              <p className="text-gray-500 mt-2 max-w-xl">
                Real-world impact across India — measurable results that transform communities.
              </p>
            </div>
            <Link href="/projects" className="btn-outline self-start lg:self-auto flex-shrink-0">
              View All Projects
              <ArrowRight size={16} />
            </Link>
          </div>
        </ScrollReveal>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {featured.map((project, idx) => (
            <ScrollReveal key={project.id} delay={idx * 150}>
              <div className="group h-full bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
                {/* Image area */}
                <div className="relative h-48 bg-gray-200 overflow-hidden">
                  <img 
                    src={projectImages[project.id] || "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=800"} 
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />

                  {/* Category badge */}
                  <span className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-xs font-bold bg-ira-accent text-white">
                    {project.category}
                  </span>

                  {/* Location */}
                  <div className="absolute bottom-4 left-4 z-20 flex items-center gap-1.5 text-white/90 text-sm">
                    <MapPin size={14} />
                    {project.location}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-ira-primary transition-colors line-clamp-2 leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-xs text-gray-500 mb-6 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Testimonial preview */}
                  {project.testimonial && (
                    <blockquote className="border-l-2 border-ira-accent pl-4 mb-4">
                      <p className="text-xs text-gray-500 italic line-clamp-2">
                        &ldquo;{project.testimonial.quote}&rdquo;
                      </p>
                      <cite className="text-xs text-gray-400 not-italic mt-1 block">
                        — {project.testimonial.author}, {project.testimonial.role}
                      </cite>
                    </blockquote>
                  )}

                  {/* CTA */}
                  <Link
                    href={`/projects`}
                    className="flex items-center gap-2 text-ira-primary text-sm font-semibold group-hover:gap-3 transition-all"
                  >
                    View Case Study
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
