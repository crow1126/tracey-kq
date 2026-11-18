'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { PRODUCTS, Product } from '@/data/fashion-data';
import { Heart, Plus, Eye, Sparkles, Check } from 'lucide-react';

export default function ProductGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string>('ACCESSORIES');
  const [selectedColorMap, setSelectedColorMap] = useState<Record<string, string>>({});
  const [addedAnimationId, setAddedAnimationId] = useState<string | null>(null);

  const { addToCart, toggleWishlist, isWishlisted, setQuickViewProduct } = useStore();

  const categories = ['ALL', 'ACCESSORIES', 'NEW IN', 'BEST SELLER', 'WOMEN', 'MEN'];

  const filteredProducts = PRODUCTS.filter((item) => {
    if (selectedCategory === 'ALL') return true;
    if (selectedCategory === 'ACCESSORIES') return item.category === 'Accessories' || item.id === 'tkq-01' || item.id === 'tkq-02' || item.id === 'tkq-03';
    if (selectedCategory === 'NEW IN') return item.isNew;
    if (selectedCategory === 'BEST SELLER') return item.category === 'Best Seller' || item.rating >= 4.9;
    if (selectedCategory === 'WOMEN') return item.category === 'Women';
    if (selectedCategory === 'MEN') return item.category === 'Men';
    return true;
  });

  const handleColorSelect = (productId: string, color: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedColorMap((prev) => ({ ...prev, [productId]: color }));
  };

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    const activeColor = selectedColorMap[product.id] || product.colors[0];
    addToCart(product, product.sizes[0], activeColor, 1);
    
    setAddedAnimationId(product.id);
    setTimeout(() => setAddedAnimationId(null), 1200);
  };

  return (
    <section className="bg-[#183015] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-[#2A4E1F]">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header: Image 2 Reference */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#C8E96B] uppercase tracking-widest flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                Curated Collections
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold tracking-tight mt-1 text-white">
                EXPLORE OUR CATEGORY
              </h2>
            </div>
            <p className="text-sm text-gray-300 max-w-md font-light">
              Architectural silhouettes tailored in organic cotton, mulberry silk, and fine wool with hand-finished artisan details.
            </p>
          </div>

          {/* Category Filter Pills (Image 2 reference) */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#2A4E1F] text-[#C8E96B] border border-[#C8E96B] shadow-md shadow-[#C8E96B]/10 scale-105'
                      : 'bg-transparent text-gray-300 hover:text-white border border-[#2A4E1F] hover:border-gray-500'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Grid (Image 2 reference: 3 columns with dark green aesthetics) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => {
            const hasWishlist = isWishlisted(product.id);
            const activeColor = selectedColorMap[product.id] || product.colors[0];
            const isAdded = addedAnimationId === product.id;

            return (
              <div
                key={product.id}
                onClick={() => setQuickViewProduct(product)}
                className="group relative bg-[#1E3D1A] rounded-3xl overflow-hidden border border-[#2A4E1F]/70 shadow-xl hover:shadow-2xl hover:border-[#C8E96B]/50 transition-all duration-500 flex flex-col cursor-pointer"
              >
                {/* Product Image Container */}
                <div className="relative aspect-[4/5] overflow-hidden bg-[#24421B]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* 50% OFF Badge (Image 2 reference) */}
                  {product.discountPercent && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className="bg-[#2A4E1F]/90 backdrop-blur-md text-[#C8E96B] border border-[#C8E96B]/40 text-[11px] font-black tracking-wider px-3 py-1.5 rounded-full shadow-lg">
                        {product.discountPercent}% OFF
                      </span>
                    </div>
                  )}

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    aria-label="Wishlist"
                    className={`absolute top-4 right-4 z-10 p-2.5 rounded-full backdrop-blur-md transition-all ${
                      hasWishlist
                        ? 'bg-red-500 text-white scale-110 shadow-lg'
                        : 'bg-black/30 hover:bg-white hover:text-[#1E3D1A] text-white'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${hasWishlist ? 'fill-current' : ''}`} />
                  </button>

                  {/* Quick View Hover Action */}
                  <div className="absolute inset-x-0 bottom-3 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 px-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuickViewProduct(product);
                      }}
                      className="w-full py-2.5 bg-white/90 hover:bg-white text-[#1E3D1A] text-xs font-bold uppercase tracking-wider rounded-full shadow-xl flex items-center justify-center gap-2 backdrop-blur-sm transition-transform active:scale-95"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Quick View</span>
                    </button>
                  </div>
                </div>

                {/* Product Metadata (Image 2 reference) */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-serif font-black text-lg sm:text-xl tracking-tight text-white group-hover:text-[#C8E96B] transition-colors">
                        {product.name}
                      </h3>

                      {/* Color Dots (Image 2 reference) */}
                      <div className="flex items-center gap-1.5">
                        {product.colors.map((color) => {
                          const isColorActive = activeColor === color;
                          return (
                            <span
                              key={color}
                              onClick={(e) => handleColorSelect(product.id, color, e)}
                              style={{ backgroundColor: color }}
                              className={`w-3.5 h-3.5 rounded-full transition-transform cursor-pointer border ${
                                isColorActive
                                  ? 'border-white scale-125 shadow-sm ring-1 ring-[#C8E96B]'
                                  : 'border-black/30 hover:scale-110'
                              }`}
                            />
                          );
                        })}
                      </div>
                    </div>

                    <p className="text-xs text-gray-300 line-clamp-1 font-light">
                      {product.subtitle}
                    </p>
                  </div>

                  {/* Price & Add to Bag Row */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#2A4E1F]">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold font-serif text-[#C8E96B]">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-gray-400 line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={(e) => handleQuickAdd(product, e)}
                      aria-label="Add to bag"
                      className={`p-2.5 rounded-full transition-all duration-300 shadow-md ${
                        isAdded
                          ? 'bg-[#C8E96B] text-[#1E3D1A] scale-110'
                          : 'bg-[#2A4E1F] hover:bg-[#C8E96B] text-white hover:text-[#1E3D1A]'
                      }`}
                    >
                      {isAdded ? <Check className="w-4 h-4 stroke-[3]" /> : <Plus className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Second Highlight Section: OUR FEATURED PRODUCTS (Image 2 Bottom Reference) */}
        <div className="pt-16 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#C8E96B] uppercase tracking-widest">
                Handcrafted Essentials
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-black tracking-tight mt-1 text-white">
                OUR FEATURED PRODUCTS
              </h2>
            </div>
            <button
              onClick={() => setSelectedCategory('ALL')}
              className="text-xs font-bold text-[#C8E96B] hover:underline uppercase tracking-wider hidden sm:block"
            >
              View Full Archive →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTS.slice(6, 9).map((product) => {
              return (
                <div
                  key={product.id}
                  onClick={() => setQuickViewProduct(product)}
                  className="group relative bg-[#1E3D1A] rounded-3xl overflow-hidden border border-[#2A4E1F]/70 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#24421B]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Image 2 featured badge banner overlay: "FROSTY WEATHER JACKET" */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                      <div className="inline-block bg-[#122410]/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-widest text-[#C8E96B] uppercase w-fit mb-2">
                        {product.name}
                      </div>
                      <h4 className="font-serif font-black text-xl text-white">
                        {product.subtitle}
                      </h4>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-lg font-bold text-[#C8E96B]">
                          ${product.price.toFixed(2)}
                        </span>
                        <div className="w-9 h-9 rounded-full bg-[#C8E96B] text-[#1E3D1A] flex items-center justify-center font-bold shadow-lg transform group-hover:rotate-45 transition-transform">
                          →
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
