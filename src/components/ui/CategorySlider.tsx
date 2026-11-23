'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useStore } from '@/context/StoreContext';
import { ChevronLeft, ChevronRight, ArrowUpRight, Sparkles } from 'lucide-react';

export default function CategorySlider() {
  const { categories, navigateToCategory } = useStore();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const checkScroll = () => {
    if (!sliderRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);

    // Calculate approximate active index
    const cardWidth = 280;
    const idx = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.min(Math.max(idx, 0), categories.length - 1));
  };

  useEffect(() => {
    const el = sliderRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll, { passive: true });
      checkScroll();
      return () => el.removeEventListener('scroll', checkScroll);
    }
  }, [categories]);

  const scroll = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return;
    const scrollAmount = direction === 'left' ? -320 : 320;
    sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <section className="max-w-7xl mx-auto px-5 sm:px-8 space-y-6">
      {/* Header with Title and Modern Controls */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold tracking-[0.25em] text-[#6B7F67] uppercase flex items-center gap-1.5 mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#1E3A2E]" />
            <span>CURATED ARCHIVES · T.I.M.E FITS</span>
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1E3A2E] tracking-tight font-serif">
            Explore by Category
          </h2>
          <p className="text-xs sm:text-sm text-[#3D4337] mt-1 font-light max-w-xl">
            Swipe through our signature Ghanaian silhouettes, tailored perfection and timeless style designed to endure.
          </p>
        </div>

        {/* Carousel Controls */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          <button
            onClick={() => navigateToCategory('all')}
            className="text-xs font-bold text-[#1E3A2E] hover:underline transition-colors mr-2 cursor-pointer"
          >
            All Categories ({categories.length}) →
          </button>

          {/* Left Arrow */}
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            aria-label="Previous categories"
            className="w-11 h-11 rounded-full border border-[#E6E6EA] bg-white text-[#111113] flex items-center justify-center transition-all duration-200 hover:bg-[#111113] hover:text-white hover:border-[#111113] disabled:opacity-30 disabled:pointer-events-none cursor-pointer shadow-sm active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            aria-label="Next categories"
            className="w-11 h-11 rounded-full border border-[#E6E6EA] bg-white text-[#111113] flex items-center justify-center transition-all duration-200 hover:bg-[#111113] hover:text-white hover:border-[#111113] disabled:opacity-30 disabled:pointer-events-none cursor-pointer shadow-sm active:scale-95"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Modern Slide Show / Carousel Track */}
      <div
        ref={sliderRef}
        className="flex gap-4 sm:gap-5 overflow-x-auto pb-4 pt-1 no-scrollbar scroll-smooth snap-x snap-mandatory"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {categories.map((cat, idx) => (
          <div
            key={cat.id}
            onClick={() => navigateToCategory(cat.id)}
            className="group relative w-[240px] sm:w-[280px] h-[340px] sm:h-[380px] flex-shrink-0 rounded-[28px] overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 border border-[#E6E6EA] select-none snap-start"
          >
            {/* Background Image */}
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 filter brightness-[0.88]"
            />

            {/* Gradient Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 transition-opacity group-hover:from-black/90" />

            {/* Top Badge: Index indicator & Count */}
            <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
              <span className="text-[10px] font-mono font-bold tracking-widest text-white/90 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15">
                0{idx + 1} / 0{categories.length}
              </span>
              <span className="text-[11px] font-semibold text-[#C7CBB8] bg-[#1E3A2E]/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#3E5A3F]/50">
                {cat.itemCount} pieces
              </span>
            </div>

            {/* Bottom Content Card */}
            <div className="absolute bottom-4 inset-x-4 z-10 space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight group-hover:text-[#C7CBB8] transition-colors">
                {cat.name}
              </h3>

              <p className="text-[12px] text-white/80 line-clamp-2 font-light leading-relaxed">
                {cat.description}
              </p>

              {/* Action Button */}
              <div className="pt-1 flex items-center justify-between">
                <span className="text-[11px] font-semibold tracking-wider text-[#C7CBB8] uppercase flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Shop Collection</span>
                  <span>→</span>
                </span>
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#1E3A2E] group-hover:text-[#C7CBB8] transition-colors shadow-md">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Dots / Bar */}
      <div className="flex items-center justify-center gap-1.5 pt-2">
        {categories.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              activeIndex === i ? 'w-6 bg-[#1E3A2E]' : 'w-1.5 bg-[#D4D4DA]'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
