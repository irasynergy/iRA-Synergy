import Link from "next/link";
import { MapPin, Phone, Mail, FileText, ChevronRight, Users, Globe, Camera, Video, MessageCircle } from "lucide-react";
import { companyInfo } from "@/data/company";

export default function Footer() {
  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Solutions", href: "/solutions" },
    { label: "Projects", href: "/projects" },
    { label: "Gallery", href: "/gallery" },
    { label: "Downloads", href: "/downloads" },
    { label: "Blog / News", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Contact Us", href: "/contact" },
  ];

  const downloads = [
    { label: "Company Profile", file: "#" },
    { label: "Product Catalogue", file: "#" },
    { label: "Brochure", file: "#" },
    { label: "Certifications", file: "#" },
  ];

  return (
    <footer className="bg-ira-primary-dark text-white pt-10 sm:pt-16 pb-16 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-x-4 gap-y-8 sm:gap-8 lg:gap-12 pb-8 sm:pb-12 border-b border-white/10">

          {/* Column 1: Brand & Info */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="mb-4 sm:mb-6 inline-block rounded-xl overflow-hidden shadow-lg bg-white p-2 sm:p-3 transition-transform hover:scale-105">
              <img
                src="/images/Only_Symbol.jpeg"
                alt="iRA Synergy Logo"
                className="h-16 sm:h-24 w-auto object-contain"
              />
            </Link>
            <div className="w-12 h-px bg-ira-accent mb-4 sm:mb-6" />
            <p className="text-[11px] sm:text-xs text-gray-300 leading-relaxed mb-6">
              iRA Synergy Private Limited offers innovative, eco-friendly and technology-driven solutions for infrastructure, environment, health & community development.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" aria-label="Facebook" className="w-8 h-8 rounded-full bg-[#3b5998] flex items-center justify-center hover:opacity-80 transition-opacity"><Users size={14} aria-hidden="true" /></a>
              <a href="#" aria-label="LinkedIn" className="w-8 h-8 rounded-full bg-[#0077b5] flex items-center justify-center hover:opacity-80 transition-opacity"><Globe size={14} aria-hidden="true" /></a>
              <a href="#" aria-label="Instagram" className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#f09433] to-[#bc1888] flex items-center justify-center hover:opacity-80 transition-opacity"><Camera size={14} aria-hidden="true" /></a>
              <a href="#" aria-label="YouTube" className="w-8 h-8 rounded-full bg-[#ff0000] flex items-center justify-center hover:opacity-80 transition-opacity"><Video size={14} aria-hidden="true" /></a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="col-span-1 lg:col-span-1">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 sm:mb-6">QUICK LINKS</h3>
            <ul className="space-y-2 sm:space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[11px] sm:text-xs text-gray-300 hover:text-ira-accent transition-colors flex items-center gap-2 group">
                    <ChevronRight size={12} className="text-ira-accent group-hover:translate-x-1 transition-transform" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Download Center (Moved to be beside Quick Links on Mobile) */}
          <div className="col-span-1 lg:col-span-1">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 sm:mb-6">DOWNLOADS</h3>
            <ul className="space-y-3 sm:space-y-4">
              {downloads.map((item, i) => (
                <li key={i}>
                  <a href={item.file} className="flex flex-col sm:flex-row sm:items-center sm:justify-between group gap-1">
                    <div className="flex items-center gap-2 text-[11px] sm:text-xs text-gray-300 group-hover:text-ira-accent transition-colors">
                      <FileText size={14} className="text-ira-accent flex-shrink-0" />
                      <span className="truncate leading-tight">{item.label}</span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="col-span-2 md:col-span-1 lg:col-span-1">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 sm:mb-6">CONTACT US</h3>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-ira-accent flex-shrink-0 mt-0.5" />
                <span className="text-[11px] sm:text-xs text-gray-300 leading-relaxed">
                  Office No. 4113, 4099 Roongta Shopping Hub, Near Hotel Sai Saya, Mumbai Agra Highway Road, Nashik, Maharashtra
                </span>
              </li>
              <li className="flex flex-col gap-1.5 sm:gap-2">
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-ira-accent flex-shrink-0" />
                  <span className="text-[11px] sm:text-xs text-gray-300">+91 75880 15401</span>
                </div>
                <div className="flex items-center gap-3 ml-7">
                  <span className="text-[11px] sm:text-xs text-gray-300">+91 88880 48480</span>
                </div>
                <div className="flex items-center gap-3 ml-7">
                  <span className="text-[11px] sm:text-xs text-gray-300">+91 80076 29969</span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-ira-accent flex-shrink-0" />
                <a href="mailto:irasynergy2026@gmail.com" className="text-[11px] sm:text-xs text-gray-300 hover:text-ira-accent break-all">
                  irasynergy2026@gmail.com
                </a>
              </li>
            </ul>
            <a href={companyInfo.whatsapp} className="mt-4 sm:mt-6 w-full bg-[#25D366] hover:bg-[#128C7E] transition-colors text-white text-[11px] sm:text-xs font-bold py-2.5 rounded flex items-center justify-center gap-2">
              <MessageCircle size={16} />
              CHAT ON WHATSAPP
            </a>
          </div>

          {/* Column 5: Enquiry Form */}
          <div className="col-span-2 md:col-span-1 lg:col-span-1">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 sm:mb-6">ENQUIRY FORM</h3>
            <form className="space-y-2.5 sm:space-y-3">
              <div className="grid grid-cols-2 gap-2.5">
                <input type="text" placeholder="Name" className="w-full bg-white text-gray-900 text-[11px] sm:text-xs px-3 py-2 sm:py-2.5 rounded focus:outline-none focus:ring-2 focus:ring-ira-accent" />
                <input type="tel" placeholder="Mobile" className="w-full bg-white text-gray-900 text-[11px] sm:text-xs px-3 py-2 sm:py-2.5 rounded focus:outline-none focus:ring-2 focus:ring-ira-accent" />
              </div>
              <input type="email" placeholder="Email Address" className="w-full bg-white text-gray-900 text-[11px] sm:text-xs px-3 py-2 sm:py-2.5 rounded focus:outline-none focus:ring-2 focus:ring-ira-accent" />
              <textarea placeholder="Your Message" rows={2} className="w-full bg-white text-gray-900 text-[11px] sm:text-xs px-3 py-2 sm:py-2.5 rounded focus:outline-none focus:ring-2 focus:ring-ira-accent resize-none"></textarea>
              <button type="button" className="w-full bg-ira-accent hover:bg-ira-accent-light transition-colors text-white text-[11px] sm:text-xs font-bold py-2 sm:py-2.5 rounded uppercase">
                SUBMIT ENQUIRY
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-gray-400">
          <p>© {new Date().getFullYear()} iRA Synergy Private Limited. All Rights Reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>|</span>
            <Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
