import Link from 'next/link';
import React from 'react';

const SearchIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-40">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const CartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
);

const UserIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

export default function Navbar() {
  return (
    <>
      <div className="bg-black text-white text-sm py-2 text-center relative flex justify-center items-center">
        <p>
          Sign up and get 20% off to your first order.{' '}
          <Link href="#" className="underline font-medium">Sign Up Now</Link>
        </p>
        <button className="absolute right-4 hidden md:block">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Icon */}
            <button className="md:hidden">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            <Link href="/" className="text-2xl font-bold tracking-tighter uppercase font-serif" style={{ fontFamily: 'Integral CF, sans-serif' }}>SHOP.CO</Link>
          </div>
          
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="#" className="flex items-center gap-1 hover:text-gray-600 transition-colors">
              Shop 
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
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
              className="bg-transparent border-none outline-none w-full ml-3 text-sm"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="lg:hidden">
              <SearchIcon />
            </button>
            <Link href="/cart" className="hover:text-gray-600 transition-colors relative">
              <CartIcon />
              <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                2
              </span>
            </Link>
            <Link href="#" className="hover:text-gray-600 transition-colors">
              <UserIcon />
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
