/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { ArrowRight, Sparkles, User, Calendar, Users, Heart, SunMedium } from 'lucide-react';
import Button from '../ui/Button';

interface CollectionPillar {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  icon: React.ElementType;
  tag: string;
}

const COLLECTION_PILLARS: CollectionPillar[] = [
  {
    id: 'individual',
    title: 'The Individual',
    subtitle: 'Distinctive Identity & Unapologetic Confidence',
    description:
      'Distinctive pieces that honour personal identity, sharpen confidence and give every wearer the freedom to be fully themselves.',
    image: '/brand/photo_3_2026-11-21_13-00-31.jpg',
    icon: User,
    tag: 'SIGNATURE EXPRESSION',
  },
  {
    id: 'milestones',
    title: 'The Milestones',
    subtitle: 'Occasions That Become Part of History',
    description:
      'Considered designs for birthdays, graduations, weddings, celebrations and the defining occasions that deserve to be marked in style.',
    image: '/brand/photo_4_2026-11-21_13-00-31.jpg',
    icon: Calendar,
    tag: 'CELEBRATIONS & GALA',
  },
  {
    id: 'generations',
    title: 'The Generations',
    subtitle: 'Childhood, Youth, Adulthood & Beyond',
    description:
      'Clothing that reflects the changing needs, perspectives and expressions of childhood, youth, adulthood and later life.',
    image: '/brand/photo_5_2026-11-21_13-00-31.jpg',
    icon: Users,
    tag: 'ENDURING LEGACY',
  },
  {
    id: 'connections',
    title: 'The Connections',
    subtitle: 'Family, Friendship, Love & Belonging',
    description:
      'Thoughtful expressions of family, friendship, love and belonging, brought together through complementary designs and meaningful details.',
    image: '/brand/photo_6_2026-11-21_13-00-31.jpg',
    icon: Heart,
    tag: 'HARMONIOUS BONDS',
  },
  {
    id: 'everyday',
    title: 'The Everyday',
    subtitle: 'Elevated Essentials for Real Life',
    description:
      'Elevated essentials that bring ease, confidence and considered style to the moments that make up real life.',
    image: '/brand/photo_7_2026-11-21_13-00-31.jpg',
    icon: SunMedium,
    tag: 'CONSIDERED LUXURY',
  },
];

export default function CollectionsView() {
  const { products, setActiveView, setQuickViewProduct } = useStore();

  return (
    <div className="bg-[#F8FAF8] min-h-screen pt-10 sm:pt-14 pb-32 px-5 sm:px-8 lg:px-12 space-y-16 max-w-6xl mx-auto text-[#111113]">
      {/* ── Collection Header ── */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-[#0F5132] px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase">
          <Sparkles className="w-3.5 h-3.5 text-[#16A34A]" />
          <span>OUR COLLECTIONS · T.I.M.E FITS</span>
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0B1910] font-serif">
          Every Collection Has a Story
        </h1>
        <p className="text-sm sm:text-base text-gray-700 font-normal leading-relaxed max-w-2xl mx-auto">
          At T.I.M.E fits, a collection is never just a lineup of garments. It is a point of view, a feeling and a story brought to life through fabric, form and detail.
        </p>
      </div>

      {/* ── Brand Philosophy Banner ── */}
      <div className="bg-[#0B1910] text-white rounded-[28px] p-6 sm:p-10 shadow-xl border border-emerald-900/40">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-3">
            <span className="text-[10px] font-bold tracking-widest text-[#4ADE80] uppercase">
              DESIGN WITH DISCIPLINE & IMAGINATION
            </span>
            <h2 className="text-xl sm:text-3xl font-serif font-bold text-white leading-snug">
              &ldquo;We do not create to fill a trend cycle. We create to give form to a clear idea.&rdquo;
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
              Every textile, silhouette, proportion and finishing touch is selected to create something distinctive, meaningful and beautifully resolved. Because every collection deserves a story, and every story deserves to be remembered.
            </p>
          </div>
          <div className="md:col-span-4 flex justify-end">
            <div className="text-right">
              <span className="text-xs font-mono text-emerald-300 block">Kukua-Tracey</span>
              <span className="text-[11px] text-gray-400">Founder & Creative Director</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 5 Core Collection Pillars ── */}
      <div className="space-y-16">
        <div className="text-center space-y-2">
          <span className="text-[11px] font-bold tracking-[0.2em] text-[#0F5132] uppercase">
            WHAT WE ARE INSPIRED BY
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#0B1910]">
            The Five Chapters of Design
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COLLECTION_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                className="bg-white rounded-[28px] overflow-hidden border border-emerald-900/10 shadow-sm hover:shadow-lg transition-all group flex flex-col justify-between"
              >
                <div className="aspect-[4/5] overflow-hidden bg-gray-100 relative">
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-black/60 backdrop-blur-md text-[#4ADE80] text-[9px] font-bold tracking-widest px-3 py-1 rounded-full uppercase border border-white/20">
                      {pillar.tag}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-7 h-7 rounded-full bg-[#0F5132] flex items-center justify-center text-white">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <h3 className="text-xl font-bold font-serif">{pillar.title}</h3>
                    </div>
                    <p className="text-xs text-gray-200 font-light">{pillar.subtitle}</p>
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-light">
                    {pillar.description}
                  </p>
                  <button
                    onClick={() => {
                      setActiveView('shop');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full h-10 rounded-full bg-emerald-50 text-[#0F5132] hover:bg-[#0F5132] hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer border border-emerald-200"
                  >
                    <span>View Garments</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Studio Lookbook Gallery ── */}
      <div className="space-y-6 pt-8 border-t border-emerald-900/10">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#0F5132] uppercase">
              STUDIO ATELIER SELECTIONS
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B1910]">
              Pieces in Rotation
            </h3>
          </div>
          <button
            onClick={() => setActiveView('shop')}
            className="text-xs font-bold text-[#0F5132] hover:underline"
          >
            See all pieces ({products.length}) →
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {products.slice(0, 4).map((product) => (
            <div
              key={product.id}
              onClick={() => setQuickViewProduct(product)}
              className="bg-white rounded-[24px] p-3 border border-emerald-900/10 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="aspect-[3/4] rounded-[18px] overflow-hidden bg-gray-100 mb-2.5">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <h4 className="font-semibold text-xs text-[#0B1910] truncate">
                {product.name}
              </h4>
              <p className="text-xs font-bold text-[#0F5132] mt-0.5">
                GH₵ {product.priceGhc.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Shoppable End Callout ── */}
      <div className="bg-[#0B1910] text-white rounded-[28px] p-8 sm:p-12 text-center space-y-4 shadow-xl">
        <span className="text-[10px] font-bold tracking-widest text-[#4ADE80] uppercase">
          NOT JUST FOR THE MOMENT · FOR A LIFETIME
        </span>
        <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
          Begin Your Chapter With T.I.M.E fits
        </h2>
        <p className="text-xs sm:text-sm text-gray-300 font-light max-w-md mx-auto leading-relaxed">
          Explore ready-to-wear pieces or book an appointment for made-to-measure tailoring.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Button
            variant="get-started"
            onClick={() => setActiveView('shop')}
            className="h-11 px-6 rounded-full shadow-lg"
          >
            <span>Browse Ready-to-Wear</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <button
            onClick={() => setActiveView('bespoke')}
            className="h-11 px-6 rounded-full bg-[#0F5132] text-white border border-white/20 hover:bg-[#166534] text-xs font-semibold transition-all shadow cursor-pointer"
          >
            Book Bespoke Fitting
          </button>
        </div>
      </div>
    </div>
  );
}
