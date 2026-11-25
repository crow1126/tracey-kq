'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'get-started' | 'place-order' | 'secondary' | 'outline' | 'accent' | 'danger';
  isLoading?: boolean;
  isSuccess?: boolean;
  successText?: string;
  icon?: React.ReactNode;
}

export default function Button({
  children,
  variant = 'primary',
  isLoading = false,
  isSuccess = false,
  successText = 'Added ✓',
  icon,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 select-none cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#6B73F0] focus-visible:ring-offset-2 active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100';

  let variantStyles = '';
  switch (variant) {
    case 'primary':
      // Primary CTA: 56px high, full width or flex-1, padding 0 24px, ink bg, white text, pill (999px)
      variantStyles = 'h-[56px] px-6 rounded-full bg-[#111113] text-white hover:shadow-md hover:-translate-y-[1px] text-[15px]';
      break;
    case 'get-started':
      // Get Started: 56px high, white bg, ink text, pill
      variantStyles = 'h-[56px] px-6 rounded-full bg-white text-[#111113] hover:bg-[#F5F5F7] hover:shadow-md hover:-translate-y-[1px] text-[15px] font-semibold';
      break;
    case 'place-order':
      // Place Order: 52px high, 180px wide, in sticky footer
      variantStyles = 'h-[52px] w-[180px] rounded-full bg-[#111113] text-white hover:bg-black hover:shadow-md text-[15px] font-semibold';
      break;
    case 'secondary':
      // Secondary text button: 44px high, no background, 15px
      variantStyles = 'h-[44px] px-4 rounded-full bg-transparent text-[#111113] hover:bg-[#EDEDF0] text-[15px]';
      break;
    case 'outline':
      variantStyles = 'h-[56px] px-6 rounded-full bg-white border border-[#E6E6EA] text-[#111113] hover:bg-[#F5F5F7] text-[15px]';
      break;
    case 'accent':
      variantStyles = 'h-[56px] px-6 rounded-full bg-[#6B73F0] text-white hover:bg-[#5860E2] text-[15px] font-semibold';
      break;
    case 'danger':
      variantStyles = 'h-[44px] px-4 rounded-full bg-[#E5384F] text-white hover:bg-[#d02c42] text-xs font-semibold';
      break;
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : isSuccess ? (
        <span className="text-[#1F8A4C] font-semibold">{successText}</span>
      ) : (
        <span className="flex items-center gap-2">
          {children}
          {icon && <span className="inline-flex items-center">{icon}</span>}
        </span>
      )}
    </button>
  );
}
