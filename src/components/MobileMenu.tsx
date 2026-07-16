"use client";

import { useState } from "react";
import Link from "next/link";
import { X, ChevronDown, Phone, Mail, MapPin } from "lucide-react";
import { navigationItems, companyInfo } from "@/data/company";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] lg:hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Drawer */}
      <div className="absolute top-0 right-0 w-full max-w-sm h-full bg-white shadow-2xl overflow-y-auto animate-fade-in-right">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-ira-primary to-ira-secondary">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              S
            </div>
            <img 
              src="/images/logo.jpg" 
              alt="iRA Synergy Logo" 
              className="h-16 w-auto object-contain mix-blend-multiply rounded bg-white p-1"
            />
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="py-4">
          {navigationItems.map((item) => (
            <div key={item.label} className="border-b border-gray-50">
              {item.children ? (
                <>
                  <button
                    onClick={() =>
                      setOpenAccordion(openAccordion === item.label ? null : item.label)
                    }
                    className="flex items-center justify-between w-full px-6 py-4 text-left text-gray-800 font-semibold hover:bg-gray-50 transition-colors"
                  >
                    {item.label}
                    <ChevronDown
                      size={16}
                      className={`text-gray-400 transition-transform duration-300 ${
                        openAccordion === item.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openAccordion === item.label ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="bg-gray-50 py-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          onClick={onClose}
                          className="flex items-center gap-3 px-8 py-3 text-sm text-gray-600 hover:text-ira-primary transition-colors"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-ira-accent" />
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block px-6 py-4 text-gray-800 font-semibold hover:bg-gray-50 hover:text-ira-primary transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Quick contact */}
        <div className="px-6 py-6 bg-gray-50 border-t border-gray-100">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
            Quick Contact
          </p>
          <div className="space-y-3">
            <a
              href={`tel:${companyInfo.phone}`}
              className="flex items-center gap-3 text-sm text-gray-700 hover:text-ira-primary"
            >
              <Phone size={16} className="text-ira-secondary" />
              {companyInfo.phone}
            </a>
            <a
              href={`mailto:${companyInfo.email}`}
              className="flex items-center gap-3 text-sm text-gray-700 hover:text-ira-primary"
            >
              <Mail size={16} className="text-ira-secondary" />
              {companyInfo.email}
            </a>
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <MapPin size={16} className="text-ira-secondary" />
              Nashik, Maharashtra, India
            </div>
          </div>

          <Link
            href="/contact"
            onClick={onClose}
            className="btn-primary w-full mt-6 text-center"
          >
            Request Consultation
          </Link>

          <a
            href={`https://wa.me/${companyInfo.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-green w-full mt-3 text-center"
          >
            💬 WhatsApp Us
          </a>
        </div>
      </div>
    </div>
  );
}
