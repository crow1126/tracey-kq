'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { ArrowRight, ArrowUpRight, Play, Sparkles } from 'lucide-react';

export default function HeroSection() {
  const { setActiveTab } = useStore();

  return (
    <section className="relative bg-[#1E3D1A] overflow-hidden text-white pt-6 pb-20 px-4 sm:px-6 lg:px-8 border-b border-[#2A4E1F]">
      {/* Giant Outline Brand Typography Background (Image 1 reference) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-35">
        <span className="text-[18vw] font-serif font-black tracking-tighter text-stroke-white leading-none">
          TRACEY
        </span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Hero Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[520px]">
          {/* Left Column: Video Badge & Stat */}
          <div className="lg:col-span-3 flex flex-col justify-between space-y-12">
            {/* Watch Video Pill Card (Image 1 style) */}
            <div className="inline-flex items-center gap-3 bg-white text-[#1E3D1A] p-2 pr-5 rounded-2xl shadow-2xl backdrop-blur-md transform hover:-translate-y-1 transition-all cursor-pointer group w-fit">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-[#2A4E1F] flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                  alt="Watch video"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <Play className="w-4 h-4 text-white fill-white" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400">
                  Fashion Film
                </span>
                <span className="text-sm font-extrabold tracking-tight">
                  Watch Video
                </span>
              </div>
            </div>

            {/* 12k Stat Badge */}
            <div className="space-y-1">
              <div className="text-5xl sm:text-6xl font-serif font-black tracking-tight text-white flex items-baseline gap-1">
                12k<span className="text-[#C8E96B] text-4xl">+</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-gray-300 uppercase">
                <span className="w-2.5 h-2.5 rounded-full bg-white inline-block animate-ping"></span>
                <span>NEW COLLECTION 2025</span>
              </div>
            </div>
          </div>

          {/* Center Column: Model Imagery (Image 1 style) */}
          <div className="lg:col-span-6 flex justify-center relative">
            <div className="relative w-72 sm:w-96 h-[440px] sm:h-[500px]">
              {/* Radial Glow */}
              <div className="absolute inset-0 rounded-full bg-[#C8E96B]/15 filter blur-3xl transform scale-110"></div>
              
              <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-[#2A4E1F]/50 group">
                <img
                  src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=85"
                  alt="Tracey Kuukua Quansah Model"
                  className="w-full h-full object-cover object-top filter contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E3D1A] via-transparent to-transparent opacity-60"></div>
              </div>

              {/* Floating Tag */}
              <div className="absolute -bottom-4 right-4 bg-[#122410]/90 backdrop-blur-md border border-[#2A4E1F] text-white px-4 py-2 rounded-full text-xs font-medium flex items-center gap-2 shadow-xl animate-float-slow">
                <Sparkles className="w-3.5 h-3.5 text-[#C8E96B]" />
                <span>Designed by Tracey Kuukua Quansah</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Message & Action */}
          <div className="lg:col-span-3 space-y-8 flex flex-col justify-center">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#C8E96B]">
                Philosophy & Craft
              </span>
              <p className="text-base text-gray-200 leading-relaxed font-light">
                TRACEY KQ fashion is a minimalist style that emphasizes simplicity, naturalness and calmness — sculpted with ancestral Ghanaian elegance.
              </p>
            </div>

            <div>
              {/* Reference Image 1: White pill "SHOP NOW ->" button */}
              <button
                onClick={() => setActiveTab('boutique')}
                className="inline-flex items-center gap-3 bg-white hover:bg-[#F4F1EA] text-[#1E3D1A] px-8 py-4 rounded-full font-bold text-sm tracking-wider uppercase transition-all duration-300 transform hover:scale-105 hover:shadow-2xl active:scale-95 group shadow-lg"
              >
                <span>SHOP NOW</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Category Cards Grid (Image 1 reference) */}
        <div className="mt-16 pt-10 border-t border-[#2A4E1F]/60">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Men's Collection */}
            <div
              onClick={() => setActiveTab('boutique')}
              className="bg-[#FAFAF7] text-[#1E3D1A] p-4 rounded-3xl flex items-center gap-4 shadow-xl hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer group"
            >
              <div className="w-24 h-24 rounded-2xl overflow-hidden bg-[#2A4E1F] flex-shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=400&q=80"
                  alt="Men's Collection"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-extrabold text-xl tracking-tight">
                    Men&apos;s
                  </h3>
                  <div className="w-8 h-8 rounded-full bg-[#1E3D1A] text-white flex items-center justify-center group-hover:bg-[#C8E96B] group-hover:text-[#1E3D1A] transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-0.5">
                  Collection
                </p>
                <p className="text-xs text-gray-600 line-clamp-1 mt-1 font-light">
                  Tailored minimalist power silhouettes.
                </p>
              </div>
            </div>

            {/* Card 2: Girl's Collection */}
            <div
              onClick={() => setActiveTab('boutique')}
              className="bg-[#FAFAF7] text-[#1E3D1A] p-4 rounded-3xl flex items-center gap-4 shadow-xl hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer group"
            >
              <div className="w-24 h-24 rounded-2xl overflow-hidden bg-[#2A4E1F] flex-shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80"
                  alt="Girl's Collection"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-extrabold text-xl tracking-tight">
                    Girl&apos;s
                  </h3>
                  <div className="w-8 h-8 rounded-full bg-[#1E3D1A] text-white flex items-center justify-center group-hover:bg-[#C8E96B] group-hover:text-[#1E3D1A] transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-0.5">
                  Collection
                </p>
                <p className="text-xs text-gray-600 line-clamp-1 mt-1 font-light">
                  Haute couture and fluid silk gowns.
                </p>
              </div>
            </div>

            {/* Card 3: Kid's Collection */}
            <div
              onClick={() => setActiveTab('boutique')}
              className="bg-[#FAFAF7] text-[#1E3D1A] p-4 rounded-3xl flex items-center gap-4 shadow-xl hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer group"
            >
              <div className="w-24 h-24 rounded-2xl overflow-hidden bg-[#2A4E1F] flex-shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=400&q=80"
                  alt="Kid's Collection"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-extrabold text-xl tracking-tight">
                    Kid&apos;s
                  </h3>
                  <div className="w-8 h-8 rounded-full bg-[#1E3D1A] text-white flex items-center justify-center group-hover:bg-[#C8E96B] group-hover:text-[#1E3D1A] transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-0.5">
                  Collection
                </p>
                <p className="text-xs text-gray-600 line-clamp-1 mt-1 font-light">
                  Organic cotton and gentle luxury wear.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
