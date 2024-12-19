import React from 'react';
import { Lock, Unlock, RotateCcw } from 'lucide-react';
import { CopyButton } from './CopyButton';
import { useColors } from '../hooks/useColors';
import { getContrastColor } from '../utils/colorUtils';
import type { ColorSwatch } from '../types';

interface ColorSwatchProps {
  color: ColorSwatch;
  index: number;
  onLockToggle: () => void;
}

export function ColorSwatchComponent({ 
  color, 
  index,
  onLockToggle
}: ColorSwatchProps) {
  const { undoColor, hasHistory } = useColors();
  const contrastColor = getContrastColor(color.hex);

  const handleUndoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasHistory(index)) {
      undoColor(index);
    }
  };

  return (
    <div 
      className="flex flex-col items-center justify-between h-full p-4 transition-all duration-300 hover:scale-[1.02] md:hover:scale-105"
      style={{ backgroundColor: color.hex }}
    >
      <div className="flex justify-between w-full">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onLockToggle();
          }}
          className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
          style={{ color: contrastColor }}
        >
          {color.locked ? (
            <Lock className="w-4 h-4 sm:w-5 sm:h-5" />
          ) : (
            <Unlock className="w-4 h-4 sm:w-5 sm:h-5" />
          )}
        </button>
        <button
          onClick={handleUndoClick}
          disabled={!hasHistory(index)}
          className={`p-2 rounded-full transition-colors ${
            hasHistory(index)
              ? 'hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer' 
              : 'opacity-30 cursor-not-allowed'
          }`}
          style={{ color: contrastColor }}
        >
          <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <p className="font-mono text-base sm:text-lg font-bold tracking-wider"
           style={{ color: contrastColor }}>
          {color.hex.toUpperCase()}
        </p>
        <CopyButton 
          textToCopy={color.hex.toUpperCase()} 
          contrastColor={contrastColor}
        />
      </div>
    </div>
  );
}