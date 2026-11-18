'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { ArrowRight, Sparkles, Scissors, Leaf, Heart, Globe, Award } from 'lucide-react';
import Button from '../ui/Button';

export default function OurStoryView() {
  const { setActiveView } = useStore();

  return (
    <div className="bg-[#F5F5F7] min-h-screen py-12 px-5 sm:px-8 lg:px-12 space-y-16 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="text-[11px] font-medium tracking-[0.2em] text-[#6B73F0] uppercase">
          WHO WE ARE · MADE IN GHANA
        </span>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#111113] font-display">
          Ancestral Regalia Reimagined for the Modern Cosmopolitan
        </h1>
        <p className="text-sm sm:text-base text-[#3A3A3F] font-normal leading-relaxed">
          Founded in Accra by designer Tracey Kuukua Quansah, the maison bridges ancestral West African textile philosophies with sharp, architectural tailoring.
        </p>
      </div>

      {/* Founder Editorial Portrait Card */}
      <div className="relative rounded-[28px] overflow-hidden bg-[#111113] text-white shadow-lg-nav">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-6 aspect-[4/5] sm:aspect-square lg:aspect-auto h-full">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85"
              alt="Tracey Kuukua Quansah, Founder & Creative Director"
              className="w-full h-full object-cover object-top"
            />
          </div>

          <div className="lg:col-span-6 p-8 sm:p-12 space-y-6">
            <span className="text-[10px] font-bold tracking-widest uppercase text-[#C8E96B] bg-white/10 px-3 py-1 rounded-full">
              CREATIVE DIRECTOR
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-white">
              &ldquo;Fashion is an archive of living African history.&rdquo;
            </h2>
            <p className="text-xs sm:text-sm text-[#A1A1A8] font-light leading-relaxed">
              Tracey Kuukua Quansah established her eponymous maison to counter fleeting Western fast-fashion trends. By honoring the sacred geometric proportions of Bonwire Kente and incorporating natural vegetable dye methods, each garment becomes an enduring heirloom.
            </p>
            <div className="pt-2 text-xs font-mono text-gray-300">
              — Tracey Kuukua Quansah, Founder
            </div>
          </div>
        </div>
      </div>

      {/* 4 Pillars of Craftsmanship */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <span className="text-[11px] font-medium tracking-[0.2em] text-[#8A8A8F] uppercase">
            OUR COMMITMENTS
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#111113] font-display">
            The Foundations of Our Craft
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white p-8 rounded-[24px] border border-[#E6E6EA] shadow-sm-card space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#ECEDFD] text-[#6B73F0] flex items-center justify-center">
              <Scissors className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-[#111113]">Zero-Waste Patternmaking</h3>
            <p className="text-xs sm:text-sm text-[#3A3A3F] font-light leading-relaxed">
              Our pattern drafts conform to natural fabric selvages, cutting textile waste to under 3% while creating unexpected sculptural drapes that celebrate body movement.
            </p>
          </div>

          <div className="bg-white p-8 rounded-[24px] border border-[#E6E6EA] shadow-sm-card space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#ECEDFD] text-[#6B73F0] flex items-center justify-center">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-[#111113]">Natural Fibres & Pigments</h3>
            <p className="text-xs sm:text-sm text-[#3A3A3F] font-light leading-relaxed">
              We exclusively use West African GOTS-certified organic cotton, unbleached linen, and mulberry silk dyed with indigenous Badie bark, indigo leaf, and marigold infusions.
            </p>
          </div>

          <div className="bg-white p-8 rounded-[24px] border border-[#E6E6EA] shadow-sm-card space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#ECEDFD] text-[#6B73F0] flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-[#111113]">Artisan Sovereignty</h3>
            <p className="text-xs sm:text-sm text-[#3A3A3F] font-light leading-relaxed">
              We partner directly with master weavers in Bonwire, glass beads crafts in Krobo, and brass casters in Kumasi, paying 3.5x living wage standards and funding apprenticeships.
            </p>
          </div>

          <div className="bg-white p-8 rounded-[24px] border border-[#E6E6EA] shadow-sm-card space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#ECEDFD] text-[#6B73F0] flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-[#111113]">Accredited Bespoke Tailoring</h3>
            <p className="text-xs sm:text-sm text-[#3A3A3F] font-light leading-relaxed">
              Over 24 distinct measurements taken for each made-to-measure commission. Each garment includes complimentary lifetime fit adjustments at any of our four showrooms.
            </p>
          </div>
        </div>
      </div>

      {/* Shoppable CTA at the end of the page (Specification: Every brand page ends with a shoppable CTA) */}
      <div className="bg-[#111113] text-white rounded-[24px] p-8 sm:p-12 text-center space-y-6">
        <span className="text-[11px] font-medium tracking-[0.2em] text-[#C8E96B] uppercase">
          EXPERIENCE THE ARCHIVE
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold font-display text-white">
          Wear the Story. Own the Heritage.
        </h2>
        <p className="text-sm text-[#A1A1A8] max-w-lg mx-auto font-light">
          Browse our ready-to-wear collections or schedule a personal made-to-measure consultation at our Accra atelier.
        </p>
        <div className="flex justify-center gap-4">
          <Button
            variant="get-started"
            onClick={() => setActiveView('shop')}
            className="shadow-xl"
          >
            <span>Shop This Collection</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
