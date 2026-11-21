/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { ArrowRight, Scissors, Clock, Users, Heart, Sparkles } from 'lucide-react';
import Button from '../ui/Button';

export default function OurStoryView() {
  const { setActiveView } = useStore();

  return (
    <div className="bg-[#F8FAF8] min-h-screen pt-10 sm:pt-14 pb-32 px-5 sm:px-8 lg:px-12 space-y-16 max-w-5xl mx-auto text-[#111113]">
      {/* ── Brand Header ── */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-[#0F5132] px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase">
          <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
          <span>OUR STORY · T.I.M.E FITS</span>
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0B1910] font-serif">
          A Story Woven Through Time
        </h1>
        <p className="text-sm sm:text-base text-gray-700 font-normal leading-relaxed">
          T.I.M.E fits began with a conviction: fashion should do more than follow the moment—it should hold meaning long after the moment is gone.
        </p>
      </div>

      {/* ── Section 1: The Chapters of Life Narrative ── */}
      <div className="bg-white rounded-[28px] p-8 sm:p-12 border border-emerald-900/10 shadow-sm space-y-6 leading-relaxed">
        <p className="text-sm sm:text-base text-gray-800">
          We see life as a series of chapters, each with its own rhythm, beauty and significance. Childhood opens the world with wonder. Adolescence brings discovery, change and self-expression. Adulthood carries ambition, love, responsibility and milestones. Later years reveal the richness of experience and the quiet power of a life fully lived.
        </p>
        <p className="text-base sm:text-lg font-serif font-bold text-[#0F5132] border-l-4 border-[#16A34A] pl-4 py-1 italic">
          &ldquo;Every chapter deserves to be honoured.&rdquo;
        </p>
        <p className="text-sm sm:text-base text-gray-800">
          That belief shaped the foundation of T.I.M.E fits. We set out to create a fashion identity that moves with life, bringing people and generations together through clothing that feels personal, enduring and relevant to the moment.
        </p>
        <p className="text-sm sm:text-base text-gray-800">
          Our vision is to create pieces that accompany the experiences people hold close: the achievements they celebrate, the relationships they cherish and the stories they pass forward.
        </p>
        <div className="bg-emerald-50/70 p-5 rounded-2xl border border-emerald-200 text-xs sm:text-sm text-[#0F5132] font-medium">
          This vision is for everyone. Every age, body, identity, personality and personal style belongs in the conversation. As we grow, our promise remains clear: create with purpose, design with conviction and stay true to the reason we began.
        </div>
        <p className="text-xs sm:text-sm text-gray-600 font-serif italic text-right">
          This is the story of T.I.M.E fits—a story still unfolding, with generations yet to wear it.
        </p>
      </div>

      {/* ── Section 2: MEET THE DESIGNER (Kukua-Tracey) ── */}
      <div className="relative rounded-[32px] overflow-hidden bg-[#0B1910] text-white shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-5 aspect-[4/5] sm:aspect-square lg:aspect-auto h-full relative">
            <img
              src="/brand/photo_2_2026-11-21_13-00-31.jpg"
              alt="Kukua-Tracey | Founder & Creative Director, T.I.M.E fits"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1910] via-transparent to-transparent lg:hidden" />
          </div>

          <div className="lg:col-span-7 p-8 sm:p-12 space-y-5">
            <div className="inline-flex items-center gap-2 bg-[#0F5132]/80 border border-[#22C55E]/40 text-[#4ADE80] px-3.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
              MEET THE DESIGNER
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold font-serif tracking-tight text-white">
              Kukua-Tracey
            </h2>
            <p className="text-xs sm:text-sm text-emerald-300 font-medium">
              Founder & Creative Director, T.I.M.E fits
            </p>
            <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
              At the heart of T.I.M.E fits is Kukua-Tracey, a designer who sees clothing as a language of memory, identity and belonging. To her, a garment is never merely worn—it can hold a feeling, mark a turning point and become part of the story a person carries forward.
            </p>
            <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
              Every piece begins with intention. From the first sketch to the final stitch, she considers the fabric, silhouette, construction, detail and finish as part of one complete expression. Inclusivity is not an afterthought; it is part of the design itself.
            </p>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
              <p className="text-sm sm:text-base font-serif italic text-white font-semibold">
                &ldquo;We don’t design for seasons; we design for lifetimes.&rdquo;
              </p>
            </div>
            <p className="text-xs text-gray-400 font-mono">
              T.I.M.E fits — Tailored Perfection, Timeless Style.
            </p>
          </div>
        </div>
      </div>

      {/* ── Section 3: OUR PHILOSOPHY (The 5 Values) ── */}
      <div className="space-y-8">
        <div className="text-center space-y-3">
          <span className="text-[11px] font-bold tracking-[0.2em] text-[#0F5132] uppercase">
            OUR PHILOSOPHY
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#0B1910] font-serif">
            We Don’t Design for Seasons; We Design for Lifetimes.
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto">
            Our philosophy defines how T.I.M.E fits approaches design, production and growth. It is built around five core values:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Value 1 */}
          <div className="bg-white p-7 rounded-[24px] border border-emerald-900/10 shadow-sm space-y-3 hover:border-emerald-500/40 transition-colors">
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-[#0F5132] flex items-center justify-center font-bold">
              <Clock className="w-5 h-5 text-[#0F5132]" />
            </div>
            <h3 className="font-bold text-base text-[#0B1910] uppercase tracking-wide">1. TIMELESSNESS</h3>
            <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed">
              We create with an eye beyond the present. Our designs are made to remain beautiful, relevant and compelling long after the trend has moved on.
            </p>
          </div>

          {/* Value 2 */}
          <div className="bg-white p-7 rounded-[24px] border border-emerald-900/10 shadow-sm space-y-3 hover:border-emerald-500/40 transition-colors">
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-[#0F5132] flex items-center justify-center font-bold">
              <Scissors className="w-5 h-5 text-[#0F5132]" />
            </div>
            <h3 className="font-bold text-base text-[#0B1910] uppercase tracking-wide">2. CRAFTSMANSHIP</h3>
            <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed">
              Every garment is an act of care. From illustration and fabric selection to cutting, construction, stitching, creative detailing and final finish, we honour precision and patience.
            </p>
          </div>

          {/* Value 3 */}
          <div className="bg-white p-7 rounded-[24px] border border-emerald-900/10 shadow-sm space-y-3 hover:border-emerald-500/40 transition-colors">
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-[#0F5132] flex items-center justify-center font-bold">
              <Users className="w-5 h-5 text-[#0F5132]" />
            </div>
            <h3 className="font-bold text-base text-[#0B1910] uppercase tracking-wide">3. INCLUSIVITY</h3>
            <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed">
              Style belongs to everyone. We design with respect for different ages, bodies, identities and personal expressions, creating space for every wearer to feel welcomed and confident.
            </p>
          </div>

          {/* Value 4 */}
          <div className="bg-white p-7 rounded-[24px] border border-emerald-900/10 shadow-sm space-y-3 hover:border-emerald-500/40 transition-colors">
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-[#0F5132] flex items-center justify-center font-bold">
              <Heart className="w-5 h-5 text-[#0F5132]" />
            </div>
            <h3 className="font-bold text-base text-[#0B1910] uppercase tracking-wide">4. CONNECTION</h3>
            <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed">
              Clothing can bring people closer to the moments and relationships that matter most. Family, friendship, love, community and belonging remain central to our creative world.
            </p>
          </div>

          {/* Value 5 */}
          <div className="bg-white p-7 rounded-[24px] border border-emerald-900/10 shadow-sm space-y-3 hover:border-emerald-500/40 transition-colors sm:col-span-2 lg:col-span-1">
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-[#0F5132] flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5 text-[#0F5132]" />
            </div>
            <h3 className="font-bold text-base text-[#0B1910] uppercase tracking-wide">5. PURPOSE</h3>
            <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed">
              Nothing is designed without intention. Every piece should express an idea, honour an occasion, celebrate a person or serve a meaningful place in the wearer’s life.
            </p>
          </div>

          {/* Guiding Principle Card */}
          <div className="bg-[#0F5132] text-white p-7 rounded-[24px] shadow-md flex flex-col justify-center sm:col-span-2 lg:col-span-1">
            <span className="text-[10px] tracking-widest uppercase font-bold text-emerald-200">
              GUIDING PRINCIPLE
            </span>
            <h4 className="text-xl sm:text-2xl font-serif font-black tracking-wider text-white mt-1">
              THIS OR NOTHING ELSE.
            </h4>
            <p className="text-xs text-emerald-100 font-light mt-2">
              Fashion may change. Memories last forever.
            </p>
          </div>
        </div>
      </div>

      {/* ── Shoppable End Banner ── */}
      <div className="bg-[#0B1910] text-white rounded-[28px] p-8 sm:p-12 text-center space-y-5 shadow-xl">
        <span className="text-[11px] font-bold tracking-[0.2em] text-[#4ADE80] uppercase">
          EXPERIENCE T.I.M.E FITS
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold font-serif text-white">
          Meaning Woven Into Every Thread
        </h2>
        <p className="text-xs sm:text-sm text-gray-300 max-w-lg mx-auto font-light leading-relaxed">
          Explore our handcrafted collections or book an exclusive bespoke made-to-measure fitting with Kukua-Tracey in Accra.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Button
            variant="get-started"
            onClick={() => setActiveView('collections')}
            className="h-11 px-6 rounded-full shadow-lg"
          >
            <span>Explore Our Collections</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>

          <button
            onClick={() => setActiveView('bespoke')}
            className="h-11 px-6 rounded-full bg-[#0F5132] text-white border border-white/20 hover:bg-[#166534] text-xs font-semibold transition-all shadow cursor-pointer"
          >
            Book Bespoke Fitting
          </button>
        </div>
      </div>
    </div>
  );
}
