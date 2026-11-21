/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { ArrowRight } from 'lucide-react';

export default function HeroMotionSection() {
  const { siteContent, setActiveView } = useStore();

  const heroImage =
    siteContent.heroImageUrl && !siteContent.heroImageUrl.includes('photo_1')
      ? siteContent.heroImageUrl
      : 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1800&q=85';

  const badge = siteContent.heroCampaignBadge || 'T.I.M.E FITS · TAILORED PERFECTION';
  const headlinePrefix = siteContent.heroHeadlinePrefix || 'Welcome to ';
  const headlineAccent = siteContent.heroHeadlineAccent || 'T.I.M.E fits';
  const headlineSuffix = siteContent.heroHeadlineSuffix || '';
  const subtitle =
    siteContent.heroSubtitle ||
    'Fashion is never just fabric and form. It is identity in motion, confidence made visible, connection you can feel—and sometimes, the memory we carry long after the moment has passed. Welcome to T.I.M.E fits, where meaningful moments become beautifully considered design.';
  const primaryCta = siteContent.heroPrimaryCta || 'Explore Collections';
  const secondaryCta = siteContent.heroSecondaryCta || 'Our Story';
  const primaryView = siteContent.heroPrimaryView || 'collections';
  const secondaryView = siteContent.heroSecondaryView || 'our-story';

  return (
    <section className="relative min-h-[440px] sm:min-h-[540px] lg:min-h-[620px] bg-[#133D27] text-white flex items-center overflow-hidden select-none">
      {/* ── Single High-Resolution Fashion Photograph (No Slideshow) ── */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="T.I.M.E fits Fashion"
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover object-center"
        />
        {/* Directional fades only — photo stays visible */}
        {/* Left-to-right green fade: text side is readable, right side shows photo */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#133D27]/90 via-[#133D27]/50 to-transparent z-10 pointer-events-none" />
        {/* Bottom-up fade: grounds the image with green, photo shows in upper half */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#133D27]/80 via-transparent to-transparent z-10 pointer-events-none" />
        {/* Subtle top darkening for contrast only */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent z-10 pointer-events-none" />
      </div>

      {/* ── Editorial Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full relative z-20 py-8 sm:py-14 lg:py-18">
        <div className="max-w-2xl space-y-3 sm:space-y-4">

          {/* Headline */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.12] font-serif drop-shadow-md">
            {headlinePrefix}
            <span className="text-[#4ADE80] font-extrabold">{headlineAccent}</span>
            {headlineSuffix}
          </h1>

          {/* Central Statement from Document */}
          <p className="text-xs sm:text-sm lg:text-base text-gray-200/95 max-w-xl font-normal leading-relaxed drop-shadow line-clamp-3 sm:line-clamp-none">
            {subtitle}
          </p>

          {/* Philosophy Quote */}
          <p className="text-[10px] sm:text-xs italic text-emerald-200/95 font-light border-l-2 border-[#22C55E] pl-2.5 py-0.5">
            &ldquo;We don’t design for seasons; we design for lifetimes.&rdquo;
          </p>

          {/* Sleek, Reduced Mobile CTA Buttons (Circled in yellow - reduced and proportionate) */}
          <div className="flex flex-row items-center gap-2.5 pt-2">
            <button
              type="button"
              onClick={() => {
                setActiveView(primaryView as never);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="h-9 sm:h-10 px-4 sm:px-5 rounded-full bg-white text-[#133D27] text-[11px] sm:text-xs font-bold hover:bg-emerald-50 active:scale-95 transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <span>{primaryCta}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#133D27]" />
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveView(secondaryView as never);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="h-9 sm:h-10 px-3.5 sm:px-4 rounded-full bg-[#16A34A]/80 backdrop-blur-md text-white border border-white/30 hover:bg-[#16A34A] hover:border-white/50 active:scale-95 transition-all shadow-sm text-[11px] sm:text-xs font-semibold flex items-center justify-center cursor-pointer"
            >
              <span>{secondaryCta}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
