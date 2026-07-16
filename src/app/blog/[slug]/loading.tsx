import React from "react";

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-grow pt-20 lg:pt-44 pb-20">
        
        {/* Editorial Header Skeleton */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-10">
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-8"></div>

          <div className="flex items-center gap-3 mb-6">
            <div className="h-6 w-32 bg-gray-100 rounded-full animate-pulse"></div>
          </div>

          <div className="h-12 w-full bg-gray-200 rounded animate-pulse mb-4"></div>
          <div className="h-12 w-3/4 bg-gray-200 rounded animate-pulse mb-8"></div>

          <div className="flex items-center gap-6 border-b border-gray-100 pb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-100 animate-pulse"></div>
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Massive Featured Image Skeleton */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="relative w-full h-[400px] md:h-[600px] rounded-3xl bg-gray-200 animate-pulse"></div>
        </div>

        {/* Article Body Skeleton */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4 mb-20">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-4 bg-gray-100 rounded animate-pulse w-full"></div>
            ))}
            <div className="h-4 bg-gray-100 rounded animate-pulse w-5/6"></div>
          </div>
        </div>
      </main>
    </div>
  );
}
