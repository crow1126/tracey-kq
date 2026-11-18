'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { Ruler, User, Mail, MapPin, Package, Heart, Sparkles, Check, ArrowRight } from 'lucide-react';

export default function PatronView() {
  const { userMeasurements, updateMeasurements, wishlist, setActiveTab, setQuickViewProduct } = useStore();
  const [unit, setUnit] = useState<'inches' | 'cm'>(userMeasurements.unit);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [form, setForm] = useState({
    bust: userMeasurements.bust,
    waist: userMeasurements.waist,
    hips: userMeasurements.hips,
    shoulder: userMeasurements.shoulder,
    height: userMeasurements.height,
  });

  const handleUnitToggle = () => {
    const nextUnit = unit === 'inches' ? 'cm' : 'inches';
    const factor = nextUnit === 'cm' ? 2.54 : 1 / 2.54;
    setUnit(nextUnit);
    setForm({
      bust: Math.round(form.bust * factor * 10) / 10,
      waist: Math.round(form.waist * factor * 10) / 10,
      hips: Math.round(form.hips * factor * 10) / 10,
      shoulder: Math.round(form.shoulder * factor * 10) / 10,
      height: Math.round(form.height * factor * 10) / 10,
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateMeasurements({ ...form, unit });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="bg-[#183015] text-white py-12 px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="max-w-4xl mx-auto space-y-4 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-[#C8E96B] flex items-center justify-center gap-2">
          <User className="w-3.5 h-3.5" />
          Client Atelier Passport
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-white">
          PATRON PROFILE
        </h1>
        <p className="text-sm text-gray-300 font-light max-w-md mx-auto">
          Manage your bespoke anatomical measurements, preferred deliveries, and curated wishlist items.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Patron Info Card */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-[#1E3D1A] border border-[#2A4E1F] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#2A4E1F] border-2 border-[#C8E96B] flex items-center justify-center text-xl font-serif font-bold text-[#C8E96B]">
                AM
              </div>
              <div>
                <h3 className="font-serif font-black text-xl text-white">
                  Ama Mensah-Bonsu
                </h3>
                <span className="text-xs font-mono text-[#C8E96B] tracking-wider">
                  VIP COUTURE PATRON
                </span>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-[#2A4E1F] text-xs text-gray-300">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <span>ama.mensah@prestige.gh</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                <span>Airport Residential Area, Accra, Ghana</span>
              </div>
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-gray-400" />
                <span>2 Active Bespoke Commissions</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-[#1E3D1A] border border-[#2A4E1F] rounded-3xl p-6 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Couture Services
            </h4>
            <button
              onClick={() => setActiveTab('boutique')}
              className="w-full text-left py-2.5 px-4 rounded-xl bg-[#2A4E1F] hover:bg-[#3A662C] text-xs font-bold text-white flex items-center justify-between transition-colors"
            >
              <span>Explore New Arrivals</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C8E96B]" />
            </button>
            <button
              onClick={() => setActiveTab('lookbook')}
              className="w-full text-left py-2.5 px-4 rounded-xl bg-[#2A4E1F] hover:bg-[#3A662C] text-xs font-bold text-white flex items-center justify-between transition-colors"
            >
              <span>View Latest Lookbook</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C8E96B]" />
            </button>
          </div>
        </div>

        {/* Anatomical Measurements Form */}
        <div className="md:col-span-7 bg-[#1E3D1A] border border-[#2A4E1F] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Ruler className="w-5 h-5 text-[#C8E96B]" />
              <h3 className="font-serif font-black text-xl text-white">
                Bespoke Measurements
              </h3>
            </div>
            <button
              onClick={handleUnitToggle}
              className="text-xs font-bold uppercase tracking-wider bg-[#2A4E1F] hover:bg-[#3A662C] text-[#C8E96B] px-3.5 py-1.5 rounded-full border border-[#C8E96B]/30 transition-colors"
            >
              Unit: {unit.toUpperCase()}
            </button>
          </div>

          <p className="text-xs text-gray-300 font-light leading-relaxed">
            These figures are referenced by master patternmakers in Accra to cut custom garments without requiring additional physical fittings.
          </p>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase text-gray-400 block mb-1">
                  Bust ({unit})
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={form.bust}
                  onChange={(e) => setForm({ ...form, bust: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-[#122410] border border-[#2A4E1F] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C8E96B]"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-gray-400 block mb-1">
                  Waist ({unit})
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={form.waist}
                  onChange={(e) => setForm({ ...form, waist: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-[#122410] border border-[#2A4E1F] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C8E96B]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase text-gray-400 block mb-1">
                  Hips ({unit})
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={form.hips}
                  onChange={(e) => setForm({ ...form, hips: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-[#122410] border border-[#2A4E1F] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C8E96B]"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-gray-400 block mb-1">
                  Shoulder Width ({unit})
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={form.shoulder}
                  onChange={(e) => setForm({ ...form, shoulder: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-[#122410] border border-[#2A4E1F] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C8E96B]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase text-gray-400 block mb-1">
                Full Height ({unit})
              </label>
              <input
                type="number"
                step="0.1"
                value={form.height}
                onChange={(e) => setForm({ ...form, height: parseFloat(e.target.value) || 0 })}
                className="w-full bg-[#122410] border border-[#2A4E1F] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C8E96B]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#C8E96B] hover:bg-[#b8db56] text-[#122410] rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Measurements Saved</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Save Measurements</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
