import React, { useEffect } from 'react';
import { ColorProvider } from './contexts/ColorContext';
import { AppContent } from './components/AppContent';
import { parsePaletteFromUrl } from './utils/sharing';

export default function App() {
  useEffect(() => {
    // Check for shared palette in URL
    const params = new URLSearchParams(window.location.search);
    const palette = params.get('palette');
    if (palette) {
      const colors = parsePaletteFromUrl(window.location.href);
      if (colors) {
        // You can dispatch this to your color context if needed
        // setColors(colors);
      }
    }
  }, []);

  return (
    <ColorProvider>
      <AppContent />
    </ColorProvider>
  );
}