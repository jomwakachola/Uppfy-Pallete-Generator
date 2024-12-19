import React from 'react';
import { Palette, Moon, Sun, HelpCircle, Share2 } from 'lucide-react';
import { Tooltip } from './Tooltip';

interface NavbarProps {
  darkMode: boolean;
  onDarkModeToggle: () => void;
  onShare: () => void;
}

export function Navbar({ darkMode, onDarkModeToggle, onShare }: NavbarProps) {
  const appDescription = "Create, customize, and share beautiful color palettes. Generate random colors, lock your favorites, and undo changes with ease. Press spacebar to generate new colors!";

  return (
    <nav className="fixed top-0 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Palette className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600 dark:text-indigo-400" />
            <div className="flex items-baseline gap-2">
              <span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Palette Pro</span>
              <span className="hidden sm:inline text-sm text-gray-500 dark:text-gray-400">by Uppfy Digital</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 sm:gap-6">
            <Tooltip text={appDescription}>
              <button className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                <HelpCircle className="w-5 h-5" />
              </button>
            </Tooltip>
            <button 
              onClick={onShare}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button 
              onClick={onDarkModeToggle}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}