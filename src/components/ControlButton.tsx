import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Tooltip } from './Tooltip';

interface ControlButtonProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  tooltip?: string;
  variant?: 'primary' | 'secondary';
}

export function ControlButton({ 
  icon: Icon, 
  label, 
  onClick, 
  tooltip,
  variant = 'secondary'
}: ControlButtonProps) {
  const baseClasses = "flex items-center gap-2 px-4 py-2 text-white rounded-lg transition-colors";
  const variantClasses = {
    primary: "bg-indigo-600 hover:bg-indigo-700",
    secondary: "bg-gray-600 hover:bg-gray-700"
  };

  const button = (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]}`}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </button>
  );

  if (tooltip) {
    return <Tooltip text={tooltip}>{button}</Tooltip>;
  }

  return button;
}