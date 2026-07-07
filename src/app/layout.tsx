import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import FloatingActionMenu from "@/components/FloatingActionMenu";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://irasynergy.com"),
  title: {
    default:
      "iRA Synergy",
    template: "%s | iRA Synergy",
  },
  description:
    "iRA Synergy supplies GeM-registered infrastructure and sustainability products to government departments, PSUs, and institutions across India. Get quotes, view specs, and connect on WhatsApp.",
  keywords: [
    "infrastructure products India",
    "GeM registered supplier",
    "government procurement products",
    "sustainability products PSU",
    "B2G products India",
    "iRA Synergy",
    "smart city equipment",
    "waste management systems",
    "renewable energy solutions",
    "open gym equipment",
    "Make in India",
    "infrastructure supplier Nashik Maharashtra",
  ],
  authors: [{ name: "iRA Synergy", url: "https://irasynergy.com" }],
  creator: "iRA Synergy",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://irasynergy.com",
    siteName: "iRA Synergy",
    title: "iRA Synergy | Infrastructure & Sustainability Products",
    description:
      "GeM-registered B2G/B2B supplier of infrastructure and sustainability products for government departments and institutions across India.",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "iRA Synergy — Infrastructure & Sustainability Products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "iRA Synergy | Infrastructure & Sustainability Products",
    description:
      "GeM-registered B2G supplier of infrastructure and sustainability products across India.",
    images: ["/og-default.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://irasynergy.com",
  },
  verification: {
    google: "iow0NW08oTBSIF3J502HEJ7oFWAGiWQSVWnTBzRFD_U",
  },
};

import { Toaster } from "react-hot-toast";
import { ProductsProvider } from "@/components/ProductsProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <meta name="theme-color" content="#0A3D24" />
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "iRA Synergy",
              url: "https://irasynergy.com",
              logo: "https://irasynergy.com/images/logo.jpg",
              description:
                "GeM-registered B2G/B2B supplier of infrastructure and sustainability products for government departments, PSUs, municipalities, and institutions across India.",
              address: {
                "@type": "PostalAddress",
                streetAddress:
                  "Shop No. 4113, 4099 Roongta Shopping Hub, Near Hotel Sai Saya, Mumbai Agra Highway Road",
                addressLocality: "Nashik",
                addressRegion: "Maharashtra",
                postalCode: "422001",
                addressCountry: "IN",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+91-75880-15401",
                contactType: "sales",
                email: "info@irasynergy.com",
                areaServed: "IN",
                availableLanguage: ["English", "Hindi", "Marathi"],
              },
              sameAs: [
                "https://www.linkedin.com/company/ira-synergy",
              ],
              founder: {
                "@type": "Person",
                name: "Dinesh Anand",
                jobTitle: "Managing Director",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-[family-name:var(--font-inter)]">
        <Toaster position="top-center" toastOptions={{ duration: 4000, style: { background: '#333', color: '#fff' } }} />
        <ProductsProvider>
          <FloatingActionMenu />
          {children}
        </ProductsProvider>
      </body>
    </html>
  );
}
