'use client';

import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

type Phase = 'hidden' | 'text' | 'flying' | 'landed' | 'exit';

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<Phase>('hidden');

  useEffect(() => {
    // Stagger: text first, then butterfly flies in, holds, then fades out
    const t1 = setTimeout(() => setPhase('text'),    80);
    const t2 = setTimeout(() => setPhase('flying'),  600);
    const t3 = setTimeout(() => setPhase('landed'),  1900);
    const t4 = setTimeout(() => setPhase('exit'),    2700);
    const t5 = setTimeout(() => onComplete(),        3450);
    return () => { [t1,t2,t3,t4,t5].forEach(clearTimeout); };
  }, [onComplete]);

  const textIn    = phase !== 'hidden';
  const inFlight  = phase === 'flying';
  const hasLanded = phase === 'landed' || phase === 'exit';
  const isExiting = phase === 'exit';

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        backgroundColor: '#ffffff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: isExiting ? 0 : 1,
        transition: isExiting ? 'opacity 0.7s ease-in-out' : 'none',
        pointerEvents: 'none',
      }}
    >
      {/* ── keyframe styles ── */}
      <style>{`
        /* Wing flap: scaleX on transform-box so origin is at the wing root */
        @keyframes flapLeft {
          0%,100% { transform: scaleX(1); }
          50%      { transform: scaleX(0.12); }
        }
        @keyframes flapRight {
          0%,100% { transform: scaleX(1); }
          50%      { transform: scaleX(0.12); }
        }
        /* Gentle settle after landing */
        @keyframes settleLeft {
          0%   { transform: scaleX(0.6); }
          40%  { transform: scaleX(1.06); }
          70%  { transform: scaleX(0.96); }
          100% { transform: scaleX(1); }
        }
        @keyframes settleRight {
          0%   { transform: scaleX(0.6); }
          40%  { transform: scaleX(1.06); }
          70%  { transform: scaleX(0.96); }
          100% { transform: scaleX(1); }
        }

        .wl { transform-box: fill-box; transform-origin: right center; }
        .wr { transform-box: fill-box; transform-origin: left center; }
        .wl.fly    { animation: flapLeft  0.28s linear infinite; }
        .wr.fly    { animation: flapRight 0.28s linear infinite 0.14s; }
        .wl.settle { animation: settleLeft  0.5s cubic-bezier(0.22,1,0.36,1) forwards; }
        .wr.settle { animation: settleRight 0.5s cubic-bezier(0.22,1,0.36,1) 0.05s forwards; }
      `}</style>

      {/* ── Logo container ── */}
      <div style={{ position: 'relative', userSelect: 'none', textAlign: 'center' }}>

        {/* ════ BUTTERFLY ════
            Starts far off-screen top, flies down to rest above the T.I.M.E text */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            /* landing: -74px so it overlaps just above the T */
            top: hasLanded ? '-74px' : '-420px',
            transform: 'translateX(-50%)',
            opacity: (inFlight || hasLanded) ? 1 : 0,
            /* smooth spring descent */
            transition: inFlight
              ? 'top 1.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease-out'
              : 'none',
            zIndex: 20,
          }}
        >
          <svg
            width="96"
            height="78"
            viewBox="0 0 130 90"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            overflow="visible"
          >
            {/* ── Left wing ── */}
            <g className={`wl${inFlight ? ' fly' : hasLanded ? ' settle' : ''}`}>
              {/* Main wing shape – sweeps up and left */}
              <path
                d="M62 68
                   C56 55, 36 40, 16 24
                   C4  14,  2  4, 10  2
                   C20 -1, 34 10, 44 22
                   C54 34, 60 52, 62 68Z"
                fill="#1A3D29"
              />
              {/* Adinkra / pattern details */}
              <path d="M58 60 C48 46, 28 32, 14 20" stroke="white" strokeWidth="0.9" opacity="0.55" fill="none"/>
              <path d="M54 52 C42 40, 24 28, 12 18" stroke="white" strokeWidth="0.7" opacity="0.4"  fill="none"/>
              <circle cx="18" cy="18" r="3"   fill="none" stroke="white" strokeWidth="1"   opacity="0.6"/>
              <circle cx="34" cy="26" r="1.8" fill="none" stroke="white" strokeWidth="0.8" opacity="0.5"/>
              {/* X marks */}
              <path d="M22 8 L26 12 M26 8 L22 12"  stroke="white" strokeWidth="0.9" opacity="0.55"/>
              <path d="M10 26 L13 30 M13 26 L10 30" stroke="white" strokeWidth="0.8" opacity="0.45"/>
              {/* triangle */}
              <path d="M32 14 L36 20 L28 20Z" fill="white" opacity="0.35"/>
              {/* small wave detail */}
              <path d="M38 34 Q42 30 46 34" stroke="white" strokeWidth="0.9" fill="none" opacity="0.5"/>
            </g>

            {/* ── Right wing ── */}
            <g className={`wr${inFlight ? ' fly' : hasLanded ? ' settle' : ''}`}>
              <path
                d="M68 68
                   C74 55, 94 40, 114 24
                   C126 14, 128  4, 120  2
                   C110 -1, 96 10, 86 22
                   C76 34, 70 52, 68 68Z"
                fill="#1A3D29"
              />
              <path d="M72 60 C82 46, 102 32, 116 20" stroke="white" strokeWidth="0.9" opacity="0.55" fill="none"/>
              <path d="M76 52 C88 40, 106 28, 118 18" stroke="white" strokeWidth="0.7" opacity="0.4"  fill="none"/>
              <circle cx="112" cy="18" r="3"   fill="none" stroke="white" strokeWidth="1"   opacity="0.6"/>
              <circle cx="96"  cy="26" r="1.8" fill="none" stroke="white" strokeWidth="0.8" opacity="0.5"/>
              <path d="M108 8 L112 12 M112 8 L108 12" stroke="white" strokeWidth="0.9" opacity="0.55"/>
              <path d="M120 26 L117 30 M117 26 L120 30" stroke="white" strokeWidth="0.8" opacity="0.45"/>
              <path d="M98 14 L94 20 L102 20Z" fill="white" opacity="0.35"/>
              <path d="M92 34 Q88 30 84 34" stroke="white" strokeWidth="0.9" fill="none" opacity="0.5"/>
            </g>

            {/* ── Body ── */}
            <ellipse cx="65" cy="70" rx="3.5" ry="16" fill="#1A3D29"/>
            {/* Head */}
            <circle cx="65" cy="54" r="4.5" fill="#1A3D29"/>
            {/* Antennae */}
            <path d="M63 52 Q54 40 50 30" stroke="#1A3D29" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
            <circle cx="49" cy="29" r="2.2" fill="#1A3D29"/>
            <path d="M67 52 Q76 40 80 30" stroke="#1A3D29" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
            <circle cx="81" cy="29" r="2.2" fill="#1A3D29"/>
          </svg>
        </div>

        {/* ════ T.I.M.E wordmark ════ */}
        <div
          style={{
            opacity: textIn ? 1 : 0,
            transform: textIn ? 'translateY(0)' : 'translateY(18px)',
            transition: 'opacity 0.55s ease-out, transform 0.6s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <span
            style={{
              display: 'block',
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: 'clamp(58px, 17vw, 96px)',
              fontWeight: 700,
              color: '#1A3D29',
              lineHeight: 1,
              letterSpacing: '-0.01em',
              whiteSpace: 'nowrap',
            }}
          >
            T.I.M.E
          </span>
        </div>

        {/* ════ Wave line + "Fits" ════ */}
        <div
          style={{
            opacity: textIn ? 1 : 0,
            transform: textIn ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.55s ease-out 0.1s, transform 0.6s cubic-bezier(0.22,1,0.36,1) 0.1s',
            marginTop: '-10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Wave swoosh – matches the logo's undulation */}
          <svg width="300" height="24" viewBox="0 0 300 24" fill="none" overflow="visible">
            {/* left curl */}
            <path
              d="M2 18 C18 2, 32 22, 52 14 C72 6, 86 20, 108 13 C130 6, 148 18, 170 12 C192 6, 212 18, 240 12 C260 8, 276 16, 298 14"
              stroke="#1A3D29" strokeWidth="1.6" fill="none" strokeLinecap="round"
            />
          </svg>
          {/* "Fits" – italic, nudged right like in the logo */}
          <span
            style={{
              display: 'block',
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: 'clamp(20px, 6vw, 34px)',
              fontStyle: 'italic',
              fontWeight: 400,
              color: '#1A3D29',
              letterSpacing: '0.08em',
              marginTop: '-6px',
              alignSelf: 'flex-end',
              paddingRight: '14px',
            }}
          >
            Fits
          </span>
        </div>

        {/* ════ Tagline ════ */}
        <div
          style={{
            opacity: textIn ? 1 : 0,
            transform: textIn ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.55s ease-out 0.2s, transform 0.6s cubic-bezier(0.22,1,0.36,1) 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginTop: '14px',
            justifyContent: 'center',
          }}
        >
          <span style={{ height: '1px', width: '30px', backgroundColor: '#1A3D29', display: 'block' }} />
          <span
            style={{
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontSize: 'clamp(7.5px, 2.4vw, 10.5px)',
              fontWeight: 600,
              letterSpacing: '0.22em',
              color: '#1A3D29',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}
          >
            Tailored Perfection, Timeless Style.
          </span>
          <span style={{ height: '1px', width: '30px', backgroundColor: '#1A3D29', display: 'block' }} />
        </div>
      </div>
    </div>
  );
}
