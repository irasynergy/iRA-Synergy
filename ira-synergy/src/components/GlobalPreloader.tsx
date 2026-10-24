"use client";

import { useEffect } from "react";
import { products } from "@/data/products";

export default function GlobalPreloader() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasPreloaded = sessionStorage.getItem("ira_products_preloaded");
      if (hasPreloaded) return;
      
      localStorage.setItem("ira_admin_products", JSON.stringify(products));
      sessionStorage.setItem("ira_products_preloaded", "true");
    }
  }, []);

  return null;
}

