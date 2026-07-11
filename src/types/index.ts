// ============================================================
// iRA Synergy — Core Type Definitions
// ============================================================

export interface Solution {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  longDescription: string;
  icon: string; // lucide icon name
  color: string; // tailwind color class
  features: string[];
  certifications: string[];
  useCases: string[];
  relatedProductSlugs: string[];
  image: string;
  extraImages?: string[];
  stats: { label: string; value: string }[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  description: string;
  shortDescription: string;
  features: string[];
  specs: { label: string; value: string }[];
  certifications: string[];
  images: string[];
  price?: string; // "On Request" or range
  inStock: boolean;
  badge?: string; // "New", "Best Seller", "Eco-Certified"
  relatedProductSlugs: string[];
  brochureUrl?: string;
}

export type ProductCategory =
  | "Smart City"
  | "Renewable Energy"
  | "Waste Management"
  | "Public Health"
  | "Fitness"
  | "Education";

export interface Project {
  id: string;
  slug: string;
  title: string;
  client: string;
  location: string;
  state: string;
  category: string;
  description: string;
  challenge: string;
  solution: string;
  impact: { metric: string; value: string; description: string }[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  images: string[];
  completionDate: string;
  productsUsed: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin?: string;
  email?: string;
}

export interface Certification {
  id: string;
  name: string;
  shortName: string;
  description: string;
  icon: string;
  logo?: string;
  issuer: string;
}

export interface CoreValue {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface Stat {
  id: string;
  value: number;
  suffix: string;
  label: string;
  icon: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface InquiryFormData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  industry: string;
  message: string;
  interestedProducts: string[];
  preferredContact: "email" | "phone" | "whatsapp";
}

export interface QuoteRequestData {
  name: string;
  email: string;
  phone: string;
  company: string;
  productId: string;
  quantity: number;
  specifications?: string;
  deliveryLocation: string;
  timeline: string;
}
