/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { X, Sparkles, Scissors, MapPin, MessageCircle, ShieldCheck, ChevronRight, Compass, ShoppingBag, Heart } from 'lucide-react';

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
          <div className="p-4 border-b border-[#E6E6EA] flex items-center justify-between bg-emerald-50/50">
            <div className="flex items-center gap-2.5">
              <img
                src="/brand/logo.jpg"
                alt="T.I.M.E fits"
                className="h-9 w-auto object-contain rounded"
              />
              <div>
                <span className="font-serif font-bold text-xs tracking-[0.2em] text-[#16A34A] uppercase block">
                  T.I.M.E fits
                </span>
                <span className="text-[9px] text-gray-500 tracking-wider">
                  Tailored Perfection · Accra
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsBrandMenuOpen(false)}
              className="p-2 rounded-full bg-white text-[#111113] hover:bg-[#EDEDF0] shadow-sm border border-[#E6E6EA]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto p-4 space-y-5">
            <div className="space-y-1">
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#16A34A] uppercase block px-3 py-1">
                Store
              </span>
              <button
                onClick={() => navigateTo('shop')}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[14px] font-medium text-[#111113] hover:bg-emerald-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Compass className="w-4 h-4 text-[#16A34A]" />
                  <span>Browse & Shop Pieces</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>

              <button
                onClick={() => navigateTo('bag')}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[14px] font-medium text-[#111113] hover:bg-emerald-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-4 h-4 text-[#16A34A]" />
                  <span>Shopping Bag</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>

              <button
                onClick={() => navigateTo('saved')}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[14px] font-medium text-[#111113] hover:bg-emerald-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Heart className="w-4 h-4 text-[#16A34A]" />
                  <span>Saved Wishlist</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>

              <button
                onClick={() => navigateTo('explore')}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[14px] font-medium text-[#111113] hover:bg-emerald-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-[#16A34A]" />
                  <span>Editorial Lookbook</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#16A34A] uppercase block px-3 py-1">
                The Maison
              </span>
              <button
                onClick={() => navigateTo('our-story')}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[14px] font-medium text-[#111113] hover:bg-emerald-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Scissors className="w-4 h-4 text-[#16A34A]" />
                  <span>Our Story & Philosophy</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>

              <button
                onClick={() => navigateTo('collections')}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[14px] font-medium text-[#111113] hover:bg-emerald-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-[#16A34A]" />
                  <span>Our Collections</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>

              <button
                onClick={() => navigateTo('bespoke')}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[14px] font-medium text-[#111113] hover:bg-emerald-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Scissors className="w-4 h-4 text-[#16A34A]" />
                  <span>Bespoke Tailoring</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>

              <button
                onClick={() => navigateTo('stores')}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[14px] font-medium text-[#111113] hover:bg-emerald-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-[#16A34A]" />
                  <span>Our Showrooms</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#16A34A] uppercase block px-3 py-1">
                Management
              </span>
              <button
                onClick={() => navigateTo('admin')}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[14px] font-medium bg-emerald-50 text-[#16A34A] hover:bg-emerald-100 transition-colors border border-emerald-200"
              >
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
                  <span>Admin CMS</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#16A34A]" />
              </button>
            </div>
          </div>

          {/* Footer Contact */}
          <div className="p-4 border-t border-[#E6E6EA] bg-[#133D27] text-white space-y-2 rounded-b-none">
            <p className="text-xs text-gray-300">
              Founder & Director: <strong>Kukua-Tracey</strong>
            </p>
            <p className="text-[11px] text-emerald-300 italic">
              &ldquo;We don’t design for seasons; we design for lifetimes.&rdquo;
            </p>
            <a
              href="https://wa.me/233208912340"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-10 rounded-full bg-[#16A34A] text-white text-xs font-semibold flex items-center justify-center gap-2 hover:bg-[#15803D] transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Atelier Concierge</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
