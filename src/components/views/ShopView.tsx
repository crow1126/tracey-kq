/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useMemo, useRef } from 'react';
import { useStore } from '@/context/StoreContext';
import { Product } from '@/data/db-schema';
import { Heart, Search, SlidersHorizontal, Sparkles, Check, ShoppingBag, X } from 'lucide-react';
import IconButton from '../ui/IconButton';

export default function ShopView() {
  const {
    products,
    categories,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isWishlisted,
    selectedCategory,
    setSelectedCategory,
  } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('featured');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);
  const productsGridRef = useRef<HTMLDivElement>(null);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory =
          selectedCategory === 'all' ||
          p.categoryId === selectedCategory ||
          p.category.toLowerCase() === selectedCategory.toLowerCase();
        const matchesSearch =
          !searchQuery.trim() ||
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.fabric.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStock = !onlyInStock || p.stockStatus === 'in_stock';
        return matchesCategory && matchesSearch && matchesStock;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.priceGhc - b.priceGhc;
        if (sortBy === 'price-desc') return b.priceGhc - a.priceGhc;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        return (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0);
      });
  }, [products, selectedCategory, searchQuery, sortBy, onlyInStock]);

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    addToCart(product, product.sizes[0], product.colors[0]?.name, product.colors[0]?.hex, 1);
    setJustAddedId(product.id);
    setTimeout(() => {
      setJustAddedId(null);
    }, 1500);
  };

  const handleCategorySelect = (catId: string) => {
    setSelectedCategory(catId);
    if (productsGridRef.current) {
      productsGridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F4] text-[#0F1F17] pb-32">
      {/* 1. Sleek Compact Catalogue Header */}
      <section className="bg-white border-b border-[#E6E6EA] pt-6 sm:pt-10 pb-6 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 bg-[#F4F1EA] border border-[#C7CBB8]/60 text-[#1E3A2E] px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#1E3A2E]" />
            <span>T.I.M.E FITS · ATELIER CATALOGUE</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#1E3A2E] font-serif">
            Browse Creations & Pieces
          </h1>
          <p className="text-xs sm:text-sm text-[#3D4337] max-w-2xl font-light leading-relaxed">
            Every garment is tailored and hand-finished in our Accra atelier. Select a category below or explore the full collection of timeless silhouettes.
          </p>
        </div>
      </section>

      {/* 2. Interactive Category Filter Pills (Horizontal Scrolling - No Screen Takeover) */}
      <section className="sticky top-16 md:top-[76px] z-20 bg-white/95 backdrop-blur-md border-b border-[#E6E6EA] py-3 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-2.5">
          {/* Search & Sort Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B7F67]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search gowns, Bonwire Kente, velvet blazers..."
                className="w-full h-10 pl-10 pr-9 rounded-full bg-[#F4F1EA] border border-[#C7CBB8]/40 text-xs sm:text-sm text-[#0F1F17] placeholder-[#6B7F67] focus:bg-white focus:border-[#1E3A2E] focus:ring-2 focus:ring-[#1E3A2E]/20 transition-all outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#6B7F67] hover:text-[#0F1F17]"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort & Quick Filter */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              <label className="flex items-center gap-1.5 text-xs text-[#3D4337] cursor-pointer whitespace-nowrap bg-[#F4F1EA] px-3 py-1.5 rounded-full hover:bg-[#EAE6DD] transition-colors border border-[#C7CBB8]/40">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="rounded text-[#1E3A2E] focus:ring-0 w-3.5 h-3.5"
                />
                <span className="text-[11px] font-medium">In Stock</span>
              </label>

              <div className="flex items-center gap-1.5 bg-[#F4F1EA] border border-[#C7CBB8]/40 rounded-full px-3 py-1.5 text-xs text-[#3D4337] whitespace-nowrap">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#6B7F67]" />
                <span className="text-[#6B7F67] text-[11px]">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(
                      e.target.value as
                        | 'featured'
                        | 'price-asc'
                        | 'price-desc'
                        | 'rating'
                        | 'newest'
                    )
                  }
                  className="bg-transparent text-[11px] font-semibold text-[#1E3A2E] focus:outline-none cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="rating">Top Rated</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>

              <span className="text-[11px] text-[#6B7F67] whitespace-nowrap pl-1">
                (<strong>{filteredProducts.length}</strong> items)
              </span>
            </div>
          </div>

          {/* Category Chips Bar */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
            <button
              type="button"
              onClick={() => handleCategorySelect('all')}
              className={`h-8 px-4 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 border ${
                selectedCategory === 'all'
                  ? 'bg-[#1E3A2E] text-[#C7CBB8] border-[#3E5A3F] shadow-sm'
                  : 'bg-white text-[#3D4337] border-[#E6E6EA] hover:border-[#1E3A2E]'
              }`}
            >
              <span>All Pieces</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${selectedCategory === 'all' ? 'bg-[#3E5A3F] text-white' : 'bg-gray-100 text-gray-600'}`}>
                {products.length}
              </span>
            </button>

            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              const count = products.filter(
                (p) => p.categoryId === cat.id || p.category.toLowerCase() === cat.name.toLowerCase()
              ).length;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategorySelect(isSelected ? 'all' : cat.id)}
                  className={`h-8 px-3.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 border ${
                    isSelected
                      ? 'bg-[#1E3A2E] text-[#C7CBB8] border-[#3E5A3F] shadow-sm'
                      : 'bg-white text-[#3D4337] border-[#E6E6EA] hover:border-[#1E3A2E]'
                  }`}
                >
                  <span>{cat.name}</span>
                  {count > 0 && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-[#3E5A3F] text-white' : 'bg-gray-100 text-gray-600'}`}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Products Grid Section — Direct and Immediately Accessible */}
      <section ref={productsGridRef} className="max-w-7xl mx-auto px-4 sm:px-8 pt-6">
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center border border-[#E6E6EA] max-w-md mx-auto my-12 space-y-4 shadow-sm">
            <div className="w-14 h-14 rounded-full bg-[#F4F1EA] flex items-center justify-center mx-auto text-[#1E3A2E]">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#1E3A2E] font-serif">No matching creations found</h3>
            <p className="text-xs text-[#6B7F67] leading-relaxed">
              We couldn&apos;t find any pieces matching &ldquo;{searchQuery || selectedCategory}&rdquo;. Try clearing filters to view all atelier pieces.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setOnlyInStock(false);
              }}
              className="px-5 py-2.5 rounded-full bg-[#1E3A2E] text-[#C7CBB8] text-xs font-semibold hover:bg-[#0F1F17] transition-colors shadow"
            >
              Reset & View All Pieces
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
            {filteredProducts.map((product) => {
              const wishlisted = isWishlisted(product.id);
              const isAdded = justAddedId === product.id;

              return (
                <div
                  key={product.id}
                  onClick={() => setQuickViewProduct(product)}
                  className="group bg-white rounded-2xl sm:rounded-3xl p-2.5 sm:p-3 border border-[#E6E6EA] flex flex-col justify-between transition-all duration-300 hover:shadow-lg cursor-pointer relative"
                >
                  {/* Image container: 3:4 aspect ratio */}
                  <div className="relative aspect-[3/4] rounded-xl sm:rounded-2xl overflow-hidden bg-gray-100 mb-2.5">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Wishlist Heart */}
                    <div className="absolute top-2 right-2 z-10">
                      <IconButton
                        variant="card-heart"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(product.id);
                        }}
                        aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                      >
                        <Heart
                          className={`w-4 h-4 transition-transform active:scale-125 ${
                            wishlisted ? 'text-[#E5384F] fill-[#E5384F]' : 'text-[#0F1F17]'
                          }`}
                        />
                      </IconButton>
                    </div>

                    {/* Status Badges top-left */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
                      {product.isNew && (
                        <span className="bg-[#1E3A2E] text-[#C7CBB8] text-[9px] font-bold px-2 py-0.5 rounded-full border border-[#3E5A3F] shadow-xs">
                          NEW
                        </span>
                      )}
                      {product.discountPercent && product.discountPercent > 0 && (
                        <span className="bg-[#8A1B4E] text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                          -{product.discountPercent}%
                        </span>
                      )}
                    </div>

                    {/* Quick Add overlay button */}
                    <div className="absolute bottom-2 inset-x-2 z-10">
                      <button
                        type="button"
                        onClick={(e) => handleQuickAdd(e, product)}
                        className={`w-full h-8 sm:h-9 rounded-full text-[11px] sm:text-xs font-semibold shadow-md flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          isAdded
                            ? 'bg-[#1E3A2E] text-[#C7CBB8]'
                            : 'bg-[#1E3A2E]/90 hover:bg-[#1E3A2E] text-[#C7CBB8] backdrop-blur-md'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#C7CBB8]" />
                            <span>Added ✓</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5 text-[#C7CBB8]" />
                            <span>Quick Add</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Product Metadata */}
                  <div className="px-1 space-y-1">
                    <span className="text-[10px] font-bold tracking-wider uppercase text-[#6B7F67] block">
                      {product.category}
                    </span>

                    <h3 className="text-xs sm:text-sm font-semibold text-[#1E3A2E] line-clamp-1 group-hover:text-[#3E5A3F] transition-colors">
                      {product.name}
                    </h3>

                    <p className="text-[11px] text-[#3D4337] line-clamp-1 font-light">
                      {product.fabric}
                    </p>

                    <div className="pt-1 flex items-baseline justify-between">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xs sm:text-sm font-bold text-[#1E3A2E]">
                          GH₵ {product.priceGhc.toLocaleString()}
                        </span>
                        {product.originalPriceGhc && (
                          <span className="text-[10px] text-gray-400 line-through">
                            GH₵ {product.originalPriceGhc.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-[#6B7F67] font-medium">View →</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
