'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '@/context/StoreContext';
import { ArrowRight, Play, Pause, ChevronLeft, ChevronRight, Sparkles, X, Eye } from 'lucide-react';
import Button from './Button';

interface CampaignLook {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  image: string;
  productId: string;
  productName: string;
  hotspot: { x: number; y: number }; // percentage from left / top
}

export default function HeroMotionSection() {
  const { siteContent, setActiveView, setQuickViewProduct, products } = useStore();

  // Campaign runway slides (Look 0 dynamically inherits from admin siteContent.heroImageUrl)
  const looks: CampaignLook[] = [
    {
      id: 'look-1',
      title: 'Look 01 · Grand Gala Couture',
      subtitle: 'Hand-pleated royal silk with detachable 3-metre dramatic sweep train.',
      badge: siteContent.heroCampaignBadge || 'ACCRA HAUTE COUTURE 2026',
      image: siteContent.heroImageUrl || 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1800&q=85',
      productId: 'prod-1',
      productName: 'The Ashanti Silk Cape Gown',
      hotspot: { x: 74, y: 44 },
    },
    {
      id: 'look-2',
      title: 'Look 02 · Modern Regal Atelier',
      subtitle: 'Sculptural silhouette blending Bonwire heritage weave with minimalist drape.',
      badge: 'RUNWAY SS26 · BONWIRE ATELIER',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1800&q=85',
      productId: 'prod-3',
      productName: 'Bonwire Kente Corset Blazer',
      hotspot: { x: 70, y: 50 },
    },
    {
      id: 'look-3',
      title: 'Look 03 · Volta Column Gala',
      subtitle: 'Deep jewel-tone evening crepe engineered with dramatic architectural high slit.',
      badge: 'LIMITED EDITION · ARCHITECTURAL DRAPE',
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1800&q=85',
      productId: 'prod-2',
      productName: 'Volta High-Slit Column Gown',
      hotspot: { x: 64, y: 38 },
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showHotspotModal, setShowHotspotModal] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const SLIDE_DURATION = 7500; // 7.5 seconds per slide
  const activeLook = looks[currentSlide];
  const linkedProduct = products.find((p) => p.id === activeLook.productId) || products[0];

  // Auto-play slideshow timer with progress bar
  useEffect(() => {
    if (!isPlaying) return;

    const intervalTime = 50; // update progress every 50ms
    const step = (intervalTime / SLIDE_DURATION) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlide((curr) => (curr + 1) % looks.length);
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPlaying, currentSlide, looks.length]);

  // Subtle interactive 3D parallax on mouse move (desktop only)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x: x * 16, y: y * 16 });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setProgress(0);
    setShowHotspotModal(false);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? looks.length - 1 : prev - 1));
    setProgress(0);
    setShowHotspotModal(false);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % looks.length);
    setProgress(0);
    setShowHotspotModal(false);
  };

  const openProductStory = () => {
    if (linkedProduct) {
      setQuickViewProduct(linkedProduct);
    }
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[620px] sm:min-h-[700px] lg:min-h-[760px] bg-[#111113] text-white flex items-center overflow-hidden select-none"
    >
      {/* 1. Cinematic Animated Background Visuals with Ken Burns Motion & Parallax */}
      <div
        className="absolute inset-0 z-0 transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0) scale(1.02)`,
        }}
      >
        {looks.map((look, index) => {
          const isActive = index === currentSlide;
          const isEven = index % 2 === 0;

          return (
            <div
              key={look.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={look.image}
                alt={look.title}
                className={`w-full h-full object-cover object-top filter brightness-[0.75] contrast-105 ${
                  isActive ? (isEven ? 'animate-kenburns' : 'animate-kenburns-alt') : ''
                }`}
              />
            </div>
          );
        })}

        {/* Studio Lighting Ambient Glow (Runway Lights Drifting) */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-[#6B73F0]/25 blur-[120px] pointer-events-none animate-ambient-glow" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] rounded-full bg-[#FF2D8A]/15 blur-[140px] pointer-events-none animate-ambient-glow delay-1000" />

        {/* Diagonal Runway Light Reflector Sweep */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="w-[200%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -rotate-12 translate-x-[-100%] animate-light-sweep" />
        </div>

        {/* Editorial Gradients (Text contrast protection + cinematic luxury finish) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111113] via-transparent to-black/30 z-10" />
      </div>

      {/* 2. Interactive Shoppable Hotspot Dot on the Model */}
      <div
        className="absolute z-20 hidden sm:block transition-all duration-700 pointer-events-auto"
        style={{
          left: `${activeLook.hotspot.x}%`,
          top: `${activeLook.hotspot.y}%`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <button
          onClick={() => setShowHotspotModal(!showHotspotModal)}
          aria-label="View Garment Details"
          className="relative group p-2 cursor-pointer focus:outline-none"
        >
          {/* Pulsing ring aura */}
          <span className="absolute inset-2 rounded-full bg-[#6B73F0]/60 animate-ping" />
          <span className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white text-[#111113] shadow-2xl animate-hotspot border border-white/80 group-hover:scale-110 transition-transform">
            <Sparkles className="w-4 h-4 text-[#6B73F0]" />
          </span>

          {/* Floating label pill */}
          <span className="absolute left-10 top-1/2 -translate-y-1/2 bg-black/75 backdrop-blur-md text-white text-[10px] tracking-widest uppercase font-semibold px-2.5 py-1 rounded-full border border-white/20 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
            Explore Garment
          </span>
        </button>

        {/* Floating Mini Hotspot Product Card */}
        {showHotspotModal && (
          <div className="absolute left-10 top-0 w-64 p-4 rounded-[20px] bg-black/85 backdrop-blur-xl border border-white/20 shadow-2xl space-y-2.5 animate-in fade-in zoom-in-95 duration-200 z-30">
            <div className="flex items-center justify-between">
              <span className="text-[10px] tracking-widest font-semibold uppercase text-[#6B73F0]">
                {activeLook.badge}
              </span>
              <button
                onClick={() => setShowHotspotModal(false)}
                className="text-white/60 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <h4 className="text-sm font-semibold text-white leading-tight">
              {activeLook.productName}
            </h4>
            <p className="text-[11px] text-white/70 font-light leading-relaxed">
              {activeLook.subtitle}
            </p>
            <div className="pt-1">
              <button
                onClick={openProductStory}
                className="w-full py-2 px-3 rounded-full bg-white text-[#111113] hover:bg-gray-100 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-md"
              >
                <Eye className="w-3.5 h-3.5 text-[#6B73F0]" />
                <span>Read Story & View Price</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 3. Editorial Hero Content & Typography */}
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

        {/* Editorial Subtitle with Active Look Nuance */}
        <p className="text-sm sm:text-base text-gray-200/90 max-w-xl font-normal leading-relaxed drop-shadow">
          {siteContent.heroSubtitle}
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Button
            variant="get-started"
            onClick={() => setActiveView('shop')}
            className="flex items-center gap-2 shadow-2xl hover:scale-105 active:scale-95 transition-transform"
          >
            <span>Shop The Runway</span>
            <ArrowRight className="w-5 h-5 text-[#111113]" />
          </Button>

          <Button
            variant="outline"
            onClick={() => setActiveView('our-story')}
            className="bg-black/35 backdrop-blur-md text-white border-white/30 hover:bg-white/20 hover:border-white/50 transition-colors shadow-lg"
          >
            <span>Our Heritage & Craft</span>
          </Button>
        </div>

        {/* Active Look Label on Mobile */}
        <div className="sm:hidden pt-2 flex items-center gap-2 text-xs text-white/70">
          <span className="w-1.5 h-1.5 rounded-full bg-[#6B73F0]" />
          <span className="font-medium text-white">{activeLook.title}</span>
          <button
            onClick={openProductStory}
            className="text-[#6B73F0] underline ml-1 font-semibold"
          >
            Details
          </button>
        </div>
      </div>

      {/* 4. Luxury Runway Slide Controller (Bottom Right) */}
      <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-20 flex flex-col items-end gap-3 pointer-events-auto">
        {/* Look Selector Pills */}
        <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md p-1.5 rounded-full border border-white/15 shadow-xl">
          {looks.map((look, i) => (
            <button
              key={look.id}
              onClick={() => goToSlide(i)}
              className={`px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider transition-all duration-300 ${
                i === currentSlide
                  ? 'bg-white text-[#111113] shadow-md scale-105'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              {look.title.split(' · ')[0]}
            </button>
          ))}
        </div>

        {/* Progress Bar & Arrow Controls */}
        <div className="flex items-center gap-3 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/15 shadow-2xl">
          {/* Index Counter */}
          <span className="text-[11px] font-medium tracking-widest text-white/90">
            0{currentSlide + 1} <span className="text-white/40">/ 0{looks.length}</span>
          </span>

          {/* Animated Progress Bar */}
          <div className="w-16 h-1 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#6B73F0] transition-all duration-75 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Play/Pause Button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? 'Pause runway slideshow' : 'Play runway slideshow'}
            className="w-6 h-6 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 fill-current ml-0.5" />}
          </button>

          <div className="w-px h-3 bg-white/20" />

          {/* Prev / Next Arrows */}
          <div className="flex items-center gap-1">
            <button
              onClick={handlePrev}
              aria-label="Previous look"
              className="w-6 h-6 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next look"
              className="w-6 h-6 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
