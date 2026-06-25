"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Phone, Menu, X, ChevronDown } from "lucide-react";
import { solutions } from "@/data/solutions";

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "HOME", href: "/" },
    { label: "ABOUT US", href: "/about" },
    { label: "SOLUTIONS", href: "/solutions" },
    { label: "PRODUCTS", href: "/products" },
    { label: "PROJECTS", href: "/projects" },
    { label: "GALLERY", href: "/gallery" },
    { label: "DOWNLOADS", href: "/downloads" },
    { label: "BLOGS", href: "/blog" },
    { label: "CONTACT US", href: "/contact" },
  ];

  return (
    <header className={`fixed w-full z-40 bg-white transition-all duration-300 ${isScrolled ? "shadow-md" : ""}`}>

      {/* Middle Bar - Logo & CTA */}
      <div className="px-4 py-3 lg:py-4 lg:px-8 border-b border-gray-100 flex justify-between items-center bg-white relative z-50">
        <Link href="/" className="flex items-center gap-4 group cursor-pointer">
          <img
            src="/images/new-logo-5.png"
            alt="iRA Synergy Logo"
            className="h-10 sm:h-12 md:h-12 lg:h-12 w-auto object-contain transition-transform group-hover:scale-105 -mt-2 sm:-mt-3 md:-mt-6 lg:-mt-10 -mb-2 sm:-mb-4 md:-mb-8 lg:-mb-12 relative z-10"
          />
          <div className="hidden md:flex flex-col justify-center border-l-2 border-gray-200 pl-4 mt-2">
            <span className="text-sm font-semibold text-gray-800 group-hover:text-ira-primary transition-colors leading-snug">Innovative Solutions for</span>
            <span className="text-sm font-semibold text-gray-800 group-hover:text-ira-primary transition-colors leading-snug">Infrastructure & Sustainability</span>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/contact" className="hidden sm:flex items-center gap-2 bg-ira-primary-dark hover:bg-ira-primary text-white px-5 py-2.5 rounded text-sm font-bold transition-colors shadow-sm">
            REQUEST A CALL BACK
            <Phone size={14} />
          </Link>
          <button aria-label="Search" className="text-gray-500 hover:text-ira-primary p-2 border border-gray-200 rounded transition-colors">
            <Search size={18} />
          </button>
          <button
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
            className="lg:hidden text-gray-800 p-2 rounded transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Bottom Bar - Navigation Links */}
      <div className="hidden lg:flex justify-center items-center py-2.5 bg-ira-primary border-b border-white/10">
        <nav className="flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <div key={link.label} className="relative group">
                <Link
                  href={link.href}
                  className={`text-sm font-bold transition-colors tracking-wide flex items-center gap-1 ${isActive ? "text-white" : "text-white/80 hover:text-white"
                    }`}
                >
                  {link.label}
                  {link.label === "SOLUTIONS" && (
                    <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                  )}
                  {isActive && (
                    <span className="absolute -bottom-2.5 left-0 w-full h-[3px] bg-white rounded-t-sm shadow-[0_-2px_4px_rgba(255,255,255,0.5)]"></span>
                  )}
                </Link>

                {/* Solutions Dropdown */}
                {link.label === "SOLUTIONS" && (
                  <div className="absolute top-full left-0 mt-2.5 w-72 bg-white rounded-md shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top translate-y-2 group-hover:translate-y-0 z-50">
                    <div className="absolute -top-4 left-0 w-full h-4"></div> {/* Invisible bridge to prevent hover loss */}
                    <div className="py-2">
                      {solutions.map((solution) => (
                        <Link
                          key={solution.id}
                          href={`/solutions/${solution.slug}`}
                          className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-ira-primary transition-colors border-b border-gray-50 last:border-0"
                        >
                          {solution.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 max-h-[80vh] overflow-y-auto">
          <nav className="flex flex-col py-4">
            {navLinks.map((link) => {
              const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <div key={link.label} className="border-b border-gray-50 last:border-0">
                  <div className={`flex items-center justify-between px-6 py-3 transition-colors ${isActive ? "bg-ira-primary/5 border-l-4 border-ira-primary" : "hover:bg-gray-50"}`}>
                    <Link
                      href={link.href}
                      className={`text-sm font-bold flex-grow ${isActive ? "text-ira-primary" : "text-gray-800"}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </div>
                  {/* Mobile Solutions Dropdown Always Visible */}
                  {link.label === "SOLUTIONS" && (
                    <div className="bg-gray-50 flex flex-col py-2 border-t border-gray-100">
                      {solutions.map((solution) => (
                        <Link
                          key={solution.id}
                          href={`/solutions/${solution.slug}`}
                          className="pl-10 pr-6 py-2 text-sm font-medium text-gray-600 hover:text-ira-primary transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {solution.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
