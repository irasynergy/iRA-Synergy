import type { Metadata } from "next";
import { getProductBySlug, getAllProductSlugs, products } from "@/data/products";
import { supabase } from "@/lib/supabase";
import type { Product } from "@/types";

// Allow Next.js to render product pages for slugs NOT in generateStaticParams
// (i.e., products added via the Admin panel at runtime).
export const dynamicParams = true;

// Force dynamic rendering so Supabase data is always fresh
export const dynamic = "force-dynamic";

// FAQ data per category (mirrored from page.tsx for JSON-LD)
const categoryFAQs: Record<string, { q: string; a: string }[]> = {
  "Smart City": [
    { q: "What is the typical lead time for Smart City products?", a: "Standard lead time is 4-8 weeks depending on customization and quantity. Expedited delivery is available for urgent government orders." },
    { q: "Do you offer installation services?", a: "Yes, we provide end-to-end installation, commissioning, and training services across India. Our certified engineers handle everything from foundation work to IoT integration." },
    { q: "Are these products GeM-listed?", a: "Most of our Smart City products are listed on the Government e-Marketplace (GeM). We can provide GeM product links and assist with procurement through the platform." },
  ],
  "Renewable Energy": [
    { q: "What warranties do you offer on solar products?", a: "Solar panels carry a 25-year performance warranty. Batteries have 3-5 year warranties. Structural components are warranted for 10 years against manufacturing defects." },
    { q: "Can these be integrated with existing infrastructure?", a: "Absolutely. Our renewable energy solutions are designed for retrofit installation. We conduct site surveys to ensure seamless integration with existing electrical and structural systems." },
  ],
  "Waste Management": [
    { q: "Do your incinerators meet CPCB emission norms?", a: "Yes, all our incinerators are CPCB-approved and meet the latest emission standards. We provide emission test certificates and assist with NOC applications." },
    { q: "What after-sales support do you provide?", a: "We offer comprehensive AMC packages including preventive maintenance, spare parts supply, operator training, and 24/7 technical support." },
  ],
  "Public Health": [
    { q: "Can these be deployed in rural areas?", a: "Yes, all our public health products are designed for both urban and rural deployment. Solar-powered variants are available for areas with unreliable grid connectivity." },
  ],
  "Fitness": [
    { q: "What is the expected lifespan of outdoor gym equipment?", a: "With proper maintenance, our outdoor gym equipment lasts 15-20 years. Hot-dip galvanized and powder-coated construction ensures resistance to weather and corrosion." },
  ],
  "Education": [
    { q: "Do you offer bulk pricing for schools?", a: "Yes, we offer special pricing for government schools and bulk orders. Contact us for a customized quotation based on your requirements." },
  ],
};

// Helper: look up a product by slug from static data OR Supabase
async function findProductBySlug(slug: string): Promise<Product | undefined> {
  // 1. Check static data first (instant, no network)
  const staticProduct = getProductBySlug(slug);
  if (staticProduct) return staticProduct;

  // 2. Fall back to Supabase for admin-added products
  const isSupabaseConfigured =
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("slug", slug)
        .single();

      if (data && !error) {
        return {
          id: data.id,
          slug: data.slug,
          name: data.name,
          category: data.category,
          description: data.description,
          shortDescription: data.short_description || "",
          features: data.features || [],
          specs: data.specs || [],
          certifications: data.certifications || [],
          images: data.images || [],
          price: data.price || "On Request",
          inStock: data.in_stock ?? true,
          badge: data.badge || undefined,
          relatedProductSlugs: data.related_product_slugs || [],
          brochureUrl: data.brochure_url || undefined,
        };
      }
    } catch (e) {
      console.warn("Supabase lookup failed for slug:", slug, e);
    }
  }

  return undefined;
}

export async function generateStaticParams() {
  // Start with all static product slugs
  const staticSlugs = getAllProductSlugs().map((slug) => ({ slug }));

  // Also include slugs from Supabase so admin-added products get pre-rendered
  const isSupabaseConfigured =
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (isSupabaseConfigured) {
    try {
      const { data: dbProducts } = await supabase
        .from("products")
        .select("slug");

      if (dbProducts) {
        const dbSlugs = dbProducts.map((p: any) => ({ slug: p.slug }));
        // Merge & deduplicate
        const allSlugs = new Map<string, { slug: string }>();
        for (const s of [...staticSlugs, ...dbSlugs]) {
          allSlugs.set(s.slug, s);
        }
        return Array.from(allSlugs.values());
      }
    } catch (e) {
      console.warn("Could not fetch slugs from Supabase for static params:", e);
    }
  }

  return staticSlugs;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await findProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  const gemNote = product.certifications.some(
    (c) => c.toLowerCase().includes("gem")
  )
    ? " | GeM Registered"
    : "";

  return {
    title: `${product.name}${gemNote}`,
    description: `${product.description.slice(0, 155)}...`,
    alternates: {
      canonical: `https://irasynergy.com/products/${slug}`,
    },
    openGraph: {
      title: `${product.name} | iRA Synergy`,
      description: product.description.slice(0, 200),
      url: `https://irasynergy.com/products/${slug}`,
      images:
        product.images.length > 0
          ? [
              {
                url: product.images[0],
                width: 1200,
                height: 630,
                alt: product.name,
              },
            ]
          : [{ url: "/og-default.jpg" }],
      type: "website",
    },
  };
}

export default function ProductDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  // JSON-LD will be injected via a separate component
  return (
    <>
      <ProductJsonLd paramsPromise={params} />
      {children}
    </>
  );
}

async function ProductJsonLd({
  paramsPromise,
}: {
  paramsPromise: Promise<{ slug: string }>;
}) {
  const { slug } = await paramsPromise;
  const product = await findProductBySlug(slug);

  if (!product) return null;

  const faqs = categoryFAQs[product.category] || [];

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.map(
      (img) => img.startsWith("http") ? img : `https://irasynergy.com${img}`
    ),
    brand: {
      "@type": "Brand",
      name: "iRA Synergy",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "iRA Synergy",
      },
    },
    ...(product.certifications.some((c) =>
      c.toLowerCase().includes("gem")
    ) && {
      additionalProperty: {
        "@type": "PropertyValue",
        name: "GeM Registered",
        value: "Yes",
      },
    }),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://irasynergy.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: "https://irasynergy.com/products",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: `https://irasynergy.com/products/${slug}`,
      },
    ],
  };

  const faqSchema =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.a,
            },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      )}
    </>
  );
}
