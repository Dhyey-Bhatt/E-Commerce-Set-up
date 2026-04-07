import Link from 'next/link';
import React from 'react';

const TwitterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 4.557a9.83 9.83 0 01-2.828.775 4.932 4.932 0 002.165-2.724 9.864 9.864 0 01-3.127 1.195 4.916 4.916 0 00-8.384 4.482A13.942 13.942 0 011.671 3.149a4.93 4.93 0 001.523 6.574 4.903 4.903 0 01-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.935 4.935 0 01-2.224.084 4.928 4.928 0 004.6 3.419A9.9 9.9 0 010 19.54a13.94 13.94 0 007.548 2.212c9.142 0 14.307-7.721 13.995-14.646A10.025 10.025 0 0024 4.557z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-[#F0F0F0] pt-24 pb-12 mt-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter Box */}
        <div className="bg-black rounded-[20px] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 absolute top-0 left-4 right-4 md:left-8 md:right-8 lg:left-auto lg:right-auto lg:w-[calc(100%-4rem)] max-w-7xl lg:mx-auto -translate-y-1/2">
          <h2 className="text-3xl md:text-[40px] font-bold text-white max-w-md leading-tight uppercase font-serif" style={{ fontFamily: 'Integral CF, sans-serif' }}>
            STAY UPTO DATE ABOUT OUR LATEST OFFERS
          </h2>
          <div className="w-full md:w-auto flex flex-col gap-3 min-w-[300px]">
            <div className="flex items-center bg-white rounded-full px-4 py-3">
              <span className="text-gray-400 mr-2">
                <MailIcon />
              </span>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="bg-transparent outline-none w-full text-black placeholder:text-gray-400"
              />
            </div>
            <button className="bg-white text-black font-medium rounded-full py-3 hover:bg-gray-100 transition-colors">
              Subscribe to Newsletter
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mt-12 pt-8">
          <div className="lg:col-span-2">
            <Link href="/" className="text-3xl font-bold tracking-tighter uppercase mb-6 block font-serif" style={{ fontFamily: 'Integral CF, sans-serif' }}>
              SHOP.CO
            </Link>
            <p className="text-gray-500 mb-8 max-w-xs text-sm leading-relaxed">
              We have clothes that suits your style and which you're proud to wear. From women to men.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-colors text-black">
                <TwitterIcon />
              </a>
              <a href="#" className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center bg-black text-white hover:bg-gray-800 transition-colors">
                <FacebookIcon />
              </a>
              <a href="#" className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-colors text-black">
                <InstagramIcon />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-medium tracking-widest uppercase mb-6 text-black">Company</h3>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><Link href="#" className="hover:text-black transition-colors">About</Link></li>
              <li><Link href="#" className="hover:text-black transition-colors">Features</Link></li>
              <li><Link href="#" className="hover:text-black transition-colors">Works</Link></li>
              <li><Link href="#" className="hover:text-black transition-colors">Career</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium tracking-widest uppercase mb-6 text-black">Help</h3>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><Link href="#" className="hover:text-black transition-colors">Customer Support</Link></li>
              <li><Link href="#" className="hover:text-black transition-colors">Delivery Details</Link></li>
              <li><Link href="#" className="hover:text-black transition-colors">Terms & Conditions</Link></li>
              <li><Link href="#" className="hover:text-black transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium tracking-widest uppercase mb-6 text-black">FAQ</h3>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><Link href="#" className="hover:text-black transition-colors">Account</Link></li>
              <li><Link href="#" className="hover:text-black transition-colors">Manage Deliveries</Link></li>
              <li><Link href="#" className="hover:text-black transition-colors">Orders</Link></li>
              <li><Link href="#" className="hover:text-black transition-colors">Payments</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">Shop.co © 2000-2023, All Rights Reserved</p>
          <div className="flex items-center gap-2">
            {/* Payment badges placeholder */}
            <div className="px-3 py-1 bg-white border border-gray-200 rounded text-xs font-bold shadow-sm">VISA</div>
            <div className="px-3 py-1 bg-white border border-gray-200 rounded text-xs font-bold shadow-sm">MasterCard</div>
            <div className="px-3 py-1 bg-white border border-gray-200 rounded text-xs font-bold shadow-sm">PayPal</div>
            <div className="px-3 py-1 bg-white border border-gray-200 rounded text-xs font-bold shadow-sm">ApplePay</div>
            <div className="px-3 py-1 bg-white border border-gray-200 rounded text-xs font-bold shadow-sm">GPay</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
