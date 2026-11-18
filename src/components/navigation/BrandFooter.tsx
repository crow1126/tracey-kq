'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { Send, MapPin, Phone, Mail, MessageCircle, Check, ArrowRight, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

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
    <footer className="bg-[#111113] text-white pt-16 pb-28 md:pb-16 px-6 sm:px-8 lg:px-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Newsletter Section */}
        <div className="bg-[#1C1C1F] border border-white/10 rounded-[24px] p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-2">
            <span className="text-[11px] font-medium tracking-[0.2em] text-[#6B73F0] uppercase block">
              ACCREDITED ATELIER PRIVILEGES
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display">
              Join the Tracey KQ Private Circle
            </h3>
            <p className="text-sm text-[#A1A1A8] font-light max-w-lg leading-relaxed">
              Receive private drop invitations, runway lookbooks, and bespoke made-to-measure appointment slots before public release.
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
                  className="h-[56px] w-full rounded-full bg-white/10 border border-white/20 px-6 pr-36 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#6B73F0] focus:ring-2 focus:ring-[#6B73F0]/30"
                />
                <button
                  type="submit"
                  className="absolute right-2 h-[44px] px-6 rounded-full bg-white text-[#111113] text-xs font-semibold uppercase tracking-wider hover:bg-[#EDEDF0] transition-colors cursor-pointer"
                >
                  {isSubscribed ? <Check className="w-4 h-4 text-[#1F8A4C]" /> : <span>Subscribe</span>}
                </button>
              </div>
              {isSubscribed && (
                <p className="text-xs text-[#1F8A4C] pl-4">
                  Welcome to the Private Circle. Check your inbox.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* 4 Pillars Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-white/10 text-xs text-[#A1A1A8]">
          <div className="flex items-center gap-3">
            <Truck className="w-5 h-5 text-[#6B73F0] flex-shrink-0" />
            <div>
              <p className="font-semibold text-white">Same-Day Accra Delivery</p>
              <p className="font-light text-[11px]">Nationwide in 48-72h</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#6B73F0] flex-shrink-0" />
            <div>
              <p className="font-semibold text-white">100% Authentic Ghanaian</p>
              <p className="font-light text-[11px]">Handcrafted in Accra & Kumasi</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <RefreshCw className="w-5 h-5 text-[#6B73F0] flex-shrink-0" />
            <div>
              <p className="font-semibold text-white">Made-to-Measure Guarantee</p>
              <p className="font-light text-[11px]">Complimentary fit alterations</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MessageCircle className="w-5 h-5 text-[#1F8A4C] flex-shrink-0" />
            <div>
              <p className="font-semibold text-white">WhatsApp VIP Fitting</p>
              <p className="font-light text-[11px]">+233 20 891 2340</p>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10">
          <div className="col-span-2 md:col-span-4 space-y-4">
            <span className="text-[14px] font-semibold tracking-[0.35em] text-white uppercase block font-sans">
              TRACEY KUUKUA QUANSAH
            </span>
            <p className="text-xs text-[#A1A1A8] font-light leading-relaxed max-w-sm">
              Contemporary Ghanaian luxury fashion house combining ancestral regalia, zero-waste bespoke tailoring, and minimalist silhouettes.
            </p>
            <div className="pt-2 text-xs text-[#8A8A8F] space-y-1">
              <p>Atelier: Airport Residential Area, Accra</p>
              <p>Currency: GH₵ (Ghana Cedi)</p>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold tracking-[0.2em] text-white uppercase">
              Brand Layer
            </h4>
            <ul className="space-y-2 text-xs text-[#A1A1A8] font-light">
              <li><button onClick={() => setActiveView('our-story')} className="hover:text-white transition-colors cursor-pointer">Our Story</button></li>
              <li><button onClick={() => setActiveView('collections')} className="hover:text-white transition-colors cursor-pointer">Collections / Lookbook</button></li>
              <li><button onClick={() => setActiveView('spotlight')} className="hover:text-white transition-colors cursor-pointer">Spotlight / Journal</button></li>
              <li><button onClick={() => setActiveView('stores')} className="hover:text-white transition-colors cursor-pointer">Our Stores (Accra & Kumasi)</button></li>
              <li><button onClick={() => setActiveView('bespoke')} className="hover:text-white transition-colors cursor-pointer">Custom & Bespoke</button></li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold tracking-[0.2em] text-white uppercase">
              Store Layer
            </h4>
            <ul className="space-y-2 text-xs text-[#A1A1A8] font-light">
              <li><button onClick={() => setActiveView('shop')} className="hover:text-white transition-colors cursor-pointer">Shop All Products</button></li>
              <li><button onClick={() => setActiveView('explore')} className="hover:text-white transition-colors cursor-pointer">Explore Masonry</button></li>
              <li><button onClick={() => setActiveView('saved')} className="hover:text-white transition-colors cursor-pointer">Saved Wishlist</button></li>
              <li><button onClick={() => setActiveView('account')} className="hover:text-white transition-colors cursor-pointer">Patron Account & Orders</button></li>
              <li><button onClick={() => setActiveView('admin')} className="text-[#6B73F0] hover:underline cursor-pointer">Admin Dashboard</button></li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-4 space-y-4">
            <h4 className="text-xs font-semibold tracking-[0.2em] text-white uppercase">
              Ghana Payment & Deliveries
            </h4>
            <p className="text-xs text-[#A1A1A8] font-light">
              We accept all local and international payments processed securely via Paystack & Hubtel.
            </p>
            <div className="flex flex-wrap gap-2 text-[11px] font-mono text-[#111113]">
              <span className="bg-[#FFCC00] px-2.5 py-1 rounded font-bold">MTN MoMo</span>
              <span className="bg-[#E60000] text-white px-2.5 py-1 rounded font-bold">Telecel Cash</span>
              <span className="bg-[#003399] text-white px-2.5 py-1 rounded font-bold">AirtelTigo</span>
              <span className="bg-white px-2.5 py-1 rounded font-bold">Visa / Mastercard</span>
              <span className="bg-[#EDEDF0] px-2.5 py-1 rounded font-bold">Cash on Delivery</span>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[12px] text-[#8A8A8F] gap-4 font-light">
          <span>© 2026 Tracey Kuukua Quansah. All rights reserved. Accra, Ghana.</span>
          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms & Conditions</span>
            <span className="hover:text-white cursor-pointer">Shipping & Returns</span>
            <span className="hover:text-white cursor-pointer">Sitemap</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
