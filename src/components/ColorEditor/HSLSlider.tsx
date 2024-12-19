import React from 'react';

interface HSLSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}

export function HSLSlider({ label, value, min, max, onChange }: HSLSliderProps) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {value}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
    </div>
  );
}