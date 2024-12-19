import React, { useCallback } from 'react';
import { Upload, X } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { extractColorsFromImage } from '../utils/colorExtractor';
import type { ColorSwatch } from '../types';

interface ImageUploadProps {
  onColorsExtracted: (colors: ColorSwatch[]) => void;
  onClose: () => void;
}

export function ImageUpload({ onColorsExtracted, onClose }: ImageUploadProps) {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    
    try {
      const colors = await extractColorsFromImage(acceptedFiles[0]);
      onColorsExtracted(colors);
      onClose();
    } catch (error) {
      console.error('Failed to extract colors:', error);
    }
  }, [onColorsExtracted, onClose]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp']
    },
    maxFiles: 1
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
         onClick={onClose}>
      <div 
        onClick={e => e.stopPropagation()}
        className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 w-full max-w-md"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
            Generate a color palette from an image
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div {...getRootProps()} className={`
          border-2 border-dashed rounded-lg p-6 sm:p-8 text-center cursor-pointer
          transition-colors duration-200
          ${isDragActive 
            ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' 
            : 'border-gray-300 dark:border-gray-600 hover:border-indigo-400 dark:hover:border-indigo-400'
          }
        `}>
          <input {...getInputProps()} />
          <Upload className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 dark:text-gray-300 mb-2 text-sm sm:text-base">
            {isDragActive
              ? 'Drop your image here...'
              : 'Drag & drop an image here, or click to select'}
          </p>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            Supports PNG, JPG, JPEG, WebP
          </p>
        </div>
      </div>
    </div>
  );
}