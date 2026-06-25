import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, FileText, ShieldCheck } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Privacy Policy | iRA Synergy",
  description: "Privacy policy detailing how iRA Synergy handles and protects your data.",
};

export default function PrivacyPage() {
  const lastUpdated = "June 23, 2026";

  const sections = [
    { id: "introduction", title: "1. Introduction & Scope" },
    { id: "information", title: "2. Information We Collect" },
    { id: "usage", title: "3. How We Use Your Information" },
    { id: "legal-basis", title: "4. Legal Basis for Processing" },
    { id: "sharing", title: "5. Data Sharing & Disclosure" },
    { id: "retention", title: "6. Data Retention" },
    { id: "cookies", title: "7. Cookies" },
    { id: "rights", title: "8. User Rights" },
    { id: "security", title: "9. Security Measures" },
    { id: "children", title: "10. Children's Privacy" },
    { id: "whatsapp", title: "11. WhatsApp Communication" },
    { id: "changes", title: "12. Changes to This Policy" },
    { id: "contact", title: "13. Contact & Grievance Officer" },
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
                <ShieldCheck className="text-ira-primary hidden md:block" size={48} strokeWidth={1.5} />
                Privacy Policy
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
                    At <strong>iRA Synergy Private Limited</strong>, we value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information in compliance with India's Information Technology Act, 2000, and aligned with the Digital Personal Data Protection (DPDP) Act, 2023.
                  </p>

                  <h2 id="introduction" className="scroll-mt-32">1. Introduction & Scope</h2>
                  <p>
                    This policy applies to all visitors to our website (https://irasynergy.com), individuals who submit enquiry forms, and those who contact us via WhatsApp or email. By using our website and services, you consent to the practices described in this policy.
                  </p>

                  <h2 id="information" className="scroll-mt-32">2. Information We Collect</h2>
                  <p>
                    We collect information primarily to facilitate B2B and B2G communication. The data we collect includes:
                  </p>
                  <ul>
                    <li><strong>Contact Form Data:</strong> Name, organization name, phone number, email address, and any specific messages or requirements you provide.</li>
                    <li><strong>WhatsApp Enquiries:</strong> Information shared when you initiate contact via our WhatsApp links.</li>
                    <li><strong>Automatically Collected Data:</strong> Basic technical information such as IP address, browser type, and pages visited to help us improve website functionality.</li>
                  </ul>
                  <p>
                    <em>Note: We do NOT collect or process any payment information, credit card details, or financial data on this website, as we do not conduct direct online retail sales.</em>
                  </p>

                  <h2 id="usage" className="scroll-mt-32">3. How We Use Your Information</h2>
                  <p>
                    The information we collect is used exclusively for legitimate business purposes:
                  </p>
                  <ul>
                    <li>To respond to your enquiries and process quotation requests.</li>
                    <li>To send product catalogues, technical brochures, and specifications upon your request.</li>
                    <li>To follow up on project requirements and infrastructure deployment planning.</li>
                    <li>To improve our website experience and customer service.</li>
                    <li>To comply with legal and regulatory obligations.</li>
                  </ul>

                  <h2 id="legal-basis" className="scroll-mt-32">4. Legal Basis for Processing</h2>
                  <p>
                    We process your personal data based on your explicit consent (when submitting an enquiry form) and our legitimate interest in conducting B2B and B2G communications to fulfill your business requirements.
                  </p>

                  <h2 id="sharing" className="scroll-mt-32">5. Data Sharing & Disclosure</h2>
                  <p>
                    We <strong>do not</strong> sell, rent, or trade your personal information to third parties. We may share your data only in the following circumstances:
                  </p>
                  <ul>
                    <li><strong>Service Partners:</strong> With trusted logistics, installation, or manufacturing partners strictly for the purpose of project delivery.</li>
                    <li><strong>Government Portals:</strong> When processing transactions via the Government e-Marketplace (GeM) as required by procurement guidelines.</li>
                    <li><strong>Legal Requirements:</strong> If requested by law enforcement or legal authorities to comply with Indian law.</li>
                  </ul>

                  <h2 id="retention" className="scroll-mt-32">6. Data Retention</h2>
                  <p>
                    We retain enquiry and business correspondence data for a standard period of 2 years to facilitate ongoing or future project discussions. You may request the deletion of your data at any time by contacting us.
                  </p>

                  <h2 id="cookies" className="scroll-mt-32">7. Cookies</h2>
                  <p>
                    Our website uses basic cookies essential for website functionality and performance analytics. We do not use intrusive advertising cookies. You can choose to disable cookies through your browser settings without significantly affecting your ability to browse our site.
                  </p>

                  <h2 id="rights" className="scroll-mt-32">8. User Rights</h2>
                  <p>
                    In alignment with the DPDP Act 2023, you have the following rights regarding your personal data:
                  </p>
                  <ul>
                    <li><strong>Right to Access:</strong> Request a copy of the personal data we hold about you.</li>
                    <li><strong>Right to Correction:</strong> Request correction of inaccurate or incomplete data.</li>
                    <li><strong>Right to Erasure:</strong> Request the deletion of your personal data.</li>
                    <li><strong>Right to Withdraw Consent:</strong> Withdraw your consent for us to process your data for future communications.</li>
                  </ul>
                  <p>To exercise any of these rights, please email us at info@irasynergy.com.</p>

                  <h2 id="security" className="scroll-mt-32">9. Security Measures</h2>
                  <p>
                    We implement reasonable technical and organizational security measures, including HTTPS encryption, to protect your data from unauthorized access, alteration, or disclosure. However, no internet transmission is entirely secure, and we cannot guarantee absolute security.
                  </p>

                  <h2 id="children" className="scroll-mt-32">10. Children's Privacy</h2>
                  <p>
                    Our website is designed for B2B and B2G interactions and is not directed at children under the age of 18. We do not knowingly collect personal data from minors.
                  </p>

                  <h2 id="whatsapp" className="scroll-mt-32">11. WhatsApp Communication</h2>
                  <p>
                    Users who choose to contact us via the provided WhatsApp links consent to communication on that platform. Please note that data shared over WhatsApp is also subject to WhatsApp's own privacy policy and terms of service.
                  </p>

                  <h2 id="changes" className="scroll-mt-32">12. Changes to This Policy</h2>
                  <p>
                    We may update this Privacy Policy periodically to reflect changes in legal requirements or our business practices. The "Last Updated" date at the top of this page indicates when revisions were made.
                  </p>

                  <h2 id="contact" className="scroll-mt-32">13. Contact & Grievance Officer</h2>
                  <p>
                    If you have any questions, concerns, or grievances regarding this Privacy Policy or how your data is handled, please contact our Grievance Officer at:
                  </p>
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 not-prose mt-6">
                    <ul className="space-y-3 text-sm text-gray-700">
                      <li><strong className="text-gray-900 font-bold">Company:</strong> iRA Synergy Private Limited</li>
                      <li><strong className="text-gray-900 font-bold">Email:</strong> <a href="mailto:info@irasynergy.com" className="text-ira-primary hover:underline">info@irasynergy.com</a></li>
                      <li><strong className="text-gray-900 font-bold">Phone:</strong> +91 75880 15401</li>
                      <li><strong className="text-gray-900 font-bold">Address:</strong> Shop No. 4113, 4099 Roongta Shopping Hub, Near Hotel Sai Saya, Mumbai Agra Highway Road, Nashik, Maharashtra – 422009</li>
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
