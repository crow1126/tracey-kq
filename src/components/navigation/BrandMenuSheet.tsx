'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { X, Sparkles, Scissors, MapPin, BookOpen, MessageCircle, ShieldCheck, ChevronRight, Compass } from 'lucide-react';

export default function BrandMenuSheet() {
  const { isBrandMenuOpen, setIsBrandMenuOpen, setActiveView } = useStore();

  if (!isBrandMenuOpen) return null;

  const navigateTo = (view: string) => {
    setActiveView(view);
    setIsBrandMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden md:hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsBrandMenuOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-in Menu Sheet */}
      <div className="fixed inset-y-0 left-0 max-w-full flex pr-10">
        <div className="w-screen max-w-xs bg-white text-[#111113] shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 border-b border-[#E6E6EA] flex items-center justify-between">
            <div>
              <span className="font-semibold text-xs tracking-[0.25em] text-[#111113] uppercase block">
                TRACEY KUUKUA QUANSAH
              </span>
              <span className="text-[10px] text-[#8A8A8F] tracking-wider uppercase">
                HAUTE COUTURE · ACCRA
              </span>
            </div>
            <button
              onClick={() => setIsBrandMenuOpen(false)}
              className="p-2 rounded-full bg-[#EDEDF0] text-[#111113] hover:bg-[#E6E6EA]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            <div className="space-y-1">
              <span className="text-[11px] font-semibold tracking-[0.2em] text-[#8A8A8F] uppercase block px-3 py-1">
                Store Layer
              </span>
              <button
                onClick={() => navigateTo('shop')}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[15px] font-medium text-[#111113] hover:bg-[#EDEDF0] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Compass className="w-4 h-4 text-[#6B73F0]" />
                  <span>Shop All Pieces</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#8A8A8F]" />
              </button>

              <button
                onClick={() => navigateTo('explore')}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[15px] font-medium text-[#111113] hover:bg-[#EDEDF0] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-[#FF2D8A]" />
                  <span>Explore & Masonry</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#8A8A8F]" />
              </button>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-semibold tracking-[0.2em] text-[#8A8A8F] uppercase block px-3 py-1">
                Brand Layer
              </span>
              <button
                onClick={() => navigateTo('collections')}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[15px] font-medium text-[#111113] hover:bg-[#EDEDF0] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <BookOpen className="w-4 h-4 text-[#111113]" />
                  <span>Collections & Lookbook</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#8A8A8F]" />
              </button>

              <button
                onClick={() => navigateTo('spotlight')}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[15px] font-medium text-[#111113] hover:bg-[#EDEDF0] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-[#111113]" />
                  <span>Spotlight & Journal</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#8A8A8F]" />
              </button>

              <button
                onClick={() => navigateTo('our-story')}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[15px] font-medium text-[#111113] hover:bg-[#EDEDF0] transition-colors"
              >
                <span>Our Story & Mission</span>
                <ChevronRight className="w-4 h-4 text-[#8A8A8F]" />
              </button>

              <button
                onClick={() => navigateTo('stores')}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[15px] font-medium text-[#111113] hover:bg-[#EDEDF0] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-[#111113]" />
                  <span>Our Stores</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#8A8A8F]" />
              </button>

              <button
                onClick={() => navigateTo('bespoke')}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[15px] font-medium text-[#111113] hover:bg-[#EDEDF0] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Scissors className="w-4 h-4 text-[#6B73F0]" />
                  <span>Custom & Bespoke</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#8A8A8F]" />
              </button>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-semibold tracking-[0.2em] text-[#8A8A8F] uppercase block px-3 py-1">
                Atelier Administration
              </span>
              <button
                onClick={() => navigateTo('admin')}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[15px] font-semibold text-[#111113] bg-[#EDEDF0] hover:bg-[#E6E6EA] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-[#6B73F0]" />
                  <span>Admin Dashboard</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#8A8A8F]" />
              </button>
            </div>

            {/* Quick WhatsApp Concierge Button */}
            <div className="pt-2">
              <a
                href="https://wa.me/233208912340?text=Hello%20Tracey%20KQ%20Concierge%2C%20I%20have%20an%20enquiry%20regarding%20your%20couture%20collection."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-full bg-[#1F8A4C] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Footer of Sheet */}
          <div className="p-5 border-t border-[#E6E6EA] bg-[#F5F5F7] space-y-2">
            <div className="flex items-center justify-between text-xs text-[#8A8A8F]">
              <span>Currency</span>
              <span className="font-semibold text-[#111113] bg-white px-2 py-1 rounded-md border border-[#E6E6EA]">
                GH₵ (Ghana Cedi)
              </span>
            </div>
            <p className="text-[11px] text-[#8A8A8F] text-center pt-2">
              Handcrafted in Accra, Ghana
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
