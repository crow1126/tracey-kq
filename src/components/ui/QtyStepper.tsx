'use client';

import React from 'react';
import { Minus, Plus } from 'lucide-react';

export interface QtyStepperProps {
  quantity: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
  onIncrease?: () => void;
  onDecrease?: () => void;
  min?: number;
  max?: number;
  className?: string;
}

export default function QtyStepper({
  quantity,
  onIncrement,
  onDecrement,
  onIncrease,
  onDecrease,
  min = 1,
  max = 99,
  className = '',
}: QtyStepperProps) {
  const handleIncrement = onIncrement || onIncrease || (() => {});
  const handleDecrement = onDecrement || onDecrease || (() => {});
  return (
    <div
      className={`h-[40px] w-[96px] min-w-[96px] rounded-full bg-[#EDEDF0] flex items-center justify-between px-1.5 select-none ${className}`}
    >
      <button
        type="button"
        disabled={quantity <= min}
        onClick={handleDecrement}
        aria-label="Decrease quantity"
        className="w-[28px] h-[28px] rounded-full bg-white text-[#111113] hover:bg-[#F5F5F7] flex items-center justify-center transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer shadow-xs active:scale-90"
      >
        <Minus className="w-3.5 h-3.5" />
      </button>

      <span className="text-[15px] font-semibold text-[#111113] w-6 text-center">
        {quantity}
      </span>

      <button
        type="button"
        disabled={quantity >= max}
        onClick={handleIncrement}
        aria-label="Increase quantity"
        className="w-[28px] h-[28px] rounded-full bg-white text-[#111113] hover:bg-[#F5F5F7] flex items-center justify-center transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer shadow-xs active:scale-90"
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
