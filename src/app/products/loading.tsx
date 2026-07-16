import React from "react";

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow pt-20 lg:pt-44 pb-20">
        {/* Header Skeleton */}
        <div className="bg-ira-primary-dark relative overflow-hidden mb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="h-4 w-32 bg-white/20 rounded mb-4 animate-pulse"></div>
              <div className="h-12 w-64 bg-white/20 rounded mb-6 animate-pulse"></div>
              <div className="h-6 w-96 bg-white/10 rounded animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Skeleton */}
            <div className="w-full lg:w-64 flex-shrink-0 space-y-4">
              <div className="h-10 bg-gray-200 rounded-lg animate-pulse w-full"></div>
              <div className="h-10 bg-gray-200 rounded-lg animate-pulse w-full"></div>
              <div className="h-10 bg-gray-200 rounded-lg animate-pulse w-full"></div>
              <div className="h-10 bg-gray-200 rounded-lg animate-pulse w-full"></div>
            </div>
            
            {/* Grid Skeleton */}
            <div className="flex-grow">
              <div className="h-12 bg-gray-200 rounded-lg animate-pulse w-full mb-8"></div>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-64 sm:h-80 bg-white border border-gray-100 rounded-xl animate-pulse">
                    <div className="h-32 sm:h-40 bg-gray-100 rounded-t-xl mb-4"></div>
                    <div className="p-3 space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-100 rounded w-full"></div>
                      <div className="h-3 bg-gray-100 rounded w-5/6"></div>
                      <div className="h-8 bg-gray-200 rounded w-full mt-4"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
