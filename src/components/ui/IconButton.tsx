'use client';

import React from 'react';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'header' | 'header-white' | 'home-bag' | 'back' | 'search-filter' | 'card-heart' | 'detail-heart' | 'quick-add';
  isActive?: boolean;
}

export default function IconButton({
  children,
  variant = 'header',
  isActive = false,
  className = '',
  ...props
}: IconButtonProps) {
  let sizeStyles = 'min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full transition-all duration-200 select-none cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#6B73F0] active:scale-[0.95]';

  switch (variant) {
    case 'header':
      // 44x44px circle, surface-muted bg, 20px icon
      sizeStyles += ' w-[44px] h-[44px] bg-[#EDEDF0] text-[#111113] hover:bg-[#E6E6EA]';
      break;
    case 'header-white':
      // 44x44px circle, white bg
      sizeStyles += ' w-[44px] h-[44px] bg-white text-[#111113] hover:bg-[#F5F5F7] shadow-sm border border-[#E6E6EA]';
      break;
    case 'home-bag':
      // 44x44px circle, ink bg, white icon
      sizeStyles += ' w-[44px] h-[44px] bg-[#111113] text-white hover:bg-black shadow-md';
      break;
    case 'back':
      // 44x44px circle, glass bg
      sizeStyles += ' w-[44px] h-[44px] glass text-[#111113] hover:bg-white shadow-sm border border-white/40';
      break;
    case 'search-filter':
      // 40x40px circle inside search bar (tap target 44px padded)
      sizeStyles += ' w-[40px] h-[40px] bg-[#111113] text-white hover:bg-black';
      break;
    case 'card-heart':
      // 36x36px circle, white bg, 18px icon
      sizeStyles += ` w-[36px] h-[36px] min-w-[36px] min-h-[36px] bg-white shadow-md ${
        isActive ? 'text-[#E5384F]' : 'text-[#8A8A8F] hover:text-[#111113]'
      }`;
      break;
    case 'detail-heart':
      // 44x44px on detail
      sizeStyles += ` w-[44px] h-[44px] bg-white border border-[#E6E6EA] shadow-sm ${
        isActive ? 'text-[#E5384F] border-[#E5384F]/40' : 'text-[#111113] hover:bg-[#F5F5F7]'
      }`;
      break;
    case 'quick-add':
      // 40x40px circle, ink bg
      sizeStyles += ' w-[40px] h-[40px] min-w-[40px] min-h-[40px] bg-[#111113] text-white hover:bg-black shadow-md';
      break;
  }

  return (
    <button className={`${sizeStyles} ${className}`} {...props}>
      {children}
    </button>
  );
}
