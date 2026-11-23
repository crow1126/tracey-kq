'use client';

import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  // Phases: 'idle' → 'text-in' → 'butterfly-in' → 'hold' → 'fade-out' → done
  const [phase, setPhase] = useState<
    'idle' | 'text-in' | 'butterfly-in' | 'hold' | 'fade-out'
  >('idle');

  useEffect(() => {
    // Staggered timeline
    const t1 = setTimeout(() => setPhase('text-in'),       80);   // text fades + rises
    const t2 = setTimeout(() => setPhase('butterfly-in'),  900);  // butterfly flies in from top
    const t3 = setTimeout(() => setPhase('hold'),          1700); // brief hold
    const t4 = setTimeout(() => setPhase('fade-out'),      2400); // whole screen fades
    const t5 = setTimeout(() => onComplete(),              3100); // unmount

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
      style={{
        opacity: phase === 'fade-out' ? 0 : 1,
        transition: phase === 'fade-out' ? 'opacity 0.65s ease-in-out' : 'none',
        pointerEvents: 'none',
      }}
    >
      {/* ── Outer container – centred column ── */}
      <div className="relative flex flex-col items-center select-none" style={{ userSelect: 'none' }}>

        {/* ── BUTTERFLY – flies in from above ── */}
        <div
          className="absolute"
          style={{
            /* sits above the T.I.M.E text – tweak top to taste */
            top: phase === 'butterfly-in' || phase === 'hold' || phase === 'fade-out'
              ? '-80px'
              : '-170px',
            left: '50%',
            transform: 'translateX(-50%)',
            opacity: phase === 'butterfly-in' || phase === 'hold' || phase === 'fade-out' ? 1 : 0,
            transition:
              phase === 'butterfly-in'
                ? 'top 0.55s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease-out'
                : 'none',
            zIndex: 10,
          }}
        >
          <ButterflyIcon size={72} />
        </div>

        {/* ── T.I.M.E wordmark ── */}
        <div
          style={{
            opacity: phase === 'idle' ? 0 : 1,
            transform: phase === 'idle' ? 'translateY(18px)' : 'translateY(0)',
            transition: 'opacity 0.55s ease-out, transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          <span
            className="block text-[#1A3D29] font-serif leading-none tracking-tight select-none"
            style={{ fontSize: 'clamp(56px, 18vw, 100px)', fontWeight: 700, letterSpacing: '-0.01em' }}
          >
            T.I.M.E
          </span>
        </div>

        {/* ── Fits + wave line ── */}
        <div
          style={{
            opacity: phase === 'idle' ? 0 : 1,
            transform: phase === 'idle' ? 'translateY(12px)' : 'translateY(0)',
            transition: 'opacity 0.55s ease-out 0.08s, transform 0.55s cubic-bezier(0.22, 1, 0.36, 1) 0.08s',
          }}
          className="flex flex-col items-center"
        >
          {/* Wave underline */}
          <WaveSvg />

          {/* "Fits" italic */}
          <span
            className="block text-[#1A3D29] italic font-serif leading-none mt-[-4px] select-none"
            style={{ fontSize: 'clamp(20px, 6vw, 36px)', fontWeight: 500, letterSpacing: '0.08em' }}
          >
            Fits
          </span>
        </div>

        {/* ── Tagline ── */}
        <div
          style={{
            opacity: phase === 'idle' ? 0 : 1,
            transform: phase === 'idle' ? 'translateY(8px)' : 'translateY(0)',
            transition: 'opacity 0.55s ease-out 0.18s, transform 0.55s cubic-bezier(0.22, 1, 0.36, 1) 0.18s',
          }}
          className="mt-4 flex items-center gap-2"
        >
          <span className="block h-px w-8 bg-[#1A3D29]" />
          <span
            className="block text-[#1A3D29] uppercase tracking-[0.22em] font-sans select-none"
            style={{ fontSize: 'clamp(8px, 2.5vw, 11px)', fontWeight: 600 }}
          >
            Tailored Perfection, Timeless Style.
          </span>
          <span className="block h-px w-8 bg-[#1A3D29]" />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Inline SVG butterfly – faithfully reproduces the Adinkra-patterned wings
   ───────────────────────────────────────────────────────────────────────── */
function ButterflyIcon({ size = 72 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size * 0.78}
      viewBox="0 0 120 94"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        animation: 'wingFlap 0.9s ease-in-out infinite alternate',
        transformOrigin: 'center',
      }}
    >
      <style>{`
        @keyframes wingFlap {
          0%   { transform: scaleY(1);   }
          100% { transform: scaleY(0.84); }
        }
      `}</style>

      {/* ── Left wing ── */}
      <path
        d="M60 68 C46 55, 10 50, 4 28 C-2 6, 28 2, 44 18 C52 26, 56 46, 60 68Z"
        fill="#1A3D29"
      />
      {/* Left wing inner pattern lines */}
      <path d="M42 18 Q34 36 48 54" stroke="white" strokeWidth="1.2" fill="none" opacity="0.6" />
      <path d="M28 22 Q22 38 36 50" stroke="white" strokeWidth="1" fill="none" opacity="0.5" />
      <circle cx="22" cy="30" r="3" fill="none" stroke="white" strokeWidth="1" opacity="0.6" />
      <path d="M14 22 L20 18 M17 15 L22 22" stroke="white" strokeWidth="1" opacity="0.5" />
      <path d="M34 10 L38 16 L32 16Z" fill="white" opacity="0.4" />
      <circle cx="38" cy="28" r="1.5" fill="white" opacity="0.5" />
      <path d="M28 36 Q32 32 36 36" stroke="white" strokeWidth="1" fill="none" opacity="0.5" />

      {/* ── Right wing ── */}
      <path
        d="M60 68 C74 55, 110 50, 116 28 C122 6, 92 2, 76 18 C68 26, 64 46, 60 68Z"
        fill="#1A3D29"
      />
      {/* Right wing inner pattern lines */}
      <path d="M78 18 Q86 36 72 54" stroke="white" strokeWidth="1.2" fill="none" opacity="0.6" />
      <path d="M92 22 Q98 38 84 50" stroke="white" strokeWidth="1" fill="none" opacity="0.5" />
      <circle cx="98" cy="30" r="3" fill="none" stroke="white" strokeWidth="1" opacity="0.6" />
      <path d="M106 22 L100 18 M103 15 L98 22" stroke="white" strokeWidth="1" opacity="0.5" />
      <path d="M86 10 L82 16 L88 16Z" fill="white" opacity="0.4" />
      <circle cx="82" cy="28" r="1.5" fill="white" opacity="0.5" />
      <path d="M92 36 Q88 32 84 36" stroke="white" strokeWidth="1" fill="none" opacity="0.5" />

      {/* ── Body ── */}
      <ellipse cx="60" cy="60" rx="3.5" ry="18" fill="#1A3D29" />
      {/* Antennae */}
      <path d="M60 42 Q52 28 48 20" stroke="#1A3D29" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <circle cx="47" cy="19" r="2" fill="#1A3D29" />
      <path d="M60 42 Q68 28 72 20" stroke="#1A3D29" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <circle cx="73" cy="19" r="2" fill="#1A3D29" />
    </svg>
  );
}

/* ── Wave SVG that mimics the swoosh lines under T.I.M.E ── */
function WaveSvg() {
  return (
    <svg
      width="260"
      height="20"
      viewBox="0 0 260 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', marginTop: '-6px' }}
    >
      {/* Left curl */}
      <path
        d="M2 15 C30 2, 50 18, 80 10 C110 2, 130 15, 160 10 C190 5, 210 15, 240 10 C250 8, 256 11, 258 14"
        stroke="#1A3D29"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
