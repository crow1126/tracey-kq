/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useMemo } from 'react';
import { useStore } from '@/context/StoreContext';
import { Search, X, ArrowRight, Heart, Sparkles, ShoppingBag } from 'lucide-react';

export default function SearchModal() {
  const {
    isSearchOpen,
    setIsSearchOpen,
    products,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isWishlisted,
    setActiveView,
  } = useStore();

  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.fabric.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }, [query, products]);

  if (!isSearchOpen) return null;

  const popularSearches = [
    'Bonwire Kente',
    'Cape Gown',
    'Velvet Blazer',
    'Mulberry Silk',
    'Gold Adornment',
    'Linen',
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setIsSearchOpen(false)}
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
      />

      <div className="relative min-h-screen flex items-start justify-center p-4 sm:p-6 md:p-10">
        <div className="relative w-full max-w-2xl bg-white rounded-[28px] shadow-2xl z-10 border border-[#E6E6EA] text-[#111113] overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
          {/* Search Header */}
          <div className="p-4 sm:p-6 border-b border-[#E6E6EA] flex items-center gap-3">
            <Search className="w-5 h-5 text-[#8A8A8F] flex-shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search gowns, Bonwire Kente, blazers, accessories..."
              className="flex-1 text-sm sm:text-base font-medium text-[#111113] placeholder-[#8A8A8F] outline-none bg-transparent"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-xs text-[#8A8A8F] hover:text-[#111113] px-2 py-1 rounded-full bg-[#EDEDF0]"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="p-2 rounded-full bg-[#EDEDF0] hover:bg-[#E6E6EA] text-[#111113] transition-colors"
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-4 sm:p-6 max-h-[70vh] overflow-y-auto space-y-6">
            {!query.trim() ? (
              <div className="space-y-4">
                <span className="text-[11px] font-semibold tracking-wider uppercase text-[#8A8A8F] block">
                  Popular Atelier Searches
                </span>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-4 py-2 rounded-full bg-[#F5F5F7] hover:bg-[#EDEDF0] text-xs font-medium text-[#111113] transition-colors flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#6B73F0]" />
                      <span>{term}</span>
                    </button>
                  ))}
                </div>

                <div className="pt-4 border-t border-[#E6E6EA]">
                  <span className="text-[11px] font-semibold tracking-wider uppercase text-[#8A8A8F] block mb-3">
                    Curated Categories
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                    {[
                      { name: 'Dresses & Gowns', tag: 'Dresses' },
                      { name: 'Bonwire Kente', tag: 'Kente' },
                      { name: 'Tailored Suits', tag: 'Suits' },
                      { name: 'Streetwear', tag: 'Streetwear' },
                      { name: 'Footwear & Mules', tag: 'Footwear' },
                      { name: 'Brass Jewellery', tag: 'Jewellery' },
                    ].map((c) => (
                      <button
                        key={c.name}
                        onClick={() => {
                          setIsSearchOpen(false);
                          setActiveView('shop');
                        }}
                        className="p-3 rounded-2xl bg-[#F5F5F7] hover:bg-[#ECEDFD] text-left font-medium text-[#3A3A3F] hover:text-[#6B73F0] transition-colors flex items-center justify-between"
                      >
                        <span>{c.name}</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-50" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : searchResults.length === 0 ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#EDEDF0] flex items-center justify-center mx-auto text-[#8A8A8F]">
                  <Search className="w-6 h-6" />
                </div>
                <h4 className="text-base font-semibold text-[#111113]">
                  No pieces found matching &ldquo;{query}&rdquo;
                </h4>
                <p className="text-xs text-[#8A8A8F] max-w-sm mx-auto">
                  Try searching with broader terms like &ldquo;silk&rdquo;, &ldquo;gown&rdquo;, &ldquo;kente&rdquo;, or explore the full shop collection.
                </p>
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    setActiveView('shop');
                  }}
                  className="px-5 py-2.5 rounded-full bg-[#111113] text-white text-xs font-semibold hover:bg-[#3A3A3F] transition-colors"
                >
                  Browse Full Shop Catalogue
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-[#8A8A8F]">
                  <span>Found {searchResults.length} creations</span>
                  <button
                    onClick={() => {
                      setIsSearchOpen(false);
                      setActiveView('shop');
                    }}
                    className="text-[#6B73F0] font-semibold hover:underline"
                  >
                    View in Shop Grid →
                  </button>
                </div>

                <div className="divide-y divide-[#E6E6EA]">
                  {searchResults.map((p) => {
                    const wishlisted = isWishlisted(p.id);

                    return (
                      <div
                        key={p.id}
                        onClick={() => {
                          setQuickViewProduct(p);
                          setIsSearchOpen(false);
                        }}
                        className="py-3 flex items-center gap-3 hover:bg-[#F5F5F7] rounded-2xl px-2 transition-colors cursor-pointer group"
                      >
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-14 h-16 object-cover rounded-xl bg-[#EDEDF0]"
                        />

                        <div className="flex-1 min-w-0 space-y-0.5">
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#8A8A8F] block">
                            {p.category} · {p.fabric}
                          </span>
                          <h4 className="text-sm font-semibold text-[#111113] truncate group-hover:text-[#6B73F0] transition-colors">
                            {p.name}
                          </h4>
                          <span className="text-xs font-bold text-[#111113]">
                            GH₵ {p.priceGhc.toLocaleString()}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => toggleWishlist(p.id)}
                            className="p-2 rounded-full hover:bg-white text-[#8A8A8F] transition-colors"
                            aria-label="Wishlist"
                          >
                            <Heart
                              className={`w-4 h-4 ${
                                wishlisted ? 'text-[#E5384F] fill-[#E5384F]' : ''
                              }`}
                            />
                          </button>
                          <button
                            onClick={() =>
                              addToCart(p, p.sizes[0], p.colors[0]?.name, p.colors[0]?.hex, 1)
                            }
                            className="px-3 py-1.5 rounded-full bg-[#111113] text-white hover:bg-[#3A3A3F] text-xs font-semibold flex items-center gap-1"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Add</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
