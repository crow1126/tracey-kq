import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'danger' | 'accent' | 'pink' | 'neutral' | 'outline';
  className?: string;
}

export default function Badge({
  children,
  variant = 'neutral',
  className = '',
}: BadgeProps) {
  let variantStyles = '';
  switch (variant) {
    case 'success':
      variantStyles = 'bg-[#1F8A4C]/10 text-[#1F8A4C] border border-[#1F8A4C]/20';
      break;
    case 'warning':
      variantStyles = 'bg-[#F5A524]/10 text-[#F5A524] border border-[#F5A524]/20';
      break;
    case 'danger':
      variantStyles = 'bg-[#E5384F]/10 text-[#E5384F] border border-[#E5384F]/20';
      break;
    case 'accent':
      variantStyles = 'bg-[#ECEDFD] text-[#6B73F0] border border-[#C9CCF5]';
      break;
    case 'pink':
      variantStyles = 'bg-[#FF2D8A] text-white';
      break;
    case 'neutral':
      variantStyles = 'bg-[#EDEDF0] text-[#3A3A3F]';
      break;
    case 'outline':
      variantStyles = 'bg-transparent text-[#3A3A3F] border border-[#E6E6EA]';
      break;
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-[8px] text-[11px] font-semibold tracking-wider uppercase select-none ${variantStyles} ${className}`}
    >
      {children}
    </span>
  );
}
