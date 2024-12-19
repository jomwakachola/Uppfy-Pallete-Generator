import React from 'react';
import { isValidHex } from '../../utils/colorUtils';

interface HexInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function HexInput({ value, onChange }: HexInputProps) {
  const isValid = isValidHex(value);

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Hex Color
      </label>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value.toUpperCase())}
          className={`
            w-full px-4 py-2 border rounded-lg
            focus:outline-none focus:ring-2
            ${isValid 
              ? 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
              : 'border-red-300 focus:border-red-500 focus:ring-red-500'
            }
            dark:bg-gray-700 dark:border-gray-600
            dark:text-white dark:placeholder-gray-400
          `}
          placeholder="#FFFFFF"
        />
        {!isValid && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            Please enter a valid hex color (e.g., #FF0000)
          </p>
        )}
      </div>
    </div>
  );
}