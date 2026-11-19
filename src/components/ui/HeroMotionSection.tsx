/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '@/context/StoreContext';
import { ArrowRight } from 'lucide-react';
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
      primaryCta: 'Shop Now',
      secondaryCta: 'Our Story',
      primaryView: 'shop',
      secondaryView: 'our-story',
    },
    {
      id: 'slide-2',
      badge: 'RUNWAY SS26 · BONWIRE ATELIER',
      image:
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1800&q=85',
      headlinePrefix: 'Ancestral Craft,',
      headlineAccent: 'Contemporary',
      headlineSuffix: ' Soul.',
      subtitle:
        'From the looms of Bonwire to the runways of Accra — each piece carries generations of mastery, reimagined for today.',
      primaryCta: 'Explore Collections',
      secondaryCta: 'View Lookbook',
      primaryView: 'collections',
      secondaryView: 'collections',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const SLIDE_DURATION = 5000;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((curr) => (curr + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [slides.length]);

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

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[600px] sm:min-h-[680px] lg:min-h-[740px] bg-[#111113] text-white flex items-center overflow-hidden select-none"
    >
      {/* Background image layer — crossfade only, no Ken Burns */}
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
              className="w-full h-full object-cover object-top filter brightness-[0.78] contrast-105"
            />
          </div>
        ))}

        {/* Ambient glow accents */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-[#6B73F0]/20 blur-[130px] pointer-events-none animate-ambient-glow" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] rounded-full bg-[#FF2D8A]/12 blur-[150px] pointer-events-none animate-ambient-glow delay-700" />

        {/* Light sweep */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="w-[200%] h-full bg-gradient-to-r from-transparent via-white/8 to-transparent -rotate-12 translate-x-[-100%] animate-light-sweep" />
        </div>

        {/* Scrims */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111113] via-transparent to-black/30 z-10" />
      </div>

      {/* Editorial content — crossfades with the slide */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full relative z-20 py-16 sm:py-24">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`space-y-6 transition-opacity duration-700 ease-in-out ${
              index === currentSlide
                ? 'opacity-100 pointer-events-auto'
                : 'opacity-0 pointer-events-none absolute inset-0 flex flex-col justify-center px-6 sm:px-8 lg:px-12 py-16 sm:py-24'
            }`}
          >
            {/* Campaign badge */}
            <div className="inline-flex items-center gap-2.5 bg-black/50 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-xs font-semibold text-white shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[#6B73F0] animate-ping" />
              <span className="tracking-widest uppercase text-[10px] font-medium text-white/95">
                {slide.badge}
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-3xl leading-[1.08] font-display drop-shadow-md">
              {slide.headlinePrefix}{' '}
              <span className="text-[#6B73F0] drop-shadow-sm">{slide.headlineAccent}</span>
              {slide.headlineSuffix}
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-gray-200/90 max-w-xl font-normal leading-relaxed drop-shadow">
              {slide.subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                variant="get-started"
                onClick={() => setActiveView(slide.primaryView as never)}
                className="flex items-center gap-2 shadow-2xl hover:scale-105 active:scale-95 transition-transform"
              >
                <span>{slide.primaryCta}</span>
                <ArrowRight className="w-5 h-5 text-[#111113]" />
              </Button>

              <Button
                variant="outline"
                onClick={() => setActiveView(slide.secondaryView as never)}
                className="bg-black/35 backdrop-blur-md text-white border-white/30 hover:bg-white/20 hover:border-white/50 transition-colors shadow-lg"
              >
                <span>{slide.secondaryCta}</span>
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Slide indicator dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              index === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
