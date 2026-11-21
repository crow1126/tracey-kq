/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function HeroMotionSection() {
  const { siteContent, setActiveView } = useStore();

  const heroImage =
    siteContent.heroImageUrl || '/brand/photo_1_2026-11-21_13-00-31.jpg';

  const badge = siteContent.heroCampaignBadge || 'T.I.M.E FITS · TAILORED PERFECTION';
  const headlinePrefix = siteContent.heroHeadlinePrefix || 'Welcome to ';
  const headlineAccent = siteContent.heroHeadlineAccent || 'T.I.M.E fits';
  const headlineSuffix = siteContent.heroHeadlineSuffix || ' — Timeless Style.';
  const subtitle =
    siteContent.heroSubtitle ||
    'Fashion is never just fabric and form. It is identity in motion, confidence made visible, connection you can feel—and sometimes, the memory we carry long after the moment has passed. Not just for the moment. For a lifetime.';
  const primaryCta = siteContent.heroPrimaryCta || 'Explore Collections';
  const secondaryCta = siteContent.heroSecondaryCta || 'Our Story';
  const primaryView = siteContent.heroPrimaryView || 'collections';
  const secondaryView = siteContent.heroSecondaryView || 'our-story';

  return (
    <section className="relative min-h-[480px] sm:min-h-[580px] lg:min-h-[660px] bg-[#0B1910] text-white flex items-center overflow-hidden select-none">
      {/* ── Single High-Resolution Hero Photograph (No Slideshow) ── */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="T.I.M.E fits by Kukua-Tracey"
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover object-center sm:object-center"
        />
        {/* Luxury Emerald & Black Scrim Overlays for maximum legibility */}
        <div className="absolute inset-0 bg-[#0B1910]/55 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1910]/90 via-[#0B1910]/50 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1910] via-transparent to-black/30 z-10 pointer-events-none" />

        {/* Ambient emerald brand illumination */}
        <div className="absolute top-1/4 -left-20 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-[#0F5132]/35 blur-[100px] pointer-events-none z-10" />
        <div className="absolute bottom-10 right-10 w-80 sm:w-[450px] h-80 sm:h-[450px] rounded-full bg-[#166534]/25 blur-[120px] pointer-events-none z-10" />
      </div>

      {/* ── Hero Editorial Content (Compact, refined mobile typography) ── */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full relative z-20 py-10 sm:py-16 lg:py-20">
        <div className="max-w-3xl space-y-3.5 sm:space-y-5">
          {/* Brand badge with subtle emerald beacon */}
          <div className="inline-flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#166534]/50 text-[10px] sm:text-xs font-semibold text-white shadow-lg">
            <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-ping" />
            <span className="tracking-widest uppercase font-medium text-emerald-200">
              {badge}
            </span>
          </div>

          {/* Slogan pill */}
          <div className="inline-flex items-center gap-1.5 bg-[#0F5132]/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-[10px] sm:text-xs font-medium text-white shadow-sm ml-2">
            <Sparkles className="w-3 h-3 text-[#22C55E]" />
            <span>Tailored Perfection, Timeless Style.</span>
          </div>

          {/* Primary Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12] sm:leading-[1.08] font-display drop-shadow-md">
            {headlinePrefix}
            <span className="text-[#4ADE80] drop-shadow-sm font-extrabold">{headlineAccent}</span>
            {headlineSuffix}
          </h1>

          {/* Philosophy / Narrative Subtitle */}
          <p className="text-xs sm:text-base text-gray-200/95 max-w-2xl font-normal leading-relaxed drop-shadow line-clamp-3 sm:line-clamp-none">
            {subtitle}
          </p>

          {/* Guiding Quote */}
          <p className="text-[11px] sm:text-xs italic text-emerald-200/90 font-light border-l-2 border-[#22C55E] pl-3 py-0.5">
            &ldquo;We don’t design for seasons; we design for lifetimes.&rdquo;
          </p>

          {/* Compact CTA Row */}
          <div className="flex flex-row items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                setActiveView(primaryView as never);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="h-11 px-6 rounded-full bg-white text-[#0B1910] text-xs sm:text-sm font-bold hover:bg-emerald-50 active:scale-95 transition-all shadow-xl flex items-center gap-2 cursor-pointer"
            >
              <span>{primaryCta}</span>
              <ArrowRight className="w-4 h-4 text-[#0B1910]" />
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveView(secondaryView as never);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="h-11 px-5 rounded-full bg-[#0F5132]/60 backdrop-blur-md text-white border border-white/30 hover:bg-[#0F5132] hover:border-white/60 active:scale-95 transition-all shadow-lg text-xs sm:text-sm font-semibold flex items-center justify-center cursor-pointer"
            >
              <span>{secondaryCta}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
