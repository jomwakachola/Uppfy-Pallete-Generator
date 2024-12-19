import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { isValidHex, formatHex } from '../utils/colorUtils';
import type { ColorSwatch } from '../types';

interface ColorEditorProps {
  color: ColorSwatch;
  onClose: () => void;
  onColorChange: (hex: string) => void;
}

export function ColorEditor({ color, onClose, onColorChange }: ColorEditorProps) {
  const [hexValue, setHexValue] = useState(color.hex.toUpperCase());
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    setIsValid(isValidHex(hexValue));
  }, [hexValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHexValue(value.toUpperCase());
    if (isValidHex(value)) {
      onColorChange(formatHex(value));
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-80">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Edit Color
        </h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        <div
          className="w-full h-24 rounded-lg"
          style={{ backgroundColor: isValid ? hexValue : color.hex }}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Hex Color
          </label>
          <div className="relative">
            <input
              type="text"
              value={hexValue}
              onChange={handleChange}
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
      </div>
    </div>
  );
}