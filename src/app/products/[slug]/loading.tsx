import React from "react";

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow pt-20 lg:pt-44 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
            {/* Image Gallery Skeleton - Left */}
            <div className="lg:col-span-5">
              <div className="aspect-[4/3] w-full bg-white border border-gray-100 rounded-xl animate-pulse mb-3"></div>
              <div className="flex gap-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-20 h-16 bg-white border border-gray-100 rounded-lg animate-pulse"></div>
                ))}
              </div>
            </div>

            {/* Product Info Skeleton - Right */}
            <div className="lg:col-span-7">
              <div className="flex gap-2 mb-4">
                <div className="h-6 w-24 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="h-6 w-32 bg-gray-200 rounded-full animate-pulse"></div>
              </div>
              <div className="h-10 w-3/4 bg-gray-200 rounded-lg animate-pulse mb-4"></div>
              <div className="h-4 w-full bg-gray-100 rounded animate-pulse mb-2"></div>
              <div className="h-4 w-5/6 bg-gray-100 rounded animate-pulse mb-6"></div>
              
              <div className="h-16 w-48 bg-gray-200 rounded-xl animate-pulse mb-8"></div>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-16 bg-white border border-gray-100 rounded-xl animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
