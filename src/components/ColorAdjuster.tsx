import React from 'react';
import type { ColorAdjustment } from '../types';

interface ColorAdjusterProps {
  adjustment: ColorAdjustment;
  onAdjustmentChange: (adjustment: ColorAdjustment) => void;
}

export function ColorAdjuster({ adjustment, onAdjustmentChange }: ColorAdjusterProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 w-64">
      <h3 className="text-lg font-semibold mb-4">Adjust Color</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Hue</label>
          <input
            type="range"
            min="0"
            max="360"
            value={adjustment.hue}
            onChange={(e) => onAdjustmentChange({
              ...adjustment,
              hue: parseInt(e.target.value)
            })}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Saturation</label>
          <input
            type="range"
            min="0"
            max="100"
            value={adjustment.saturation}
            onChange={(e) => onAdjustmentChange({
              ...adjustment,
              saturation: parseInt(e.target.value)
            })}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Brightness</label>
          <input
            type="range"
            min="0"
            max="100"
            value={adjustment.brightness}
            onChange={(e) => onAdjustmentChange({
              ...adjustment,
              brightness: parseInt(e.target.value)
            })}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}