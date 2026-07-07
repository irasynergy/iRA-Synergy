import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import dynamic from "next/dynamic";
import { supabase } from "@/lib/supabase";
import type { GalleryImage } from "@/components/admin/AdminContext";

export const metadata: Metadata = {
  title:
    "iRA Synergy | GeM-Registered Infrastructure & Sustainability Products",
  description:
    "iRA Synergy is a GeM-registered B2G/B2B supplier of infrastructure and sustainability products. Serving government departments, PSUs, municipalities, and institutions across India.",
  alternates: { canonical: "https://irasynergy.com" },
};

const Solutions = dynamic(() => import("@/components/Solutions"));
const StatsBanner = dynamic(() => import("@/components/StatsBanner"));
const FeaturedProducts = dynamic(() => import("@/components/FeaturedProducts"));
const Gallery = dynamic(() => import("@/components/Gallery"));
const BusinessInfo = dynamic(() => import("@/components/BusinessInfo"));
const TrustSection = dynamic(() => import("@/components/TrustSection"));

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  let heroImages: GalleryImage[] = [];
  try {
    const { data } = await supabase
      .from("gallery")
      .select("*")
      .eq("category", "Hero")
      .order("uploaded_at", { ascending: false });
    
    if (data && data.length > 0) {
      // Map to GalleryImage shape
      heroImages = data.map((img: any) => ({
        id: img.id,
        src: img.src,
        title: img.title || "",
        caption: img.caption || "",
        category: img.category || "Hero",
        uploadedAt: img.uploaded_at || new Date().toISOString()
      }));
    }
  } catch (err) {
    console.error("Failed to fetch hero images:", err);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero dynamicImages={heroImages} />
        <TrustSection />
        <Solutions />
        <StatsBanner />
        <FeaturedProducts />
        <Gallery />
        <BusinessInfo />
      </main>
      <Footer />
    </div>
  );
}
