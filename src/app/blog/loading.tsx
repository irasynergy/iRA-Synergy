import React from "react";

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow pt-20 lg:pt-44 pb-24">
        
        {/* Header Skeleton */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="text-center max-w-3xl mx-auto">
            <div className="h-16 w-3/4 mx-auto bg-gray-200 rounded-lg mb-6 animate-pulse"></div>
            <div className="h-6 w-full mx-auto bg-gray-100 rounded animate-pulse mb-2"></div>
            <div className="h-6 w-4/5 mx-auto bg-gray-100 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Featured Article Skeleton */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="relative h-[500px] md:h-[600px] w-full rounded-[2rem] overflow-hidden bg-gray-200 animate-pulse">
            <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
              <div className="max-w-4xl">
                <div className="flex gap-3 mb-6">
                  <div className="h-6 w-24 bg-white/30 rounded-full"></div>
                  <div className="h-6 w-20 bg-white/30 rounded-full"></div>
                </div>
                <div className="h-12 md:h-16 w-3/4 bg-white/30 rounded-lg mb-6"></div>
                <div className="h-6 w-full bg-white/20 rounded mb-2"></div>
                <div className="h-6 w-5/6 bg-white/20 rounded mb-8"></div>
                
                <div className="border-t border-white/20 pt-6 flex justify-between">
                  <div className="flex gap-3 items-center">
                    <div className="w-10 h-10 rounded-full bg-white/30"></div>
                    <div className="space-y-2">
                      <div className="h-4 w-20 bg-white/30 rounded"></div>
                      <div className="h-3 w-16 bg-white/20 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Regular Article Grid Skeleton */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200 pb-4 mb-10">
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex flex-col h-full">
                <div className="relative h-64 w-full rounded-2xl bg-gray-200 animate-pulse mb-6"></div>
                <div className="flex gap-3 mb-3">
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="h-6 w-full bg-gray-200 rounded animate-pulse mb-3"></div>
                <div className="h-6 w-4/5 bg-gray-200 rounded animate-pulse mb-6"></div>
                
                <div className="space-y-2 mb-6">
                  <div className="h-4 w-full bg-gray-100 rounded animate-pulse"></div>
                  <div className="h-4 w-full bg-gray-100 rounded animate-pulse"></div>
                  <div className="h-4 w-3/4 bg-gray-100 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}
