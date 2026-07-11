"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from "lucide-react";
import ScrollReveal from "./ui/ScrollReveal";
import { companyInfo } from "@/data/company";
import { submitContact } from "@/app/actions/contact";
import toast from "react-hot-toast";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    industry: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const result = await submitContact(formData);
      
      if (result.success) {
        setSubmitted(true);
        setFormData({ name: "", email: "", phone: "", industry: "", message: "" });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        toast.error(result.error || "Failed to send message. Please try again.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="section-padding bg-white relative">
      <div className="absolute inset-0 pattern-dots opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="section-header">
            <div className="section-label bg-ira-steel/10 text-ira-steel">
              <span className="w-2 h-2 rounded-full bg-ira-amber" />
              Get in Touch
            </div>
            <h2 className="section-title text-gray-900">Contact Us</h2>
            <p className="section-subtitle">
              Ready to discuss your project? Reach out through any channel — we respond within 24 hours.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Info */}
          <ScrollReveal variant="left" className="lg:col-span-2">
            <div className="gradient-primary rounded-2xl p-8 text-white h-full relative overflow-hidden">
              <div className="absolute inset-0 pattern-grid opacity-10" />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-2">Let&apos;s Talk</h3>
                <p className="text-white/60 text-sm mb-8">
                  We&apos;d love to hear about your infrastructure needs.
                </p>

                <div className="space-y-6">
                  <a href={`tel:${companyInfo.phone}`} className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-ira-accent transition-colors">
                      <Phone size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-white/50 uppercase tracking-wider font-medium">Phone</p>
                      <p className="font-semibold">{companyInfo.phone}</p>
                    </div>
                  </a>

                  <a href={`mailto:${companyInfo.email}`} className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-ira-accent transition-colors">
                      <Mail size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-white/50 uppercase tracking-wider font-medium">Email</p>
                      <p className="font-semibold">{companyInfo.email}</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-white/50 uppercase tracking-wider font-medium">Location</p>
                      <p className="font-semibold">Nashik, Maharashtra, India</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Clock size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-white/50 uppercase tracking-wider font-medium">Business Hours</p>
                      <p className="font-semibold">Mon-Sat: 9:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </div>

                {/* WhatsApp CTA */}
                <a
                  href={`https://wa.me/${companyInfo.whatsapp}?text=Hi%20iRA%20Synergy%2C%20I%20would%20like%20to%20discuss%20a%20project.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full mt-8 py-3 rounded-xl bg-[#25D366] text-white font-bold hover:bg-[#20BD5A] transition-colors shadow-lg"
                >
                  <MessageCircle size={18} />
                  WhatsApp Us
                </a>

                {/* Decorative circle */}
                <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-white/5" />
              </div>
            </div>
          </ScrollReveal>

          {/* Contact Form */}
          <ScrollReveal variant="right" className="lg:col-span-3">
            <div className="bg-white rounded-2xl p-8 glass-card">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Send us a Message</h3>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto rounded-full bg-ira-accent/10 flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-ira-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Message Sent!</h4>
                  <p className="text-gray-500">We&apos;ll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-name" className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Full Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:border-ira-primary focus:ring-2 focus:ring-ira-primary/10 outline-none transition-all"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Email *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:border-ira-primary focus:ring-2 focus:ring-ira-primary/10 outline-none transition-all"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-phone" className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Phone *
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:border-ira-primary focus:ring-2 focus:ring-ira-primary/10 outline-none transition-all"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-industry" className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Industry / Sector
                      </label>
                      <select
                        id="contact-industry"
                        value={formData.industry}
                        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:border-ira-primary focus:ring-2 focus:ring-ira-primary/10 outline-none transition-all"
                      >
                        <option value="">Select sector</option>
                        <option value="government">Government / Municipal</option>
                        <option value="education">Education / Schools</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="corporate">Corporate / CSR</option>
                        <option value="real-estate">Real Estate / Township</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:border-ira-primary focus:ring-2 focus:ring-ira-primary/10 outline-none transition-all resize-none"
                      placeholder="Tell us about your project requirements..."
                    />
                  </div>

                  <button type="submit" disabled={isSubmitting} className="btn-primary w-full sm:w-auto disabled:opacity-70 disabled:cursor-not-allowed">
                    <Send size={16} />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
