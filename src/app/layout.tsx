import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SHOP.CO | Trends, Fashion & Lifestyle',
  description: 'Discover the latest in fashion and lifestyle at SHOP.CO. Shop new arrivals, top selling products, and find clothes that match your unique style.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="antialiased h-full" suppressHydrationWarning>
      <body className={`${inter.className} min-h-full flex flex-col bg-white text-black`} suppressHydrationWarning>
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
