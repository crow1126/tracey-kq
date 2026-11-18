'use client';

import React from 'react';

export interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
  active?: boolean; // alias
}

export default function Chip({
  children,
  isActive,
  active,
  className = '',
  ...props
}: ChipProps) {
  const isOn = isActive ?? active ?? false;

  return (
    <button
      className={`h-[40px] px-[18px] rounded-full text-[14px] font-medium transition-all duration-200 select-none cursor-pointer whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-[#6B73F0] active:scale-[0.96] flex items-center justify-center ${
        isOn
          ? 'bg-[#111113] text-white shadow-sm'
          : 'bg-white text-[#111113] border border-[#E6E6EA] hover:border-[#8A8A8F] hover:bg-[#F5F5F7]'
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
