import React from 'react';
import Link from 'next/link';
import ProductCard, { Product } from '@/components/ProductCard';
import { ChevronRight } from 'lucide-react';

async function getProducts(): Promise<Product[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://fakestoreapi.com';
    const res = await fetch(`${baseUrl}/products`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error('Failed to fetch data');
    const data = await res.json();
    return data.map((item: any) => ({
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.image,
      rating: {
        rate: item.rating.rate,
        count: item.rating.count
      }
    }));
  } catch (error) {
    console.error("Error fetching all products:", error);
    return [];
  }
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 bg-white">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 md:mb-8">
        <Link href="/" className="hover:text-black transition-colors">Home</Link>
        <ChevronRight size={16} />
        <span className="text-black font-medium">All Products</span>
      </div>

      <h1 className="text-3xl md:text-[40px] font-bold uppercase mb-6 md:mb-10 font-serif tracking-tighter text-black" style={{ fontFamily: 'Integral CF, sans-serif' }}>
        ALL PRODUCTS
      </h1>

      {products.length === 0 ? (
        <div className="text-center py-20 text-gray-500 text-lg">
          Failed to load products. Please try again later.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
