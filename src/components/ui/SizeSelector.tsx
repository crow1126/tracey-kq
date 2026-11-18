'use client';

import React from 'react';

export interface SizeSelectorProps {
  // Array-based API (original)
  sizes?: string[];
  selectedSize?: string;
  onSelectSize?: (size: string) => void;
  disabledSizes?: string[];

  // Per-item API (used in ProductDetailModal etc.)
  size?: string;
  selected?: boolean;
  onClick?: () => void;

  className?: string;
}

export default function SizeSelector({
  sizes,
  selectedSize,
  onSelectSize,
  disabledSizes = [],
  size,
  selected,
  onClick,
  className = '',
}: SizeSelectorProps) {
  // If used in per-item mode
  if (size !== undefined) {
    const isSelected = selected ?? false;
    const isDisabled = disabledSizes.includes(size);

    return (
      <button
        type="button"
        disabled={isDisabled}
        onClick={onClick}
        className={`h-[48px] min-w-[64px] px-4 rounded-full text-[14px] font-medium transition-all duration-200 select-none cursor-pointer flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-[#6B73F0] active:scale-[0.96] disabled:opacity-40 disabled:line-through disabled:pointer-events-none ${
          isSelected
            ? 'bg-[#111113] text-white shadow-sm'
            : 'bg-white text-[#111113] border border-[#E6E6EA] hover:border-[#8A8A8F]'
        } ${className}`}
      >
        {size}
      </button>
    );
  }

  // Array-based mode (original)
  const sizeList = sizes || [];
  return (
    <div className={`flex flex-wrap gap-2.5 ${className}`}>
      {sizeList.map((s) => {
        const isSelected = selectedSize === s;
        const isDisabled = disabledSizes.includes(s);

        return (
          <button
            key={s}
            type="button"
            disabled={isDisabled}
            onClick={() => onSelectSize?.(s)}
            className={`h-[48px] min-w-[64px] px-4 rounded-full text-[14px] font-medium transition-all duration-200 select-none cursor-pointer flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-[#6B73F0] active:scale-[0.96] disabled:opacity-40 disabled:line-through disabled:pointer-events-none ${
              isSelected
                ? 'bg-[#111113] text-white shadow-sm'
                : 'bg-white text-[#111113] border border-[#E6E6EA] hover:border-[#8A8A8F]'
            }`}
          >
            {s}
          </button>
        );
      })}
    </div>
  );
}
