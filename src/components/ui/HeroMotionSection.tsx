/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function HeroMotionSection() {
  const { siteContent, setActiveView } = useStore();

  const heroImage =
    siteContent.heroImageUrl ||
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1800&q=85';

  const headlinePrefix = siteContent.heroHeadlinePrefix || 'Welcome to ';
  const headlineAccent = siteContent.heroHeadlineAccent || 'T.I.M.E fits';
  const headlineSuffix = siteContent.heroHeadlineSuffix || '';
  const subtitle =
    siteContent.heroSubtitle ||
    'Fashion is never just fabric and form. It is identity in motion, confidence made visible, connection you can feel—and sometimes, the memory we carry long after the moment has passed. Welcome to T.I.M.E fits, where meaningful moments become beautifully considered design.';
  const primaryCta = siteContent.heroPrimaryCta || 'Shop Collections';
  const secondaryCta = siteContent.heroSecondaryCta || 'Our Story';
  const primaryView = siteContent.heroPrimaryView || 'shop';
  const secondaryView = siteContent.heroSecondaryView || 'our-story';

  return (
    <section className="relative min-h-[480px] sm:min-h-[560px] lg:min-h-[660px] bg-[#0F1F17] text-white flex items-center overflow-hidden select-none">
      {/* ── Ambient Background Layer (Ensures full desktop immersion without cropping distortions) ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Softly blurred backdrop fill that matches the current or future uploaded photo tones */}
        <img
          src={heroImage}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-top scale-110 blur-3xl opacity-25"
        />
        {/* On mobile: full-bleed image with top-weighted anchor so head/upper silhouette is always framed */}
        <div className="lg:hidden absolute inset-0">
          <img
            src={heroImage}
            alt="T.I.M.E fits Fashion"
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover object-top filter brightness-[0.85]"
          />
        </div>
        {/* Directional fades with deep forest green so typography stays clear and visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F1F17] via-[#0F1F17]/75 lg:via-[#0F1F17]/50 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1F17] via-[#0F1F17]/40 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent z-10" />
      </div>

      {/* ── Editorial Content & High-Couture Desktop Framing ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full relative z-20 py-8 sm:py-12 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Editorial Typography */}
          <div className="lg:col-span-7 space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border border-[#C7CBB8]/40 text-[#C7CBB8]">
              <Sparkles className="w-3 h-3 text-[#C7CBB8]" />
              <span>{siteContent.heroCampaignBadge || 'T.I.M.E FITS · COUTURE ATELIER'}</span>
            </div>

            {/* Headline */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.12] font-serif drop-shadow-md">
              {headlinePrefix}
              <span className="text-[#C7CBB8] font-extrabold">{headlineAccent}</span>
              {headlineSuffix}
            </h1>

            {/* Central Statement from Document */}
            <p className="text-xs sm:text-sm lg:text-base text-gray-200/95 max-w-xl font-normal leading-relaxed drop-shadow line-clamp-3 sm:line-clamp-none">
              {subtitle}
            </p>

            {/* Philosophy Quote */}
            <p className="text-[10px] sm:text-xs italic text-[#E8DCC4] font-light border-l-2 border-[#C7CBB8] pl-2.5 py-0.5">
              &ldquo;We don’t design for seasons; we design for lifetimes.&rdquo;
            </p>

            {/* Sleek CTA Buttons in Sand Beige & Forest Palette */}
            <div className="flex flex-row items-center gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => {
                  setActiveView(primaryView as never);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="h-9 sm:h-10 px-4 sm:px-5 rounded-full bg-[#C7CBB8] text-[#0F1F17] text-[11px] sm:text-xs font-bold hover:bg-[#D5D9C8] active:scale-95 transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <span>{primaryCta}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#0F1F17]" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveView(secondaryView as never);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="h-9 sm:h-10 px-3.5 sm:px-4 rounded-full bg-[#1E3A2E]/85 backdrop-blur-md text-[#C7CBB8] border border-[#6B7F67]/50 hover:bg-[#1E3A2E] hover:border-[#C7CBB8] active:scale-95 transition-all shadow-sm text-[11px] sm:text-xs font-semibold flex items-center justify-center cursor-pointer"
              >
                <span>{secondaryCta}</span>
              </button>
            </div>
          </div>

          {/* Right Column (Desktop): Full Picture Display — Shows Complete Model Head-to-Toe Without Cropping */}
          <div className="hidden lg:flex lg:col-span-5 justify-center lg:justify-end">
            <div className="relative w-full max-w-[420px] h-[540px] xl:h-[600px] rounded-[32px] overflow-hidden shadow-2xl border-2 border-[#C7CBB8]/35 bg-[#1E3A2E]/40 backdrop-blur-md group">
              <img
                src={heroImage}
                alt="T.I.M.E fits Couture Fashion"
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* Subtle luxury edge vignetting */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1F17]/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-black/60 backdrop-blur-md text-[#C7CBB8] text-[9px] font-bold tracking-widest px-3 py-1 rounded-full uppercase border border-white/20">
                  ACCRA ATELIER · SHOWPIECE
                </span>
              </div>
              <div className="absolute bottom-4 inset-x-4 z-10 flex items-center justify-between text-white/90">
                <span className="text-[11px] font-serif italic text-[#C7CBB8]">
                  Handcrafted in Ghana
                </span>
                <span className="text-[10px] tracking-wider text-white/70 uppercase">
                  SS26 Archive
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
