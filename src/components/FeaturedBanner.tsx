'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { ChevronRight, Sparkles, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

export default function FeaturedBanner() {
  const { setActiveTab, setIsBespokeModalOpen } = useStore();

  return (
    <section className="bg-[#122410] py-16 px-4 sm:px-6 lg:px-8 border-b border-[#2A4E1F]">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Promotional Banner (Reference Image 3 style) */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#1E3D1A] via-[#2A4E1F] to-[#1E3D1A] border border-[#2A4E1F] p-8 sm:p-12 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
            <div className="md:col-span-7 space-y-4">
              <span className="inline-flex items-center gap-2 bg-[#122410]/80 text-[#C8E96B] px-3.5 py-1 rounded-full text-xs font-bold tracking-widest uppercase border border-[#2A4E1F]">
                <Sparkles className="w-3.5 h-3.5" />
                WEEKEND SALE
              </span>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black text-white tracking-tight leading-none">
                50% OFF
              </h2>

              <p className="text-gray-200 text-sm sm:text-base font-light max-w-md">
                On selected premium ready-to-wear and bespoke couture items. Crafted from ethical mulberry silk and hand-loomed fibers.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => setActiveTab('boutique')}
                  className="inline-flex items-center gap-2 bg-white hover:bg-[#F4F1EA] text-[#1E3D1A] px-7 py-3.5 rounded-full font-bold text-sm tracking-wider uppercase transition-all shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span>Shop Now</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="md:col-span-5 flex justify-center md:justify-end">
              <div className="relative w-64 h-72 rounded-2xl overflow-hidden shadow-2xl border border-white/20 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80"
                  alt="Weekend sale model"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Editorial Spotlight (Reference Image 4 style) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-[#1E3D1A] rounded-3xl p-8 sm:p-14 border border-[#2A4E1F]">
          <div className="lg:col-span-5 relative">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-[#2A4E1F]">
              <img
                src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=85"
                alt="Editorial look"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-[#2A4E1F] text-white p-3 rounded-2xl border border-[#C8E96B]/30 shadow-xl hidden sm:block">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C8E96B] block">
                Accra Atelier
              </span>
              <span className="text-xs font-serif font-bold">
                100% Hand-Tailored
              </span>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="inline-block bg-[#122410] px-3.5 py-1 rounded-full text-xs font-bold tracking-widest text-[#C8E96B] uppercase border border-[#2A4E1F]">
              Trend Hub
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-white tracking-tight leading-tight">
              TRACEY KQ <br className="hidden sm:inline" />
              Fashion World
            </h2>

            <p className="text-gray-300 text-base sm:text-lg font-light leading-relaxed max-w-xl">
              Explore bold outfits, redefine yourself, and create timeless memories with fashion. Every creation balances quiet luxury with ancestral Ghanaian regalia.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setIsBespokeModalOpen(true)}
                className="inline-flex items-center gap-2 bg-[#2A4E1F] hover:bg-[#346227] text-white border border-[#C8E96B]/40 px-8 py-4 rounded-full font-bold text-sm tracking-wider uppercase transition-all shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Get Started</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveTab('lookbook')}
                className="text-xs font-bold text-gray-300 hover:text-white uppercase tracking-widest px-4 py-2 hover:underline"
              >
                Explore Lookbook →
              </button>
            </div>
          </div>
        </div>

        {/* Guarantees Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="flex items-center gap-4 p-5 rounded-2xl bg-[#183015] border border-[#2A4E1F]/60">
            <div className="w-12 h-12 rounded-xl bg-[#2A4E1F] text-[#C8E96B] flex items-center justify-center flex-shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-white">Worldwide Delivery</h4>
              <p className="text-xs text-gray-400 font-light mt-0.5">DHL Express straight to your doorstep.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 rounded-2xl bg-[#183015] border border-[#2A4E1F]/60">
            <div className="w-12 h-12 rounded-xl bg-[#2A4E1F] text-[#C8E96B] flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-white">Made to Measure</h4>
              <p className="text-xs text-gray-400 font-light mt-0.5">Complimentary atelier fitting adjustments.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 rounded-2xl bg-[#183015] border border-[#2A4E1F]/60">
            <div className="w-12 h-12 rounded-xl bg-[#2A4E1F] text-[#C8E96B] flex items-center justify-center flex-shrink-0">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-white">Ethical Craftsmanship</h4>
              <p className="text-xs text-gray-400 font-light mt-0.5">Fair artisan wages and sustainable dyes.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
