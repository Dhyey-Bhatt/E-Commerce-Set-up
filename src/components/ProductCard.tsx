'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, StarHalf, Minus, Plus } from 'lucide-react';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  discountPercentage?: number; // our Synthetic discount
}

interface ProductCardProps {
  product: Product;
  isSelected?: boolean;
  onToggleSelection?: (id: number) => void;
  quantity?: number;
  onUpdateQuantity?: (id: number, q: number) => void;
}

export default function ProductCard({ 
  product, 
  isSelected = false, 
  onToggleSelection, 
  quantity = 1, 
  onUpdateQuantity 
}: ProductCardProps) {
  // Calculate fake discount for UI purposes if provided
  const originalPrice = product.discountPercentage 
    ? (product.price / (1 - product.discountPercentage / 100)).toFixed(2)
    : null;

  // Render Stars based on rating
  const fullStars = Math.floor(product.rating.rate);
  const hasHalfStar = product.rating.rate - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div 
      className={`group cursor-pointer p-4 rounded-[22px] transition-all border-2 ${
        isSelected ? 'border-black shadow-lg bg-gray-50' : 'border-transparent'
      }`}
      onClick={() => onToggleSelection?.(product.id)}
    >
      <div className="bg-[#F0EEED] rounded-[20px] aspect-square relative mb-4 p-4 flex items-center justify-center overflow-hidden transition-all group-hover:shadow-sm">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-4 mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      </div>
      <div>
        <h3 className="font-bold text-black text-sm md:text-base leading-tight md:leading-snug line-clamp-1 mb-2">
          {product.title}
        </h3>
        
        <div className="flex items-center gap-2 mb-2">
          <div className="flex gap-1">
            {[...Array(fullStars)].map((_, i) => (
              <Star key={`full-${i}`} fill="#FFC633" color="#FFC633" size={16} />
            ))}
            {hasHalfStar && <StarHalf fill="#FFC633" color="#FFC633" size={16} />}
            {[...Array(emptyStars)].map((_, i) => (
              <Star key={`empty-${i}`} color="#FFC633" size={16} />
            ))}
          </div>
          <span className="text-sm font-medium text-black">
            {product.rating.rate}/{5}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 md:gap-3">
          <span className="font-bold text-lg md:text-xl md:text-[24px] text-black">
            ${product.price.toFixed(2)}
          </span>
          {originalPrice && (
            <span className="font-bold text-gray-400 line-through text-base md:text-xl md:text-[24px]">
              ${originalPrice}
            </span>
          )}
          {product.discountPercentage && (
            <span className="bg-[#FF3333]/10 text-[#FF3333] text-[10px] md:text-xs font-medium px-3 flex items-center justify-center rounded-xl md:rounded-full py-1">
              -{product.discountPercentage}%
            </span>
          )}
        </div>

        {/* Quantity selector visible only when selected */}
        {isSelected && (
          <div className="mt-4 pt-4 border-t border-gray-200" onClick={(e) => e.stopPropagation()}>
             <div className="flex items-center justify-between bg-[#F0F0F0] rounded-full px-4 py-2">
                <button 
                  className="text-black p-1 hover:bg-gray-200 rounded-full transition-colors"
                  onClick={() => onUpdateQuantity?.(product.id, Math.max(1, quantity - 1))}
                >
                  <Minus size={16} />
                </button>
                <span className="font-bold text-black">{quantity}</span>
                <button 
                  className="text-black p-1 hover:bg-gray-200 rounded-full transition-colors"
                  onClick={() => onUpdateQuantity?.(product.id, quantity + 1)}
                >
                  <Plus size={16} />
                </button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
