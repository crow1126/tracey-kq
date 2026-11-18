'use client';

import React, { useState, useMemo } from 'react';
import { useStore } from '@/context/StoreContext';
import { SEED_CATEGORIES } from '@/data/db-seed';
import { Product } from '@/data/db-schema';
import { Heart, Search, SlidersHorizontal, ArrowUpRight, Sparkles, Check, ShoppingBag } from 'lucide-react';
import Chip from '../ui/Chip';
import Badge from '../ui/Badge';
import IconButton from '../ui/IconButton';

export default function ShopView() {
  const { products, setQuickViewProduct, addToCart, toggleWishlist, isWishlisted } = useStore();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('featured');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory = selectedCategory === 'all' || p.categoryId === selectedCategory || p.category.toLowerCase() === selectedCategory.toLowerCase();
        const matchesSearch =
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.fabric.toLowerCase().includes(searchQuery.toLowerCase()) ||
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

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#111113] pb-32">
      {/* 1. Header & Category Tiles */}
      <section className="bg-white border-b border-[#E6E6EA] pt-8 pb-10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="space-y-2 mb-8">
            <span className="text-[11px] font-medium tracking-[0.2em] text-[#8A8A8F] uppercase">
              HAUTE COUTURE CATALOGUE
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#111113]">
              The Full Collection
            </h1>
            <p className="text-sm sm:text-base text-[#3A3A3F] max-w-2xl font-normal">
              Every creation is patterned, tailored, and hand-finished in our Accra atelier. From Bonwire ceremonial Kente gowns to contemporary architectural streetwear.
            </p>
          </div>

          {/* Category Image Tiles: 1:1.05 aspect ratio, name bottom-left, 36px circle arrow button bottom-right */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
            {SEED_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <div
                  key={cat.id}
                  onClick={() => setSelectedCategory(isSelected ? 'all' : cat.id)}
                  className={`group relative aspect-[1/1.05] rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md ${
                    isSelected ? 'ring-3 ring-[#111113] ring-offset-2' : ''
                  }`}
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter brightness-90"
                  />
                  <div className="absolute inset-0 image-scrim" />

                  {/* Name bottom-left */}
                  <div className="absolute bottom-3 left-3 right-12 z-10">
                    <span className="text-[12px] sm:text-[13px] font-semibold text-white leading-tight block">
                      {cat.name}
                    </span>
                    <span className="text-[10px] text-white/80 font-normal">
                      {cat.itemCount} pieces
                    </span>
                  </div>

                  {/* 36px circle arrow button bottom-right */}
                  <div
                    className={`absolute bottom-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-colors shadow-md z-10 ${
                      isSelected ? 'bg-[#6B73F0] text-white' : 'bg-white/90 text-[#111113] group-hover:bg-white'
                    }`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. Controls: Filter Chips, Search, Sort */}
      <section className="sticky top-16 md:top-[72px] z-20 bg-white/95 backdrop-blur-md border-b border-[#E6E6EA] py-3.5 shadow-sm">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#8A8A8F]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search gowns, Bonwire Kente, velvet blazers..."
                className="w-full h-11 pl-11 pr-4 rounded-full bg-[#EDEDF0] border-transparent text-sm text-[#111113] placeholder-[#8A8A8F] focus:bg-white focus:border-[#6B73F0] focus:ring-2 focus:ring-[#6B73F0]/20 transition-all outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#8A8A8F] hover:text-[#111113]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sort & Quick Filter */}
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
              <label className="flex items-center gap-2 text-xs font-medium text-[#3A3A3F] cursor-pointer whitespace-nowrap bg-[#EDEDF0] px-3.5 py-2 rounded-full hover:bg-[#E6E6EA] transition-colors">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="rounded text-[#111113] focus:ring-0 w-3.5 h-3.5"
                />
                <span>In Stock Only</span>
              </label>

              <div className="flex items-center gap-2 bg-[#EDEDF0] rounded-full px-3 py-1.5 text-xs text-[#3A3A3F] whitespace-nowrap">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#8A8A8F]" />
                <span className="text-[#8A8A8F]">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent font-medium text-[#111113] focus:outline-none cursor-pointer"
                >
                  <option value="featured">Featured & Trending</option>
                  <option value="newest">New Arrivals</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>

              <span className="text-xs text-[#8A8A8F] whitespace-nowrap pl-1">
                Showing <strong>{filteredProducts.length}</strong> creations
              </span>
            </div>
          </div>

          {/* Horizontally scrolling category chips */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
            <Chip
              active={selectedCategory === 'all'}
              onClick={() => setSelectedCategory('all')}
            >
              All Pieces ({products.length})
            </Chip>
            {SEED_CATEGORIES.map((cat) => (
              <Chip
                key={cat.id}
                active={selectedCategory === cat.id}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.name}
              </Chip>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Product Grid */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 pt-8">
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#E6E6EA] max-w-md mx-auto my-12 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#EDEDF0] flex items-center justify-center mx-auto text-[#8A8A8F]">
              <Search className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-semibold text-[#111113]">No matching creations found</h3>
            <p className="text-xs text-[#8A8A8F]">
              Try adjusting your search terms, removing filters, or view all items.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setOnlyInStock(false);
              }}
              className="px-5 py-2.5 rounded-full bg-[#111113] text-white text-xs font-medium hover:bg-[#3A3A3F]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
            {filteredProducts.map((product) => {
              const wishlisted = isWishlisted(product.id);
              const isAdded = justAddedId === product.id;

              return (
                <div
                  key={product.id}
                  onClick={() => setQuickViewProduct(product)}
                  className="group bg-white rounded-3xl p-2.5 border border-[#E6E6EA] flex flex-col justify-between transition-all duration-300 hover:shadow-md cursor-pointer relative"
                >
                  {/* Image container: 3:4 aspect ratio */}
                  <div className="relative aspect-[3/4] rounded-[20px] overflow-hidden bg-[#EDEDF0] mb-3">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Image Scrim */}
                    <div className="absolute inset-0 image-scrim opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Wishlist Heart on product cards: 36x36px circle, white bg, 18px icon, 10px from top-right */}
                    <div className="absolute top-2.5 right-2.5 z-10">
                      <IconButton
                        variant="card-heart"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(product.id);
                        }}
                        aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                      >
                        <Heart
                          className={`w-[18px] h-[18px] transition-transform active:scale-125 ${
                            wishlisted ? 'text-[#E5384F] fill-[#E5384F]' : 'text-[#111113]'
                          }`}
                        />
                      </IconButton>
                    </div>

                    {/* Status Badges top-left */}
                    <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
                      {product.isNew && <Badge variant="accent">NEW</Badge>}
                      {product.discountPercent && product.discountPercent > 0 && (
                        <Badge variant="pink">-{product.discountPercent}%</Badge>
                      )}
                      {product.stockStatus === 'low_stock' && (
                        <Badge variant="warning">LOW STOCK</Badge>
                      )}
                    </div>

                    {/* Quick Add Overlay on hover (Desktop) */}
                    <div className="absolute bottom-3 inset-x-3 hidden md:flex items-center gap-2 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200 z-10">
                      <button
                        onClick={(e) => handleQuickAdd(e, product)}
                        className={`w-full h-11 rounded-full text-xs font-semibold shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
                          isAdded
                            ? 'bg-[#1F8A4C] text-white'
                            : 'bg-[#111113] text-white hover:bg-[#3A3A3F]'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Added ✓</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-4 h-4" />
                            <span>Quick Add</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Product Metadata */}
                  <div className="px-1.5 pb-1.5 space-y-1">
                    <div className="flex items-center justify-between text-[11px] text-[#8A8A8F]">
                      <span className="uppercase tracking-wider font-medium truncate max-w-[130px]">
                        {product.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="text-[#F5B400]">★</span>
                        <span className="font-semibold text-[#111113]">{product.rating}</span>
                      </div>
                    </div>

                    {/* Card title: 15/20px, 600 */}
                    <h3 className="text-[15px] leading-[20px] font-semibold text-[#111113] line-clamp-1 group-hover:text-[#6B73F0] transition-colors">
                      {product.name}
                    </h3>

                    {/* Caption / Fabric */}
                    <p className="text-[12px] text-[#8A8A8F] truncate">
                      {product.fabric}
                    </p>

                    {/* Price: GH₵ */}
                    <div className="pt-1 flex items-baseline gap-2">
                      <span className="text-[15px] font-bold text-[#111113]">
                        GH₵ {product.priceGhc.toLocaleString()}
                      </span>
                      {product.originalPriceGhc && (
                        <span className="text-[12px] text-[#8A8A8F] line-through">
                          GH₵ {product.originalPriceGhc.toLocaleString()}
                        </span>
                      )}
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
