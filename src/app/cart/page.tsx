'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import CartItem from '@/components/CartItem';
import { ChevronRight, Percent, LoaderCircle, AlertTriangle } from 'lucide-react';
import { Product } from '@/components/ProductCard';

interface CartItemData extends Product {
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItemData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000); 

    const fetchCartItems = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // 1. First, check localStorage for locally 'persisted' items from Home selection
        if (typeof window !== 'undefined') {
          const localCart = localStorage.getItem('localCart');
          if (localCart) {
            const parsed = JSON.parse(localCart);
            if (parsed.length > 0) {
              setCartItems(parsed);
              setLoading(false);
              return;
            }
          }
        }

        // 2. Fallback to the API if no local data (original requirement)
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://fakestoreapi.com';
        const cartResponse = await fetch(`${baseUrl}/carts`, {
          signal: controller.signal
        });
        
        if (!cartResponse.ok) {
          throw new Error('Failed to fetch cart data');
        }
        
        const cartsData = await cartResponse.json();
        const userCart = cartsData[0]; // Get the first available cart
        
        if (!userCart || !userCart.products) {
          setCartItems([]);
          setLoading(false);
          return;
        }

        // 3. Fetch full details for EACH product in the cart
        const productPromises = userCart.products.map(async (cartItem: any) => {
          try {
            const productRes = await fetch(`${baseUrl}/products/${cartItem.productId}`, {
              signal: controller.signal
            });
            
            if (!productRes.ok) return null;
            
            const productDetails = await productRes.json();
            return {
              ...productDetails,
              quantity: cartItem.quantity,
              selectedSize: 'Medium',
              selectedColor: 'Black'
            };
          } catch (e) {
            console.error("Single product fetch error:", e);
            return null;
          }
        });

        const detailedProducts = await Promise.all(productPromises);
        const validItems = detailedProducts.filter(item => item !== null) as CartItemData[];
        
        setCartItems(validItems);
        // Sync API data to localStorage for consistency
        localStorage.setItem('localCart', JSON.stringify(validItems)); 
        clearTimeout(timeoutId);
      } catch (err: any) {
        if (err.name === 'AbortError') {
          // No-op if it was a cleanup-driven abort
          console.log("Fetch aborted for Cart items");
        } else {
          setError('Failed to load cart items.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
    return () => {
      // Removing controller.abort() temporarily to prevent 'response cancelled' in dev
      // as it causes race conditions on fast navigations
      clearTimeout(timeoutId);
    };
  }, []);

  if (!mounted) return (
    <div className="bg-white min-h-screen flex items-center justify-center">
       <LoaderCircle className="animate-spin text-black" size={40} />
    </div>
  );

  const handleUpdateQuantity = (id: number, quantity: number) => {
    setCartItems(prev => {
      const updated = prev.map(item => item.id === id ? { ...item, quantity } : item);
      localStorage.setItem('localCart', JSON.stringify(updated));
      return updated;
    });
  };

  const handleRemove = (id: number) => {
    setCartItems(prev => {
      const updated = prev.filter(item => item.id !== id);
      localStorage.setItem('localCart', JSON.stringify(updated));
      return updated;
    });
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discount = subtotal * 0.2; // 20% discount
  const deliveryFee = 15;
  const total = subtotal - discount + deliveryFee;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 bg-white">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 md:mb-8">
        <Link href="/" className="hover:text-black transition-colors">Home</Link>
        <ChevronRight size={16} />
        <span className="text-black font-medium">Cart</span>
      </div>

      <h1 className="text-3xl md:text-[40px] font-bold uppercase mb-6 md:mb-10 font-serif tracking-tighter text-black" style={{ fontFamily: 'Integral CF, sans-serif' }}>
        YOUR CART
      </h1>

      <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
        {/* Cart Items List */}
        <div className="flex-1 border border-gray-200 rounded-[20px] p-4 md:p-6 self-start space-y-2">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-10 text-gray-500">
               <LoaderCircle className="animate-spin mb-4" size={32} />
               <p>Loading Cart Data...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-10 text-[#FF3333]">
               <AlertTriangle className="mb-4" size={32} />
               <p className="font-medium text-lg">{error}</p>
            </div>
          ) : cartItems.length > 0 ? (
            cartItems.map((item) => (
              <CartItem 
                key={item.id} 
                item={item} 
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemove}
              />
            ))
          ) : (
            <p className="text-center py-10 text-gray-500 font-medium text-lg">Your cart is empty.</p>
          )}
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-[400px] xl:w-[450px] border border-gray-200 rounded-[20px] p-6 self-start">
          <h2 className="text-xl md:text-2xl font-bold text-black mb-6">Order Summary</h2>
          
          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center text-gray-500 text-sm md:text-base">
              <span>Subtotal</span>
              <span className="font-bold text-black">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-[#FF3333] text-sm md:text-base">
              <span>Discount (-20%)</span>
              <span className="font-bold">-${discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-gray-500 text-sm md:text-base">
              <span>Delivery Fee</span>
              <span className="font-bold text-black">${deliveryFee.toFixed(0)}</span>
            </div>
            <hr className="border-gray-200 mt-2 mb-2" />
            <div className="flex justify-between items-center text-black text-lg md:text-xl font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex gap-3 mb-6">
            <div className="flex-1 bg-[#F0F0F0] rounded-full flex items-center px-4 py-3 gap-3">
              <Percent size={20} className="text-gray-400" />
              <input 
                type="text" 
                placeholder="Add promo code" 
                className="bg-transparent outline-none w-full text-sm md:text-base text-black placeholder:text-gray-500"
              />
            </div>
            <button className="bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-900 transition-colors cursor-pointer">
              Apply
            </button>
          </div>

          <button className="w-full bg-black text-white py-4 rounded-full font-medium flex items-center justify-center gap-3 hover:bg-gray-900 transition-colors text-sm md:text-base">
            Go to Checkout
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
