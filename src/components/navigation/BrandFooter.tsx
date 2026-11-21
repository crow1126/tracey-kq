/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { Truck, ShieldCheck, RefreshCw, MessageCircle, Check } from 'lucide-react';

export default function BrandFooter() {
  const { setActiveView } = useStore();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

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
    <footer className="bg-[#133D27] text-white pt-16 pb-36 md:pb-16 px-6 sm:px-8 lg:px-12 border-t border-emerald-900/40">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Newsletter / Private Circle Section */}
        <div className="bg-[#1A5C37] border border-emerald-800/40 rounded-[28px] p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xl">
          <div className="lg:col-span-7 space-y-3">
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#4ADE80] uppercase block">
              ACCREDITED ATELIER PRIVILEGES
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-serif">
              Join the T.I.M.E fits Private Circle
            </h3>
            <p className="text-sm text-gray-300 font-light max-w-lg leading-relaxed">
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
                  className="h-[52px] w-full rounded-full bg-white/10 border border-emerald-500/30 px-6 pr-36 text-sm text-white placeholder-white/50 focus:outline-none focus:border-[#4ADE80] focus:ring-2 focus:ring-[#22C55E]/30"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 h-[42px] px-6 rounded-full bg-white text-[#133D27] text-xs font-bold uppercase tracking-wider hover:bg-emerald-50 transition-colors cursor-pointer shadow"
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-emerald-900/50 text-xs text-gray-300">
          <div className="flex items-center gap-3">
            <Truck className="w-5 h-5 text-[#4ADE80] flex-shrink-0" />
            <div>
              <p className="font-semibold text-white">Same-Day Accra Delivery</p>
              <p className="font-light text-[11px] text-emerald-200/70">Nationwide Express in 48-72h</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#4ADE80] flex-shrink-0" />
            <div>
              <p className="font-semibold text-white">Tailored Perfection</p>
              <p className="font-light text-[11px] text-emerald-200/70">Refined craftsmanship that endures</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <RefreshCw className="w-5 h-5 text-[#4ADE80] flex-shrink-0" />
            <div>
              <p className="font-semibold text-white">Designed for Lifetimes</p>
              <p className="font-light text-[11px] text-emerald-200/70">Complimentary fit alterations</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MessageCircle className="w-5 h-5 text-[#4ADE80] flex-shrink-0" />
            <div>
              <p className="font-semibold text-white">WhatsApp Atelier Concierge</p>
              <p className="font-light text-[11px] text-emerald-200/70">+233 20 891 2340</p>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10">
          <div className="col-span-2 md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/brand/logo.jpg"
                alt="T.I.M.E fits"
                className="h-10 w-auto object-contain rounded"
              />
              <div>
                <span className="text-[16px] font-bold tracking-[0.25em] text-white uppercase block font-serif">
                  T.I.M.E fits
                </span>
                <span className="text-[11px] text-[#4ADE80] italic">
                  Tailored Perfection, Timeless Style.
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-300 font-light leading-relaxed max-w-sm">
              We create beyond the noise of passing trends. Every silhouette, detail and finish is chosen with purpose, shaped by refined craftsmanship and designed to endure.
            </p>
            <div className="pt-2 text-xs text-emerald-300/80 space-y-1">
              <p>Founder & Creative Director: Kukua-Tracey</p>
              <p>Philosophy: We don’t design for seasons; we design for lifetimes.</p>
              <p className="font-bold text-[#4ADE80]">Guiding Principle: THIS OR NOTHING ELSE.</p>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold tracking-[0.2em] text-[#4ADE80] uppercase">
              Brand Layer
            </h4>
            <ul className="space-y-2 text-xs text-gray-300 font-light">
              <li><button onClick={() => setActiveView('our-story')} className="hover:text-white transition-colors cursor-pointer">Our Story</button></li>
              <li><button onClick={() => setActiveView('collections')} className="hover:text-white transition-colors cursor-pointer">Our Collections</button></li>
              <li><button onClick={() => setActiveView('spotlight')} className="hover:text-white transition-colors cursor-pointer">Our Philosophy</button></li>
              <li><button onClick={() => setActiveView('stores')} className="hover:text-white transition-colors cursor-pointer">Our Showrooms</button></li>
              <li><button onClick={() => setActiveView('bespoke')} className="hover:text-white transition-colors cursor-pointer">Bespoke Tailoring</button></li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold tracking-[0.2em] text-[#4ADE80] uppercase">
              Store Layer
            </h4>
            <ul className="space-y-2 text-xs text-gray-300 font-light">
              <li><button onClick={() => setActiveView('shop')} className="hover:text-white transition-colors cursor-pointer">Shop All Pieces</button></li>
              <li><button onClick={() => setActiveView('explore')} className="hover:text-white transition-colors cursor-pointer">Lookbook Masonry</button></li>
              <li><button onClick={() => setActiveView('saved')} className="hover:text-white transition-colors cursor-pointer">Saved Wishlist</button></li>
              <li><button onClick={() => setActiveView('account')} className="hover:text-white transition-colors cursor-pointer">Patron Account & Orders</button></li>
              <li><button onClick={() => setActiveView('admin')} className="text-[#4ADE80] hover:underline cursor-pointer">Admin CMS</button></li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-4 space-y-4">
            <h4 className="text-xs font-semibold tracking-[0.2em] text-[#4ADE80] uppercase">
              Atelier Concierge
            </h4>
            <p className="text-xs text-gray-300 font-light leading-relaxed">
              Experience private made-to-measure fittings, personal fabric consultations, and bespoke commissions with Kukua-Tracey.
            </p>
            <div className="pt-1">
              <button
                onClick={() => {
                  setActiveView('bespoke');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#4ADE80] hover:text-white transition-colors cursor-pointer"
              >
                <span>Book a Bespoke Fitting →</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 border-t border-emerald-900/50 flex flex-col sm:flex-row items-center justify-between text-[12px] text-gray-400 gap-4 font-light">
          <span>© 2026 T.I.M.E fits by Kukua-Tracey. All rights reserved. Accra, Ghana.</span>
          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms & Conditions</span>
            <span className="hover:text-white cursor-pointer">Shipping & Returns</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
