/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { ArrowRight, Sparkles, User, Calendar, Users, Heart, SunMedium, Compass } from 'lucide-react';
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
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=85',
    icon: User,
    tag: 'SIGNATURE EXPRESSION',
  },
  {
    id: 'milestones',
    title: 'The Milestones',
    subtitle: 'Occasions That Become Part of History',
    description:
      'Considered designs for birthdays, graduations, weddings, celebrations and the defining occasions that deserve to be marked in style.',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=85',
    icon: Calendar,
    tag: 'CELEBRATIONS & GALA',
  },
  {
    id: 'generations',
    title: 'The Generations (Kids & Youth)',
    subtitle: 'Childhood, Youth & Mini Royalty',
    description:
      'Heirloom Kente mini-robes, bespoke embroidered agbadas, festive party dresses, and organic cotton tailoring for children and youth.',
    image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=1200&q=85',
    icon: Users,
    tag: 'KIDS & MINI ROYALTY',
  },
  {
    id: 'connections',
    title: 'The Connections',
    subtitle: 'Family, Friendship, Love & Belonging',
    description:
      'Thoughtful expressions of family, friendship, love and belonging, brought together through complementary designs and meaningful details.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85',
    icon: Heart,
    tag: 'HARMONIOUS BONDS',
  },
  {
    id: 'everyday',
    title: 'The Everyday',
    subtitle: 'Elevated Essentials for Real Life',
    description:
      'Elevated essentials that bring ease, confidence and considered style to the moments that make up real life.',
    image: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1200&q=85',
    icon: SunMedium,
    tag: 'CONSIDERED LUXURY',
  },
];

export default function CollectionsView() {
  const { products, setActiveView, setQuickViewProduct, navigateToCategory } = useStore();

  return (
    <div className="bg-[#F8FAF8] min-h-screen pt-8 sm:pt-14 pb-32 px-4 sm:px-8 lg:px-12 space-y-12 sm:space-y-16 max-w-6xl mx-auto text-[#111113]">
      {/* ── Collection Header ── */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-[#1E3A2E] px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase">
          <Sparkles className="w-3.5 h-3.5 text-[#1E3A2E]" />
          <span>OUR COLLECTIONS · T.I.M.E FITS</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0F1F17] font-serif">
          Every Collection Has a Story
        </h1>
        <p className="text-xs sm:text-base text-gray-700 font-normal leading-relaxed max-w-2xl mx-auto">
          At T.I.M.E fits, a collection is never just a lineup of garments. It is a point of view, a feeling and a story brought to life through fabric, form and detail.
        </p>
      </div>

      {/* ── Debut Signature Highlight: MAY 3 (KUKUA_TRACEY) COLLECTION ── */}
      <div className="bg-[#0F1F17] text-white rounded-[28px] overflow-hidden shadow-2xl border border-emerald-900/40">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-5 aspect-[4/5] sm:aspect-square lg:aspect-auto h-full relative">
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85"
              alt="MAY 3 COLLECTION BY T.I.M.E fits"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F1F17] via-transparent to-transparent lg:hidden" />
          </div>

          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#1E3A2E] border border-[#C7CBB8]/40 text-[#C7CBB8] px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
              DEBUT SIGNATURE COLLECTION
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white leading-tight">
              MAY 3 (KUKUA_TRACEY) COLLECTION
            </h2>
            <p className="text-xs sm:text-sm text-emerald-300 font-medium">
              By T.I.M.E fits · Tailored Perfection, Timeless Style
            </p>
            <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
              Designed for every chapter of womanhood: teenage girls finding their voice, single ladies walking in bold confidence, ambitious working-class professionals, married women, and beloved African mothers.
            </p>

            {/* Occasion Spectrum */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
              {[
                'Corporate & Boardroom',
                'Sunday Ankara Prints',
                'Romantic Dinner Dates',
                'Baecations with Habibi',
                'Milestone Anniversaries',
                'Weekend Celebrations',
              ].map((occ, idx) => (
                <div
                  key={idx}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-2.5 border border-white/10 text-center"
                >
                  <span className="text-[10px] sm:text-xs text-emerald-200 font-medium block">
                    {occ}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-xs sm:text-sm text-gray-200 italic font-serif border-l-2 border-[#C7CBB8] pl-3 py-1">
              &ldquo;Tell us about your occasion and T.I.M.E fits gets you covered.&rdquo;
            </p>

            <div className="pt-2 flex flex-wrap gap-2.5">
              <Button
                variant="get-started"
                onClick={() => {
                  setActiveView('shop');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="h-10 px-5 rounded-full text-xs"
              >
                <span>Shop the Collection</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
              <button
                onClick={() => {
                  setActiveView('bespoke');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="h-10 px-4 rounded-full bg-white/10 text-white border border-white/20 hover:bg-white/20 text-xs font-semibold transition-all shadow cursor-pointer"
              >
                Custom Occasion Order
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Brand Philosophy Banner ── */}
      <div className="bg-[#0F1F17] text-white rounded-[24px] p-6 sm:p-8 shadow-xl border border-emerald-900/40">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          <div className="md:col-span-8 space-y-2">
            <span className="text-[10px] font-bold tracking-widest text-[#C7CBB8] uppercase">
              DESIGN WITH DISCIPLINE & IMAGINATION
            </span>
            <h2 className="text-lg sm:text-2xl font-serif font-bold text-white leading-snug">
              &ldquo;We do not create to fill a trend cycle. We create to give form to a clear idea.&rdquo;
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
              Every textile, silhouette, proportion and finishing touch is selected to create something distinctive, meaningful and beautifully resolved. Because every collection deserves a story, and every story deserves to be remembered.
            </p>
          </div>
          <div className="md:col-span-4 flex md:justify-end">
            <div>
              <span className="text-xs font-mono text-emerald-300 block font-semibold">Kukua-Tracey</span>
              <span className="text-[11px] text-gray-400">Founder & Creative Director</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 5 Core Collection Pillars ── */}
      <div className="space-y-10 sm:space-y-12">
        <div className="text-center space-y-2">
          <span className="text-[11px] font-bold tracking-[0.2em] text-[#1E3A2E] uppercase">
            WHAT WE ARE INSPIRED BY
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#0F1F17]">
            The Five Chapters of Design
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {COLLECTION_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                className="bg-white rounded-[24px] overflow-hidden border border-emerald-900/10 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div className="aspect-[4/5] overflow-hidden bg-gray-100 relative">
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="bg-black/60 backdrop-blur-md text-[#C7CBB8] text-[9px] font-bold tracking-widest px-2.5 py-1 rounded-full uppercase border border-white/20">
                      {pillar.tag}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="flex items-center gap-2 mb-0.5">
                      <div className="w-6 h-6 rounded-full bg-[#1E3A2E] flex items-center justify-center text-white">
                        <Icon className="w-3 h-3" />
                      </div>
                      <h3 className="text-lg font-bold font-serif">{pillar.title}</h3>
                    </div>
                    <p className="text-[11px] text-gray-200 font-light">{pillar.subtitle}</p>
                  </div>
                </div>

                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-light">
                    {pillar.description}
                  </p>
                  <button
                    onClick={() => {
                      if (pillar.id === 'generations') {
                        navigateToCategory('cat-kids');
                      } else {
                        setActiveView('shop');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className="w-full h-9 rounded-full bg-emerald-50 text-[#1E3A2E] hover:bg-[#1E3A2E] hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-emerald-200"
                  >
                    <span>View {pillar.id === 'generations' ? 'Kids & Youth Pieces' : 'Garments'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Flagship Narrative: Threads of a Lifetime ── */}
      <div className="bg-white rounded-[24px] p-6 sm:p-10 border border-emerald-900/10 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-[#1E3A2E] px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase">
              <Compass className="w-3 h-3 text-[#1E3A2E]" />
              <span>FLAGSHIP NARRATIVE</span>
            </div>
            <h3 className="text-xl sm:text-3xl font-serif font-bold text-[#0F1F17]">
              Threads of a Lifetime
            </h3>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-light">
              The journey of growing up, discovering oneself, creating memories. Clothing designed to accompany every chapter—from quiet mornings of self-expression to momentous celebrations where family history is made.
            </p>
          </div>
          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            <button
              onClick={() => {
                setActiveView('our-story');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="h-10 px-5 rounded-full bg-[#1E3A2E] text-white text-xs font-bold hover:bg-[#3E5A3F] transition-colors shadow flex items-center gap-2"
            >
              <span>Read The Story</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Studio Lookbook Gallery ── */}
      <div className="space-y-5 pt-6 border-t border-emerald-900/10">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#1E3A2E] uppercase">
              STUDIO ATELIER SELECTIONS
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#0F1F17]">
              Pieces in Rotation
            </h3>
          </div>
          <button
            onClick={() => setActiveView('shop')}
            className="text-xs font-bold text-[#1E3A2E] hover:underline"
          >
            See all pieces ({products.length}) →
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {products.slice(0, 4).map((product) => (
            <div
              key={product.id}
              onClick={() => setQuickViewProduct(product)}
              className="bg-white rounded-[20px] p-2.5 sm:p-3 border border-emerald-900/10 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="aspect-[3/4] rounded-[16px] overflow-hidden bg-gray-100 mb-2">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <h4 className="font-semibold text-xs text-[#0F1F17] truncate">
                {product.name}
              </h4>
              <p className="text-xs font-bold text-[#1E3A2E] mt-0.5">
                GH₵ {product.priceGhc.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Shoppable End Callout ── */}
      <div className="bg-[#0F1F17] text-white rounded-[24px] p-6 sm:p-10 text-center space-y-3 shadow-xl">
        <span className="text-[10px] font-bold tracking-widest text-[#C7CBB8] uppercase">
          NOT JUST FOR THE MOMENT · FOR A LIFETIME
        </span>
        <h2 className="text-xl sm:text-3xl font-serif font-bold text-white">
          Begin Your Chapter With T.I.M.E fits
        </h2>
        <p className="text-xs sm:text-sm text-gray-300 font-light max-w-md mx-auto leading-relaxed">
          Explore ready-to-wear pieces or book an appointment for made-to-measure tailoring.
        </p>
        <div className="flex flex-wrap justify-center gap-2.5 pt-2">
          <Button
            variant="get-started"
            onClick={() => setActiveView('shop')}
            className="h-10 px-5 rounded-full text-xs shadow-lg"
          >
            <span>Browse Ready-to-Wear</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </Button>
          <button
            onClick={() => setActiveView('bespoke')}
            className="h-10 px-5 rounded-full bg-[#1E3A2E] text-white border border-white/20 hover:bg-[#3E5A3F] text-xs font-semibold transition-all shadow cursor-pointer"
          >
            Book Bespoke Fitting
          </button>
        </div>
      </div>
    </div>
  );
}
