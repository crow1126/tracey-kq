'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { Scissors, Sparkles, Check, Ruler, Award, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';

export default function BespokeView() {
  const { submitBespokeEnquiry } = useStore();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: 'Bespoke Tailoring' as 'Bespoke Tailoring' | 'Bridal' | 'Red Carpet' | 'Bulk / Corporate',
    preferredDate: '',
    budgetGhc: 'GH₵ 15,000 - GH₵ 25,000',
    message: '',
  });

  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitBespokeEnquiry(formData);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        serviceType: 'Bespoke Tailoring',
        preferredDate: '',
        budgetGhc: 'GH₵ 15,000 - GH₵ 25,000',
        message: '',
      });
    }, 4000);
  };

  return (
    <div className="bg-[#F5F5F7] min-h-screen pt-12 pb-32 px-5 sm:px-8 lg:px-12 space-y-16 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="text-[11px] font-medium tracking-[0.2em] text-[#6B73F0] uppercase flex items-center justify-center gap-2">
          <Scissors className="w-3.5 h-3.5" />
          HAUTE COUTURE COMMISSIONING
        </span>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#111113] font-display">
          Custom & Bespoke Commissions
        </h1>
        <p className="text-sm sm:text-base text-[#3A3A3F] font-light leading-relaxed">
          From one-of-a-kind wedding gowns and red carpet ensembles to diplomatic ceremonies and corporate event delegations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Guarantees & Process */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#111113] text-white rounded-[24px] p-6 sm:p-8 space-y-6 shadow-md-card">
            <h3 className="font-bold text-xl font-display text-white">
              The Atelier Experience
            </h3>

            <div className="space-y-4 text-xs text-[#A1A1A8]">
              <div className="flex items-start gap-3">
                <Ruler className="w-5 h-5 text-[#6B73F0] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-white">24 Anatomical Metrics</h4>
                  <p className="font-light mt-0.5">Calibrated precisely to your posture and shoulder slope.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-[#C8E96B] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-white">Hand-Loomed Bonwire Kente</h4>
                  <p className="font-light mt-0.5">Exclusive custom weave colors crafted to order.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-[#6B73F0] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-white">48+ Hours Hand Embroidery</h4>
                  <p className="font-light mt-0.5">Recycled brass buttons and gold bullion metallic threads.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[24px] p-6 border border-[#E6E6EA] shadow-sm-card space-y-2">
            <h4 className="font-bold text-sm text-[#111113]">Atelier Address</h4>
            <p className="text-xs text-[#8A8A8F]">Senchi Street, Airport Residential Area, Accra, Ghana</p>
            <p className="text-xs text-[#6B73F0] font-semibold pt-1">Direct Concierge: +233 (0) 20 891 2340</p>
          </div>
        </div>

        {/* Right Side: Enquiry Form */}
        <div className="lg:col-span-7 bg-white rounded-[28px] p-6 sm:p-10 border border-[#E6E6EA] shadow-sm-card">
          {isSuccess ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#1F8A4C]/10 text-[#1F8A4C] flex items-center justify-center mx-auto animate-bounce">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
              <h3 className="font-bold text-2xl text-[#111113] font-display">
                Enquiry Received with Honor
              </h3>
              <p className="text-sm text-[#8A8A8F] max-w-md mx-auto font-light leading-relaxed">
                Tracey Kuukua Quansah&apos;s personal atelier coordinator will reach out to schedule your private consultation session.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h3 className="font-bold text-xl text-[#111113] font-display">
                Request a Private Commission
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#3A3A3F] block mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ama Mensah-Bonsu"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="h-[52px] w-full rounded-full bg-[#F5F5F7] border border-[#E6E6EA] px-5 text-sm text-[#111113] focus:outline-none focus:border-[#6B73F0]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#3A3A3F] block mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="ama@capitalgh.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="h-[52px] w-full rounded-full bg-[#F5F5F7] border border-[#E6E6EA] px-5 text-sm text-[#111113] focus:outline-none focus:border-[#6B73F0]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#3A3A3F] block mb-1.5">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+233 20 891 2345"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="h-[52px] w-full rounded-full bg-[#F5F5F7] border border-[#E6E6EA] px-5 text-sm text-[#111113] focus:outline-none focus:border-[#6B73F0]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#3A3A3F] block mb-1.5">
                      Commission Scope
                    </label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          serviceType: e.target.value as 'Bespoke Tailoring' | 'Bridal' | 'Red Carpet' | 'Bulk / Corporate',
                        })
                      }
                      className="h-[52px] w-full rounded-full bg-[#F5F5F7] border border-[#E6E6EA] px-5 text-sm text-[#111113] focus:outline-none focus:border-[#6B73F0]"
                    >
                      <option value="Bespoke Tailoring">Bespoke Tailoring</option>
                      <option value="Bridal">Bridal & Wedding Gala</option>
                      <option value="Red Carpet">Red Carpet / State Event</option>
                      <option value="Bulk / Corporate">Bulk / Corporate Delegation</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#3A3A3F] block mb-1.5">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="h-[52px] w-full rounded-full bg-[#F5F5F7] border border-[#E6E6EA] px-5 text-sm text-[#111113] focus:outline-none focus:border-[#6B73F0]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#3A3A3F] block mb-1.5">
                    Creative Brief / Garment Details
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Event details, silhouette references, colors, fabrics, or deadline requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-[20px] bg-[#F5F5F7] border border-[#E6E6EA] p-4 text-sm text-[#111113] focus:outline-none focus:border-[#6B73F0]"
                  />
                </div>
              </div>

              <Button type="submit" variant="primary" className="w-full">
                <span>Submit Bespoke Commission</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
