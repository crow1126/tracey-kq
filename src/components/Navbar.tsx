'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { Search, ShoppingBag, Menu, Sparkles } from 'lucide-react';

export default function Navbar() {
  const { cartCount, setIsCartDrawerOpen, setIsSearchOpen, activeTab, setActiveTab } = useStore();

  return (
    <header className="sticky top-0 z-40 bg-[#183015]/95 backdrop-blur-md border-b border-[#2A4E1F]/70 text-white transition-all">
      {/* Top Announcement Bar */}
      <div className="bg-[#122410] text-[#C8E96B] py-1.5 px-4 text-center text-xs tracking-widest font-medium flex items-center justify-center gap-2 border-b border-[#2A4E1F]/30">
        <Sparkles className="w-3.5 h-3.5 text-[#C8E96B] animate-spin" style={{ animationDuration: '6s' }} />
        <span>PARIS × ACCRA COUTURE WEEK — ENJOY 50% OFF SELECTED ATELIER PIECES WITH CODE <strong className="underline cursor-pointer">TKQ50</strong></span>
        <Sparkles className="w-3.5 h-3.5 text-[#C8E96B] animate-spin" style={{ animationDuration: '6s' }} />
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('maison')}
          className="cursor-pointer flex items-center gap-2 group select-none"
        >
          <span className="font-serif text-2xl sm:text-3xl font-extrabold tracking-wider text-white transition-transform group-hover:scale-105">
            TRACEY <span className="text-[#C8E96B]">KQ</span>
          </span>
          <span className="hidden sm:inline-block w-2 h-2 rounded-full bg-[#C8E96B] animate-pulse"></span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-wider uppercase text-gray-200">
          <button
            onClick={() => setActiveTab('maison')}
            className={`transition-colors py-1 relative ${
              activeTab === 'maison' ? 'text-[#C8E96B]' : 'hover:text-[#C8E96B]'
            }`}
          >
            Maison
            {activeTab === 'maison' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C8E96B] rounded-full"></span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('boutique')}
            className={`transition-colors py-1 relative ${
              activeTab === 'boutique' ? 'text-[#C8E96B]' : 'hover:text-[#C8E96B]'
            }`}
          >
            Shop
            {activeTab === 'boutique' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C8E96B] rounded-full"></span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('lookbook')}
            className={`transition-colors py-1 relative ${
              activeTab === 'lookbook' ? 'text-[#C8E96B]' : 'hover:text-[#C8E96B]'
            }`}
          >
            Lookbook
            {activeTab === 'lookbook' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C8E96B] rounded-full"></span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('atelier')}
            className={`transition-colors py-1 relative ${
              activeTab === 'atelier' ? 'text-[#C8E96B]' : 'hover:text-[#C8E96B]'
            }`}
          >
            Atelier
            {activeTab === 'atelier' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C8E96B] rounded-full"></span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('patron')}
            className={`transition-colors py-1 relative ${
              activeTab === 'patron' ? 'text-[#C8E96B]' : 'hover:text-[#C8E96B]'
            }`}
          >
            Patron
            {activeTab === 'patron' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C8E96B] rounded-full"></span>
            )}
          </button>
        </div>

        {/* Action Icons */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsSearchOpen(true)}
            aria-label="Search"
            className="p-2 rounded-full hover:bg-[#2A4E1F] text-gray-200 hover:text-white transition-all transform hover:scale-110 active:scale-95"
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            onClick={() => setIsCartDrawerOpen(true)}
            aria-label="Shopping Bag"
            className="p-2 rounded-full hover:bg-[#2A4E1F] text-gray-200 hover:text-white transition-all relative transform hover:scale-110 active:scale-95"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#C8E96B] text-[#122410] text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab(activeTab === 'patron' ? 'maison' : 'patron')}
            aria-label="Menu"
            className="md:hidden p-2 rounded-full hover:bg-[#2A4E1F] text-gray-200"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </nav>
    </header>
  );
}
