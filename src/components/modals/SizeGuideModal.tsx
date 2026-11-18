'use client';

import React, { useState } from 'react';
import { X, Ruler, Sparkles, Check } from 'lucide-react';
import Button from '../ui/Button';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSize?: (size: string) => void;
}

export default function SizeGuideModal({ isOpen, onClose, onSelectSize }: SizeGuideModalProps) {
  const [unit, setUnit] = useState<'in' | 'cm'>('in');
  const [bustInput, setBustInput] = useState<string>('36');
  const [waistInput, setWaistInput] = useState<string>('28');
  const [hipsInput, setHipsInput] = useState<string>('39');
  const [recommendedSize, setRecommendedSize] = useState<string | null>('M');

  if (!isOpen) return null;

  const calculateFit = () => {
    const bust = parseFloat(bustInput) || 36;
    const waist = parseFloat(waistInput) || 28;

    // Standard high-fashion grading
    const b = unit === 'cm' ? bust / 2.54 : bust;
    const w = unit === 'cm' ? waist / 2.54 : waist;

    if (b <= 33 && w <= 25) setRecommendedSize('XS');
    else if (b <= 35 && w <= 27) setRecommendedSize('S');
    else if (b <= 37 && w <= 29) setRecommendedSize('M');
    else if (b <= 40 && w <= 32) setRecommendedSize('L');
    else if (b <= 43 && w <= 35) setRecommendedSize('XL');
    else setRecommendedSize('XXL');
  };

  const chartData = [
    { size: 'XS', uk: 'UK 6', us: 'US 2', bustIn: '31-33', waistIn: '24-25', hipsIn: '34-35', bustCm: '79-84', waistCm: '61-64', hipsCm: '86-89' },
    { size: 'S', uk: 'UK 8', us: 'US 4', bustIn: '33-35', waistIn: '26-27', hipsIn: '36-37', bustCm: '84-89', waistCm: '66-69', hipsCm: '91-94' },
    { size: 'M', uk: 'UK 10-12', us: 'US 6-8', bustIn: '35-37', waistIn: '28-29', hipsIn: '38-40', bustCm: '89-94', waistCm: '71-74', hipsCm: '96-101' },
    { size: 'L', uk: 'UK 14', us: 'US 10', bustIn: '38-40', waistIn: '30-32', hipsIn: '41-43', bustCm: '96-102', waistCm: '76-81', hipsCm: '104-109' },
    { size: 'XL', uk: 'UK 16', us: 'US 12', bustIn: '41-43', waistIn: '33-35', hipsIn: '44-46', bustCm: '104-109', waistCm: '84-89', hipsCm: '112-117' },
    { size: 'XXL', uk: 'UK 18', us: 'US 14', bustIn: '44-46', waistIn: '36-38', hipsIn: '47-49', bustCm: '112-117', waistCm: '91-96', hipsCm: '119-124' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 z-10 shadow-2xl text-[#111113] border border-[#E6E6EA] my-8 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#EDEDF0] hover:bg-[#E6E6EA] transition-colors"
        >
          <X className="w-5 h-5 text-[#111113]" />
        </button>

        {/* Title */}
        <div className="space-y-1 mb-6">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B73F0] bg-[#ECEDFD] px-3 py-1 rounded-full uppercase tracking-wider">
            <Ruler className="w-3.5 h-3.5" />
            <span>Atelier Sizing System</span>
          </div>
          <h2 className="text-2xl font-bold text-[#111113]">Size Guide & Fit Advisor</h2>
          <p className="text-xs text-[#8A8A8F]">
            Hand-cut to haute couture standard proportions. Custom alterations available complimentary at our Accra Flagship.
          </p>
        </div>

        {/* Unit Toggle */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E6E6EA]">
          <span className="text-xs font-semibold text-[#3A3A3F]">Measurement Units</span>
          <div className="inline-flex rounded-full bg-[#EDEDF0] p-1">
            <button
              onClick={() => setUnit('in')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                unit === 'in' ? 'bg-[#111113] text-white shadow-sm' : 'text-[#8A8A8F]'
              }`}
            >
              Inches (in)
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                unit === 'cm' ? 'bg-[#111113] text-white shadow-sm' : 'text-[#8A8A8F]'
              }`}
            >
              Centimeters (cm)
            </button>
          </div>
        </div>

        {/* Size Chart Table */}
        <div className="overflow-x-auto my-6 border border-[#E6E6EA] rounded-2xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F5F5F7] border-b border-[#E6E6EA] text-[#8A8A8F] font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-3.5">Size</th>
                <th className="py-3 px-3.5">UK / US</th>
                <th className="py-3 px-3.5">Bust ({unit})</th>
                <th className="py-3 px-3.5">Waist ({unit})</th>
                <th className="py-3 px-3.5">Hips ({unit})</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6E6EA]">
              {chartData.map((row) => (
                <tr
                  key={row.size}
                  className={`hover:bg-[#F5F5F7] transition-colors ${
                    recommendedSize === row.size ? 'bg-[#ECEDFD] font-semibold' : ''
                  }`}
                >
                  <td className="py-3 px-3.5 font-bold text-[#111113]">{row.size}</td>
                  <td className="py-3 px-3.5 text-[#3A3A3F]">{row.uk} · {row.us}</td>
                  <td className="py-3 px-3.5 text-[#3A3A3F]">{unit === 'in' ? row.bustIn : row.bustCm}</td>
                  <td className="py-3 px-3.5 text-[#3A3A3F]">{unit === 'in' ? row.waistIn : row.waistCm}</td>
                  <td className="py-3 px-3.5 text-[#3A3A3F]">{unit === 'in' ? row.hipsIn : row.hipsCm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Find My Size Calculator */}
        <div className="bg-[#F5F5F7] rounded-2xl p-4 sm:p-5 border border-[#E6E6EA] space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#111113] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#6B73F0]" />
              <span>Instant Fit Calculator</span>
            </span>
            {recommendedSize && (
              <span className="text-xs font-semibold text-[#1F8A4C] bg-[#E8F5EE] px-2.5 py-1 rounded-full flex items-center gap-1">
                <Check className="w-3 h-3" />
                <span>Recommended: <strong>Size {recommendedSize}</strong></span>
              </span>
            )}
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] font-medium text-[#8A8A8F] block mb-1">
                Bust ({unit})
              </label>
              <input
                type="number"
                value={bustInput}
                onChange={(e) => setBustInput(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-white border border-[#E6E6EA] text-xs font-semibold text-[#111113] outline-none focus:border-[#6B73F0]"
              />
            </div>
            <div>
              <label className="text-[11px] font-medium text-[#8A8A8F] block mb-1">
                Waist ({unit})
              </label>
              <input
                type="number"
                value={waistInput}
                onChange={(e) => setWaistInput(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-white border border-[#E6E6EA] text-xs font-semibold text-[#111113] outline-none focus:border-[#6B73F0]"
              />
            </div>
            <div>
              <label className="text-[11px] font-medium text-[#8A8A8F] block mb-1">
                Hips ({unit})
              </label>
              <input
                type="number"
                value={hipsInput}
                onChange={(e) => setHipsInput(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-white border border-[#E6E6EA] text-xs font-semibold text-[#111113] outline-none focus:border-[#6B73F0]"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <button
              onClick={calculateFit}
              className="px-4 py-2 rounded-full bg-[#111113] text-white text-xs font-semibold hover:bg-[#3A3A3F] transition-colors"
            >
              Calculate Fit
            </button>
            {recommendedSize && onSelectSize && (
              <button
                onClick={() => {
                  onSelectSize(recommendedSize);
                  onClose();
                }}
                className="text-xs font-semibold text-[#6B73F0] hover:underline"
              >
                Apply Size {recommendedSize} to Product →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
