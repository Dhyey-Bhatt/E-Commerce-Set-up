'use client';

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import ProductCard, { Product } from "@/components/ProductCard";
import { ShoppingCart, CheckCircle2, LoaderCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface HomeClientProps {
  initialProducts: Product[];
  casualImg: string;
  formalImg: string;
  partyImg: string;
  gymImg: string;
  heroImage: string;
}

export default function HomeClient({ 
  initialProducts, 
  casualImg, 
  formalImg, 
  partyImg, 
  gymImg, 
  heroImage 
}: HomeClientProps) {
  const router = useRouter();
  // Use a record to track multiple selected product IDs and their quantities
  const [selectedItems, setSelectedItems] = useState<Record<number, number>>({});
  const [isAdding, setIsAdding] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const newArrivals = initialProducts.slice(0, 4);
  const topSelling = initialProducts.slice(4, 8);

  const handleToggleSelection = (id: number) => {
    setSelectedItems(prev => {
      const next = { ...prev };
      if (next[id]) {
        delete next[id];
      } else {
        next[id] = 1;
      }
      return next;
    });
    setIsSuccess(false);
  };

  const handleUpdateQuantity = (id: number, q: number) => {
    setSelectedItems(prev => ({
      ...prev,
      [id]: q
    }));
  };

  const handleAddToCart = async () => {
    const selectedIds = Object.keys(selectedItems).map(Number);
    if (selectedIds.length === 0) return;

    // Construct the products array for the payload by finding full details
    const productsInPayload = selectedIds.map(id => {
      const product = initialProducts.find(p => p.id === id);
      return {
        id: product?.id || 0,
        title: product?.title || "string",
        price: product?.price || 0.1,
        description: product?.description || "string",
        category: product?.category || "string",
        image: product?.image || "http://example.com",
        quantity: selectedItems[id] // Custom addition to payload for clarity
      };
    });

    const payload = {
      id: Math.floor(Math.random() * 100),
      userId: 1,
      products: productsInPayload
    };

    try {
      setIsAdding(true);
      console.log("Sending POST to /carts with payload:", payload);
      
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://fakestoreapi.com';
      const response = await fetch(`${baseUrl}/carts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Failed to add to cart');
      
      const result = await response.json();
      console.log("Response from server:", result);

      setIsSuccess(true);
      
      // PERSISTENCE MOCK: Save the added items to localStorage so the Cart page can 'see' them
      // Since the FakeStore API doesn't actually persist POSTed data
      if (typeof window !== 'undefined') {
        const existingCart = localStorage.getItem('localCart');
        const currentCart = existingCart ? JSON.parse(existingCart) : [];
        
        // Merge new items into local cart
        const updatedCart = [...currentCart];
        productsInPayload.forEach(newItem => {
          const index = updatedCart.findIndex(item => item.id === newItem.id);
          if (index > -1) {
            updatedCart[index].quantity += newItem.quantity;
          } else {
            updatedCart.push(newItem);
          }
        });
        
        localStorage.setItem('localCart', JSON.stringify(updatedCart));
      }

      setTimeout(() => {
        setIsSuccess(false);
        setSelectedItems({}); // Clear selection after success
        router.push('/cart'); // Redirect to cart page
      }, 1500);
    } catch (error) {
      console.error("Error posting to cart API:", error);
      alert("Failed to add items to cart. See console for details.");
    } finally {
      setIsAdding(false);
    }
  };

  const selectedCount = Object.keys(selectedItems).length;

  return (
    <div className={`relative ${selectedCount > 0 ? 'pb-32 md:pb-0' : 'pb-24 md:pb-0'}`}>
      {/* Hero, Brands sections remain the same... */}
      {/* New Arrivals, Top Selling now pass Map-based props... */}
      {/* Sticky bar shows count... */}
      <section className="bg-[#F2F0F1] relative overflow-hidden pt-10 md:pt-0 px-4 md:px-0 text-black min-h-[500px] md:min-h-[660px] flex items-center">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row relative z-10 px-0 sm:px-6 lg:px-8 w-full">
          <div className="md:w-1/2 md:pr-10 pb-10 md:pb-32 z-20 pt-8 md:pt-24">
            <h1 className="text-4xl md:text-6xl lg:text-[64px] font-bold leading-[1.1] mb-6 md:mb-8 font-serif uppercase tracking-tighter text-black" style={{ fontFamily: 'Integral CF, sans-serif' }}>
              FIND CLOTHES<br />THAT MATCHES<br />YOUR STYLE
            </h1>
            <p className="text-black/60 mb-8 max-w-md text-sm md:text-base leading-relaxed">
              Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
            </p>
            <Link 
              href="#shop" 
              className="inline-block bg-black text-white px-14 py-4 rounded-full font-medium w-full md:w-auto text-center hover:bg-gray-900 transition-colors"
            >
              Shop Now
            </Link>

            <div className="flex flex-wrap md:flex-nowrap gap-8 md:gap-12 mt-12 md:mt-16 justify-center md:justify-start">
              <div className="w-[40%] md:w-auto text-center md:text-left pr-4 md:pr-0 border-r md:border-r-0 border-gray-300 md:relative after:content-[''] after:hidden md:after:block after:w-[1px] after:h-full after:bg-gray-300 after:absolute after:-right-6 after:top-0">
                <p className="text-[28px] md:text-4xl font-bold text-black">200+</p>
                <p className="text-xs md:text-sm text-black/60 mt-1">International Brands</p>
              </div>
              <div className="w-[40%] md:w-auto text-center md:text-left md:relative after:content-[''] after:hidden md:after:block after:w-[1px] after:h-full after:bg-gray-300 after:absolute after:-right-6 after:top-0">
                <p className="text-[28px] md:text-4xl font-bold text-black">2,000+</p>
                <p className="text-xs md:text-sm text-black/60 mt-1">High-Quality Products</p>
              </div>
              <div className="w-full md:w-auto text-center md:text-left mt-4 md:mt-0">
                <p className="text-[28px] md:text-4xl font-bold text-black">30,000+</p>
                <p className="text-xs md:text-sm text-black/60 mt-1">Happy Customers</p>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 relative h-[450px] md:min-h-[660px] mt-8 md:mt-0">
            <Image 
              src={heroImage} 
              alt="Fashion Models" 
              fill 
              className="object-cover object-right-top md:object-right" 
              priority
            />
            
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none" className="absolute top-[15%] left-0 md:-left-10 z-30 hidden md:block" xmlns="http://www.w3.org/2000/svg">
              <path d="M28 0C28 15.464 40.536 28 56 28C40.536 28 28 40.536 28 56C28 40.536 15.464 28 0 28C15.464 28 28 15.464 28 0Z" fill="black"/>
            </svg>
            <svg width="104" height="104" viewBox="0 0 104 104" fill="none" className="absolute top-10 right-4 md:right-10 z-30 opacity-100" xmlns="http://www.w3.org/2000/svg">
              <path d="M52 0C52 28.7188 75.2812 52 104 52C75.2812 52 52 75.2812 52 104C52 75.2812 28.7188 52 0 52C28.7188 52 52 28.7188 52 0Z" fill="black"/>
            </svg>
          </div>
        </div>
      </section>

      {/* Brands Banner */}
      <div className="bg-black py-8 md:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-center md:justify-between items-center gap-6 md:gap-10">
           <p className="text-white font-serif text-2xl md:text-4xl tracking-widest uppercase">Versace</p>
           <p className="text-white font-serif text-2xl md:text-4xl tracking-widest uppercase">Zara</p>
           <p className="text-white font-serif text-2xl md:text-4xl tracking-widest uppercase">Gucci</p>
           <p className="text-white font-serif text-2xl md:text-4xl tracking-widest uppercase font-bold">Prada</p>
           <p className="text-white font-serif text-2xl md:text-4xl tracking-widest capitalize">Calvin Klein</p>
        </div>
      </div>

      {/* NEW ARRIVALS */}
      <section id="shop" className="py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-10 md:mb-14 uppercase font-serif tracking-tighter text-black" style={{ fontFamily: 'Integral CF, sans-serif' }}>
          NEW ARRIVALS
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {newArrivals.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              isSelected={!!selectedItems[product.id]}
              onToggleSelection={handleToggleSelection}
              quantity={selectedItems[product.id] || 1}
              onUpdateQuantity={handleUpdateQuantity}
            />
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <Link href="/products" className="border border-[#0000001A] bg-transparent text-black px-12 md:px-20 py-3 md:py-4 rounded-full font-medium hover:bg-gray-50 transition-colors w-full md:w-auto text-center">
            View All
          </Link>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white">
        <hr className="border-gray-200" />
      </div>

      {/* TOP SELLING */}
      <section className="py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-10 md:mb-14 uppercase font-serif tracking-tighter text-black" style={{ fontFamily: 'Integral CF, sans-serif' }}>
          TOP SELLING
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {topSelling.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              isSelected={!!selectedItems[product.id]}
              onToggleSelection={handleToggleSelection}
              quantity={selectedItems[product.id] || 1}
              onUpdateQuantity={handleUpdateQuantity}
            />
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <Link href="/products" className="border border-[#0000001A] bg-transparent text-black px-12 md:px-20 py-3 md:py-4 rounded-full font-medium hover:bg-gray-50 transition-colors w-full md:w-auto text-center">
            View All
          </Link>
        </div>
      </section>

      {/* BROWSE BY DRESS STYLE section... */}
      <section className="py-8 md:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white">
        <div className="bg-[#F0F0F0] rounded-[30px] md:rounded-[40px] p-6 md:p-16">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-10 md:mb-16 uppercase font-serif tracking-tighter text-black" style={{ fontFamily: 'Integral CF, sans-serif' }}>
            BROWSE BY DRESS STYLE
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
            <div className="md:col-span-4 h-[200px] md:h-[289px] relative rounded-[20px] overflow-hidden group cursor-pointer bg-white">
              <h3 className="absolute top-6 left-8 text-2xl md:text-3xl font-bold z-10 text-black">Casual</h3>
              <Image src={casualImg} alt="Casual" fill className="object-cover object-center group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="md:col-span-8 h-[200px] md:h-[289px] relative rounded-[20px] overflow-hidden group cursor-pointer bg-white">
              <h3 className="absolute top-6 left-8 text-2xl md:text-3xl font-bold z-10 text-black">Formal</h3>
              <Image src={formalImg} alt="Formal" fill className="object-cover object-center group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="md:col-span-8 h-[200px] md:h-[289px] relative rounded-[20px] overflow-hidden group cursor-pointer bg-white">
              <h3 className="absolute top-6 left-8 text-2xl md:text-3xl font-bold z-10 text-black">Party</h3>
              <Image src={partyImg} alt="Party" fill className="object-cover object-center group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="md:col-span-4 h-[200px] md:h-[289px] relative rounded-[20px] overflow-hidden group cursor-pointer bg-white">
              <h3 className="absolute top-6 left-8 text-2xl md:text-3xl font-bold z-10 text-black">Gym</h3>
              <Image src={gymImg} alt="Gym" fill className="object-cover object-center group-hover:scale-105 transition-transform duration-500" />
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Add to Cart Button */}
      {selectedCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 p-4 pb-[calc(1rem+env(safe-area-inset-bottom,0))] md:p-6 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] transition-all animate-in slide-in-from-bottom duration-300">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="hidden md:block">
              <p className="text-black font-bold">{selectedCount} {selectedCount === 1 ? 'item' : 'items'} selected</p>
              <p className="text-gray-500 text-sm">Ready to add to your collection</p>
            </div>
            <button 
              onClick={handleAddToCart}
              disabled={isAdding || isSuccess}
              className={`flex-1 md:flex-initial bg-black text-white px-8 md:px-16 py-4 rounded-full font-bold flex items-center justify-center gap-3 transition-all ${
                isSuccess ? 'bg-green-600' : isAdding ? 'bg-gray-400' : 'hover:bg-gray-800'
              }`}
            >
              {isAdding ? (
                <>
                  <LoaderCircle className="animate-spin" size={24} />
                  Posting...
                </>
              ) : isSuccess ? (
                <>
                  <CheckCircle2 size={24} />
                  Successfully Added!
                </>
              ) : (
                <>
                  <ShoppingCart size={24} />
                  Add {selectedCount} {selectedCount === 1 ? 'item' : 'items'} to Cart
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
