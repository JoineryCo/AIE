import React from 'react';
import { CheckCircle, Edit, X, AlertTriangle } from 'lucide-react';
import { cn } from '../../../../../lib/utils';
import { FindingStatus } from '../types';

interface ActionButtonsProps {
  onAction: (action: 'approve' | 'edit' | 'discard' | 'flag') => void;
  currentStatus: FindingStatus;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

/**
 * ActionButtons
 * 
 * Component for displaying action buttons for findings validation.
 * Provides buttons for approve, edit, discard, and flag as unclear.
 */
const ActionButtons: React.FC<ActionButtonsProps> = ({ 
  onAction, 
  currentStatus,
  size = 'md',
  disabled = false
}) => {
  // Determine size classes
  const getSizeClasses = () => {
    switch (size) {
      case 'sm': 
        return {
          button: 'p-1',
          icon: 'h-4 w-4'
        };
      case 'lg': 
        return {
          button: 'p-2',
          icon: 'h-6 w-6'
        };
      case 'md':
      default: 
        return {
          button: 'p-1.5',
          icon: 'h-5 w-5'
        };
    }
  };
  
  const sizeClasses = getSizeClasses();
  
  // Determine if a button should be highlighted based on current status
  const isActive = (status: FindingStatus) => currentStatus === status;
  
  return (
    <div className="flex items-center space-x-2">
      <button 
        onClick={() => onAction('approve')}
        disabled={disabled}
        className={cn(
          sizeClasses.button,
          "rounded-full transition-colors",
          isActive('approved')
            ? "bg-green-100 text-green-600"
            : "text-gray-400 hover:text-green-600 hover:bg-green-50",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        title="Approve"
      >
        <CheckCircle className={sizeClasses.icon} />
      </button>
      
      <button 
        onClick={() => onAction('edit')}
        disabled={disabled}
        className={cn(
          sizeClasses.button,
          "rounded-full transition-colors",
          isActive('modified')
            ? "bg-blue-100 text-blue-600"
            : "text-gray-400 hover:text-blue-600 hover:bg-blue-50",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        title="Edit"
      >
        <Edit className={sizeClasses.icon} />
      </button>
      
      <button 
        onClick={() => onAction('discard')}
        disabled={disabled}
        className={cn(
          sizeClasses.button,
          "rounded-full transition-colors",
          isActive('discarded')
            ? "bg-red-100 text-red-600"
            : "text-gray-400 hover:text-red-600 hover:bg-red-50",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        title="Discard"
      >
        <X className={sizeClasses.icon} />
      </button>
      
      <button 
        onClick={() => onAction('flag')}
        disabled={disabled}
        className={cn(
          sizeClasses.button,
          "rounded-full transition-colors",
          isActive('unclear')
            ? "bg-purple-100 text-purple-600"
            : "text-gray-400 hover:text-purple-600 hover:bg-purple-50",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        title="Flag as Unclear"
      >
        <AlertTriangle className={sizeClasses.icon} />
      </button>
    </div>
  );
};

export default ActionButtons;
