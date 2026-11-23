/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { Search, Heart, ShoppingBag, ShieldCheck } from 'lucide-react';
import IconButton from '../ui/IconButton';

export default function DesktopTopNav() {
  const {
    activeView,
    setActiveView,
    cartCount,
    wishlist,
    setIsSearchOpen,
    siteContent,
  } = useStore();

  const navLinks = [
    { id: 'shop', label: 'Shop' },
    { id: 'collections', label: 'Collections' },
    { id: 'our-story', label: 'About & Story' },
    { id: 'stores', label: 'Our Stores' },
    { id: 'bespoke', label: 'Custom & Bespoke' },
  ];

  return (
    <header className="hidden md:block sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E6E6EA] transition-all">
      {/* Top Banner - Forest Spruce Theme */}
      <div className="bg-[#0F1F17] text-[#C7CBB8] py-1.5 px-6 text-center text-xs tracking-widest font-medium flex items-center justify-center gap-3">
        <span className="w-1.5 h-1.5 rounded-full bg-[#C7CBB8] animate-pulse"></span>
        <span className="font-light tracking-wide text-[#E8DCC4]">
          {siteContent?.announcementBarText ||
            'T.I.M.E FITS · TAILORED PERFECTION, TIMELESS STYLE · ACCRA ATELIER · EXPRESS SAME-DAY DELIVERY'}
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#C7CBB8] animate-pulse"></span>
      </div>

      <div className="max-w-7xl mx-auto px-8 h-[76px] flex items-center justify-between">
        {/* Brand Logo & Wordmark */}
        <div
          onClick={() => {
            setActiveView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="cursor-pointer flex items-center gap-3 group select-none"
        >
          <img
            src="/brand/logo.jpg"
            alt="T.I.M.E fits Logo"
            className="h-12 w-auto object-contain rounded-md"
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-[17px] font-bold tracking-[0.25em] text-[#1E3A2E] uppercase font-serif">
                T.I.M.E fits
              </span>
              <span className="text-[9px] font-bold text-[#1E3A2E] bg-[#F4F1EA] border border-[#C7CBB8]/60 px-2 py-0.5 rounded-full">
                ACCRA
              </span>
            </div>
            <span className="text-[10px] text-[#6B7F67] tracking-wider font-light italic">
              Tailored Perfection, Timeless Style.
            </span>
          </div>
        </div>

        {/* Desktop Links */}
        <nav className="flex items-center space-x-7 text-[14px] font-medium tracking-wide text-[#3D4337]">
          {navLinks.map((link) => {
            const isActive = activeView === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  setActiveView(link.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`py-2 relative transition-colors cursor-pointer ${
                  isActive
                    ? 'text-[#1E3A2E] font-bold'
                    : 'hover:text-[#1E3A2E]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#1E3A2E] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Icons */}
        <div className="flex items-center space-x-3">
          {/* Admin shortcut button */}
          <button
            onClick={() => setActiveView('admin')}
            className={`text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeView === 'admin'
                ? 'bg-[#1E3A2E] text-white'
                : 'bg-emerald-50 text-[#1E3A2E] hover:bg-emerald-100 border border-emerald-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#C7CBB8]" />
            <span>Admin CMS</span>
          </button>

          <IconButton
            variant="header"
            onClick={() => setIsSearchOpen(true)}
            aria-label="Search store"
          >
            <Search className="w-5 h-5 text-[#111113]" />
          </IconButton>

          <IconButton
            variant="header"
            onClick={() => {
              setActiveView('saved');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            aria-label="Wishlist"
            className="relative"
          >
            <Heart className="w-5 h-5 text-[#111113]" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#1E3A2E] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </IconButton>

          <IconButton
            variant="header"
            onClick={() => {
              setActiveView('bag');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            aria-label="Shopping Bag"
            className="relative"
          >
            <ShoppingBag className="w-5 h-5 text-[#111113]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#1E3A2E] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </IconButton>
        </div>
      </div>
    </header>
  );
}
