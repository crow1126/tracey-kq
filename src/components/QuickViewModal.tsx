'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { X, Star, ShoppingBag, Heart, Check } from 'lucide-react';

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart, toggleWishlist, isWishlisted } = useStore();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [isAdded, setIsAdded] = useState(false);

  if (!quickViewProduct) return null;

  const currentSize = selectedSize || quickViewProduct.sizes[0];
  const currentColor = selectedColor || quickViewProduct.colors[0];
  const hasWishlist = isWishlisted(quickViewProduct.id);

  const handleAddToCart = () => {
    addToCart(quickViewProduct, currentSize, currentColor, 1);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      setQuickViewProduct(null);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setQuickViewProduct(null)}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative bg-[#183015] border border-[#2A4E1F] rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl z-10 text-white my-8">
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#122410]/80 text-gray-300 hover:text-white hover:bg-[#2A4E1F] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Media */}
          <div className="relative aspect-square md:aspect-auto bg-[#24421B] overflow-hidden">
            <img
              src={quickViewProduct.image}
              alt={quickViewProduct.name}
              className="w-full h-full object-cover object-top"
            />
            {quickViewProduct.discountPercent && (
              <span className="absolute top-4 left-4 bg-[#2A4E1F] text-[#C8E96B] border border-[#C8E96B]/50 text-xs font-black px-3 py-1.5 rounded-full shadow-lg">
                {quickViewProduct.discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Details & Selectors */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest bg-[#122410] text-[#C8E96B] px-3 py-1 rounded-full border border-[#2A4E1F]">
                  {quickViewProduct.category}
                </span>
                <div className="flex items-center gap-1 text-xs text-yellow-400">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{quickViewProduct.rating}</span>
                  <span className="text-gray-400">({quickViewProduct.reviewsCount})</span>
                </div>
              </div>

              <h3 className="font-serif font-black text-2xl sm:text-3xl text-white">
                {quickViewProduct.name}
              </h3>

              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-serif font-bold text-[#C8E96B]">
                  ${quickViewProduct.price.toFixed(2)}
                </span>
                {quickViewProduct.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    ${quickViewProduct.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                {quickViewProduct.description}
              </p>
            </div>

            {/* Select Color */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-300 block">
                Color Palette
              </label>
              <div className="flex items-center gap-2">
                {quickViewProduct.colors.map((color) => {
                  const isCurrent = currentColor === color;
                  return (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      style={{ backgroundColor: color }}
                      className={`w-7 h-7 rounded-full border-2 transition-all cursor-pointer ${
                        isCurrent
                          ? 'border-white scale-110 shadow-md ring-2 ring-[#C8E96B]'
                          : 'border-transparent opacity-80 hover:opacity-100'
                      }`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Select Size */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-300">
                  Select Size
                </label>
                <span className="text-[11px] text-[#C8E96B] cursor-pointer hover:underline">
                  Size Guide
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {quickViewProduct.sizes.map((size) => {
                  const isCurrent = currentSize === size;
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold tracking-wider transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-[#C8E96B] text-[#122410] shadow-md scale-105'
                          : 'bg-[#2A4E1F] text-gray-200 hover:bg-[#3A662C]'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                disabled={isAdded}
                className="flex-1 py-4 bg-white hover:bg-[#F4F1EA] text-[#1E3D1A] rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl hover:scale-102 active:scale-98 transition-all cursor-pointer"
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </>
                )}
              </button>

              <button
                onClick={() => toggleWishlist(quickViewProduct.id)}
                className={`p-4 rounded-full border transition-all cursor-pointer ${
                  hasWishlist
                    ? 'bg-red-500 border-red-500 text-white'
                    : 'bg-[#2A4E1F] border-[#3A662C] text-gray-300 hover:text-white'
                }`}
              >
                <Heart className={`w-4 h-4 ${hasWishlist ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
