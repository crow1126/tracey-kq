'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { Heart, ShoppingBag, ArrowRight, Trash2, Search, Check } from 'lucide-react';
import IconButton from '../ui/IconButton';
import Button from '../ui/Button';

export default function SavedView() {
  const {
    products,
    wishlist,
    toggleWishlist,
    addToCart,
    setActiveView,
    setQuickViewProduct,
  } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  const filteredProducts = wishlistedProducts.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMoveToBag = (e: React.MouseEvent, product: any) => {
    e.stopPropagation();
    addToCart(product, product.sizes[0], product.colors[0]?.name, product.colors[0]?.hex, 1);
    setJustAddedId(product.id);
    setTimeout(() => {
      setJustAddedId(null);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#111113] pb-32">
      {/* Header */}
      <section className="bg-white border-b border-[#E6E6EA] py-8">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[11px] font-medium tracking-[0.2em] text-[#8A8A8F] uppercase">
                PRIVATE ARCHIVE
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold text-[#111113] tracking-tight">
                Saved Creations
              </h1>
              <p className="text-xs sm:text-sm text-[#8A8A8F] mt-1">
                Your curated personal selection of Ghanaian couture pieces ({wishlistedProducts.length} pieces).
              </p>
            </div>

            {/* In-Wishlist Search */}
            {wishlistedProducts.length > 0 && (
              <div className="relative max-w-xs w-full">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A8A8F]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter saved items..."
                  className="w-full h-10 pl-9 pr-3 rounded-full bg-[#EDEDF0] text-xs text-[#111113] placeholder-[#8A8A8F] outline-none focus:ring-1 focus:ring-[#6B73F0]"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 pt-8">
        {wishlistedProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#E6E6EA] max-w-md mx-auto my-12 space-y-5">
            <div className="w-20 h-20 rounded-full bg-[#ECEDFD] text-[#6B73F0] flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8 fill-[#6B73F0]/20" />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-[#111113]">Your Wishlist is Empty</h2>
              <p className="text-xs text-[#8A8A8F] max-w-xs mx-auto">
                Discover our latest handcrafted collections and tap the heart icon on any piece to save it to your personal wishlist.
              </p>
            </div>
            <Button
              variant="primary"
              onClick={() => setActiveView('shop')}
              className="flex items-center justify-center gap-2 max-w-xs mx-auto"
            >
              <span>Explore Boutique</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
            {filteredProducts.map((product) => {
              const isAdded = justAddedId === product.id;

              return (
                <div
                  key={product.id}
                  onClick={() => setQuickViewProduct(product)}
                  className="group bg-white rounded-3xl p-2.5 border border-[#E6E6EA] flex flex-col justify-between transition-all duration-300 hover:shadow-md cursor-pointer relative"
                >
                  {/* Image 3:4 */}
                  <div className="relative aspect-[3/4] rounded-[20px] overflow-hidden bg-[#EDEDF0] mb-3">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Remove Wishlist button top-right */}
                    <div className="absolute top-2.5 right-2.5 z-10">
                      <IconButton
                        variant="card-heart"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(product.id);
                        }}
                        aria-label="Remove from saved"
                      >
                        <Heart className="w-[18px] h-[18px] text-[#E5384F] fill-[#E5384F]" />
                      </IconButton>
                    </div>

                    {/* Stock badge */}
                    {product.stockStatus === 'low_stock' && (
                      <div className="absolute top-2.5 left-2.5 z-10 bg-[#F5A524] text-white text-[9px] font-bold px-2 py-0.5 rounded-md">
                        LOW STOCK
                      </div>
                    )}
                  </div>

                  {/* Metadata */}
                  <div className="px-1.5 pb-2 space-y-1">
                    <span className="text-[10px] font-semibold text-[#8A8A8F] uppercase tracking-wider block">
                      {product.category}
                    </span>
                    <h3 className="text-[14px] sm:text-[15px] font-semibold text-[#111113] leading-snug truncate group-hover:text-[#6B73F0] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-[14px] font-bold text-[#111113] pt-0.5">
                      GH₵ {product.priceGhc.toLocaleString()}
                    </p>

                    {/* Action Button: Move to Bag */}
                    <button
                      onClick={(e) => handleMoveToBag(e, product)}
                      className={`w-full mt-2 h-10 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                        isAdded
                          ? 'bg-[#1F8A4C] text-white'
                          : 'bg-[#111113] text-white hover:bg-[#3A3A3F]'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added to Bag ✓</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Move to Bag</span>
                        </>
                      )}
                    </button>
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
