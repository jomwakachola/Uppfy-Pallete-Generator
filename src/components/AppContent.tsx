import React, { useState, useEffect } from 'react';
import { ColorSwatchComponent } from './ColorSwatch';
import { Navbar } from './Navbar';
import { ShareModal } from './ShareModal';
import { ImageUpload } from './ImageUpload';
import { Controls } from './Controls';
import { MobileControls } from './MobileControls';
import { ExportModal } from './ExportModal';
import { useTheme } from '../hooks/useTheme';
import { useShare } from '../hooks/useShare';
import { useColors } from '../hooks/useColors';
import { generateRandomColor } from '../utils/colors';

export function AppContent() {
  const { darkMode, toggleDarkMode } = useTheme();
  const { isSharing, setIsSharing } = useShare();
  const { colors, setColors, updateColor } = useColors();
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  const generateNewPalette = () => {
    colors.forEach((color, index) => {
      if (!color.locked) {
        updateColor(index, { hex: generateRandomColor() });
      }
    });
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.code === 'Space') {
      generateNewPalette();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [colors]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar 
        darkMode={darkMode} 
        onDarkModeToggle={toggleDarkMode}
        onShare={() => setIsSharing(true)}
      />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          <div className="flex flex-col gap-4 sm:gap-8">
            {/* Desktop Controls */}
            <div className="hidden sm:block">
              <Controls
                onGenerate={generateNewPalette}
                onExport={() => setShowExportModal(true)}
                onImageUpload={() => setShowImageUpload(true)}
              />
            </div>

            {/* Mobile Generate Button */}
            <div className="sm:hidden">
              <Controls
                onGenerate={generateNewPalette}
                variant="minimal"
              />
            </div>

            {/* Color Swatches */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-1 min-h-[500px] md:h-[60vh] rounded-lg overflow-hidden shadow-2xl">
              {colors.map((color, index) => (
                <ColorSwatchComponent
                  key={index}
                  color={color}
                  index={index}
                  onLockToggle={() => {
                    updateColor(index, { locked: !color.locked });
                  }}
                />
              ))}
            </div>

            {/* Mobile Controls */}
            <div className="sm:hidden mb-4">
              <MobileControls
                onExport={() => setShowExportModal(true)}
                onImageUpload={() => setShowImageUpload(true)}
              />
            </div>

            {isSharing && (
              <ShareModal
                colors={colors}
                onClose={() => setIsSharing(false)}
              />
            )}

            {showImageUpload && (
              <ImageUpload
                onColorsExtracted={setColors}
                onClose={() => setShowImageUpload(false)}
              />
            )}

            {showExportModal && (
              <ExportModal
                colors={colors}
                onClose={() => setShowExportModal(false)}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}