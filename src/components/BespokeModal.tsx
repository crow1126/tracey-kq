'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { X, Calendar, Scissors, Sparkles, Check, Clock, User, Mail, Phone, MessageSquare } from 'lucide-react';

export default function BespokeModal() {
  const { isBespokeModalOpen, setIsBespokeModalOpen } = useStore();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    garmentType: 'Evening Gown',
    preferredDate: '',
    notes: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isBespokeModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsBespokeModalOpen(false);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setIsBespokeModalOpen(false)}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative bg-[#183015] border border-[#2A4E1F] rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl z-10 text-white my-8">
        <button
          onClick={() => setIsBespokeModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#122410]/80 text-gray-300 hover:text-white hover:bg-[#2A4E1F] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#C8E96B] text-[#122410] flex items-center justify-center shadow-xl animate-bounce">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h3 className="font-serif font-black text-2xl text-white">
              Consultation Scheduled
            </h3>
            <p className="text-sm text-gray-300 max-w-md font-light leading-relaxed">
              Tracey Kuukua Quansah&apos;s personal concierge will contact you within 24 hours to confirm your private atelier appointment.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C8E96B]">
                <Scissors className="w-4 h-4" />
                <span>Haute Couture Made-to-Measure</span>
              </div>
              <h3 className="font-serif font-black text-2xl sm:text-3xl text-white">
                Book Atelier Consultation
              </h3>
              <p className="text-xs text-gray-300 font-light leading-relaxed">
                Experience personal fittings and collaborate with Tracey on bespoke silhouettes sculpted precisely to your measurements.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-300 block mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
                  <input
                    type="text"
                    required
                    placeholder="Ama Mensah"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#1E3D1A] border border-[#2A4E1F] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#C8E96B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-300 block mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
                    <input
                      type="email"
                      required
                      placeholder="ama@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#1E3D1A] border border-[#2A4E1F] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#C8E96B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-300 block mb-1">
                    Phone / WhatsApp
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
                    <input
                      type="tel"
                      required
                      placeholder="+233 20 891 2345"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#1E3D1A] border border-[#2A4E1F] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#C8E96B]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-300 block mb-1">
                    Garment Classification
                  </label>
                  <select
                    value={formData.garmentType}
                    onChange={(e) => setFormData({ ...formData, garmentType: e.target.value })}
                    className="w-full bg-[#1E3D1A] border border-[#2A4E1F] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C8E96B]"
                  >
                    <option value="Evening Gown">Evening Gown</option>
                    <option value="Bridal Couture">Bridal Couture</option>
                    <option value="Tailored Suit">Tailored Suit</option>
                    <option value="Silk Cape Set">Silk Cape Set</option>
                    <option value="Resort Ensemble">Resort Ensemble</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-300 block mb-1">
                    Preferred Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
                    <input
                      type="date"
                      required
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full bg-[#1E3D1A] border border-[#2A4E1F] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C8E96B]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-300 block mb-1">
                  Creative Vision / Notes
                </label>
                <div className="relative">
                  <MessageSquare className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
                  <textarea
                    rows={3}
                    placeholder="Event date, fabric preferences, moodboards..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-[#1E3D1A] border border-[#2A4E1F] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#C8E96B]"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#C8E96B] hover:bg-[#b8db56] text-[#122410] rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Request Private Consultation</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
