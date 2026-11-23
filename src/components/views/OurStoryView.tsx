/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import {
  ArrowRight,
  Scissors,
  Clock,
  Users,
  Heart,
  Sparkles,
  CheckCircle2,
  BookmarkCheck,
  Compass,
} from 'lucide-react';
import Button from '../ui/Button';

export default function OurStoryView() {
  const { setActiveView } = useStore();

  return (
    <div className="bg-[#F8FAF8] min-h-screen pt-8 sm:pt-14 pb-32 px-4 sm:px-8 lg:px-12 space-y-12 sm:space-y-16 max-w-5xl mx-auto text-[#111113]">
      {/* ── Brand Header ── */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-[#1E3A2E] px-3.5 py-1 rounded-full text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1E3A2E] animate-pulse" />
          <span>OUR STORY · T.I.M.E FITS</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0F1F17] font-serif">
          A Story Woven Through Time
        </h1>
        <p className="text-xs sm:text-base text-gray-700 font-normal leading-relaxed">
          T.I.M.E fits began with a conviction: fashion should do more than follow the moment—it should hold meaning long after the moment is gone.
        </p>
      </div>

      {/* ── Section 1: The Chapters of Life Narrative ── */}
      <div className="bg-white rounded-[24px] p-6 sm:p-10 border border-emerald-900/10 shadow-sm space-y-4 leading-relaxed">
        <p className="text-xs sm:text-base text-gray-800">
          We see life as a series of chapters, each with its own rhythm, beauty and significance. Childhood opens the world with wonder. Adolescence brings discovery, change and self-expression. Adulthood carries ambition, love, responsibility and milestones. Later years reveal the richness of experience and the quiet power of a life fully lived.
        </p>
        <p className="text-sm sm:text-lg font-serif font-bold text-[#1E3A2E] border-l-4 border-[#1E3A2E] pl-3.5 py-1 italic">
          &ldquo;Every chapter deserves to be honoured.&rdquo;
        </p>
        <p className="text-xs sm:text-base text-gray-800">
          That belief shaped the foundation of T.I.M.E fits. We set out to create a fashion identity that moves with life, bringing people and generations together through clothing that feels personal, enduring and relevant to the moment.
        </p>
        <p className="text-xs sm:text-base text-gray-800">
          Our vision is to create pieces that accompany the experiences people hold close: the achievements they celebrate, the relationships they cherish and the stories they pass forward.
        </p>
        <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-200 text-xs sm:text-sm text-[#1E3A2E] font-medium">
          This vision is for everyone. Every age, body, identity, personality and personal style belongs in the conversation. As we grow, our promise remains clear: create with purpose, design with conviction and stay true to the reason we began.
        </div>
        <p className="text-xs sm:text-sm text-gray-600 font-serif italic text-right">
          This is the story of T.I.M.E fits—a story still unfolding, with generations yet to wear it.
        </p>
      </div>

      {/* ── Section 2: MEET THE DESIGNER (Kukua-Tracey) ── */}
      <div id="meet-the-designer" className="relative rounded-[28px] overflow-hidden bg-[#0F1F17] text-white shadow-xl scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-5 aspect-[4/5] sm:aspect-square lg:aspect-auto h-full relative min-h-[320px]">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85"
              alt="Kukua-Tracey | Founder & Creative Director, T.I.M.E fits"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F1F17] via-transparent to-transparent lg:hidden" />
          </div>

          <div className="lg:col-span-7 p-6 sm:p-10 space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#1E3A2E]/80 border border-[#C7CBB8]/40 text-[#C7CBB8] px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
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
              Her creative vision is grounded in one powerful belief: fashion should feel personal, purposeful and built to endure. Inspired by life in all its stages—from childhood and adolescence to adulthood and beyond—she designs with a deep respect for the stories that make each person distinct.
            </p>
            <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/20">
              <p className="text-xs sm:text-sm font-serif italic text-white font-semibold">
                &ldquo;We don’t design for seasons; we design for lifetimes.&rdquo;
              </p>
            </div>
            <p className="text-[11px] text-gray-400 font-mono">
              T.I.M.E fits — Tailored Perfection, Timeless Style.
            </p>
          </div>
        </div>
      </div>

      {/* ── Section 3: The T.I.M.E fits Memory Tag Feature ── */}
      <div className="bg-gradient-to-br from-[#1E3A2E] to-[#0F1F17] text-white rounded-[24px] p-6 sm:p-10 shadow-lg border border-emerald-500/30">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7 space-y-3">
            <div className="inline-flex items-center gap-1.5 bg-black/40 text-[#C7CBB8] px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase">
              <BookmarkCheck className="w-3.5 h-3.5" />
              <span>SIGNATURE HERITAGE DETAIL</span>
            </div>
            <h3 className="text-xl sm:text-3xl font-serif font-bold text-white">
              The T.I.M.E fits Memory Tag
            </h3>
            <p className="text-xs sm:text-sm text-gray-200 font-light leading-relaxed">
              Clothing carries history. Every garment tailored at T.I.M.E fits is finished with our iconic emerald memory tag card, inviting you to record the moment you stepped into the piece and the memory you carry forward.
            </p>
          </div>

          <div className="md:col-span-5">
            <div className="bg-white text-[#0F1F17] p-5 rounded-2xl shadow-xl border-2 border-emerald-600/30 font-serif space-y-3">
              <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                <span className="text-[10px] tracking-widest uppercase font-bold text-[#1E3A2E]">
                  T.I.M.E fits · Atelier
                </span>
                <span className="text-[9px] text-gray-500 font-sans">ACCRA</span>
              </div>
              <p className="text-xs italic text-gray-700 leading-relaxed">
                &ldquo;Sometimes, what we wear becomes part of what we remember. This piece was created to be part of your story.&rdquo;
              </p>
              <div className="space-y-1.5 pt-1 text-[11px] font-mono text-gray-800">
                <div className="flex justify-between border-b border-dotted border-gray-400 pb-0.5">
                  <span>DATE:</span>
                  <span className="text-gray-400">______________</span>
                </div>
                <div className="flex justify-between border-b border-dotted border-gray-400 pb-0.5">
                  <span>OCCASION:</span>
                  <span className="text-gray-400">______________</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Section 4: OUR PHILOSOPHY (The 5 Values) ── */}
      <div id="brand-philosophy" className="space-y-6 scroll-mt-24">
        <div className="text-center space-y-2">
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#1E3A2E] uppercase">
            OUR PHILOSOPHY
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#0F1F17] font-serif">
            We Don’t Design for Seasons; We Design for Lifetimes.
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto">
            Our philosophy defines how T.I.M.E fits approaches design, production and growth. It is built around five core values:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Value 1 */}
          <div className="bg-white p-6 rounded-[20px] border border-emerald-900/10 shadow-sm space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#1E3A2E] flex items-center justify-center font-bold">
              <Clock className="w-4 h-4 text-[#1E3A2E]" />
            </div>
            <h3 className="font-bold text-sm text-[#0F1F17] uppercase tracking-wide">1. TIMELESSNESS</h3>
            <p className="text-xs text-gray-600 font-light leading-relaxed">
              We create with an eye beyond the present. Our designs are made to remain beautiful, relevant and compelling long after the trend has moved on.
            </p>
          </div>

          {/* Value 2 */}
          <div className="bg-white p-6 rounded-[20px] border border-emerald-900/10 shadow-sm space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#1E3A2E] flex items-center justify-center font-bold">
              <Scissors className="w-4 h-4 text-[#1E3A2E]" />
            </div>
            <h3 className="font-bold text-sm text-[#0F1F17] uppercase tracking-wide">2. CRAFTSMANSHIP</h3>
            <p className="text-xs text-gray-600 font-light leading-relaxed">
              Every garment is an act of care. From illustration and fabric selection to cutting, construction, stitching, creative detailing and final finish, we honour precision and patience.
            </p>
          </div>

          {/* Value 3 */}
          <div className="bg-white p-6 rounded-[20px] border border-emerald-900/10 shadow-sm space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#1E3A2E] flex items-center justify-center font-bold">
              <Users className="w-4 h-4 text-[#1E3A2E]" />
            </div>
            <h3 className="font-bold text-sm text-[#0F1F17] uppercase tracking-wide">3. INCLUSIVITY</h3>
            <p className="text-xs text-gray-600 font-light leading-relaxed">
              Style belongs to everyone. We design with respect for different ages, bodies, identities and personal expressions, creating space for every wearer to feel welcomed and confident.
            </p>
          </div>

          {/* Value 4 */}
          <div className="bg-white p-6 rounded-[20px] border border-emerald-900/10 shadow-sm space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#1E3A2E] flex items-center justify-center font-bold">
              <Heart className="w-4 h-4 text-[#1E3A2E]" />
            </div>
            <h3 className="font-bold text-sm text-[#0F1F17] uppercase tracking-wide">4. CONNECTION</h3>
            <p className="text-xs text-gray-600 font-light leading-relaxed">
              Clothing can bring people closer to the moments and relationships that matter most. Family, friendship, love, community and belonging remain central to our creative world.
            </p>
          </div>

          {/* Value 5 */}
          <div className="bg-white p-6 rounded-[20px] border border-emerald-900/10 shadow-sm space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#1E3A2E] flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4 text-[#1E3A2E]" />
            </div>
            <h3 className="font-bold text-sm text-[#0F1F17] uppercase tracking-wide">5. PURPOSE</h3>
            <p className="text-xs text-gray-600 font-light leading-relaxed">
              Nothing is designed without intention. Every piece should express an idea, honour an occasion, celebrate a person or serve a meaningful place in the wearer’s life.
            </p>
          </div>

          {/* Guiding Principle Card */}
          <div className="bg-[#1E3A2E] text-white p-6 rounded-[20px] shadow-sm flex flex-col justify-center">
            <span className="text-[10px] tracking-widest uppercase font-bold text-emerald-200">
              GUIDING PRINCIPLE
            </span>
            <h4 className="text-lg sm:text-xl font-serif font-black tracking-wider text-white mt-1">
              THIS OR NOTHING ELSE.
            </h4>
            <p className="text-xs text-emerald-100 font-light mt-1">
              Fashion may change. Memories last forever.
            </p>
          </div>
        </div>
      </div>

      {/* ── Section 5: The 6-Stage Design Process ── */}
      <div className="bg-white rounded-[24px] p-6 sm:p-10 border border-emerald-900/10 shadow-sm space-y-6">
        <div className="text-center space-y-1">
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#1E3A2E] uppercase">
            HOW WE CREATE
          </span>
          <h2 className="text-xl sm:text-3xl font-serif font-bold text-[#0F1F17]">
            The 6-Stage Design Process
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              step: '01',
              title: 'Inspiration',
              desc: 'Drawing from memory, human connections, milestones, and the evolving chapters of life.',
            },
            {
              step: '02',
              title: 'Illustration',
              desc: 'Translating concepts and personal stories into refined silhouettes, mood boards, and technical sketches.',
            },
            {
              step: '03',
              title: 'Fabric Selection',
              desc: 'Carefully curating tactile mulberry silks, genuine hand-woven Bonwire Kente, and durable luxury textiles.',
            },
            {
              step: '04',
              title: 'Cutting & Construction',
              desc: 'Precision cutting, anatomical drape shaping, and master garment construction for enduring wear.',
            },
            {
              step: '05',
              title: 'Detailing',
              desc: 'Hand-sewn beadwork, metallic thread embroidery, bespoke buttons, and delicate finishing touches.',
            },
            {
              step: '06',
              title: 'Final Presentation',
              desc: 'Artisanal steaming, signature scenting, and attaching the bespoke T.I.M.E fits Memory Tag.',
            },
          ].map((item) => (
            <div
              key={item.step}
              className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-1.5 hover:bg-emerald-50/50 transition-colors"
            >
              <span className="text-xs font-mono font-bold text-[#1E3A2E]">{item.step}</span>
              <h4 className="font-bold text-sm text-[#0F1F17]">{item.title}</h4>
              <p className="text-xs text-gray-600 font-light leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Section 6: Our Commitment to You (7 Customer Promises) ── */}
      <div className="bg-white rounded-[24px] p-6 sm:p-10 border border-emerald-900/10 shadow-sm space-y-5">
        <div className="text-center space-y-1">
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#1E3A2E] uppercase">
            OUR PROMISE
          </span>
          <h2 className="text-xl sm:text-3xl font-serif font-bold text-[#0F1F17]">
            Our Commitment to You
          </h2>
          <p className="text-xs text-gray-600 max-w-lg mx-auto">
            Seven standards we uphold for every client, wearer, and collector of T.I.M.E fits.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl mx-auto">
          {[
            'Thoughtful, original and purposeful designs',
            'Relentless attention to detail and neat finishing',
            'Consideration for every body type and silhouette',
            'High-quality, durable, and luxurious fabrics',
            'Supreme comfort and ease of movement',
            'Warm, respectful, and professional communication',
            'A memorable and uplifting atelier experience',
          ].map((promise, index) => (
            <div key={index} className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-50/60 border border-emerald-100">
              <CheckCircle2 className="w-4 h-4 text-[#1E3A2E] shrink-0" />
              <span className="text-xs font-medium text-gray-800">{promise}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Shoppable End Banner ── */}
      <div className="bg-[#0F1F17] text-white rounded-[24px] p-6 sm:p-10 text-center space-y-4 shadow-xl">
        <span className="text-[10px] font-bold tracking-widest text-[#C7CBB8] uppercase">
          EXPERIENCE T.I.M.E FITS
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white">
          Meaning Woven Into Every Thread
        </h2>
        <p className="text-xs sm:text-sm text-gray-300 max-w-lg mx-auto font-light leading-relaxed">
          Explore our handcrafted collections or book an exclusive bespoke made-to-measure fitting with Kukua-Tracey in Accra.
        </p>
        <div className="flex flex-wrap justify-center gap-2.5 pt-2">
          <Button
            variant="get-started"
            onClick={() => setActiveView('collections')}
            className="h-10 px-5 rounded-full text-xs shadow-lg"
          >
            <span>Explore Our Collections</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </Button>

          <button
            onClick={() => setActiveView('bespoke')}
            className="h-10 px-5 rounded-full bg-[#1E3A2E] text-white border border-white/20 hover:bg-[#3E5A3F] text-xs font-semibold transition-all shadow cursor-pointer"
          >
            Book Bespoke Fitting
          </button>
        </div>
      </div>
    </div>
  );
}
