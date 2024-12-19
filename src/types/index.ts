export interface ColorSwatch {
  hex: string;
  locked: boolean;
}

export interface ColorAdjustment {
  hue: number;
  saturation: number;
  brightness: number;
}

export interface ShareOptions {
  type: 'url' | 'png' | 'palette';
  data: string;
}