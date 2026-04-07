import React from 'react';
import { LoaderCircle } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
      <LoaderCircle className="animate-spin text-black mb-4" size={48} />
      <h2 className="text-xl font-bold uppercase tracking-tighter font-serif" style={{ fontFamily: 'Integral CF, sans-serif' }}>
        SHOP.CO Loading...
      </h2>
    </div>
  );
}
