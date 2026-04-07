'use client';

import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Product } from './ProductCard';

interface CartItemData extends Product {
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

interface CartItemProps {
  item: CartItemData;
  onUpdateQuantity?: (id: number, quantity: number) => void;
  onRemove?: (id: number) => void;
}

export default function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  return (
    <div className="flex gap-4 py-4 md:py-6 border-b border-gray-200">
      <div className="w-[100px] h-[100px] md:w-[124px] md:h-[124px] bg-[#F0EEED] rounded-xl flex items-center justify-center p-2 relative flex-shrink-0">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-contain p-2 mix-blend-multiply"
          sizes="(max-width: 768px) 100px, 124px"
        />
      </div>
      
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex justify-between items-start gap-4">
          <div>
            <h3 className="font-bold text-black text-sm md:text-xl line-clamp-1 mb-1">{item.title}</h3>
            {item.selectedSize && (
              <p className="text-xs md:text-sm text-black">
                Size: <span className="text-gray-500">{item.selectedSize}</span>
              </p>
            )}
            {item.selectedColor && (
              <p className="text-xs md:text-sm text-black">
                Color: <span className="text-gray-500">{item.selectedColor}</span>
              </p>
            )}
          </div>
          <button 
            className="text-[#FF3333] hover:bg-[#FF3333]/10 p-1 rounded transition-colors"
            onClick={() => onRemove?.(item.id)}
            aria-label="Remove item"
          >
            <Trash2 size={24} />
          </button>
        </div>
        
        <div className="flex justify-between items-end">
          <p className="font-bold text-xl md:text-[24px] text-black">${item.price.toFixed(2)}</p>
          <div className="flex items-center bg-[#F0F0F0] rounded-full px-3 py-1.5 md:px-5 md:py-2.5 gap-3 md:gap-5">
            <button 
              className="text-black hover:text-gray-600 transition-colors cursor-pointer"
              onClick={() => onUpdateQuantity?.(item.id, Math.max(1, item.quantity - 1))}
            >
              <Minus size={18} />
            </button>
            <span className="font-medium text-sm md:text-base w-4 text-center text-black">{item.quantity}</span>
            <button 
              className="text-black hover:text-gray-600 transition-colors cursor-pointer"
              onClick={() => onUpdateQuantity?.(item.id, item.quantity + 1)}
            >
              <Plus size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
