/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useStore } from '@/context/StoreContext';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  id: string;
  image: string;
  badge: string;
  headlinePrefix: string;
  headlineAccent: string;
  headlineSuffix: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
  primaryView: string;
  secondaryView: string;
}

export default function HeroMotionSection() {
  const { siteContent, setActiveView } = useStore();

  const slides: Slide[] = [
    {
      id: 'slide-1',
      badge: siteContent.heroCampaignBadge || 'ACCRA HAUTE COUTURE 2026',
      image:
        siteContent.heroImageUrl ||
        'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1800&q=85',
      headlinePrefix: siteContent.heroHeadlinePrefix || 'Where African Heritage',
      headlineAccent: siteContent.heroHeadlineAccent || 'Redefines',
      headlineSuffix: siteContent.heroHeadlineSuffix || ' Luxury.',
      subtitle:
        siteContent.heroSubtitle ||
        'Hand-woven Kente, brass-cast details, and architectural silhouettes — crafted for the modern African icon.',
      primaryCta: siteContent.heroPrimaryCta || 'Shop Now',
      secondaryCta: siteContent.heroSecondaryCta || 'Our Story',
      primaryView: siteContent.heroPrimaryView || 'shop',
      secondaryView: siteContent.heroSecondaryView || 'our-story',
    },
    {
      id: 'slide-2',
      badge: siteContent.hero2CampaignBadge || 'RUNWAY SS26 · BONWIRE ATELIER',
      image:
        siteContent.hero2ImageUrl ||
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1800&q=85',
      headlinePrefix: siteContent.hero2HeadlinePrefix || 'Ancestral Craft,',
      headlineAccent: siteContent.hero2HeadlineAccent || 'Contemporary',
      headlineSuffix: siteContent.hero2HeadlineSuffix || ' Soul.',
      subtitle:
        siteContent.hero2Subtitle ||
        'From the looms of Bonwire to the runways of Accra — each piece carries generations of mastery, reimagined for today.',
      primaryCta: siteContent.hero2PrimaryCta || 'Explore Collections',
      secondaryCta: siteContent.hero2SecondaryCta || 'View Lookbook',
      primaryView: siteContent.hero2PrimaryView || 'collections',
      secondaryView: siteContent.hero2SecondaryView || 'collections',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartXRef = useRef<number | null>(null);

  const isAutoplay = siteContent.heroAutoplay !== false;
  const slideDuration = (siteContent.heroSlideDuration || 5) * 1000;

  // Pre-fetch both images on mount
  useEffect(() => {
    slides.forEach((slide) => {
      const img = new window.Image();
      img.src = slide.image;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const nextSlide = useCallback(
    () => setCurrentSlide((curr) => (curr + 1) % slides.length),
    [slides.length]
  );
  const prevSlide = useCallback(
    () => setCurrentSlide((curr) => (curr - 1 + slides.length) % slides.length),
    [slides.length]
  );

  useEffect(() => {
    if (!isAutoplay) return;
    const timer = setInterval(nextSlide, slideDuration);
    return () => clearInterval(timer);
  }, [isAutoplay, slideDuration, nextSlide]);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartXRef.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    touchStartXRef.current = null;
  };

  return (
    <section
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative min-h-[460px] sm:min-h-[580px] lg:min-h-[680px] bg-[#111113] text-white flex items-center overflow-hidden select-none"
    >
      {/* ── Background Slides (Rock-solid inline-style crossfade for iOS Safari) ── */}
      {slides.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={slide.id}
            aria-hidden={!isActive}
            style={{
              opacity: isActive ? 1 : 0,
              zIndex: isActive ? 5 : 1,
              transition: 'opacity 700ms ease-in-out',
            }}
            className="absolute inset-0 pointer-events-none"
          >
            <img
              src={slide.image}
              alt={slide.badge}
              loading="eager"
              decoding="async"
              fetchPriority={index === 0 ? 'high' : 'low'}
              className="w-full h-full object-cover object-top sm:object-center"
            />
          </div>
        );
      })}

      {/* ── Refined, lighter scrims so photos remain crisp and vibrant ── */}
      <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#111113] via-transparent to-black/20 z-10 pointer-events-none" />

      {/* ── Subtle ambient illumination ── */}
      <div className="absolute top-1/4 -left-20 w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-[#6B73F0]/20 blur-[90px] pointer-events-none z-10" />
      <div className="absolute bottom-10 right-10 w-64 sm:w-[400px] h-64 sm:h-[400px] rounded-full bg-[#FF2D8A]/15 blur-[100px] pointer-events-none z-10" />

      {/* ── Editorial Content (Compact, proportional mobile typography) ── */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full relative z-20 py-8 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 grid-rows-1">
          {slides.map((slide, index) => {
            const isActive = index === currentSlide;
            return (
              <div
                key={slide.id}
                style={{
                  opacity: isActive ? 1 : 0,
                  transition: 'opacity 500ms ease-in-out',
                  pointerEvents: isActive ? 'auto' : 'none',
                }}
                className="col-start-1 row-start-1 space-y-2.5 sm:space-y-4"
              >
                {/* Campaign badge */}
                <div className="inline-flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-[10px] font-semibold text-white shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6B73F0] animate-ping" />
                  <span className="tracking-widest uppercase font-medium text-white/90">
                    {slide.badge}
                  </span>
                </div>

                {/* Headline — sleek & readable */}
                <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold tracking-tight text-white max-w-2xl leading-[1.15] sm:leading-[1.1] font-display drop-shadow">
                  {slide.headlinePrefix}{' '}
                  <span className="text-[#6B73F0] drop-shadow-sm">{slide.headlineAccent}</span>
                  {slide.headlineSuffix}
                </h1>

                {/* Subtitle — 2 lines max on mobile */}
                <p className="text-xs sm:text-sm text-gray-200/90 max-w-lg font-normal leading-relaxed drop-shadow line-clamp-2 sm:line-clamp-none">
                  {slide.subtitle}
                </p>

                {/* Compact Action Buttons (horizontal row, no giant stacked blocks) */}
                <div className="flex flex-row items-center gap-2.5 pt-1.5">
                  <button
                    type="button"
                    onClick={() => setActiveView(slide.primaryView as never)}
                    className="h-10 px-5 rounded-full bg-white text-[#111113] text-xs font-bold hover:bg-gray-100 active:scale-95 transition-transform shadow-lg flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{slide.primaryCta}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#111113]" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveView(slide.secondaryView as never)}
                    className="h-10 px-4 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white text-xs font-semibold hover:bg-white/25 active:scale-95 transition-colors shadow flex items-center justify-center cursor-pointer"
                  >
                    <span>{slide.secondaryCta}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Prev / Next Controls (Desktop) ── */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 border border-white/20 items-center justify-center text-white backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 border border-white/20 items-center justify-center text-white backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* ── Slide indicator dots ── */}
      <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 shadow-md">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              index === currentSlide ? 'w-6 bg-[#6B73F0]' : 'w-1.5 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
