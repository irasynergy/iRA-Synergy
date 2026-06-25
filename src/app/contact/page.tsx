import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ContactSection from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "Contact Us — Get a Quote or Enquire",
  description:
    "Reach iRA Synergy for product enquiries, GeM orders, bulk quotes, and WhatsApp support. We serve government departments, PSUs, and institutions across India.",
  alternates: { canonical: "https://irasynergy.com/contact" },
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-20 lg:pt-44">
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
