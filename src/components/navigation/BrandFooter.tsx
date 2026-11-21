/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { Truck, ShieldCheck, RefreshCw, MessageCircle, Check, ArrowRight } from 'lucide-react';

export default function BrandFooter() {
  const { setActiveView } = useStore();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const navigateAndScroll = (view: string) => {
    setActiveView(view as never);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <footer className="bg-[#133D27] text-white pt-12 pb-32 md:pb-14 px-5 sm:px-8 lg:px-12 border-t border-emerald-900/40">
      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-12">
        {/* Newsletter / Private Circle Section */}
        <div className="bg-[#1A5C37] border border-emerald-800/40 rounded-[24px] sm:rounded-[28px] p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center shadow-xl">
          <div className="lg:col-span-7 space-y-2">
            <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-[#4ADE80] uppercase block">
              ACCREDITED ATELIER PRIVILEGES
            </span>
            <h3 className="text-xl sm:text-3xl font-bold tracking-tight text-white font-serif">
              Join the T.I.M.E fits Private Circle
            </h3>
            <p className="text-xs sm:text-sm text-gray-200 font-light max-w-lg leading-relaxed">
              &ldquo;We don’t design for seasons; we design for lifetimes.&rdquo; Receive private collection previews, bespoke appointment slots, and handcrafted lookbooks.
            </p>
          </div>

          <div className="lg:col-span-5">
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative flex items-center">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-[48px] sm:h-[52px] w-full rounded-full bg-white/10 border border-emerald-500/30 px-5 pr-32 text-xs sm:text-sm text-white placeholder-white/50 focus:outline-none focus:border-[#4ADE80] focus:ring-2 focus:ring-[#22C55E]/30"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 h-[38px] sm:h-[42px] px-5 sm:px-6 rounded-full bg-white text-[#133D27] text-[11px] sm:text-xs font-bold uppercase tracking-wider hover:bg-emerald-50 transition-colors cursor-pointer shadow"
                >
                  {isSubscribed ? <Check className="w-4 h-4 text-[#16A34A]" /> : <span>Subscribe</span>}
                </button>
              </div>
              {isSubscribed && (
                <p className="text-xs text-[#4ADE80] pl-4">
                  Welcome to the T.I.M.E fits Circle. Check your inbox.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* 4 Pillars Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 py-5 border-y border-emerald-900/50 text-xs text-gray-300">
          <div className="flex items-center gap-2.5">
            <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-[#4ADE80] flex-shrink-0" />
            <div>
              <p className="font-semibold text-white text-[11px] sm:text-xs">Same-Day Accra Delivery</p>
              <p className="font-light text-[10px] text-emerald-200/70">Nationwide Express in 48-72h</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#4ADE80] flex-shrink-0" />
            <div>
              <p className="font-semibold text-white text-[11px] sm:text-xs">Tailored Perfection</p>
              <p className="font-light text-[10px] text-emerald-200/70">Refined craftsmanship that endures</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 text-[#4ADE80] flex-shrink-0" />
            <div>
              <p className="font-semibold text-white text-[11px] sm:text-xs">Designed for Lifetimes</p>
              <p className="font-light text-[10px] text-emerald-200/70">Complimentary fit alterations</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#4ADE80] flex-shrink-0" />
            <div>
              <p className="font-semibold text-white text-[11px] sm:text-xs">WhatsApp Concierge</p>
              <a
                href="https://wa.me/233208912340"
                target="_blank"
                rel="noopener noreferrer"
                className="font-light text-[10px] text-emerald-200/90 hover:underline"
              >
                +233 20 891 2340
              </a>
            </div>
          </div>
        </div>

        {/* Clean, Functional Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 items-start">
          {/* Brand Info Column */}
          <div className="col-span-2 md:col-span-5 space-y-3">
            <div
              onClick={() => navigateAndScroll('home')}
              className="flex items-center gap-2.5 cursor-pointer inline-flex"
            >
              <img
                src="/brand/logo.jpg"
                alt="T.I.M.E fits"
                className="h-9 w-auto object-contain rounded"
              />
              <div>
                <span className="text-[15px] font-bold tracking-[0.2em] text-white uppercase block font-serif">
                  T.I.M.E fits
                </span>
                <span className="text-[10px] text-[#4ADE80] italic">
                  Tailored Perfection, Timeless Style.
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-300 font-light leading-relaxed max-w-sm">
              Accra Couture Atelier · Founder & Creative Director: <strong>Kukua-Tracey</strong>.
            </p>
            <div className="pt-1">
              <button
                onClick={() => navigateAndScroll('bespoke')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4ADE80] hover:text-white transition-colors cursor-pointer"
              >
                <span>Book Bespoke Atelier Fitting</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Column 1: Store & Collections */}
          <div className="col-span-1 md:col-span-2 space-y-2.5">
            <h4 className="text-[11px] font-bold tracking-[0.18em] text-[#4ADE80] uppercase">
              Shop & Explore
            </h4>
            <ul className="space-y-2 text-xs text-gray-300 font-light">
              <li>
                <button
                  type="button"
                  onClick={() => navigateAndScroll('shop')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  All Garments
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateAndScroll('collections')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Collections
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateAndScroll('bespoke')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Bespoke Tailoring
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateAndScroll('stores')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Our Showrooms
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: About & Story */}
          <div className="col-span-1 md:col-span-2 space-y-2.5">
            <h4 className="text-[11px] font-bold tracking-[0.18em] text-[#4ADE80] uppercase">
              The Maison
            </h4>
            <ul className="space-y-2 text-xs text-gray-300 font-light">
              <li>
                <button
                  type="button"
                  onClick={() => navigateAndScroll('our-story')}
                  className="hover:text-white transition-colors cursor-pointer text-left font-medium text-emerald-200"
                >
                  Our Story & About
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateAndScroll('our-story')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Meet the Designer
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateAndScroll('our-story')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Brand Philosophy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateAndScroll('explore')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Lookbook
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Client & CMS */}
          <div className="col-span-2 md:col-span-3 space-y-2.5">
            <h4 className="text-[11px] font-bold tracking-[0.18em] text-[#4ADE80] uppercase">
              Client & Atelier
            </h4>
            <ul className="space-y-2 text-xs text-gray-300 font-light">
              <li>
                <button
                  type="button"
                  onClick={() => navigateAndScroll('saved')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Saved Wishlist
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateAndScroll('account')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Patron Account & Orders
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateAndScroll('admin')}
                  className="text-[#4ADE80] hover:underline cursor-pointer text-left font-medium"
                >
                  Admin CMS
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-6 border-t border-emerald-900/50 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-400 gap-3 font-light">
          <span>© 2026 T.I.M.E fits by Kukua-Tracey. All rights reserved. Accra, Ghana.</span>
          <div className="flex items-center gap-5">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms & Conditions</span>
            <span className="hover:text-white cursor-pointer">Shipping & Returns</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
