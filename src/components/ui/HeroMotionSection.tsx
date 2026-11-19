/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartXRef = useRef<number | null>(null);

  // Controlled dynamically via CMS
  const isAutoplay = siteContent.heroAutoplay !== false;
  const slideDuration = (siteContent.heroSlideDuration || 5) * 1000;

  useEffect(() => {
    if (!isAutoplay) return;
    const timer = setInterval(() => {
      setCurrentSlide((curr) => (curr + 1) % slides.length);
    }, slideDuration);
    return () => clearInterval(timer);
  }, [isAutoplay, slideDuration, slides.length]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x: x * 14, y: y * 14 });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  const nextSlide = () => setCurrentSlide((curr) => (curr + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((curr) => (curr - 1 + slides.length) % slides.length);

  // Mobile swipe gestures
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartXRef.current = null;
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative min-h-[560px] sm:min-h-[640px] lg:min-h-[720px] bg-[#111113] text-white flex items-center overflow-hidden select-none"
    >
      {/* Background image layer — smooth crossfade, no glide/zoom */}
      <div
        className="absolute inset-0 z-0 transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0) scale(1.02)`,
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt="Tracey Kuukua Quansah Haute Couture"
              className="w-full h-full object-cover object-top filter brightness-[0.75] contrast-105"
            />
          </div>
        ))}

        {/* Ambient glow accents */}
        <div className="absolute top-1/4 -left-20 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-[#6B73F0]/20 blur-[130px] pointer-events-none animate-ambient-glow" />
        <div className="absolute bottom-10 right-10 w-80 sm:w-[500px] h-80 sm:h-[500px] rounded-full bg-[#FF2D8A]/12 blur-[150px] pointer-events-none animate-ambient-glow delay-700" />

        {/* Scrims optimized for mobile contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-black/30 z-10 sm:from-black/85 sm:via-black/40 sm:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111113] via-transparent to-black/40 z-10" />
      </div>

      {/* Editorial content — crossfades with the slide */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full relative z-20 py-12 sm:py-20 lg:py-24">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`space-y-4 sm:space-y-6 transition-opacity duration-700 ease-in-out ${
              index === currentSlide
                ? 'opacity-100 pointer-events-auto'
                : 'opacity-0 pointer-events-none absolute inset-0 flex flex-col justify-center px-5 sm:px-8 lg:px-12 py-12 sm:py-20 lg:py-24'
            }`}
          >
            {/* Campaign badge */}
            <div className="inline-flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-semibold text-white shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[#6B73F0] animate-ping" />
              <span className="tracking-widest uppercase text-[9px] sm:text-[10px] font-medium text-white/95">
                {slide.badge}
              </span>
            </div>

            {/* Headline with responsive mobile typography */}
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white max-w-3xl leading-[1.12] sm:leading-[1.08] font-display drop-shadow-md">
              {slide.headlinePrefix}{' '}
              <span className="text-[#6B73F0] drop-shadow-sm">{slide.headlineAccent}</span>
              {slide.headlineSuffix}
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-base text-gray-200/90 max-w-xl font-normal leading-relaxed drop-shadow line-clamp-3 sm:line-clamp-none">
              {slide.subtitle}
            </p>

            {/* CTAs - Stack nicely on mobile, side-by-side on sm+ */}
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
        ))}
      </div>

      {/* Manual Slide Previous / Next Controls on Desktop */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/30 hover:bg-black/60 border border-white/20 items-center justify-center text-white backdrop-blur-md transition-all hover:scale-110 active:scale-95"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/30 hover:bg-black/60 border border-white/20 items-center justify-center text-white backdrop-blur-md transition-all hover:scale-110 active:scale-95"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide indicator dots - touch friendly */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 shadow-lg">
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
