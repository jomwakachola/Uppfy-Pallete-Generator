import React from 'react';

interface ColorPreviewProps {
  color: string;
}

export function ColorPreview({ color }: ColorPreviewProps) {
  return (
    <div 
      className="w-full h-24 rounded-lg shadow-inner transition-colors duration-200"
      style={{ backgroundColor: color }}
    />
  );
}