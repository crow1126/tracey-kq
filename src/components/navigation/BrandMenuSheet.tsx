/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { X, Sparkles, Scissors, MapPin, MessageCircle, ShieldCheck, ChevronRight, Compass, ShoppingBag, Heart, Truck, User } from 'lucide-react';

export default function BrandMenuSheet() {
  const { isBrandMenuOpen, setIsBrandMenuOpen, setActiveView, orders, user, logoutUser, openAuthModal } = useStore();

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
          <div className="p-4 border-b border-[#E6E6EA] flex items-center justify-between bg-[#F4F1EA]">
            <div className="flex items-center gap-2.5">
              <img
                src="/brand/logo.jpg"
                alt="T.I.M.E fits"
                className="h-9 w-auto object-contain rounded"
              />
              <div>
                <span className="font-serif font-bold text-xs tracking-[0.2em] text-[#1E3A2E] uppercase block">
                  T.I.M.E fits
                </span>
                <span className="text-[9px] text-[#6B7F67] tracking-wider">
                  Tailored Perfection · Accra
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsBrandMenuOpen(false)}
              className="p-2 rounded-full bg-white text-[#0F1F17] hover:bg-[#EDEDF0] shadow-sm border border-[#E6E6EA]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto p-4 space-y-5">
            <div className="space-y-1">
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#1E3A2E] uppercase block px-3 py-1">
                Store
              </span>
              <button
                onClick={() => navigateTo('shop')}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[14px] font-medium text-[#0F1F17] hover:bg-[#F4F1EA] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Compass className="w-4 h-4 text-[#1E3A2E]" />
                  <span>Browse & Shop Pieces</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>

              <button
                onClick={() => navigateTo('bag')}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[14px] font-medium text-[#0F1F17] hover:bg-[#F4F1EA] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-4 h-4 text-[#1E3A2E]" />
                  <span>Shopping Bag</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>

              <button
                onClick={() => navigateTo('saved')}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[14px] font-medium text-[#0F1F17] hover:bg-[#F4F1EA] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Heart className="w-4 h-4 text-[#1E3A2E]" />
                  <span>Saved Wishlist</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>

              <button
                onClick={() => navigateTo('orders')}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[14px] font-medium text-[#0F1F17] hover:bg-[#F4F1EA] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Truck className="w-4 h-4 text-[#1E3A2E]" />
                  <span>Track My Orders</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {orders.length > 0 && (
                    <span className="text-[10px] font-bold bg-[#1E3A2E] text-[#C7CBB8] px-2 py-0.5 rounded-full">
                      {orders.length}
                    </span>
                  )}
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </button>

              <button
                onClick={() => navigateTo('account')}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[14px] font-medium text-[#0F1F17] hover:bg-[#F4F1EA] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-[#1E3A2E]" />
                  <span>Patron Account</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>

              <button
                onClick={() => navigateTo('explore')}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[14px] font-medium text-[#0F1F17] hover:bg-[#F4F1EA] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-[#1E3A2E]" />
                  <span>Editorial Lookbook</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#1E3A2E] uppercase block px-3 py-1">
                The Maison
              </span>
              <button
                onClick={() => navigateTo('our-story')}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[14px] font-medium text-[#0F1F17] hover:bg-[#F4F1EA] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Scissors className="w-4 h-4 text-[#1E3A2E]" />
                  <span>Our Story & Philosophy</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>

              <button
                onClick={() => navigateTo('collections')}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[14px] font-medium text-[#0F1F17] hover:bg-[#F4F1EA] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-[#1E3A2E]" />
                  <span>Our Collections</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>

              <button
                onClick={() => navigateTo('bespoke')}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[14px] font-medium text-[#0F1F17] hover:bg-[#F4F1EA] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Scissors className="w-4 h-4 text-[#1E3A2E]" />
                  <span>Bespoke Tailoring</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>

              <button
                onClick={() => navigateTo('stores')}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[14px] font-medium text-[#0F1F17] hover:bg-[#F4F1EA] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-[#1E3A2E]" />
                  <span>Our Showrooms</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            <div className="space-y-2 pt-2 border-t border-[#E6E6EA]">
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#1E3A2E] uppercase block px-3 py-1">
                Patron Access
              </span>
              {user.isLoggedIn ? (
                <div className="bg-[#F4F1EA] rounded-2xl p-3.5 border border-[#C7CBB8]/60 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-[#1E3A2E] tracking-wider block">
                        Signed In
                      </span>
                      <p className="text-xs font-bold text-[#111113]">{user.name}</p>
                      <p className="text-[10px] text-[#6B7F67]">{user.email}</p>
                    </div>
                    <span className="text-[9px] font-bold text-[#6B73F0] bg-[#ECEDFD] px-2 py-0.5 rounded-full">
                      {user.tier}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 pt-1 border-t border-[#C7CBB8]/40">
                    <button
                      onClick={() => navigateTo('account')}
                      className="flex-1 py-1.5 rounded-xl bg-white text-[11px] font-semibold text-[#1E3A2E] border border-[#C7CBB8]/60 hover:bg-[#F5F5F7] text-center"
                    >
                      View Profile
                    </button>
                    <button
                      onClick={() => {
                        logoutUser();
                        setIsBrandMenuOpen(false);
                      }}
                      className="flex-1 py-1.5 rounded-xl bg-[#FFF0F2] text-[11px] font-semibold text-[#E5384F] border border-[#FCDADF] hover:bg-[#FDECEE] text-center"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <button
                    onClick={() => {
                      setIsBrandMenuOpen(false);
                      openAuthModal('login');
                    }}
                    className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-[#1E3A2E] text-[#C7CBB8] hover:bg-[#0F1F17] transition-colors"
                  >
                    <span>Sign In to Account</span>
                    <ChevronRight className="w-4 h-4 text-[#C7CBB8]" />
                  </button>
                  <button
                    onClick={() => {
                      setIsBrandMenuOpen(false);
                      openAuthModal('register');
                    }}
                    className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-[#F4F1EA] text-[#1E3A2E] hover:bg-[#EAE6DD] transition-colors border border-[#C7CBB8]/60"
                  >
                    <span>Create Account (Sign Up)</span>
                    <ChevronRight className="w-4 h-4 text-[#1E3A2E]" />
                  </button>
                  <button
                    onClick={() => {
                      setIsBrandMenuOpen(false);
                      openAuthModal('forgot-password');
                    }}
                    className="w-full text-left px-3.5 py-1 text-[11px] text-[#6B7F67] hover:text-[#1E3A2E] underline"
                  >
                    Forgot your password?
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#1E3A2E] uppercase block px-3 py-1">
                Management
              </span>
              <button
                onClick={() => navigateTo('admin')}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[14px] font-medium bg-[#F4F1EA] text-[#1E3A2E] hover:bg-[#EAE6DD] transition-colors border border-[#C7CBB8]/60"
              >
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-[#1E3A2E]" />
                  <span>Admin CMS</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#1E3A2E]" />
              </button>
            </div>
          </div>

          {/* Footer Contact */}
          <div className="p-4 border-t border-[#E6E6EA] bg-[#0F1F17] text-white space-y-2 rounded-b-none">
            <p className="text-xs text-gray-300">
              Founder & Director: <strong>Kukua-Tracey</strong>
            </p>
            <p className="text-[11px] text-[#C7CBB8] italic">
              &ldquo;We don’t design for seasons; we design for lifetimes.&rdquo;
            </p>
            <a
              href="https://wa.me/233208912340"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-10 rounded-full bg-[#1E3A2E] text-[#C7CBB8] border border-[#3E5A3F] text-xs font-semibold flex items-center justify-center gap-2 hover:bg-[#0F1F17] transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#C7CBB8]" />
              <span>WhatsApp Atelier Concierge</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
