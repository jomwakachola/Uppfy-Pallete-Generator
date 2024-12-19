import type { ColorSwatch } from '../types';

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b]
    .map(x => Math.round(x).toString(16).padStart(2, '0'))
    .join('');
}

export async function extractColorsFromImage(file: File): Promise<ColorSwatch[]> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      reject(new Error('Could not get canvas context'));
      return;
    }

    img.onload = () => {
      // Scale down large images for performance
      const maxSize = 100;
      const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      
      // Store RGB values and their frequency
      const colorMap = new Map<string, { count: number; rgb: number[] }>();
      
      for (let i = 0; i < pixels.length; i += 4) {
        const rgb = [pixels[i], pixels[i + 1], pixels[i + 2]];
        const key = rgb.join(',');
        
        const existing = colorMap.get(key);
        if (existing) {
          existing.count++;
        } else {
          colorMap.set(key, { count: 1, rgb });
        }
      }
      
      // Convert to array and sort by frequency
      const sortedColors = Array.from(colorMap.entries())
        .sort((a, b) => b[1].count - a[1].count)
        .slice(0, 5) // Get top 5 colors
        .map(([_, { rgb }]) => ({
          hex: rgbToHex(rgb[0], rgb[1], rgb[2]),
          locked: false
        }));
      
      resolve(sortedColors);
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    img.src = URL.createObjectURL(file);
  });
}