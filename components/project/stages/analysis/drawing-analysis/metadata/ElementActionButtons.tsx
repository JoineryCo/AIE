"use client";

import React from 'react';
import { 
  CheckCircle, 
  Edit, 
  Trash2, 
  Flag 
} from 'lucide-react';
import { cn } from '../../../../../../lib/utils';
import { DrawingElement, ElementStatus } from '../../../analysis/types';

interface ElementActionButtonsProps {
  element: DrawingElement;
  onStatusChange: (elementId: string, newStatus: ElementStatus, notes?: string) => void;
  onEdit?: (elementId: string) => void;
  onFlagIssue?: (elementId: string) => void;
}

/**
 * ElementActionButtons
 * 
 * Provides the action buttons for the element metadata panel.
 * Includes buttons for approving, editing, flagging as unclear, and discarding.
 */
const ElementActionButtons: React.FC<ElementActionButtonsProps> = ({
  element,
  onStatusChange,
  onEdit,
  onFlagIssue
}) => {
  // Handle approve action
  const handleApprove = () => {
    onStatusChange(element.id, 'approved');
  };
  
  // Handle discard action
  const handleDiscard = () => {
    onStatusChange(element.id, 'discarded');
  };
  
  // Handle flag as unclear action
  const handleFlagUnclear = () => {
    if (onFlagIssue) {
      onFlagIssue(element.id);
    } else {
      onStatusChange(element.id, 'unclear');
    }
  };
  
  return (
    <div className="p-4 border-b border-gray-200 bg-white">
      <div className="flex flex-col space-y-3">
        <button
          onClick={handleApprove}
          disabled={element.status === 'approved'}
          className={cn(
            "flex items-center justify-center px-4 py-3 rounded-md text-sm font-medium",
            element.status === 'approved'
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-green-500 text-white hover:bg-green-600"
          )}
        >
          <CheckCircle className="h-5 w-5 mr-2" />
          Approve
        </button>
        
        {onEdit && (
          <button
            onClick={() => onEdit(element.id)}
            className="flex items-center justify-center px-4 py-3 rounded-md text-sm font-medium bg-blue-500 text-white hover:bg-blue-600"
          >
            <Edit className="h-5 w-5 mr-2" />
            Edit
          </button>
        )}
        
        <button
          onClick={handleFlagUnclear}
          disabled={element.status === 'unclear'}
          className={cn(
            "flex items-center justify-center px-4 py-3 rounded-md text-sm font-medium",
            element.status === 'unclear'
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-yellow-500 text-white hover:bg-yellow-600"
          )}
        >
          <Flag className="h-5 w-5 mr-2" />
          Flag as Unclear
        </button>
        
        <button
          onClick={handleDiscard}
          disabled={element.status === 'discarded'}
          className={cn(
            "flex items-center justify-center px-4 py-3 rounded-md text-sm font-medium",
            element.status === 'discarded'
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-gray-600 text-white hover:bg-gray-700"
          )}
        >
          <Trash2 className="h-5 w-5 mr-2" />
          Discard
        </button>
      </div>
    </div>
  );
};

export default ElementActionButtons;
