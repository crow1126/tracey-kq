'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { Scissors, Sparkles, Clock, Ruler, Award, CheckCircle } from 'lucide-react';

export default function AtelierView() {
  const { setIsBespokeModalOpen } = useStore();

  const steps = [
    {
      num: '01',
      title: 'Private Consultation',
      desc: 'Meet virtually or at our Accra showroom with Tracey Kuukua Quansah to define your creative intent and silhouette.',
    },
    {
      num: '02',
      title: 'Precision Measurements',
      desc: 'Over 24 anatomical metrics recorded to construct an individualized digital couture mannequin.',
    },
    {
      num: '03',
      title: 'Textile Selection',
      desc: 'Hand-loomed Ghanaian silks, organic cotton twills, and Italian wools sourced exclusively for your creation.',
    },
    {
      num: '04',
      title: 'Toile & Final Fitting',
      desc: 'Prototype fit validation followed by meticulous hand-stitching and final delivery with custom garment bag.',
    },
  ];

  return (
    <div className="bg-[#183015] text-white py-16 px-4 sm:px-6 lg:px-8 space-y-20">
      {/* Atelier Hero */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C8E96B] flex items-center gap-2">
            <Scissors className="w-4 h-4" />
            Accra Haute Couture Atelier
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight text-white leading-tight">
            THE ART OF BESPOKE
          </h1>
          <p className="text-base sm:text-lg text-gray-300 font-light leading-relaxed max-w-xl">
            Where ancestral craftsmanship meets contemporary sculpture. Each bespoke garment represents between 40 to 120 hours of hand-embroidery, tailored exclusively for you.
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <button
              onClick={() => setIsBespokeModalOpen(true)}
              className="py-4 px-8 bg-[#C8E96B] hover:bg-[#b8db56] text-[#122410] rounded-full font-bold text-xs uppercase tracking-wider shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Book Made-to-Measure</span>
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-[#2A4E1F]">
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=85"
              alt="Atelier fitting"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-[#122410]/95 backdrop-blur-md border border-[#2A4E1F] p-5 rounded-2xl shadow-2xl max-w-xs hidden sm:block">
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 text-[#C8E96B]" />
              <div>
                <p className="text-xs font-serif font-bold text-white">48h Hand-Stitching</p>
                <p className="text-[10px] text-gray-400 font-light">Per garment standard</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Steps Process */}
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-[#C8E96B] uppercase tracking-widest">
            From Vision to Silhouette
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-white">
            The Commissioning Journey
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((st) => (
            <div
              key={st.num}
              className="bg-[#1E3D1A] border border-[#2A4E1F] p-6 rounded-3xl space-y-4 hover:border-[#C8E96B]/50 transition-colors shadow-lg"
            >
              <span className="text-4xl font-serif font-black text-[#C8E96B]">
                {st.num}
              </span>
              <h3 className="font-serif font-bold text-lg text-white">
                {st.title}
              </h3>
              <p className="text-xs text-gray-300 font-light leading-relaxed">
                {st.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
