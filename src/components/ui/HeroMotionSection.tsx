/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useStore } from '@/context/StoreContext';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Button from './Button';

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

  // ── Silently warm browser cache for all slides on mount
  // (no state callbacks — avoids the opacity-locking bug)
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

  // ── Auto-advance
  useEffect(() => {
    if (!isAutoplay) return;
    const timer = setInterval(nextSlide, slideDuration);
    return () => clearInterval(timer);
  }, [isAutoplay, slideDuration, nextSlide]);

  // ── Mobile swipe gestures
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
      className="relative min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] bg-[#111113] text-white flex items-center overflow-hidden select-none"
    >
      {/* ── Image Layers — all stacked, only opacity transitions ── */}
      {slides.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={slide.id}
            aria-hidden={!isActive}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out transform-gpu ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.badge}
              loading="eager"
              decoding="async"
              fetchPriority={index === 0 ? 'high' : 'low'}
              className="w-full h-full object-cover object-center"
            />
          </div>
        );
      })}

      {/* ── Scrims (above images, below content) ── */}
      <div className="absolute inset-0 bg-black/45 z-20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#111113] via-transparent to-black/30 z-20 pointer-events-none" />

      {/* ── Ambient glow ── */}
      <div className="absolute top-1/4 -left-20 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-[#6B73F0]/25 blur-[100px] pointer-events-none z-20" />
      <div className="absolute bottom-10 right-10 w-80 sm:w-[450px] h-80 sm:h-[450px] rounded-full bg-[#FF2D8A]/15 blur-[120px] pointer-events-none z-20" />

      {/* ── Editorial Content — CSS grid stack prevents height jumps ── */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full relative z-30 py-12 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 grid-rows-1">
          {slides.map((slide, index) => {
            const isActive = index === currentSlide;
            return (
              <div
                key={slide.id}
                className={`col-start-1 row-start-1 space-y-4 sm:space-y-6 transition-opacity duration-700 ease-in-out ${
                  isActive ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
              >
                {/* Campaign badge */}
                <div className="inline-flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-semibold text-white shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-[#6B73F0] animate-ping" />
                  <span className="tracking-widest uppercase text-[9px] sm:text-[10px] font-medium text-white/95">
                    {slide.badge}
                  </span>
                </div>

                {/* Headline */}
                <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white max-w-3xl leading-[1.12] sm:leading-[1.08] font-display drop-shadow-md">
                  {slide.headlinePrefix}{' '}
                  <span className="text-[#6B73F0] drop-shadow-sm">{slide.headlineAccent}</span>
                  {slide.headlineSuffix}
                </h1>

                {/* Subtitle */}
                <p className="text-xs sm:text-base text-gray-200/90 max-w-xl font-normal leading-relaxed drop-shadow line-clamp-3 sm:line-clamp-none">
                  {slide.subtitle}
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 max-w-md sm:max-w-none">
                  <Button
                    variant="get-started"
                    onClick={() => setActiveView(slide.primaryView as never)}
                    className="h-12 flex items-center justify-center gap-2 shadow-2xl active:scale-95 transition-transform"
                  >
                    <span>{slide.primaryCta}</span>
                    <ArrowRight className="w-4 h-4 text-[#111113]" />
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setActiveView(slide.secondaryView as never)}
                    className="h-12 bg-black/40 backdrop-blur-md text-white border-white/30 hover:bg-white/20 hover:border-white/50 active:scale-95 transition-colors shadow-lg flex items-center justify-center"
                  >
                    <span>{slide.secondaryCta}</span>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Prev / Next controls ── */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full bg-black/30 hover:bg-black/60 border border-white/20 items-center justify-center text-white backdrop-blur-md transition-all hover:scale-110 active:scale-95 cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full bg-black/30 hover:bg-black/60 border border-white/20 items-center justify-center text-white backdrop-blur-md transition-all hover:scale-110 active:scale-95 cursor-pointer"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* ── Slide dots ── */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 shadow-lg">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
              index === currentSlide ? 'w-7 sm:w-8 bg-[#6B73F0]' : 'w-2 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
