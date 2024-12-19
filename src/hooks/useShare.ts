import { useState, useCallback } from 'react';
import { copyToClipboard } from '../utils/clipboard';
import { generateShareableUrl, formatPaletteAsText } from '../utils/sharing';
import type { ColorSwatch } from '../types';

export function useShare() {
  const [isSharing, setIsSharing] = useState(false);

  const sharePalette = useCallback(async (colors: ColorSwatch[], type: 'url' | 'text') => {
    try {
      const shareText = type === 'url' 
        ? generateShareableUrl(colors)
        : formatPaletteAsText(colors);

      // Try Web Share API first
      if (navigator.share && type === 'url') {
        try {
          await navigator.share({
            title: 'Color Palette',
            text: 'Check out this color palette!',
            url: shareText
          });
          return true;
        } catch (error) {
          // Fall back to clipboard if share fails or is denied
          if (error instanceof Error && error.name !== 'AbortError') {
            return await copyToClipboard(shareText);
          }
          return false;
        }
      } else {
        // Fall back to clipboard
        return await copyToClipboard(shareText);
      }
    } catch (error) {
      console.error('Failed to share:', error);
      return false;
    }
  }, []);

  return {
    isSharing,
    setIsSharing,
    sharePalette
  };
}