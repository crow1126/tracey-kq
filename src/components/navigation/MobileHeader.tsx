'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { Menu, Search, ShoppingBag } from 'lucide-react';
import IconButton from '../ui/IconButton';

export default function MobileHeader() {
  const { setActiveView, setIsBrandMenuOpen, setIsSearchOpen, setIsCartDrawerOpen, cartCount } = useStore();

  return (
    <div className="md:hidden sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#E6E6EA] px-4 h-16 flex items-center justify-between">
      {/* Brand Menu Sheet Trigger */}
      <IconButton
        variant="header"
        onClick={() => setIsBrandMenuOpen(true)}
        aria-label="Open Brand Menu"
      >
        <Menu className="w-5 h-5 text-[#111113]" />
      </IconButton>

      {/* Brand Wordmark Logo */}
      <button
        onClick={() => {
          setActiveView('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="font-sans font-semibold text-[13px] tracking-[0.25em] text-[#111113] uppercase cursor-pointer"
      >
        TRACEY KQ
      </button>

      {/* Header Actions */}
      <div className="flex items-center gap-2">
        <IconButton
          variant="header"
          onClick={() => setIsSearchOpen(true)}
          aria-label="Search"
        >
          <Search className="w-5 h-5 text-[#111113]" />
        </IconButton>

        <IconButton
          variant="home-bag"
          onClick={() => setIsCartDrawerOpen(true)}
          aria-label="Bag"
          className="relative"
        >
          <ShoppingBag className="w-5 h-5 text-white" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#6B73F0] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </IconButton>
      </div>
    </div>
  );
}
