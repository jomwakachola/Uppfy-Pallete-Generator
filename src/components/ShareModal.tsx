import React from 'react';
import { X, Link, Palette, Share } from 'lucide-react';
import { useShare } from '../hooks/useShare';
import { Toast } from './Toast';
import type { ColorSwatch } from '../types';

interface ShareModalProps {
  colors: ColorSwatch[];
  onClose: () => void;
}

export function ShareModal({ colors, onClose }: ShareModalProps) {
  const { sharePalette } = useShare();
  const [showToast, setShowToast] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState('');

  const handleShare = async (type: 'url' | 'text') => {
    const success = await sharePalette(colors, type);
    setToastMessage(success ? 'Copied to clipboard!' : 'Failed to share');
    setShowToast(true);
    if (success) {
      setTimeout(onClose, 1500);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
         onClick={onClose}>
      <div 
        onClick={e => e.stopPropagation()}
        className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-xl"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Share Palette
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => handleShare('url')}
            className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 
                     rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Link className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span className="text-gray-900 dark:text-white">Share URL</span>
            </div>
            <Share className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>

          <button
            onClick={() => handleShare('text')}
            className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 
                     rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Palette className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span className="text-gray-900 dark:text-white">Copy Colors</span>
            </div>
            <Share className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Share this color palette with your team or save it for later use.
        </p>

        {showToast && (
          <Toast 
            message={toastMessage} 
            onClose={() => setShowToast(false)} 
          />
        )}
      </div>
    </div>
  );
}