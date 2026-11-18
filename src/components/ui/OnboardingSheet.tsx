'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, X, Sparkles, Scissors, Globe } from 'lucide-react';
import Button from './Button';

export default function OnboardingSheet() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Show only on mobile and only if not dismissed before
    const isDismissed = localStorage.getItem('tkq_welcome_dismissed');
    if (!isDismissed && window.innerWidth < 768) {
      setIsOpen(true);
    }
  }, []);

  if (!isOpen) return null;

  const slides = [
    {
      eyebrow: 'WELCOME TO TRACEY KQ',
      title: 'Avant-Garde Ghanaian Haute Couture',
      description: 'Explore minimalist silhouettes sculpted with ancestral Asante regalia, hand-embroidered metallic threads, and fluid mulberry silk.',
      icon: Sparkles,
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=85',
    },
    {
      eyebrow: 'HANDCRAFTED IN ACCRA',
      title: 'Sustainable Ethical Craftsmanship',
      description: 'Every creation honors ancestral Ghanaian artisans, incorporating hand-spun organic cotton, recycled brass buttons, and zero-waste tailoring.',
      icon: Scissors,
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=85',
    },
    {
      eyebrow: 'WORLDWIDE DOORSTEP DELIVERY',
      title: 'Seamless Luxury Delivered in GH₵',
      description: 'Shop ready-to-wear or book private made-to-measure fittings. Pay with MTN MoMo, Telecel Cash, card, or pay on delivery.',
      icon: Globe,
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=85',
    },
  ];

  const handleDismiss = () => {
    localStorage.setItem('tkq_welcome_dismissed', 'true');
    setIsOpen(false);
  };

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      handleDismiss();
    }
  };

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center md:hidden">
      {/* Dimmed backdrop */}
      <div onClick={handleDismiss} className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" />

      {/* Sheet Container: 28px top corners */}
      <div className="relative w-full bg-[#111113] text-white rounded-t-[28px] overflow-hidden shadow-2xl z-10 p-6 pb-10 space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Dismiss Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Slide Visual */}
        <div className="relative aspect-[16/10] rounded-[20px] overflow-hidden bg-[#1C1C1F] border border-white/10 shadow-lg mt-2">
          <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 image-scrim" />
          <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 text-xs font-semibold text-[#6B73F0] border border-white/10">
            <Icon className="w-3.5 h-3.5 text-[#C8E96B]" />
            <span className="text-white text-[10px] tracking-wider uppercase">{slide.eyebrow}</span>
          </div>
        </div>

        {/* Slide Copy */}
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-white leading-tight">
            {slide.title}
          </h2>
          <p className="text-sm text-[#A1A1A8] font-normal leading-relaxed">
            {slide.description}
          </p>
        </div>

        {/* Pagination Dots & CTA */}
        <div className="space-y-4 pt-2">
          {/* Pagination dots: 6px dots, active dot 24px wide pill */}
          <div className="flex items-center justify-center gap-2">
            {slides.map((_, idx) => (
              <span
                key={idx}
                className={`h-[6px] rounded-full transition-all duration-300 ${
                  currentSlide === idx ? 'w-[24px] bg-[#6B73F0]' : 'w-[6px] bg-white/30'
                }`}
              />
            ))}
          </div>

          {/* Get Started Button: 56px high, white bg, ink text, 20px arrow icon */}
          <Button
            variant="get-started"
            onClick={handleNext}
            className="w-full flex items-center justify-center gap-2 shadow-xl"
          >
            <span>{currentSlide === slides.length - 1 ? 'Start Exploring' : 'Continue'}</span>
            <ArrowRight className="w-5 h-5 text-[#111113]" />
          </Button>

          <button
            onClick={handleDismiss}
            className="w-full text-center text-xs text-[#8A8A8F] hover:text-white uppercase tracking-widest py-1"
          >
            Dismiss & Enter Store
          </button>
        </div>
      </div>
    </div>
  );
}
