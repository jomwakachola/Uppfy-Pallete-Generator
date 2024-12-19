import React from 'react';
import { Copy, Check } from 'lucide-react';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';

interface CopyButtonProps {
  textToCopy: string;
  className?: string;
  contrastColor: string;
}

export function CopyButton({ textToCopy, className = '', contrastColor }: CopyButtonProps) {
  const { copied, copy } = useCopyToClipboard();

  return (
    <button
      onClick={() => copy(textToCopy)}
      className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full 
        transition-all ${className}`}
      style={{
        backgroundColor: `${contrastColor}20`,
        color: contrastColor,
      }}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="text-xs sm:text-sm">Copied!</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="text-xs sm:text-sm">Copy</span>
        </>
      )}
    </button>
  );
}