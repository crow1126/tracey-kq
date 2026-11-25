/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useMemo } from 'react';
import { useStore } from '@/context/StoreContext';
import { Product } from '@/data/db-schema';
import { Heart, Filter, X, SlidersHorizontal, Sparkles, Check, ShoppingBag } from 'lucide-react';
import Chip from '../ui/Chip';
import Badge from '../ui/Badge';
import IconButton from '../ui/IconButton';
import Swatch from '../ui/Swatch';

export default function ExploreView() {
  const { products, setQuickViewProduct, addToCart, toggleWishlist, isWishlisted } = useStore();

  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [selectedSizeFilter, setSelectedSizeFilter] = useState<string | null>(null);
  const [selectedColorFilter, setSelectedColorFilter] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState<number>(30000);
  const [selectedFabric, setSelectedFabric] = useState<string | null>(null);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const tags = [
    { id: 'all', label: 'All Moods' },
    { id: 'couture', label: 'Atelier Couture' },
    { id: 'bonwire-kente', label: 'Bonwire Kente' },
    { id: 'minimalist-linen', label: 'Minimalist Linen' },
    { id: 'accra-nights', label: 'Accra Nights' },
    { id: 'bridal-reception', label: 'Bridal & Gala' },
    { id: 'brass-adornments', label: 'Brass Adornments' },
  ];

  const availableColors = useMemo(() => {
    const map = new Map<string, string>();
    products.forEach((p) => {
      p.colors.forEach((c) => map.set(c.name, c.hex));
    });
    return Array.from(map.entries()).map(([name, hex]) => ({ name, hex }));
  }, [products]);

  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'Custom'];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (selectedTag === 'couture' && p.priceGhc < 10000) return false;
      if (selectedTag === 'bonwire-kente' && !p.fabric.toLowerCase().includes('kente')) return false;
      if (selectedTag === 'minimalist-linen' && !p.fabric.toLowerCase().includes('linen') && !p.fabric.toLowerCase().includes('cotton')) return false;
      if (selectedTag === 'accra-nights' && !p.isTrending) return false;
      if (selectedTag === 'bridal-reception' && !p.name.toLowerCase().includes('gown') && !p.name.toLowerCase().includes('cape')) return false;
      if (selectedTag === 'brass-adornments' && p.category !== 'Jewellery' && p.category !== 'Accessories') return false;

      if (selectedSizeFilter && !p.sizes.includes(selectedSizeFilter)) return false;
      if (selectedColorFilter && !p.colors.some((c) => c.name === selectedColorFilter)) return false;
      if (p.priceGhc > maxPrice) return false;
      if (selectedFabric && !p.fabric.toLowerCase().includes(selectedFabric.toLowerCase())) return false;

      return true;
    });
  }, [products, selectedTag, selectedSizeFilter, selectedColorFilter, maxPrice, selectedFabric]);

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    addToCart(product, product.sizes[0], product.colors[0]?.name, product.colors[0]?.hex, 1);
    setJustAddedId(product.id);
    setTimeout(() => {
      setJustAddedId(null);
    }, 1500);
  };

  const resetFilters = () => {
    setSelectedSizeFilter(null);
    setSelectedColorFilter(null);
    setMaxPrice(30000);
    setSelectedFabric(null);
    setSelectedTag('all');
  };

  const activeFilterCount =
    (selectedSizeFilter ? 1 : 0) +
    (selectedColorFilter ? 1 : 0) +
    (selectedFabric ? 1 : 0) +
    (maxPrice < 30000 ? 1 : 0);

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#111113] pb-32">
      {/* 1. Explore Editorial Header */}
      <section className="bg-white border-b border-[#E6E6EA] pt-8 pb-6">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 bg-[#ECEDFD] text-[#6B73F0] px-3 py-1 rounded-full text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>VISUAL EDITORIAL FEED</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#111113]">
                Explore the Atelier
              </h1>
              <p className="text-sm text-[#3A3A3F] max-w-xl font-normal">
                An organic, masonry-led tapestry of silhouettes, backstage fittings, and hand-loomed gold threads.
              </p>
            </div>

            {/* Filter Drawer Trigger */}
            <button
              onClick={() => setIsFilterDrawerOpen(true)}
              className="inline-flex items-center gap-2.5 h-11 px-5 rounded-full bg-[#EDEDF0] hover:bg-[#E6E6EA] text-sm font-semibold text-[#111113] transition-colors cursor-pointer self-start md:self-auto"
            >
              <Filter className="w-4 h-4 text-[#111113]" />
              <span>Filter Pieces</span>
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#111113] text-white text-[10px] flex items-center justify-center font-bold">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {/* Horizontally scrolling Mood chips */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-6">
            {tags.map((t) => (
              <Chip
                key={t.id}
                active={selectedTag === t.id}
                onClick={() => setSelectedTag(t.id)}
              >
                {t.label}
              </Chip>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Masonry Grid with Mixed 3:4 and 4:5 Aspect Ratios */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 pt-8">
        <div className="flex items-center justify-between pb-4 text-xs text-[#8A8A8F]">
          <span>Curated {filteredProducts.length} archival silhouettes</span>
          {activeFilterCount > 0 && (
            <button
              onClick={resetFilters}
              className="text-[#6B73F0] hover:underline font-semibold"
            >
              Clear all filters ({activeFilterCount})
            </button>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#E6E6EA] max-w-md mx-auto my-12 space-y-4">
            <SlidersHorizontal className="w-12 h-12 text-[#8A8A8F] mx-auto" />
            <h3 className="text-lg font-semibold text-[#111113]">No looks match your criteria</h3>
            <p className="text-xs text-[#8A8A8F]">
              Try relaxing your price filter or selecting another mood.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 rounded-full bg-[#111113] text-white text-xs font-semibold"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          /* Responsive Multi-Column Masonry (columns-2 sm:columns-3 lg:columns-4) */
          <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 sm:gap-4 space-y-3 sm:space-y-4">
            {filteredProducts.map((product, index) => {
              const wishlisted = isWishlisted(product.id);
              const isAdded = justAddedId === product.id;
              // Mix aspect ratios: alternate between 3:4 and 4:5 for authentic masonry rhythm
              const isFourByFive = index % 3 === 0;

              return (
                <div
                  key={product.id}
                  onClick={() => setQuickViewProduct(product)}
                  className="break-inside-avoid group bg-white rounded-3xl p-2.5 border border-[#E6E6EA] flex flex-col justify-between transition-all duration-300 hover:shadow-lg cursor-pointer relative"
                >
                  {/* Image container: mixed 3:4 and 4:5 */}
                  <div
                    className={`relative rounded-[20px] overflow-hidden bg-[#EDEDF0] mb-2.5 ${
                      isFourByFive ? 'aspect-[4/5]' : 'aspect-[3/4]'
                    }`}
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Image scrim */}
                    <div className="absolute inset-0 image-scrim opacity-40 group-hover:opacity-70 transition-opacity" />

                    {/* Top right wishlist heart (36x36px circle) */}
                    <div className="absolute top-2.5 right-2.5 z-10">
                      <IconButton
                        variant="card-heart"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(product.id);
                        }}
                        aria-label="Wishlist"
                      >
                        <Heart
                          className={`w-[18px] h-[18px] transition-transform active:scale-125 ${
                            wishlisted ? 'text-[#E5384F] fill-[#E5384F]' : 'text-[#111113]'
                          }`}
                        />
                      </IconButton>
                    </div>

                    {/* Badges */}
                    <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
                      {product.isSpotlight && <Badge variant="accent">SPOTLIGHT</Badge>}
                      {product.isNew && <Badge variant="neutral">NEW</Badge>}
                    </div>

                    {/* Quick view button floating */}
                    <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                      <button
                        onClick={(e) => handleQuickAdd(e, product)}
                        className={`flex-1 h-10 rounded-full text-xs font-semibold shadow-md flex items-center justify-center gap-1.5 transition-colors ${
                          isAdded
                            ? 'bg-[#1F8A4C] text-white'
                            : 'bg-white text-[#111113] hover:bg-[#EDEDF0]'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Quick Add</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="px-1.5 pb-1 space-y-1">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#8A8A8F] block">
                      {product.category} · {product.fabric}
                    </span>
                    <h3 className="text-[14px] sm:text-[15px] font-semibold text-[#111113] leading-snug line-clamp-1 group-hover:text-[#6B73F0] transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[14px] font-bold text-[#111113]">
                        GH₵ {product.priceGhc.toLocaleString()}
                      </span>
                      <span className="text-[11px] text-[#8A8A8F]">
                        {product.sizes.length} sizes
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 3. Slide-Out Filter Drawer */}
      {isFilterDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            onClick={() => setIsFilterDrawerOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white text-[#111113] shadow-2xl flex flex-col justify-between">
              {/* Header */}
              <div className="p-6 border-b border-[#E6E6EA] flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#111113]">Refine Pieces</h2>
                  <p className="text-xs text-[#8A8A8F]">Filter by sizing, palette, fabric and investment.</p>
                </div>
                <button
                  onClick={() => setIsFilterDrawerOpen(false)}
                  className="p-2 rounded-full bg-[#EDEDF0] hover:bg-[#E6E6EA]"
                >
                  <X className="w-5 h-5 text-[#111113]" />
                </button>
              </div>

              {/* Filter Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {/* Size Selector */}
                <div className="space-y-3">
                  <span className="text-xs font-semibold tracking-wider uppercase text-[#8A8A8F]">
                    Sizes Available
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {availableSizes.map((size) => {
                      const isSelected = selectedSizeFilter === size;
                      return (
                        <button
                          key={size}
                          onClick={() => setSelectedSizeFilter(isSelected ? null : size)}
                          className={`h-11 min-w-[56px] px-4 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#111113] text-white shadow-sm'
                              : 'bg-white border border-[#E6E6EA] text-[#111113] hover:bg-[#EDEDF0]'
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Color Swatches */}
                <div className="space-y-3">
                  <span className="text-xs font-semibold tracking-wider uppercase text-[#8A8A8F]">
                    Colour Palette
                  </span>
                  <div className="flex flex-wrap gap-3">
                    {availableColors.map((color) => {
                      const isSelected = selectedColorFilter === color.name;
                      return (
                        <div key={color.name} className="flex flex-col items-center gap-1">
                          <Swatch
                            hex={color.hex}
                            name={color.name}
                            selected={isSelected}
                            onClick={() => setSelectedColorFilter(isSelected ? null : color.name)}
                          />
                          <span className="text-[10px] text-[#8A8A8F] max-w-[50px] truncate text-center">
                            {color.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Price Slider */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold tracking-wider uppercase text-[#8A8A8F]">
                      Maximum Investment
                    </span>
                    <span className="font-bold text-[#111113] bg-[#EDEDF0] px-3 py-1 rounded-full">
                      GH₵ {maxPrice.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1500"
                    max="30000"
                    step="500"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-[#111113] cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-[#8A8A8F]">
                    <span>GH₵ 1,500</span>
                    <span>GH₵ 30,000+</span>
                  </div>
                </div>

                {/* Fabric Selector */}
                <div className="space-y-3">
                  <span className="text-xs font-semibold tracking-wider uppercase text-[#8A8A8F]">
                    Artisanal Fabric
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {['Kente', 'Silk', 'Linen', 'Velvet', 'Cotton', 'Brass'].map((f) => {
                      const isSelected = selectedFabric === f;
                      return (
                        <button
                          key={f}
                          onClick={() => setSelectedFabric(isSelected ? null : f)}
                          className={`p-3 rounded-2xl text-xs font-medium text-left border transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[#111113] bg-[#111113] text-white'
                              : 'border-[#E6E6EA] bg-white text-[#3A3A3F] hover:bg-[#EDEDF0]'
                          }`}
                        >
                          {f}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-6 border-t border-[#E6E6EA] bg-[#F5F5F7] flex items-center gap-3">
                <button
                  onClick={resetFilters}
                  className="h-14 px-6 rounded-full text-xs font-semibold text-[#8A8A8F] hover:text-[#111113] transition-colors"
                >
                  Reset
                </button>
                <button
                  onClick={() => setIsFilterDrawerOpen(false)}
                  className="flex-1 h-14 rounded-full bg-[#111113] text-white text-sm font-semibold shadow-md hover:bg-[#3A3A3F] transition-colors"
                >
                  Show {filteredProducts.length} Results
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
