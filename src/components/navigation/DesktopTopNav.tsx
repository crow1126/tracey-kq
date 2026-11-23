/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { Search, Heart, ShoppingBag, Truck, User } from 'lucide-react';
import IconButton from '../ui/IconButton';

export default function DesktopTopNav() {
  const {
    activeView,
    setActiveView,
    cartCount,
    wishlist,
    orders,
    setIsSearchOpen,
    siteContent,
    user,
    logoutUser,
    openAuthModal,
  } = useStore();

  const navLinks = [
    { id: 'shop', label: 'Shop' },
    { id: 'collections', label: 'Collections' },
    { id: 'bespoke', label: 'Bespoke' },
    { id: 'our-story', label: 'Our Story' },
    { id: 'stores', label: 'Showrooms' },
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
        <nav className="flex items-center space-x-8 text-[14px] font-medium tracking-wide text-[#3D4337]">
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
        <div className="flex items-center space-x-2">
          {/* Sleek Track Orders Icon Button */}
          <IconButton
            variant="header"
            onClick={() => {
              setActiveView('orders');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            aria-label="Track Orders"
            className="relative"
            title="Track Orders"
          >
            <Truck className="w-5 h-5 text-[#111113]" />
            {orders.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#1E3A2E] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {orders.length}
              </span>
            )}
          </IconButton>

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

          {/* Patron Account / Auth Gateway */}
          {user.isLoggedIn ? (
            <div className="flex items-center gap-1.5 pl-2 border-l border-[#E6E6EA]">
              <button
                onClick={() => {
                  setActiveView('account');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs font-semibold px-2.5 py-1.5 rounded-full bg-[#F4F1EA] text-[#1E3A2E] hover:bg-[#EAE6DD] transition-colors flex items-center gap-1.5 border border-[#C7CBB8]/60 cursor-pointer"
                title={`Logged in as ${user.name}`}
              >
                <div className="w-5 h-5 rounded-full bg-[#1E3A2E] text-[#C7CBB8] text-[10px] font-bold flex items-center justify-center">
                  {user.name.charAt(0)}
                </div>
                <span className="max-w-[70px] truncate">{user.name.split(' ')[0]}</span>
              </button>
              <button
                onClick={logoutUser}
                className="text-[11px] text-[#8A8A8F] hover:text-[#E5384F] px-1.5 py-1 transition-colors cursor-pointer"
                title="Sign Out"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => openAuthModal('login')}
              className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[#1E3A2E] text-[#C7CBB8] hover:bg-[#0F1F17] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs ml-1"
            >
              <User className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
