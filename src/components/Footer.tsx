'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { Globe, Share2, Send, MapPin, Mail, Phone } from 'lucide-react';

export default function Footer() {
  const { setActiveTab } = useStore();

  return (
    <footer className="bg-[#122410] text-gray-300 pt-16 pb-28 px-4 sm:px-6 lg:px-8 border-t border-[#2A4E1F]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* Brand Column */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-2">
            <span className="font-serif text-3xl font-extrabold tracking-wider text-white">
              TRACEY <span className="text-[#C8E96B]">KQ</span>
            </span>
            <span className="w-2 h-2 rounded-full bg-[#C8E96B]"></span>
          </div>

          <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed max-w-sm">
            High fashion brand designed by Tracey Kuukua Quansah. Celebrating royal Ghanaian heritage through avant-garde minimalism, organic silks, and tailored precision.
          </p>

          <div className="flex items-center gap-3 pt-2 text-gray-400">
            <a href="#" aria-label="Website" className="p-2.5 rounded-full bg-[#183015] hover:bg-[#2A4E1F] hover:text-[#C8E96B] transition-colors">
              <Globe className="w-4 h-4" />
            </a>
            <a href="#" aria-label="Social" className="p-2.5 rounded-full bg-[#183015] hover:bg-[#2A4E1F] hover:text-[#C8E96B] transition-colors">
              <Share2 className="w-4 h-4" />
            </a>
            <a href="#" aria-label="Newsletter" className="p-2.5 rounded-full bg-[#183015] hover:bg-[#2A4E1F] hover:text-[#C8E96B] transition-colors">
              <Send className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Navigation Column */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-[#C8E96B]">
            Navigation
          </h4>
          <ul className="space-y-2 text-xs font-light">
            <li>
              <button onClick={() => setActiveTab('maison')} className="hover:text-white transition-colors cursor-pointer">
                Maison
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('boutique')} className="hover:text-white transition-colors cursor-pointer">
                Ready-to-Wear Boutique
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('lookbook')} className="hover:text-white transition-colors cursor-pointer">
                Editorial Lookbook
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('atelier')} className="hover:text-white transition-colors cursor-pointer">
                Made-to-Measure Atelier
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('patron')} className="hover:text-white transition-colors cursor-pointer">
                Patron & Measurements
              </button>
            </li>
          </ul>
        </div>

        {/* Atelier Location & Contact Column */}
        <div className="md:col-span-4 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-[#C8E96B]">
            Flagship Atelier
          </h4>
          <div className="space-y-2 text-xs text-gray-400 font-light">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#C8E96B] flex-shrink-0 mt-0.5" />
              <span>Senchi Street, Airport Residential Area, Accra, Ghana</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#C8E96B] flex-shrink-0" />
              <span>concierge@tracey-kq.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#C8E96B] flex-shrink-0" />
              <span>+233 (0) 20 891 2345</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-[#2A4E1F]/60 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500 font-light gap-4">
        <span>© 2026 Tracey Kuukua Quansah. All rights reserved.</span>
        <div className="flex items-center gap-6">
          <span className="hover:text-gray-300 cursor-pointer">Privacy Policy</span>
          <span className="hover:text-gray-300 cursor-pointer">Terms of Service</span>
          <span className="hover:text-gray-300 cursor-pointer">Atelier Certification</span>
        </div>
      </div>
    </footer>
  );
}
