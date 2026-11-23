'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  // Animation phases:
  // 'initial'   -> 0ms: white canvas
  // 'text-in'   -> 200ms: logo base (T.I.M.E Fits + rules) fades in
  // 'flight'    -> 600ms: butterfly flies in with visible wing-flutter
  // 'landed'    -> 2500ms: butterfly locks in place, subtle golden shimmer
  // 'fade-out'  -> 3600ms: whole splash fades out
  const [phase, setPhase] = useState<'initial' | 'text-in' | 'flight' | 'landed' | 'fade-out'>('initial');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('text-in'), 200);
    const t2 = setTimeout(() => setPhase('flight'), 600);
    const t3 = setTimeout(() => setPhase('landed'), 2500);
    const t4 = setTimeout(() => setPhase('fade-out'), 3600);
    const t5 = setTimeout(() => onComplete(), 4200);

    return () => {
      [t1, t2, t3, t4, t5].forEach(clearTimeout);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setPhase('fade-out');
    setTimeout(() => onComplete(), 300);
  };

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center p-6 select-none transition-opacity duration-700 ease-in-out ${
        phase === 'fade-out' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ userSelect: 'none' }}
    >
      <style>{`
        /* Dramatic curved flight path swooping in from top-right */
        @keyframes butterflyFlightPath {
          0% {
            opacity: 0;
            transform: translate3d(240px, -260px, 0) rotate(-24deg) scale(1.45);
          }
          15% {
            opacity: 1;
            transform: translate3d(160px, -170px, 0) rotate(-16deg) scale(1.35);
          }
          38% {
            transform: translate3d(-50px, -90px, 0) rotate(16deg) scale(1.22);
          }
          62% {
            transform: translate3d(60px, -35px, 0) rotate(-10deg) scale(1.12);
          }
          82% {
            transform: translate3d(-12px, -12px, 0) rotate(4deg) scale(1.04);
          }
          94% {
            transform: translate3d(3px, 2px, 0) rotate(-1deg) scale(0.99);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
          }
        }

        /* 3D wing fluttering flapping motion while in flight */
        @keyframes butterflyWingFlutter {
          0%, 100% {
            transform: perspective(700px) scale3d(1, 1, 1) rotateZ(0deg);
          }
          25% {
            transform: perspective(700px) scale3d(0.48, 1.06, 1) rotateZ(-3deg);
          }
          50% {
            transform: perspective(700px) scale3d(0.95, 0.98, 1) rotateZ(1deg);
          }
          75% {
            transform: perspective(700px) scale3d(0.42, 1.08, 1) rotateZ(3deg);
          }
        }

        /* Gentle soft settling fold once landed */
        @keyframes butterflySettle {
          0% {
            transform: perspective(700px) scale3d(0.65, 1.05, 1);
          }
          50% {
            transform: perspective(700px) scale3d(1.08, 0.96, 1);
          }
          75% {
            transform: perspective(700px) scale3d(0.98, 1.01, 1);
          }
          100% {
            transform: perspective(700px) scale3d(1, 1, 1);
          }
        }

        .flight-active {
          animation: butterflyFlightPath 1.9s cubic-bezier(0.25, 1, 0.35, 1) forwards;
        }

        .flutter-active {
          animation: butterflyWingFlutter 0.22s ease-in-out infinite;
        }

        .settle-active {
          animation: butterflySettle 0.6s cubic-bezier(0.2, 0.9, 0.3, 1) forwards;
        }

        /* Shimmer across logo after complete lock */
        @keyframes logoShimmer {
          0% {
            opacity: 0;
            transform: translateX(-100%) skewX(-20deg);
          }
          50% {
            opacity: 0.25;
          }
          100% {
            opacity: 0;
            transform: translateX(200%) skewX(-20deg);
          }
        }

        .shimmer-effect {
          animation: logoShimmer 1.2s ease-out forwards;
        }
      `}</style>

      {/* Skip button in top corner */}
      <button
        onClick={handleSkip}
        type="button"
        className="absolute top-6 right-6 z-50 text-[11px] font-semibold tracking-[0.2em] uppercase text-[#6B7F67] hover:text-[#1E3A2E] px-3 py-1.5 rounded-full border border-transparent hover:border-[#E6E6EA] transition-all cursor-pointer"
        aria-label="Skip splash screen"
      >
        Skip &rarr;
      </button>

      {/* Main Logo Container */}
      <div className="relative w-full max-w-[560px] px-4">
        {/* Exact aspect ratio matching the authentic 1046x523 logo asset (2:1) */}
        <div className="relative w-full aspect-[1046/523] flex items-center justify-center">

          {/* 1. Base Logo Layer (T.I.M.E Fits + swooshes + tagline) */}
          <div
            className={`absolute inset-0 transition-all duration-700 ease-out ${
              phase === 'initial'
                ? 'opacity-0 scale-95'
                : 'opacity-100 scale-100'
            }`}
          >
            <Image
              src="/brand/logo_base.png"
              alt="T.I.M.E Fits"
              fill
              priority
              className="object-contain"
              sizes="(max-width: 640px) 90vw, 560px"
              unoptimized
            />
          </div>

          {/* 2. Authentic Butterfly with Realistic Flight & Flapping */}
          {/* Exact landing position relative to canvas: left: 39.48%, top: 3.82%, width: 21.22%, height: 41.3% */}
          <div
            className="absolute z-20 pointer-events-none"
            style={{
              left: '39.4837%',
              top: '3.824%',
              width: '21.2237%',
              height: '41.2996%',
            }}
          >
            {/* Outer Flight wrapper controls trajectory */}
            <div
              className={`w-full h-full ${
                phase === 'flight'
                  ? 'flight-active'
                  : phase === 'landed' || phase === 'fade-out'
                  ? 'opacity-100'
                  : 'opacity-0'
              }`}
            >
              {/* Inner Flutter wrapper controls wing 3D flapping */}
              <div
                className={`relative w-full h-full ${
                  phase === 'flight'
                    ? 'flutter-active'
                    : phase === 'landed'
                    ? 'settle-active'
                    : ''
                }`}
                style={{ transformOrigin: 'center bottom' }}
              >
                <Image
                  src="/brand/butterfly.png"
                  alt="T.I.M.E Butterfly"
                  fill
                  priority
                  className="object-contain drop-shadow-[0_8px_16px_rgba(30,58,46,0.18)]"
                  sizes="(max-width: 640px) 25vw, 120px"
                  unoptimized
                />
              </div>
            </div>
          </div>

          {/* 3. Subtle Luxury Shimmer when landed */}
          {phase === 'landed' && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-[#C7CBB8]/40 to-transparent shimmer-effect" />
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
