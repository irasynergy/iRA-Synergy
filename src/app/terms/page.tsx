import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, FileText, Scale } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Terms & Conditions | iRA Synergy",
  description: "Terms and conditions for using the iRA Synergy website and our B2B/B2G services.",
};

export default function TermsPage() {
  const lastUpdated = "June 23, 2026";

  const sections = [
    { id: "acceptance", title: "1. Acceptance of Terms" },
    { id: "nature", title: "2. Nature of Business" },
    { id: "website-use", title: "3. Website Use" },
    { id: "enquiry", title: "4. Enquiry & Quotation Process" },
    { id: "ip", title: "5. Intellectual Property" },
    { id: "products", title: "6. Product Information" },
    { id: "gem", title: "7. GeM Portal Disclaimer" },
    { id: "liability", title: "8. Limitation of Liability" },
    { id: "third-party", title: "9. Third-Party Links" },
    { id: "law", title: "10. Governing Law & Jurisdiction" },
    { id: "changes", title: "11. Changes to Terms" },
    { id: "contact", title: "12. Contact Information" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-grow pt-24 lg:pt-36 pb-20">
        
        {/* Page Header */}
        <div className="bg-white border-b border-gray-200 py-12 md:py-16 mb-8 sm:mb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-gray-400 mb-4">
                <Link href="/" className="hover:text-ira-primary transition-colors">Home</Link>
                <ChevronRight size={12} />
                <span className="text-ira-primary">Legal</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight mb-4 flex items-center gap-4">
                <Scale className="text-ira-primary hidden md:block" size={48} strokeWidth={1.5} />
                Terms & Conditions
              </h1>
              <p className="text-gray-500 text-sm md:text-base font-medium">
                Effective Date: {lastUpdated}
              </p>
            </ScrollReveal>
          </div>
        </div>

        {/* Two-Column Content Layout */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            
            {/* Sidebar TOC */}
            <div className="lg:w-1/4 hidden lg:block">
              <div className="sticky top-32 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-xs font-black tracking-widest uppercase text-gray-900 mb-6 flex items-center gap-2">
                  <FileText size={16} className="text-ira-primary" />
                  Table of Contents
                </h3>
                <ul className="space-y-3">
                  {sections.map((sec) => (
                    <li key={sec.id}>
                      <a 
                        href={`#${sec.id}`} 
                        className="text-sm font-medium text-gray-500 hover:text-ira-primary transition-colors line-clamp-1"
                      >
                        {sec.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Main Legal Text */}
            <div className="lg:w-3/4">
              <ScrollReveal delay={100}>
                <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-10 md:p-16 shadow-sm prose prose-gray max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-gray-100 prose-p:text-gray-600 prose-p:leading-relaxed prose-li:text-gray-600 marker:text-ira-primary">
                  
                  <p className="lead text-lg md:text-xl text-gray-700 font-medium mb-8">
                    Welcome to <strong>iRA Synergy Private Limited</strong>. These Terms & Conditions govern your access to and use of our website (https://irasynergy.com) and the services we provide.
                  </p>

                  <h2 id="acceptance" className="scroll-mt-32">1. Acceptance of Terms</h2>
                  <p>
                    By accessing, browsing, or using this website, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, you must discontinue use of our website immediately.
                  </p>

                  <h2 id="nature" className="scroll-mt-32">2. Nature of Business</h2>
                  <p>
                    iRA Synergy Private Limited is a B2G (Business-to-Government) and B2B (Business-to-Business) supplier of infrastructure and sustainability products. We do not engage in direct retail sales via this website. All business transactions are conducted through formal quotations, purchase orders, or via the Government e-Marketplace (GeM) procurement portal.
                  </p>

                  <h2 id="website-use" className="scroll-mt-32">3. Website Use</h2>
                  <p>
                    This website serves an informational purpose to showcase our products, projects, and capabilities. We make no warranties regarding the continuous availability of products or the absolute accuracy of pricing information displayed. Prices, specifications, and availability are subject to change without prior notice.
                  </p>

                  <h2 id="enquiry" className="scroll-mt-32">4. Enquiry & Quotation Process</h2>
                  <p>
                    Submitting an enquiry via our website forms, email, or WhatsApp does not constitute a legally binding contract. A formal contract is only formed upon our written acceptance of a valid Purchase Order or through official tender/GeM award procedures.
                  </p>

                  <h2 id="ip" className="scroll-mt-32">5. Intellectual Property</h2>
                  <p>
                    All content on this website, including but not limited to text, images, product specifications, brochures, catalogues, and logos, is the proprietary property of iRA Synergy Private Limited or its licensors. Reproduction, distribution, or unauthorized use of any material without our explicit written permission is strictly prohibited.
                  </p>

                  <h2 id="products" className="scroll-mt-32">6. Product Information</h2>
                  <p>
                    Product specifications, dimensions, and features listed on the website are indicative and provided for general reference. Actual specifications will be confirmed at the time of quotation or order placement. Product images are representative and the actual delivered product may vary slightly in appearance.
                  </p>

                  <h2 id="gem" className="scroll-mt-32">7. GeM Portal Disclaimer</h2>
                  <p>
                    While iRA Synergy is a registered seller on the Government e-Marketplace (GeM), any purchases made through the GeM portal are strictly subject to GeM's own Terms & Conditions. Our website terms do not supersede or replace the governing rules of the GeM platform for transactions conducted there.
                  </p>

                  <h2 id="liability" className="scroll-mt-32">8. Limitation of Liability</h2>
                  <p>
                    To the maximum extent permitted by law, iRA Synergy Private Limited shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from the use of our website or products. Our maximum liability in relation to any specific transaction shall be strictly capped at the total value of that specific transaction.
                  </p>

                  <h2 id="third-party" className="scroll-mt-32">9. Third-Party Links</h2>
                  <p>
                    Our website may contain links to third-party websites, including government portals (e.g., GeM). We are not responsible for the content, privacy policies, or practices of these external sites. Accessing them is at your own risk.
                  </p>

                  <h2 id="law" className="scroll-mt-32">10. Governing Law & Jurisdiction</h2>
                  <p>
                    These Terms & Conditions are governed by and construed in accordance with the laws of India, including the Information Technology Act 2000, Consumer Protection Act 2019, and the Indian Contract Act 1872. Any disputes arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of the competent courts located in Nashik, Maharashtra.
                  </p>

                  <h2 id="changes" className="scroll-mt-32">11. Changes to Terms</h2>
                  <p>
                    We reserve the right to update or modify these Terms & Conditions at any time without prior notice. Your continued use of the website following any changes constitutes your acceptance of the revised terms.
                  </p>

                  <h2 id="contact" className="scroll-mt-32">12. Contact Information</h2>
                  <p>
                    For any legal queries, concerns, or notices regarding these Terms & Conditions, please contact us at:
                  </p>
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 not-prose mt-6">
                    <ul className="space-y-3 text-sm text-gray-700">
                      <li><strong className="text-gray-900 font-bold">Company:</strong> iRA Synergy Private Limited</li>
                      <li><strong className="text-gray-900 font-bold">Address:</strong> Shop No. 4113, 4099 Roongta Shopping Hub, Near Hotel Sai Saya, Mumbai Agra Highway Road, Nashik, Maharashtra – 422009</li>
                      <li><strong className="text-gray-900 font-bold">Email:</strong> <a href="mailto:info@irasynergy.com" className="text-ira-primary hover:underline">info@irasynergy.com</a></li>
                      <li><strong className="text-gray-900 font-bold">Phone:</strong> +91 75880 15401</li>
                    </ul>
                  </div>

                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
