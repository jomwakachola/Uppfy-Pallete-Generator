import React, { useRef, useEffect } from 'react';

interface HueSliderProps {
  hue: number;
  onChange: (hue: number) => void;
}

export function HueSlider({ hue, onChange }: HueSliderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Create hue gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    for (let i = 0; i <= 360; i += 60) {
      gradient.addColorStop(i / 360, `hsl(${i}, 100%, 50%)`);
    }
    gradient.addColorStop(1, `hsl(360, 100%, 50%)`);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  return (
    <div className="space-y-1">
      <div className="flex justify-between">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Hue
        </label>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {Math.round(hue)}°
        </span>
      </div>
      <div className="relative h-4">
        <canvas
          ref={canvasRef}
          width={300}
          height={20}
          className="absolute inset-0 w-full h-full rounded"
        />
        <input
          type="range"
          min="0"
          max="360"
          value={hue}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer"
        />
      </div>
    </div>
  );
}