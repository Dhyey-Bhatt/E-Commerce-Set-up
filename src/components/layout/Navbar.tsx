'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Search, ShoppingCart, User } from 'lucide-react';

const SearchIcon = () => (
  <Search size={24} className="opacity-40" />
);

const CartIcon = () => (
  <ShoppingCart size={24} />
);

const UserIcon = () => (
  <User size={24} />
);

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  return (
    <>
      {/* Promo Bar */}
      <div className="bg-black text-white text-[12px] md:text-sm py-2 px-4 text-center relative flex justify-center items-center">
        <p>
          Sign up and get 20% off to your first order.{' '}
          <Link href="#" className="underline font-medium">Sign Up Now</Link>
        </p>
        <button className="absolute right-4 hidden md:block">
          <X size={20} />
        </button>
      </div>

      <header className="border-b border-gray-200 bg-white text-black sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4 md:gap-8">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-1" 
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open Menu"
            >
              <Menu size={24} />
            </button>
            <Link href="/" className="text-2xl md:text-3xl font-bold tracking-tighter uppercase font-serif" style={{ fontFamily: 'Integral CF, sans-serif' }}>
              SHOP.CO
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="#" className="flex items-center gap-1 hover:text-gray-600 transition-colors">
              Shop <ChevronDown size={16} />
            </Link>
            <Link href="#" className="hover:text-gray-600 transition-colors">On Sale</Link>
            <Link href="#" className="hover:text-gray-600 transition-colors">New Arrivals</Link>
            <Link href="#" className="hover:text-gray-600 transition-colors">Brands</Link>
          </nav>

          <div className="flex-1 max-w-md hidden lg:flex items-center bg-gray-100 rounded-full px-4 py-2 hover:bg-gray-200 transition-colors">
            <SearchIcon />
            <input 
              type="text" 
              placeholder="Search for products..." 
              className="bg-transparent border-none outline-none w-full ml-3 text-sm text-black"
            />
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <button className="lg:hidden p-1">
              <SearchIcon />
            </button>
            <Link href="/cart" className="hover:text-gray-600 transition-colors relative p-1">
              <CartIcon />
              <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                2
              </span>
            </Link>
            <Link href="#" className="hover:text-gray-600 transition-colors p-1">
              <UserIcon />
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div 
        className={`fixed inset-0 z-[100] transition-opacity duration-300 md:hidden ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />
        
        {/* Drawer Content */}
        <div 
          className={`absolute left-0 top-0 bottom-0 w-[280px] bg-white p-6 shadow-2xl transition-transform duration-300 ease-out ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between mb-8">
            <Link 
              href="/" 
              onClick={() => setIsMenuOpen(false)}
              className="text-2xl font-bold uppercase font-serif text-black" 
              style={{ fontFamily: 'Integral CF, sans-serif' }}
            >
              SHOP.CO
            </Link>
            <button onClick={() => setIsMenuOpen(false)} className="p-1">
              <X size={24} />
            </button>
          </div>

          <nav className="flex flex-col gap-8 text-xl font-bold uppercase">
            <Link href="/" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between border-b border-black pb-4 text-black">
              Shop <ChevronDown size={24} />
            </Link>
            <Link href="/on-sale" onClick={() => setIsMenuOpen(false)} className="border-b border-black pb-4 text-black">On Sale</Link>
            <Link href="/new-arrivals" onClick={() => setIsMenuOpen(false)} className="border-b border-black pb-4 text-black">New Arrivals</Link>
            <Link href="/brands" onClick={() => setIsMenuOpen(false)} className="border-b border-black pb-4 text-black">Brands</Link>
          </nav>
        </div>
      </div>
    </>
  );
}
