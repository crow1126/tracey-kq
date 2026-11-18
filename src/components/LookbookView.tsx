'use client';

import React from 'react';
import { LOOKBOOKS } from '@/data/fashion-data';
import { useStore } from '@/context/StoreContext';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function LookbookView() {
  const { setActiveTab } = useStore();

  return (
    <div className="bg-[#183015] text-white py-12 px-4 sm:px-6 lg:px-8 space-y-16">
      <div className="max-w-7xl mx-auto space-y-6 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-[#C8E96B] flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5" />
          Editorial Stories & Collections
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight text-white">
          THE LOOKBOOK
        </h1>
        <p className="text-gray-300 text-sm sm:text-base font-light max-w-2xl mx-auto leading-relaxed">
          Chronicles of Ghanaian haute couture, architectural silhouettes, and organic earthy textures designed by Tracey Kuukua Quansah.
        </p>
      </div>

      <div className="max-w-7xl mx-auto space-y-20">
        {LOOKBOOKS.map((lb, index) => {
          const isReversed = index % 2 === 1;
          return (
            <div
              key={lb.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center ${
                isReversed ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className={`lg:col-span-7 ${isReversed ? 'lg:order-2' : ''}`}>
                <div className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl border border-[#2A4E1F] group">
                  <img
                    src={lb.coverImage}
                    alt={lb.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6 sm:p-8">
                    <span className="bg-[#C8E96B] text-[#122410] font-black text-xs uppercase px-3 py-1.5 rounded-full shadow-lg">
                      {lb.season}
                    </span>
                  </div>
                </div>
              </div>

              <div className={`lg:col-span-5 space-y-5 ${isReversed ? 'lg:order-1' : ''}`}>
                <div className="text-xs font-mono text-[#C8E96B] uppercase tracking-widest">
                  {lb.theme}
                </div>
                <h2 className="text-3xl sm:text-4xl font-serif font-black text-white tracking-tight">
                  {lb.title}
                </h2>
                <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed">
                  {lb.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
                  {lb.description}
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => setActiveTab('boutique')}
                    className="inline-flex items-center gap-2 bg-[#2A4E1F] hover:bg-[#3A662C] text-white border border-[#C8E96B]/30 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all hover:scale-105 cursor-pointer"
                  >
                    <span>Acquire Looks</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
