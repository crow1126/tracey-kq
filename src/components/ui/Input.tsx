'use client';

import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export default function Input({
  leftIcon,
  rightElement,
  className = '',
  ...props
}: InputProps) {
  return (
    <div className="relative flex items-center w-full">
      {leftIcon && (
        <span className="absolute left-5 text-[#8A8A8F] pointer-events-none flex items-center justify-center w-5 h-5">
          {leftIcon}
        </span>
      )}
      <input
        className={`h-[56px] w-full rounded-full bg-white border border-[#E6E6EA] text-[15px] text-[#111113] placeholder-[#8A8A8F] transition-all outline-none focus:border-[#6B73F0] focus:ring-2 focus:ring-[#6B73F0]/20 shadow-sm ${
          leftIcon ? 'pl-13' : 'pl-5'
        } ${rightElement ? 'pr-14' : 'pr-5'} ${className}`}
        {...props}
      />
      {rightElement && (
        <div className="absolute right-3 flex items-center">
          {rightElement}
        </div>
      )}
    </div>
  );
}
