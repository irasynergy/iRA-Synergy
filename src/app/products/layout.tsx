import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products — Infrastructure & Sustainability Equipment",
  description:
    "Browse iRA Synergy's full range of GeM-registered infrastructure and sustainability products for government procurement. Download specs, request quotes, and enquire on WhatsApp.",
  alternates: { canonical: "https://irasynergy.com/products" },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
