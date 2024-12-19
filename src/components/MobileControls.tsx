import React from 'react';
import { Download, Image as ImageIcon } from 'lucide-react';
import { ControlButton } from './ControlButton';

interface MobileControlsProps {
  onExport: () => void;
  onImageUpload: () => void;
}

export function MobileControls({ onExport, onImageUpload }: MobileControlsProps) {
  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <ControlButton
        icon={ImageIcon}
        label="Import from Image"
        onClick={onImageUpload}
        tooltip="Create your color palette from an image"
      />
      
      <ControlButton
        icon={Download}
        label="Download Palette"
        onClick={onExport}
      />
    </div>
  );
}