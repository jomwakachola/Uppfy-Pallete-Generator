import React, { useRef, useEffect, useState } from 'react';
import { hexToHSL, HSLToHex } from '../../utils/colorUtils';

interface ColorGradientProps {
  color: string;
  onChange: (color: string) => void;
}

export function ColorGradient({ color, onChange }: ColorGradientProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const hsl = hexToHSL(color);

    // Draw saturation gradient (white to pure hue)
    const satGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    satGradient.addColorStop(0, `hsl(${hsl.h}, 0%, 50%)`);
    satGradient.addColorStop(1, `hsl(${hsl.h}, 100%, 50%)`);
    ctx.fillStyle = satGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw brightness gradient (transparent black to black)
    const brightGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    brightGradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
    brightGradient.addColorStop(1, '#000');
    ctx.fillStyle = brightGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Update position based on current color
    setPosition({
      x: (hsl.s / 100) * canvas.width,
      y: ((100 - hsl.l) / 100) * canvas.height,
    });
  }, [color]);

  const handleColorSelect = (e: React.MouseEvent | MouseEvent) => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, canvas.width));
    const y = Math.max(0, Math.min(e.clientY - rect.top, canvas.height));

    setPosition({ x, y });

    const hsl = hexToHSL(color);
    const s = (x / canvas.width) * 100;
    const l = 100 - (y / canvas.height) * 100;
    const newColor = HSLToHex(hsl.h, s, l);
    onChange(newColor);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleColorSelect(e);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      handleColorSelect(e);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-48 rounded-lg overflow-hidden cursor-crosshair"
      onMouseDown={handleMouseDown}
    >
      <canvas 
        ref={canvasRef}
        width={300}
        height={200}
        className="w-full h-full"
      />
      <div
        className="absolute w-4 h-4 -ml-2 -mt-2 border-2 border-white rounded-full shadow-md pointer-events-none"
        style={{
          left: position.x,
          top: position.y,
          backgroundColor: color
        }}
      />
    </div>
  );
}