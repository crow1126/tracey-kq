/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { Menu, Search, ShoppingBag } from 'lucide-react';
import IconButton from '../ui/IconButton';

export default function MobileHeader() {
  const { setActiveView, setIsBrandMenuOpen, setIsSearchOpen, cartCount } = useStore();

  return (
    <div className="md:hidden sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#E6E6EA] px-3 h-16 flex items-center justify-between gap-2 shadow-xs">
      {/* Brand Menu Sheet Trigger */}
      <IconButton
        variant="header"
        onClick={() => setIsBrandMenuOpen(true)}
        aria-label="Open Brand Menu"
      >
        <Menu className="w-5 h-5 text-[#0F5132]" />
      </IconButton>

      {/* Brand Wordmark & Logo */}
      <button
        onClick={() => {
          setActiveView('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="flex items-center gap-2 cursor-pointer outline-none flex-1 justify-center min-w-0"
      >
        <img
          src="/brand/logo.jpg"
          alt="T.I.M.E fits"
          className="h-8.5 w-auto object-contain rounded"
        />
        <div className="flex flex-col text-left">
          <span className="font-serif font-bold text-[13px] tracking-[0.16em] text-[#0F5132] uppercase leading-tight whitespace-nowrap">
            T.I.M.E fits
          </span>
          <span className="text-[8px] text-gray-500 font-normal italic tracking-wider whitespace-nowrap">
            Tailored Perfection
          </span>
        </div>
      </button>

      {/* Header Actions */}
      <div className="flex items-center gap-1 flex-shrink-0">
        <IconButton
          variant="header"
          onClick={() => setIsSearchOpen(true)}
          aria-label="Search"
        >
          <Search className="w-5 h-5 text-[#111113]" />
        </IconButton>

        <button
          onClick={() => {
            setActiveView('bag');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          aria-label="Shopping Bag"
          className="relative w-9 h-9 rounded-full bg-[#0F5132] text-white flex items-center justify-center hover:bg-[#0A3D24] active:scale-95 transition-all shadow-sm"
        >
          <ShoppingBag className="w-4 h-4 text-white" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#22C55E] text-[#133D27] text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
