import { ColorSwatch } from '../types';

export function generateRandomColor(): string {
  return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
}

export function generateRandomPalette(count: number): ColorSwatch[] {
  return Array(count).fill(null).map(() => ({
    hex: generateRandomColor(),
    locked: false
  }));
}