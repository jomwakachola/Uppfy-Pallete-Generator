import type { ColorSwatch } from '../types';

export function generateShareableUrl(colors: ColorSwatch[]): string {
  const colorString = colors.map(c => c.hex.replace('#', '')).join('-');
  // Use the deployed Netlify URL or fallback to current origin
  const baseUrl = 'https://vermillion-hamster-ea1b83.netlify.app';
  return `${baseUrl}?palette=${colorString}`;
}

export function formatPaletteAsText(colors: ColorSwatch[]): string {
  return colors.map(c => c.hex.toUpperCase()).join(', ');
}

export function parsePaletteFromUrl(url: string): ColorSwatch[] | null {
  try {
    const params = new URLSearchParams(new URL(url).search);
    const palette = params.get('palette');
    if (!palette) return null;

    return palette.split('-').map(hex => ({
      hex: `#${hex}`,
      locked: false
    }));
  } catch {
    return null;
  }
}