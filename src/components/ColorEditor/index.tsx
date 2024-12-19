import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { ColorGradient } from './ColorGradient';
import { HueSlider } from './HueSlider';
import { HexInput } from './HexInput';
import { hexToHSL, HSLToHex } from '../../utils/colorUtils';
import type { ColorSwatch } from '../../types';

interface ColorEditorProps {
  color: ColorSwatch;
  onClose: () => void;
  onColorChange: (hex: string) => void;
}

export function ColorEditor({ color, onClose, onColorChange }: ColorEditorProps) {
  const [currentColor, setCurrentColor] = useState(color.hex);
  const [hsl, setHSL] = useState(hexToHSL(color.hex));

  const handleHueChange = (newHue: number) => {
    const newHSL = { ...hsl, h: newHue };
    setHSL(newHSL);
    const newHex = HSLToHex(newHue, hsl.s, hsl.l);
    setCurrentColor(newHex);
    onColorChange(newHex);
  };

  const handleGradientChange = (newColor: string) => {
    setCurrentColor(newColor);
    setHSL(hexToHSL(newColor));
    onColorChange(newColor);
  };

  const handleHexChange = (newHex: string) => {
    setCurrentColor(newHex);
    setHSL(hexToHSL(newHex));
    onColorChange(newHex);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm"
         onClick={onClose}>
      <div 
        onClick={e => e.stopPropagation()}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-[320px]"
      >
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

        <div className="space-y-6">
          <ColorGradient
            color={currentColor}
            onChange={handleGradientChange}
          />

          <HueSlider
            hue={hsl.h}
            onChange={handleHueChange}
          />

          <HexInput
            value={currentColor}
            onChange={handleHexChange}
          />
        </div>
      </div>
    </div>
  );
}