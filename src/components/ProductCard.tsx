import React, { useState } from 'react';
import { Product } from '../types';
import { Eye, FileText, Plus, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  onRequestQuote: (product: Product) => void;
  onAddToQuoteBag: (product: Product) => void;
  isInQuoteBag?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onViewDetails,
  onRequestQuote,
  onAddToQuoteBag,
  isInQuoteBag = false,
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="group relative bg-[#181818] rounded-xl border border-[#262626] hover:border-[#123D2A] transition-all duration-300 flex flex-col overflow-hidden hover:shadow-xl hover:shadow-black/50">
      {/* Product Image Slot */}
      <div className="relative aspect-[4/3] w-full bg-[#121212] overflow-hidden">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#1A1A1A] to-[#121212] text-gray-500 p-4 text-center">
            <span className="text-xs uppercase font-mono tracking-widest text-gray-400">VORQEN</span>
            <span className="text-sm font-semibold text-gray-300 mt-1">{product.name}</span>
          </div>
        )}

        {/* Hover Quick Action Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 p-4">
          <button
            onClick={() => onViewDetails(product)}
            className="p-2.5 bg-[#111111]/90 hover:bg-black text-white rounded-lg border border-white/20 shadow-lg transition-transform hover:scale-105 flex items-center gap-1.5 text-xs font-semibold"
            aria-label="View product details"
          >
            <Eye className="w-4 h-4" />
            <span>Details</span>
          </button>
          <button
            onClick={() => onAddToQuoteBag(product)}
            className="p-2.5 bg-[#123D2A]/95 hover:bg-[#184e36] text-white rounded-lg border border-[#2a684a] shadow-lg transition-transform hover:scale-105 flex items-center gap-1.5 text-xs font-semibold"
            aria-label="Add to quotation bag"
          >
            {isInQuoteBag ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            <span>{isInQuoteBag ? 'Added' : 'Quote Bag'}</span>
          </button>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category unboxed quiet text (Zero-Pill discipline) */}
          <div className="flex items-center gap-2 text-[11px] font-medium text-[#B8BEC3] uppercase tracking-wider mb-1.5">
            <span>{product.categoryLabel}</span>
            <span aria-hidden="true" className="text-gray-600">&bull;</span>
            <span>Est. 2001 Sialkot</span>
          </div>

          {/* Product Name */}
          <h3
            onClick={() => onViewDetails(product)}
            className="text-sm font-bold text-white hover:text-gray-200 transition-colors cursor-pointer line-clamp-1 font-heading"
          >
            {product.name}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-gray-400 mt-1.5 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Catalog samples & timely shipping badge */}
          <div className="mt-2.5 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Contact for catalog samples &bull; Timely shipping</span>
          </div>
        </div>

        {/* Pricing / Mode & Action Bar */}
        <div className="pt-4 mt-4 border-t border-[#222222] flex items-center justify-between gap-2">
          <div>
            <span className="text-[11px] uppercase tracking-wider font-semibold text-gray-400 block">
              Pricing Mode
            </span>
            <span className="text-xs font-medium text-white">
              B2B Quotation Required
            </span>
          </div>

          <button
            onClick={() => onRequestQuote(product)}
            className="px-3 py-1.5 bg-[#123D2A] hover:bg-[#184e36] text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 shrink-0"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Request Price</span>
          </button>
        </div>
      </div>
    </div>
  );
};
