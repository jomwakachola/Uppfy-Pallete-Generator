import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ToastProps {
  message: string;
  duration?: number;
  onClose: () => void;
}

export function Toast({ message, duration = 3000, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="fixed bottom-4 right-4 flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg">
      <span>{message}</span>
      <button
        onClick={onClose}
        className="text-white/80 hover:text-white"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}