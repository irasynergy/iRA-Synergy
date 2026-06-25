"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { products as staticProducts } from "@/data/products";
import { blogs as staticBlogs, type BlogPost } from "@/data/blogs";
import type { Product } from "@/types";

// ============================================================
// Gallery Image Type
// ============================================================
export interface GalleryImage {
  id: string;
  src: string; // base64 data URL or external URL
  title: string;
  caption: string;
  category: string;
  uploadedAt: string;
}

// ============================================================
// Admin Context Type
// ============================================================
interface AdminContextType {
  // Data
  adminProducts: Product[];
  adminBlogs: BlogPost[];
  galleryImages: GalleryImage[];

  // Product CRUD
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Blog CRUD
  addBlog: (blog: BlogPost) => void;
  updateBlog: (id: string, blog: Partial<BlogPost>) => void;
  deleteBlog: (id: string) => void;

  // Gallery CRUD
  addGalleryImage: (image: GalleryImage) => void;
  deleteGalleryImage: (id: string) => void;

  // Loading state
  isLoaded: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// ============================================================
// Local Storage Keys
// ============================================================
const LS_PRODUCTS = "ira_admin_products";
const LS_BLOGS = "ira_admin_blogs";
const LS_GALLERY = "ira_admin_gallery";
const LS_INITIALIZED = "ira_admin_initialized";

// ============================================================
// Provider
// ============================================================
import { supabase } from "@/lib/supabase";

const isSupabaseConfigured =
  typeof window !== "undefined" &&
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [adminProducts, setAdminProducts] = useState<Product[]>([]);
  const [adminBlogs, setAdminBlogs] = useState<BlogPost[]>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Mappings helper functions
  const mapDbToProduct = (dbP: any): Product => ({
    id: dbP.id,
    slug: dbP.slug,
    name: dbP.name,
    category: dbP.category,
    description: dbP.description,
    shortDescription: dbP.short_description || "",
    features: dbP.features || [],
    specs: dbP.specs || [],
    certifications: dbP.certifications || [],
    images: dbP.images || [],
    price: dbP.price || "On Request",
    inStock: dbP.in_stock ?? true,
    badge: dbP.badge || undefined,
    relatedProductSlugs: dbP.related_product_slugs || [],
    brochureUrl: dbP.brochure_url || undefined,
  });

  const mapProductToDb = (p: Product) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    category: p.category,
    description: p.description,
    short_description: p.shortDescription,
    features: p.features,
    specs: p.specs,
    certifications: p.certifications,
    images: p.images,
    price: p.price || "On Request",
    in_stock: p.inStock,
    badge: p.badge || null,
    related_product_slugs: p.relatedProductSlugs,
    brochure_url: p.brochureUrl || null,
  });

  const mapProductUpdatesToDb = (updates: Partial<Product>) => {
    const dbUpdates: any = {};
    if (updates.slug !== undefined) dbUpdates.slug = updates.slug;
    if (updates.name !== undefined) dbUpdates.name = updates.name;
    if (updates.category !== undefined) dbUpdates.category = updates.category;
    if (updates.description !== undefined) dbUpdates.description = updates.description;
    if (updates.shortDescription !== undefined) dbUpdates.short_description = updates.shortDescription;
    if (updates.features !== undefined) dbUpdates.features = updates.features;
    if (updates.specs !== undefined) dbUpdates.specs = updates.specs;
    if (updates.certifications !== undefined) dbUpdates.certifications = updates.certifications;
    if (updates.images !== undefined) dbUpdates.images = updates.images;
    if (updates.price !== undefined) dbUpdates.price = updates.price;
    if (updates.inStock !== undefined) dbUpdates.in_stock = updates.inStock;
    if (updates.badge !== undefined) dbUpdates.badge = updates.badge || null;
    if (updates.relatedProductSlugs !== undefined) dbUpdates.related_product_slugs = updates.relatedProductSlugs;
    if (updates.brochureUrl !== undefined) dbUpdates.brochure_url = updates.brochureUrl || null;
    return dbUpdates;
  };

  const mapDbToBlog = (dbB: any): BlogPost => ({
    id: dbB.id,
    slug: dbB.slug,
    title: dbB.title,
    excerpt: dbB.excerpt || "",
    content: dbB.content || "",
    coverImage: dbB.cover_image || "",
    author: dbB.author || "Admin",
    date: dbB.date || "",
    readTime: dbB.read_time || "",
    category: dbB.category || "",
    relatedSolutionSlug: dbB.related_solution_slug || "",
  });

  const mapBlogToDb = (b: BlogPost) => ({
    id: b.id,
    slug: b.slug,
    title: b.title,
    excerpt: b.excerpt,
    content: b.content,
    cover_image: b.coverImage,
    author: b.author,
    date: b.date,
    read_time: b.readTime,
    category: b.category,
    related_solution_slug: b.relatedSolutionSlug,
  });

  const mapBlogUpdatesToDb = (updates: Partial<BlogPost>) => {
    const dbUpdates: any = {};
    if (updates.slug !== undefined) dbUpdates.slug = updates.slug;
    if (updates.title !== undefined) dbUpdates.title = updates.title;
    if (updates.excerpt !== undefined) dbUpdates.excerpt = updates.excerpt;
    if (updates.content !== undefined) dbUpdates.content = updates.content;
    if (updates.coverImage !== undefined) dbUpdates.cover_image = updates.coverImage;
    if (updates.author !== undefined) dbUpdates.author = updates.author;
    if (updates.date !== undefined) dbUpdates.date = updates.date;
    if (updates.readTime !== undefined) dbUpdates.read_time = updates.readTime;
    if (updates.category !== undefined) dbUpdates.category = updates.category;
    if (updates.relatedSolutionSlug !== undefined) dbUpdates.related_solution_slug = updates.relatedSolutionSlug;
    return dbUpdates;
  };

  const mapDbToGallery = (dbG: any): GalleryImage => ({
    id: dbG.id,
    src: dbG.src,
    title: dbG.title,
    caption: dbG.caption || "",
    category: dbG.category || "General",
    uploadedAt: dbG.uploaded_at || new Date().toISOString(),
  });

  const mapGalleryToDb = (g: GalleryImage) => ({
    id: g.id,
    src: g.src,
    title: g.title,
    caption: g.caption,
    category: g.category,
    uploaded_at: g.uploadedAt,
  });

  // Initialize from Supabase or localStorage fallback
  useEffect(() => {
    async function loadData() {
      setIsLoaded(false);

      if (isSupabaseConfigured) {
        try {
          const { data: dbProducts } = await supabase
            .from("products")
            .select("*")
            .order("created_at", { ascending: false });

          const { data: dbBlogs } = await supabase
            .from("blogs")
            .select("*")
            .order("created_at", { ascending: false });

          const { data: dbGallery } = await supabase
            .from("gallery")
            .select("*")
            .order("uploaded_at", { ascending: false });

          if (dbProducts && dbProducts.length > 0) {
            setAdminProducts(dbProducts.map(mapDbToProduct));
          } else {
            setAdminProducts(staticProducts);
          }

          if (dbBlogs && dbBlogs.length > 0) {
            setAdminBlogs(dbBlogs.map(mapDbToBlog));
          } else {
            setAdminBlogs(staticBlogs);
          }

          if (dbGallery && dbGallery.length > 0) {
            setGalleryImages(dbGallery.map(mapDbToGallery));
          } else {
            setGalleryImages([]);
          }

          setIsLoaded(true);
          return;
        } catch (e) {
          console.warn("Supabase fetch failed, falling back to localStorage", e);
        }
      }

      // LocalStorage fallback initialization
      try {
        const initialized = localStorage.getItem(LS_INITIALIZED);
        if (initialized) {
          const storedProducts = localStorage.getItem(LS_PRODUCTS);
          const storedBlogs = localStorage.getItem(LS_BLOGS);
          const storedGallery = localStorage.getItem(LS_GALLERY);

          setAdminProducts(storedProducts ? JSON.parse(storedProducts) : staticProducts);
          setAdminBlogs(storedBlogs ? JSON.parse(storedBlogs) : staticBlogs);
          setGalleryImages(storedGallery ? JSON.parse(storedGallery) : []);
        } else {
          setAdminProducts(staticProducts);
          setAdminBlogs(staticBlogs);
          setGalleryImages([]);

          localStorage.setItem(LS_PRODUCTS, JSON.stringify(staticProducts));
          localStorage.setItem(LS_BLOGS, JSON.stringify(staticBlogs));
          localStorage.setItem(LS_GALLERY, JSON.stringify([]));
          localStorage.setItem(LS_INITIALIZED, "true");
        }
      } catch (err) {
        setAdminProducts(staticProducts);
        setAdminBlogs(staticBlogs);
        setGalleryImages([]);
      }
      setIsLoaded(true);
    }

    loadData();
  }, []);

  // Persist helpers for localstorage fallback
  const persistProducts = useCallback((data: Product[]) => {
    localStorage.setItem(LS_PRODUCTS, JSON.stringify(data));
  }, []);

  const persistBlogs = useCallback((data: BlogPost[]) => {
    localStorage.setItem(LS_BLOGS, JSON.stringify(data));
  }, []);

  const persistGallery = useCallback((data: GalleryImage[]) => {
    localStorage.setItem(LS_GALLERY, JSON.stringify(data));
  }, []);

  // ── Product CRUD ──
  const addProduct = useCallback(async (product: Product) => {
    if (isSupabaseConfigured) {
      const dbProduct = mapProductToDb(product);
      const { error } = await supabase.from("products").insert([dbProduct]);
      if (error) {
        console.error("Error adding product to Supabase:", error);
        alert("Error adding product: " + error.message);
        return;
      }
    }
    setAdminProducts((prev) => {
      const next = [product, ...prev];
      if (!isSupabaseConfigured) persistProducts(next);
      return next;
    });
  }, [persistProducts]);

  const updateProduct = useCallback(async (id: string, updates: Partial<Product>) => {
    if (isSupabaseConfigured) {
      const dbUpdates = mapProductUpdatesToDb(updates);
      const { error } = await supabase.from("products").update(dbUpdates).eq("id", id);
      if (error) {
        console.error("Error updating product in Supabase:", error);
        alert("Error updating product: " + error.message);
        return;
      }
    }
    setAdminProducts((prev) => {
      const next = prev.map((p) => (p.id === id ? { ...p, ...updates } : p));
      if (!isSupabaseConfigured) persistProducts(next);
      return next;
    });
  }, [persistProducts]);

  const deleteProduct = useCallback(async (id: string) => {
    if (isSupabaseConfigured) {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) {
        console.error("Error deleting product from Supabase:", error);
        alert("Error deleting product: " + error.message);
        return;
      }
    }
    setAdminProducts((prev) => {
      const next = prev.filter((p) => p.id !== id);
      if (!isSupabaseConfigured) persistProducts(next);
      return next;
    });
  }, [persistProducts]);

  // ── Blog CRUD ──
  const addBlog = useCallback(async (blog: BlogPost) => {
    if (isSupabaseConfigured) {
      const dbBlog = mapBlogToDb(blog);
      const { error } = await supabase.from("blogs").insert([dbBlog]);
      if (error) {
        console.error("Error adding blog to Supabase:", error);
        return;
      }
    }
    setAdminBlogs((prev) => {
      const next = [blog, ...prev];
      if (!isSupabaseConfigured) persistBlogs(next);
      return next;
    });
  }, [persistBlogs]);

  const updateBlog = useCallback(async (id: string, updates: Partial<BlogPost>) => {
    if (isSupabaseConfigured) {
      const dbUpdates = mapBlogUpdatesToDb(updates);
      const { error } = await supabase.from("blogs").update(dbUpdates).eq("id", id);
      if (error) {
        console.error("Error updating blog in Supabase:", error);
        return;
      }
    }
    setAdminBlogs((prev) => {
      const next = prev.map((b) => (b.id === id ? { ...b, ...updates } : b));
      if (!isSupabaseConfigured) persistBlogs(next);
      return next;
    });
  }, [persistBlogs]);

  const deleteBlog = useCallback(async (id: string) => {
    if (isSupabaseConfigured) {
      const { error } = await supabase.from("blogs").delete().eq("id", id);
      if (error) {
        console.error("Error deleting blog from Supabase:", error);
        return;
      }
    }
    setAdminBlogs((prev) => {
      const next = prev.filter((b) => b.id !== id);
      if (!isSupabaseConfigured) persistBlogs(next);
      return next;
    });
  }, [persistBlogs]);

  // ── Gallery CRUD ──
  const addGalleryImage = useCallback(async (image: GalleryImage) => {
    if (isSupabaseConfigured) {
      const dbGallery = mapGalleryToDb(image);
      const { error } = await supabase.from("gallery").insert([dbGallery]);
      if (error) {
        console.error("Error adding gallery image to Supabase:", error);
        return;
      }
    }
    setGalleryImages((prev) => {
      const next = [image, ...prev];
      if (!isSupabaseConfigured) persistGallery(next);
      return next;
    });
  }, [persistGallery]);

  const deleteGalleryImage = useCallback(async (id: string) => {
    if (isSupabaseConfigured) {
      const { error } = await supabase.from("gallery").delete().eq("id", id);
      if (error) {
        console.error("Error deleting gallery image from Supabase:", error);
        return;
      }
    }
    setGalleryImages((prev) => {
      const next = prev.filter((img) => img.id !== id);
      if (!isSupabaseConfigured) persistGallery(next);
      return next;
    });
  }, [persistGallery]);

  return (
    <AdminContext.Provider
      value={{
        adminProducts,
        adminBlogs,
        galleryImages,
        addProduct,
        updateProduct,
        deleteProduct,
        addBlog,
        updateBlog,
        deleteBlog,
        addGalleryImage,
        deleteGalleryImage,
        isLoaded,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
}
