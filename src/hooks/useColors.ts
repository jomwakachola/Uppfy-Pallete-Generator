import { useContext } from 'react';
import { ColorContext } from '../contexts/ColorContext';

export function useColors() {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error('useColors must be used within a ColorProvider');
  }
  return context;
}