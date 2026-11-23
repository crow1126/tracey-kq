'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  // Exact 6-second timeline (unskippable, cinematic):
  // 0ms   -> 300ms: Pristine canvas
  // 300ms -> 1000ms: Authentic logo base (T.I.M.E Fits + swooshes) smoothly fades in
  // 1000ms -> 3800ms: Butterfly flies in along a smooth natural arc with organic 3D wing fluttering (2.8s flight)
  // 3800ms -> 5300ms: Butterfly lands with a soft settle; subtle luxury light sweep glides across complete emblem
  // 5300ms -> 6000ms: Seamless fade-out revealing the store (total duration: exactly 6.0 seconds)
  const [phase, setPhase] = useState<'initial' | 'text-in' | 'flight' | 'landed' | 'fade-out'>('initial');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('text-in'), 300);
    const t2 = setTimeout(() => setPhase('flight'), 1000);
    const t3 = setTimeout(() => setPhase('landed'), 3800);
    const t4 = setTimeout(() => setPhase('fade-out'), 5300);
    const t5 = setTimeout(() => onComplete(), 6000);

    return () => {
      [t1, t2, t3, t4, t5].forEach(clearTimeout);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center p-6 select-none transition-opacity duration-700 ease-in-out ${
        phase === 'fade-out' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ userSelect: 'none' }}
    >
      <style>{`
        /* Smooth, continuous natural arc without jagged waypoints or sharp reversals */
        @keyframes naturalButterflyFlight {
          0% {
            opacity: 0;
            transform: translate3d(280px, -240px, 0) rotate(-16deg) scale(1.35);
          }
          10% {
            opacity: 1;
          }
          40% {
            transform: translate3d(110px, -85px, 0) rotate(-7deg) scale(1.2);
          }
          70% {
            transform: translate3d(32px, -22px, 0) rotate(2deg) scale(1.08);
          }
          88% {
            transform: translate3d(6px, -4px, 0) rotate(-1deg) scale(1.02);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
          }
        }

        /* Organic 3D wing fluttering with natural sinusoidal easing */
        @keyframes naturalWingFlutter {
          0%, 100% {
            transform: perspective(600px) scaleX(1) rotateZ(0deg);
          }
          50% {
            transform: perspective(600px) scaleX(0.38) rotateZ(-2deg);
          }
        }

        /* Subtle organic floating bob while flying */
        @keyframes naturalFloatBob {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        /* Delicate settle upon touchdown */
        @keyframes naturalSettle {
          0% {
            transform: perspective(600px) scale3d(0.72, 1.04, 1);
          }
          45% {
            transform: perspective(600px) scale3d(1.05, 0.97, 1);
          }
          75% {
            transform: perspective(600px) scale3d(0.99, 1.01, 1);
          }
          100% {
            transform: perspective(600px) scale3d(1, 1, 1);
          }
        }

        .flight-path {
          animation: naturalButterflyFlight 2.8s cubic-bezier(0.18, 0.85, 0.28, 1) forwards;
        }

        .wing-flutter {
          animation: naturalWingFlutter 0.24s ease-in-out infinite;
        }

        .flight-bob {
          animation: naturalFloatBob 0.48s ease-in-out infinite;
        }

        .settle-fold {
          animation: naturalSettle 0.65s cubic-bezier(0.2, 0.9, 0.3, 1) forwards;
        }

        /* Luxury light sweep across the completed emblem */
        @keyframes luxuryShimmer {
          0% {
            opacity: 0;
            transform: translateX(-120%) skewX(-20deg);
          }
          40% {
            opacity: 0.35;
          }
          100% {
            opacity: 0;
            transform: translateX(220%) skewX(-20deg);
          }
        }

        .shimmer-sweep {
          animation: luxuryShimmer 1.4s ease-out forwards;
        }
      `}</style>

      {/* Main Logo Stage */}
      <div className="relative w-full max-w-[560px] px-4">
        {/* Exact aspect ratio matching the authentic 1046x523 logo asset (2:1) */}
        <div className="relative w-full aspect-[1046/523] flex items-center justify-center">

          {/* 1. Base Logo Layer (T.I.M.E Fits + swooshes + tagline) */}
          <div
            className={`absolute inset-0 transition-all duration-800 ease-out ${
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

          {/* 2. Authentic Butterfly with Smooth Natural Flight */}
          {/* Exact landing coordinates on canvas: left: 39.4837%, top: 3.824%, width: 21.2237%, height: 41.2996% */}
          <div
            className="absolute z-20 pointer-events-none"
            style={{
              left: '39.4837%',
              top: '3.824%',
              width: '21.2237%',
              height: '41.2996%',
            }}
          >
            {/* Trajectory wrapper */}
            <div
              className={`w-full h-full ${
                phase === 'flight'
                  ? 'flight-path'
                  : phase === 'landed' || phase === 'fade-out'
                  ? 'opacity-100'
                  : 'opacity-0'
              }`}
            >
              {/* Natural float bob wrapper */}
              <div className={`w-full h-full ${phase === 'flight' ? 'flight-bob' : ''}`}>
                {/* 3D wing fluttering wrapper */}
                <div
                  className={`relative w-full h-full ${
                    phase === 'flight'
                      ? 'wing-flutter'
                      : phase === 'landed'
                      ? 'settle-fold'
                      : ''
                  }`}
                  style={{ transformOrigin: 'center bottom' }}
                >
                  <Image
                    src="/brand/butterfly.png"
                    alt="T.I.M.E Butterfly"
                    fill
                    priority
                    className="object-contain drop-shadow-[0_8px_16px_rgba(30,58,46,0.16)]"
                    sizes="(max-width: 640px) 25vw, 120px"
                    unoptimized
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 3. Subtle Luxury Shimmer upon landing */}
          {phase === 'landed' && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-[#C7CBB8]/35 to-transparent shimmer-sweep" />
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
