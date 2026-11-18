'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { SEED_COLLECTIONS } from '@/data/db-seed';
import { ArrowRight, Plus, Eye, Sparkles } from 'lucide-react';
import Button from '../ui/Button';

export default function CollectionsView() {
  const { products, setActiveView, setQuickViewProduct, addToCart } = useStore();
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);

  return (
    <div className="bg-[#F5F5F7] min-h-screen pt-12 pb-32 px-5 sm:px-8 lg:px-12 space-y-16 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="text-[11px] font-medium tracking-[0.2em] text-[#6B73F0] uppercase">
          SEASONAL CAMPAIGNS & RUNWAY
        </span>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#111113] font-display">
          The Collections
        </h1>
        <p className="text-sm sm:text-base text-[#3A3A3F] font-normal leading-relaxed">
          Tappable lookbook galleries featuring interactive hotspot dots. Tap any dot to view product details and quick-add to your bag.
        </p>
      </div>

      {/* Campaigns list */}
      <div className="space-y-24">
        {SEED_COLLECTIONS.map((col, idx) => (
          <div key={col.id} className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E6E6EA] pb-4">
              <div>
                <span className="text-xs font-mono text-[#6B73F0] tracking-wider uppercase">
                  {col.season} · {col.year}
                </span>
                <h2 className="text-2xl sm:text-4xl font-bold font-display text-[#111113] tracking-tight mt-1">
                  {col.title}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#8A8A8F] max-w-md font-light">
                {col.subtitle}
              </p>
            </div>

            {/* Shoppable Hero Image with Interactive Hotspot Dots */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-[28px] overflow-hidden bg-[#111113] shadow-lg-nav group">
              <img
                src={col.coverImage}
                alt={col.title}
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
              />
              <div className="absolute inset-0 image-scrim" />

              {/* Hotspot Dots on the Image (Specification) */}
              {col.hotspots.map((hs) => {
                const targetProduct = products.find((p) => p.id === hs.productId);
                const isSelected = activeHotspotId === hs.id;

                return (
                  <div
                    key={hs.id}
                    style={{ left: `${hs.xPercent}%`, top: `${hs.yPercent}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                  >
                    {/* Pulsing Hotspot Button */}
                    <button
                      onClick={() => setActiveHotspotId(isSelected ? null : hs.id)}
                      className="relative w-8 h-8 rounded-full bg-white text-[#111113] shadow-xl flex items-center justify-center font-bold text-xs hover:scale-125 transition-transform cursor-pointer outline-none ring-4 ring-[#6B73F0]/40"
                    >
                      <span className="w-3 h-3 rounded-full bg-[#6B73F0] animate-ping absolute" />
                      <Plus className="w-4 h-4 text-[#111113] relative z-10" />
                    </button>

                    {/* Pop-up Mini Product Card (Specification) */}
                    {isSelected && targetProduct && (
                      <div className="absolute left-10 top-0 w-64 glass p-3.5 rounded-[20px] shadow-2xl border border-white/60 text-[#111113] animate-in fade-in zoom-in-95 duration-200 z-30">
                        <div className="flex gap-3 items-center">
                          <img
                            src={targetProduct.images[0]}
                            alt={targetProduct.name}
                            className="w-14 h-16 rounded-[12px] object-cover bg-[#EDEDF0] flex-shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <h4 className="font-bold text-xs text-[#111113] truncate">
                              {targetProduct.name}
                            </h4>
                            <p className="text-xs font-semibold text-[#6B73F0] mt-0.5">
                              GH₵ {targetProduct.priceGhc.toLocaleString()}
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-2 mt-3 pt-2 border-t border-[#E6E6EA]/60">
                          <button
                            onClick={() => addToCart(targetProduct)}
                            className="flex-1 py-1.5 rounded-full bg-[#111113] text-white text-[11px] font-semibold hover:bg-black"
                          >
                            Add to Bag
                          </button>
                          <button
                            onClick={() => setQuickViewProduct(targetProduct)}
                            className="px-2.5 py-1.5 rounded-full bg-white border border-[#E6E6EA] text-[11px] font-semibold hover:bg-[#F5F5F7]"
                          >
                            <Eye className="w-3.5 h-3.5 text-[#111113]" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white pointer-events-none">
                <p className="text-xs sm:text-sm max-w-lg font-light drop-shadow-md">
                  {col.description}
                </p>
                <div className="hidden sm:inline-flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-medium text-white border border-white/20">
                  <Sparkles className="w-3.5 h-3.5 text-[#C8E96B]" />
                  <span>Tap hotspots on image to shop</span>
                </div>
              </div>
            </div>

            {/* Shoppable Products from this Collection */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#111113]">Pieces from {col.title}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {products
                  .filter((p) => p.collectionId === col.id)
                  .map((product) => (
                    <div
                      key={product.id}
                      onClick={() => setQuickViewProduct(product)}
                      className="bg-white rounded-[20px] p-3 border border-[#E6E6EA] hover:shadow-md-card transition-all cursor-pointer group"
                    >
                      <div className="aspect-[3/4] rounded-[16px] overflow-hidden bg-[#EDEDF0] mb-2">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <h4 className="font-semibold text-xs text-[#111113] truncate">
                        {product.name}
                      </h4>
                      <p className="text-xs font-bold text-[#111113] mt-0.5">
                        GH₵ {product.priceGhc.toLocaleString()}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Shoppable CTA at page end */}
      <div className="bg-[#111113] text-white rounded-[24px] p-8 sm:p-12 text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold font-display">
          Ready to Acquire Your Piece?
        </h2>
        <p className="text-xs sm:text-sm text-[#A1A1A8] font-light max-w-md mx-auto">
          Explore all ready-to-wear categories or book a private fitting with Tracey in Accra.
        </p>
        <div className="flex justify-center gap-4">
          <Button variant="get-started" onClick={() => setActiveView('shop')}>
            <span>Shop All Collections</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
