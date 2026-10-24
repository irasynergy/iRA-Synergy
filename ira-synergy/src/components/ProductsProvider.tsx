"use client";

import React, { createContext, useContext, useState } from "react";
import { products as staticProducts } from "@/data/products";
import type { Product } from "@/types";

type ProductsContextType = {
  products: Product[];
  isLoading: boolean;
};

const ProductsContext = createContext<ProductsContextType>({
  products: staticProducts as Product[],
  isLoading: false,
});

export const ProductsProvider = ({ 
  children,
  initialProducts
}: { 
  children: React.ReactNode;
  initialProducts?: Product[];
}) => {
  const [products] = useState<Product[]>(initialProducts || (staticProducts as Product[]));
  const isLoading = false;

  return (
    <ProductsContext.Provider value={{ products, isLoading }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);

