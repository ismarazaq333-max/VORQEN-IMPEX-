import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { PRODUCT_CATEGORIES } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Search, Filter, SlidersHorizontal, FileText, CheckCircle2, ArrowUpDown } from 'lucide-react';

interface ShopPageProps {
  products: Product[];
  initialCategory?: string;
  onViewProductDetails: (product: Product) => void;
  onRequestQuote: (product?: Product) => void;
  onAddToQuoteBag: (product: Product) => void;
  quoteBagProductIds: string[];
}

export const ShopPage: React.FC<ShopPageProps> = ({
  products,
  initialCategory = 'all',
  onViewProductDetails,
  onRequestQuote,
  onAddToQuoteBag,
  quoteBagProductIds,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'alpha-asc' | 'alpha-desc'>('featured');

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesCategory =
          selectedCategory === 'all' || product.category === selectedCategory;
        const matchesSearch =
          !searchQuery.trim() ||
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.materials.some((m) => m.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'alpha-asc') return a.name.localeCompare(b.name);
        if (sortBy === 'alpha-desc') return b.name.localeCompare(a.name);
        return 0;
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Title & Slogan */}
      <div className="space-y-3 border-b border-[#222222] pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B8BEC3]">
          <span>Commercial Export Catalog</span>
          <span aria-hidden="true">&bull;</span>
          <span>Manufactured by FLAKES IMPEX (Est. 2001)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
          VORQEN Product Collection & B2B Sourcing
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 max-w-2xl leading-relaxed">
          Browse our export-grade protective gloves, tactical equipment, authentic leather apparel, and technical sportswear. Direct factory quotation and sample dispatch available for global importers and brands.
        </p>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-[#181818] rounded-xl p-4 sm:p-5 border border-[#262626] space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by article name, leather, Kevlar, TPR, sizing..."
              className="w-full bg-[#111111] border border-[#2E2E2E] focus:border-[#123D2A] rounded-lg pl-10 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs"
              >
                Clear
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 shrink-0">
            <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#111111] border border-[#2E2E2E] focus:border-[#123D2A] rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
            >
              <option value="featured">Sort by Featured</option>
              <option value="alpha-asc">Alphabetical (A - Z)</option>
              <option value="alpha-desc">Alphabetical (Z - A)</option>
            </select>
          </div>
        </div>

        {/* Interactive Segmented Category Filter Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar">
          {PRODUCT_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 border ${
                  isSelected
                    ? 'bg-[#123D2A] text-white border-[#1b5a3d] shadow-sm'
                    : 'bg-[#141414] text-gray-400 border-[#262626] hover:text-white hover:bg-[#1E1E1E]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Catalog Mode & Timely Shipping Notice */}
      <div className="bg-gradient-to-r from-[#123D2A]/90 to-[#181818] border border-[#235f40] rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-gray-200 shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-black/40 border border-white/10 text-emerald-400 shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="font-extrabold text-white text-sm block tracking-wide font-heading">
              CONTACT FOR CATALOG SAMPLES &bull; TIMELY SHIPPING
            </span>
            <span className="text-gray-300 text-xs mt-0.5 block">
              Physical material swatches and production-grade prototypes dispatched via DHL / FedEx. Direct wholesale quotations provided for global destinations.
            </span>
          </div>
        </div>
        <button
          onClick={() => onRequestQuote()}
          className="px-4 py-2 bg-white text-[#111111] hover:bg-gray-100 font-bold text-xs rounded-lg transition-colors whitespace-nowrap shadow shrink-0 flex items-center gap-1.5"
        >
          <FileText className="w-3.5 h-3.5 text-[#123D2A]" />
          <span>Request Samples & Catalog</span>
        </button>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-[#161616] rounded-2xl border border-[#262626] space-y-4">
          <SlidersHorizontal className="w-10 h-10 text-gray-500 mx-auto" />
          <h3 className="text-base font-bold text-white">No Articles Match Your Search</h3>
          <p className="text-xs text-gray-400 max-w-sm mx-auto">
            Try adjusting your query or filter across all categories to see the complete VORQEN manufacturing collection.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="px-4 py-2 bg-[#123D2A] hover:bg-[#184e36] text-white text-xs font-semibold rounded-lg transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={onViewProductDetails}
              onRequestQuote={onRequestQuote}
              onAddToQuoteBag={onAddToQuoteBag}
              isInQuoteBag={quoteBagProductIds.includes(product.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
