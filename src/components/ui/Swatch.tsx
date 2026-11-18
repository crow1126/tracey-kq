'use client';

import React from 'react';

export interface SwatchProps {
  color?: string;
  hex?: string;         // alias for color
  name?: string;
  isSelected?: boolean;
  selected?: boolean;   // alias for isSelected
  onClick?: () => void;
  className?: string;
}

export default function Swatch({
  color,
  hex,
  name,
  isSelected,
  selected,
  onClick,
  className = '',
}: SwatchProps) {
  const bgColor = color || hex || '#000000';
  const active = isSelected ?? selected ?? false;

  return (
    <button
      type="button"
      onClick={onClick}
      title={name || bgColor}
      className={`relative w-[44px] h-[44px] min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#6B73F0] ${className}`}
    >
      {/* Outer selection ring if selected */}
      {active && (
        <span className="absolute inset-0 rounded-full border-2 border-[#111113]" />
      )}
      {/* Color circle with 3px gap if selected */}
      <span
        className={`rounded-full border border-black/10 transition-all ${
          active ? 'w-[34px] h-[34px]' : 'w-[40px] h-[40px] hover:scale-105'
        }`}
        style={{ backgroundColor: bgColor }}
      />
    </button>
  );
}
