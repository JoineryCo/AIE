import React from 'react';
import { cn } from '../../../../../lib/utils';

interface ConfidenceIndicatorProps {
  confidence: number;
  size?: 'sm' | 'md' | 'lg';
  showPercentage?: boolean;
}

/**
 * ConfidenceIndicator
 * 
 * Visual representation of AI confidence level.
 * Displays a color-coded indicator from red (low) to green (high).
 */
const ConfidenceIndicator: React.FC<ConfidenceIndicatorProps> = ({ 
  confidence, 
  size = 'md',
  showPercentage = true
}) => {
  // Determine color based on confidence level
  const getColor = () => {
    if (confidence >= 90) return 'bg-green-500';
    if (confidence >= 75) return 'bg-yellow-500';
    if (confidence >= 60) return 'bg-orange-500';
    return 'bg-red-500';
  };
  
  // Determine size classes
  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'h-1.5 w-16';
      case 'lg': return 'h-3 w-32';
      case 'md':
      default: return 'h-2 w-24';
    }
  };
  
  // Determine text size
  const getTextSize = () => {
    switch (size) {
      case 'sm': return 'text-xs';
      case 'lg': return 'text-sm';
      case 'md':
      default: return 'text-xs';
    }
  };
  
  // Format confidence value to ensure it's displayed as a percentage
  const formatConfidence = () => {
    // If confidence is already between 0-100, use it directly
    if (confidence >= 1) {
      return Math.round(confidence);
    }
    // If confidence is a decimal (0-1), convert to percentage
    return Math.round(confidence * 100);
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center space-x-2">
        <div className={cn("bg-gray-200 rounded-full overflow-hidden", getSizeClasses())}>
          <div 
            className={cn("h-full rounded-full", getColor())}
            style={{ width: `${formatConfidence()}%` }}
          />
        </div>
        
        {showPercentage && (
          <span className={cn("font-medium", getTextSize(), getColor().replace('bg-', 'text-'))}>
            {formatConfidence()}%
          </span>
        )}
      </div>
    </div>
  );
};

export default ConfidenceIndicator;
