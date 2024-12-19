import React from 'react';
import { Wand2, Download, Image as ImageIcon } from 'lucide-react';
import { ControlButton } from './ControlButton';
import { useColors } from '../hooks/useColors';

interface ControlsProps {
  onGenerate: () => void;
  onExport?: () => void;
  onImageUpload?: () => void;
  variant?: 'full' | 'minimal';
}

export function Controls({ 
  onGenerate, 
  onExport, 
  onImageUpload,
  variant = 'full'
}: ControlsProps) {
  const { colors } = useColors();

  if (variant === 'minimal') {
    return (
      <div className="flex justify-center">
        <ControlButton
          icon={Wand2}
          label="Generate"
          onClick={onGenerate}
          variant="primary"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4">
      <ControlButton
        icon={Wand2}
        label="Generate"
        onClick={onGenerate}
        variant="primary"
      />
      
      {onImageUpload && (
        <ControlButton
          icon={ImageIcon}
          label="Import from Image"
          onClick={onImageUpload}
          tooltip="Create your color palette from an image"
        />
      )}
      
      {onExport && (
        <ControlButton
          icon={Download}
          label="Download Palette"
          onClick={onExport}
        />
      )}
    </div>
  );
}