'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { Search, Heart, ShoppingBag, User, ShieldCheck } from 'lucide-react';
import IconButton from '../ui/IconButton';

export default function DesktopTopNav() {
  const {
    activeView,
    setActiveView,
    cartCount,
    wishlist,
    setIsCartDrawerOpen,
    setIsSearchOpen,
    setIsAuthModalOpen,
    user,
  } = useStore();

  const navLinks = [
    { id: 'shop', label: 'Shop' },
    { id: 'collections', label: 'Collections' },
    { id: 'spotlight', label: 'Spotlight' },
    { id: 'our-story', label: 'Our Story' },
    { id: 'stores', label: 'Our Stores' },
    { id: 'bespoke', label: 'Custom & Bespoke' },
  ];

  return (
    <header className="hidden md:block sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E6E6EA] transition-all">
      {/* Top Banner */}
      <div className="bg-[#111113] text-white py-1.5 px-6 text-center text-xs tracking-widest font-medium flex items-center justify-center gap-3">
        <span className="w-1.5 h-1.5 rounded-full bg-[#6B73F0] animate-pulse"></span>
        <span className="font-light">
          ACCRA ATELIER TO WORLDWIDE DOORSTEP · EXPRESS SAME-DAY DELIVERY IN ACCRA METRO · USE CODE{' '}
          <strong className="text-[#C8E96B] font-bold cursor-pointer underline">WELCOME10</strong>
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#6B73F0] animate-pulse"></span>
      </div>

      <div className="max-w-7xl mx-auto px-8 h-[72px] flex items-center justify-between">
        {/* Wordmark Logo: 16px, 600, letter-spacing 0.35em, uppercase */}
        <div
          onClick={() => {
            setActiveView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="cursor-pointer flex items-center gap-2 group select-none"
        >
          <span className="text-[16px] font-semibold tracking-[0.35em] text-[#111113] uppercase font-sans">
            TRACEY KUUKUA QUANSAH
          </span>
          <span className="text-[10px] font-bold text-[#6B73F0] bg-[#ECEDFD] px-2 py-0.5 rounded-full">
            ACCRA
          </span>
        </div>

        {/* Desktop Links */}
        <nav className="flex items-center space-x-7 text-[14px] font-medium tracking-wide text-[#3A3A3F]">
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
                  isActive ? 'text-[#111113] font-semibold' : 'hover:text-[#111113]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#111113] rounded-full" />
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
                ? 'bg-[#111113] text-white'
                : 'bg-[#EDEDF0] text-[#3A3A3F] hover:bg-[#E6E6EA]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#6B73F0]" />
            <span>Admin</span>
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
            onClick={() => setActiveView('saved')}
            aria-label="Saved Wishlist"
            className="relative"
          >
            <Heart className="w-5 h-5 text-[#111113]" />
            {wishlist.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#E5384F]" />
            )}
          </IconButton>

          <IconButton
            variant="header"
            onClick={() => {
              if (user.isLoggedIn) {
                setActiveView('account');
              } else {
                setIsAuthModalOpen(true);
              }
            }}
            aria-label="Account Profile"
          >
            <User className="w-5 h-5 text-[#111113]" />
          </IconButton>

          <IconButton
            variant="home-bag"
            onClick={() => setIsCartDrawerOpen(true)}
            aria-label="Shopping Bag"
            className="relative"
          >
            <ShoppingBag className="w-5 h-5 text-white" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#6B73F0] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                {cartCount}
              </span>
            )}
          </IconButton>
        </div>
      </div>
    </header>
  );
}
