'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '@/context/StoreContext';
import { ArrowRight } from 'lucide-react';
import Button from './Button';

interface CampaignLook {
  id: string;
  image: string;
  badge: string;
}

export default function HeroMotionSection() {
  const { siteContent, setActiveView } = useStore();

  // Curated high-fashion campaign runway visuals (Slide 0 dynamically uses admin siteContent.heroImageUrl)
  const looks: CampaignLook[] = [
    {
      id: 'look-1',
      badge: siteContent.heroCampaignBadge || 'ACCRA HAUTE COUTURE 2026',
      image: siteContent.heroImageUrl || 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1800&q=85',
    },
    {
      id: 'look-2',
      badge: 'RUNWAY SS26 · BONWIRE ATELIER',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1800&q=85',
    },
    {
      id: 'look-3',
      badge: 'LIMITED EDITION · ARCHITECTURAL DRAPE',
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1800&q=85',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Exactly 3 seconds rotation duration as requested
  const SLIDE_DURATION = 3000;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((curr) => (curr + 1) % looks.length);
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, [looks.length]);

  // Subtle interactive 3D parallax on mouse move (desktop)
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

  const activeLook = looks[currentSlide];

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[600px] sm:min-h-[680px] lg:min-h-[740px] bg-[#111113] text-white flex items-center overflow-hidden select-none"
    >
      {/* 1. Cinematic Clean Editorial Visual Canvas (No UI overlays/hotspots) */}
      <div
        className="absolute inset-0 z-0 transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0) scale(1.02)`,
        }}
      >
        {looks.map((look, index) => {
          const isActive = index === currentSlide;
          const animationClass =
            index === 0
              ? 'animate-kenburns-3s-1'
              : index === 1
              ? 'animate-kenburns-3s-2'
              : 'animate-kenburns-3s-3';

          return (
            <div
              key={look.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                key={isActive ? `${look.id}-${currentSlide}` : look.id}
                src={look.image}
                alt="Tracey Kuukua Quansah Haute Couture"
                className={`w-full h-full object-cover object-top filter brightness-[0.78] contrast-105 ${
                  isActive ? animationClass : ''
                }`}
              />
            </div>
          );
        })}

        {/* Ethereal Studio Runway Lights */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-[#6B73F0]/20 blur-[130px] pointer-events-none animate-ambient-glow" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] rounded-full bg-[#FF2D8A]/12 blur-[150px] pointer-events-none animate-ambient-glow delay-700" />

        {/* Diagonal Runway Reflector Sweep */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="w-[200%] h-full bg-gradient-to-r from-transparent via-white/8 to-transparent -rotate-12 translate-x-[-100%] animate-light-sweep" />
        </div>

        {/* High-Fashion Contrast Scrims */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111113] via-transparent to-black/30 z-10" />
      </div>

      {/* 2. Editorial Typography & Call to Actions */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full relative z-20 py-16 sm:py-24 space-y-6">
        {/* Animated Campaign Badge */}
        <div className="inline-flex items-center gap-2.5 bg-black/50 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-xs font-semibold text-white shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-500">
          <span className="w-2 h-2 rounded-full bg-[#6B73F0] animate-ping" />
          <span className="tracking-widest uppercase text-[10px] font-medium text-white/95">
            {activeLook.badge}
          </span>
        </div>

        {/* Display Hero Headline with Accent Word */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-3xl leading-[1.08] font-display drop-shadow-md">
          {siteContent.heroHeadlinePrefix}{' '}
          <span className="text-[#6B73F0] drop-shadow-sm">{siteContent.heroHeadlineAccent}</span>
          {siteContent.heroHeadlineSuffix}
        </h1>

        {/* Editorial Subtitle */}
        <p className="text-sm sm:text-base text-gray-200/90 max-w-xl font-normal leading-relaxed drop-shadow">
          {siteContent.heroSubtitle}
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Button
            variant="get-started"
            onClick={() => setActiveView('shop')}
            className="flex items-center gap-2 shadow-2xl hover:scale-105 active:scale-95 transition-transform"
          >
            <span>Shop Now</span>
            <ArrowRight className="w-5 h-5 text-[#111113]" />
          </Button>

          <Button
            variant="outline"
            onClick={() => setActiveView('our-story')}
            className="bg-black/35 backdrop-blur-md text-white border-white/30 hover:bg-white/20 hover:border-white/50 transition-colors shadow-lg"
          >
            <span>Our Story</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
