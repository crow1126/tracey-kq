/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { Menu, Search, ShoppingBag, User } from 'lucide-react';
import IconButton from '../ui/IconButton';

export default function MobileHeader() {
  const { setActiveView, setIsBrandMenuOpen, setIsSearchOpen, cartCount, user, openAuthModal } = useStore();

  return (
    <div className="md:hidden sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#E6E6EA] px-3 h-16 flex items-center justify-between gap-2 shadow-xs">
      {/* Brand Menu Sheet Trigger */}
      <IconButton
        variant="header"
        onClick={() => setIsBrandMenuOpen(true)}
        aria-label="Open Brand Menu"
      >
        <Menu className="w-5 h-5 text-[#1E3A2E]" />
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
          <span className="font-serif font-bold text-[13px] tracking-[0.16em] text-[#1E3A2E] uppercase leading-tight whitespace-nowrap">
            T.I.M.E fits
          </span>
          <span className="text-[8px] text-[#6B7F67] font-normal italic tracking-wider whitespace-nowrap">
            Tailored Perfection
          </span>
        </div>
      </button>

      {/* Header Actions */}
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <IconButton
          variant="header"
          onClick={() => setIsSearchOpen(true)}
          aria-label="Search"
        >
          <Search className="w-5 h-5 text-[#0F1F17]" />
        </IconButton>

        {/* User Account / Auth icon button */}
        <button
          onClick={() => {
            if (user.isLoggedIn) {
              setActiveView('account');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              openAuthModal('login');
            }
          }}
          aria-label="Patron Account"
          className="relative w-9 h-9 rounded-full bg-[#F4F1EA] text-[#1E3A2E] border border-[#C7CBB8]/60 flex items-center justify-center hover:bg-[#EAE6DD] active:scale-95 transition-all cursor-pointer"
        >
          {user.isLoggedIn ? (
            <span className="text-[11px] font-bold text-[#1E3A2E]">
              {user.name.charAt(0)}
            </span>
          ) : (
            <User className="w-4 h-4 text-[#1E3A2E]" />
          )}
          {user.isLoggedIn && (
            <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-[#1F8A4C] ring-1 ring-white" />
          )}
        </button>

        <button
          onClick={() => {
            setActiveView('bag');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          aria-label="Shopping Bag"
          className="relative w-9 h-9 rounded-full bg-[#1E3A2E] text-[#C7CBB8] flex items-center justify-center hover:bg-[#0F1F17] active:scale-95 transition-all shadow-sm"
        >
          <ShoppingBag className="w-4 h-4 text-[#C7CBB8]" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#C7CBB8] text-[#0F1F17] text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
