import React, { createContext, useState, useCallback } from 'react';
import type { ColorSwatch } from '../types';
import { generateRandomColor } from '../utils/colors';

interface ColorContextType {
  colors: ColorSwatch[];
  colorHistory: Map<number, ColorSwatch[]>;
  setColors: (colors: ColorSwatch[]) => void;
  updateColor: (index: number, updates: Partial<ColorSwatch>) => void;
  undoColor: (index: number) => void;
  hasHistory: (index: number) => boolean;
}

export const ColorContext = createContext<ColorContextType | null>(null);

const MAX_HISTORY_LENGTH = 50;

export function ColorProvider({ children }: { children: React.ReactNode }) {
  const [colors, setColors] = useState<ColorSwatch[]>(
    Array(5).fill(null).map(() => ({ hex: generateRandomColor(), locked: false }))
  );
  
  const [colorHistory, setColorHistory] = useState<Map<number, ColorSwatch[]>>(new Map());

  const updateColor = useCallback((index: number, updates: Partial<ColorSwatch>) => {
    setColors(prevColors => {
      const newColors = [...prevColors];
      const currentColor = { ...newColors[index] };
      const updatedColor = { ...currentColor, ...updates };
      newColors[index] = updatedColor;

      // Only update history if the color actually changed
      if (currentColor.hex !== updatedColor.hex) {
        setColorHistory(prevHistory => {
          const newHistory = new Map(prevHistory);
          const colorStack = [...(newHistory.get(index) || [])];
          colorStack.push(currentColor);
          
          if (colorStack.length > MAX_HISTORY_LENGTH) {
            colorStack.shift();
          }
          
          newHistory.set(index, colorStack);
          return newHistory;
        });
      }

      return newColors;
    });
  }, []);

  const undoColor = useCallback((index: number) => {
    setColorHistory(prevHistory => {
      const newHistory = new Map(prevHistory);
      const colorStack = [...(newHistory.get(index) || [])];
      
      if (colorStack.length === 0) return prevHistory;
      
      const previousColor = colorStack.pop()!;
      newHistory.set(index, colorStack);
      
      setColors(prevColors => {
        const newColors = [...prevColors];
        newColors[index] = previousColor;
        return newColors;
      });
      
      return newHistory;
    });
  }, []);

  const hasHistory = useCallback((index: number) => {
    const stack = colorHistory.get(index);
    return Boolean(stack && stack.length > 0);
  }, [colorHistory]);

  return (
    <ColorContext.Provider value={{ 
      colors, 
      colorHistory, 
      setColors, 
      updateColor, 
      undoColor,
      hasHistory 
    }}>
      {children}
    </ColorContext.Provider>
  );
}