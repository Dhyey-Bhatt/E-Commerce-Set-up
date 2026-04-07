import React from 'react';
import { LoaderCircle } from 'lucide-react';

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-[60vh] flex flex-col items-center justify-center bg-white">
      <LoaderCircle className="animate-spin text-black mb-4" size={48} />
      <h2 className="text-xl font-bold uppercase tracking-tighter text-black font-serif" style={{ fontFamily: 'Integral CF, sans-serif' }}>
        LOADING ALL PRODUCTS...
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-12 w-full opacity-20">
         {[...Array(8)].map((_, i) => (
           <div key={i} className="aspect-square bg-gray-200 rounded-[20px] animate-pulse"></div>
         ))}
      </div>
    </div>
  );
}
