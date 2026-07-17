"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { products as staticProducts } from "@/data/products";
import type { Product } from "@/types";

type ProductsContextType = {
  products: Product[];
  isLoading: boolean;
};

const ProductsContext = createContext<ProductsContextType>({
  products: staticProducts as Product[],
  isLoading: true,
});

export const ProductsProvider = ({ 
  children,
  initialProducts
}: { 
  children: React.ReactNode;
  initialProducts: Product[];
}) => {
  // Since we fetch on the server, we just use the initialProducts directly
  const [products] = useState<Product[]>(initialProducts);
  const isLoading = false;

  return (
    <ProductsContext.Provider value={{ products, isLoading }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
