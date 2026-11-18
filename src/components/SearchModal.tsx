'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { PRODUCTS } from '@/data/fashion-data';
import { X, Search, ArrowRight } from 'lucide-react';

export default function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, setQuickViewProduct } = useStore();
  const [query, setQuery] = useState('');

  if (!isSearchOpen) return null;

  const matches = query.trim() === ''
    ? []
    : PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.subtitle.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div
        onClick={() => setIsSearchOpen(false)}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      {/* Search Container */}
      <div className="relative bg-[#183015] border border-[#2A4E1F] rounded-3xl max-w-2xl w-full p-6 shadow-2xl z-10 text-white space-y-4">
        <div className="flex items-center gap-3 border-b border-[#2A4E1F] pb-4">
          <Search className="w-5 h-5 text-[#C8E96B]" />
          <input
            type="text"
            autoFocus
            placeholder="Search suits, gowns, blazers, silk accessories..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-white placeholder-gray-400 text-base focus:outline-none"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 rounded-full text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto space-y-2">
          {query.trim() !== '' && matches.length === 0 && (
            <p className="text-center py-8 text-sm text-gray-400 font-light">
              No creations matching &ldquo;{query}&rdquo;
            </p>
          )}

          {matches.map((product) => (
            <div
              key={product.id}
              onClick={() => {
                setQuickViewProduct(product);
                setIsSearchOpen(false);
              }}
              className="flex items-center gap-4 p-3 rounded-2xl hover:bg-[#2A4E1F] transition-colors cursor-pointer group"
            >
              <div className="w-14 h-16 rounded-xl overflow-hidden bg-[#24421B] flex-shrink-0">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif font-bold text-sm text-white group-hover:text-[#C8E96B] transition-colors truncate">
                    {product.name}
                  </h4>
                  <span className="font-serif font-bold text-sm text-[#C8E96B]">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-gray-400 truncate mt-0.5 font-light">
                  {product.subtitle}
                </p>
              </div>

              <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
            </div>
          ))}

          {query.trim() === '' && (
            <div className="space-y-3 pt-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block">
                Trending Searches
              </span>
              <div className="flex flex-wrap gap-2">
                {['Silk Cape', 'Velvet Suit', '50% OFF', 'Brown Suite', 'Accessories'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 rounded-full text-xs bg-[#1E3D1A] hover:bg-[#2A4E1F] text-gray-300 hover:text-white border border-[#2A4E1F] transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
