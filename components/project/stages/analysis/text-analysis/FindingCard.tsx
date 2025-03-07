import React, { useState } from 'react';
import { ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';
import { cn } from '../../../../../lib/utils';
import { Finding } from '../types';
import ConfidenceIndicator from './ConfidenceIndicator';
import ActionButtons from './ActionButtons';

interface FindingCardProps {
  finding: Finding;
  isSelected: boolean;
  onSelect: () => void;
  onAction: (action: 'approve' | 'edit' | 'discard' | 'flag') => void;
}

/**
 * FindingCard
 * 
 * Card component for displaying a finding with its details.
 * Shows extracted information, confidence level, and action buttons.
 */
const FindingCard: React.FC<FindingCardProps> = ({ 
  finding, 
  isSelected,
  onSelect,
  onAction
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Get border color based on status
  const getBorderColor = () => {
    switch (finding.status) {
      case 'approved': return 'border-green-500';
      case 'modified': return 'border-blue-500';
      case 'discarded': return 'border-red-500';
      case 'unclear': return 'border-purple-500';
      case 'to-review':
      default: return isSelected ? 'border-amber-500' : 'border-gray-200';
    }
  };
  
  // Get background color based on selection and status
  const getBackgroundColor = () => {
    if (isSelected) {
      switch (finding.status) {
        case 'approved': return 'bg-green-50';
        case 'modified': return 'bg-blue-50';
        case 'discarded': return 'bg-red-50';
        case 'unclear': return 'bg-purple-50';
        case 'to-review':
        default: return 'bg-amber-50';
      }
    }
    return 'bg-white hover:bg-gray-50';
  };
  
  // Toggle expanded state
  const toggleExpanded = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };
  
  return (
    <div 
      className={cn(
        "border rounded-lg overflow-hidden transition-colors cursor-pointer mb-3",
        getBorderColor(),
        getBackgroundColor()
      )}
      onClick={onSelect}
    >
      {/* Card Header */}
      <div className="p-3">
        <div className="flex justify-between items-start">
          <div>
            <div className="font-medium text-gray-900 mb-1">{finding.category}</div>
            <div className="text-sm text-gray-700">{finding.extractedText}</div>
          </div>
          
          <button
            onClick={toggleExpanded}
            className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            {isExpanded ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>
        </div>
        
        <div className="mt-2">
          <ConfidenceIndicator confidence={finding.confidence} size="sm" />
        </div>
        
        {/* Issue indicator */}
        {finding.issueId && (
          <div className="mt-2 flex items-center text-purple-600 text-xs">
            <AlertTriangle className="h-3 w-3 mr-1" />
            <span>Has specification issue</span>
          </div>
        )}
      </div>
      
      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-3 pb-3 pt-1 border-t border-gray-100">
          <div className="grid grid-cols-2 gap-2 text-sm mb-3">
            <div>
              <div className="text-gray-500 text-xs">Original Value</div>
              <div className="text-gray-900">{finding.extractedText}</div>
            </div>
            <div>
              <div className="text-gray-500 text-xs">Current Value</div>
              <div className={cn(
                "text-gray-900",
                finding.currentValue !== finding.extractedText && "text-blue-600 font-medium"
              )}>
                {finding.currentValue}
              </div>
            </div>
          </div>
          
          {finding.notes && (
            <div className="mb-3">
              <div className="text-gray-500 text-xs">Notes</div>
              <div className="text-gray-900 text-sm">{finding.notes}</div>
            </div>
          )}
          
          <div className="text-gray-500 text-xs mb-1">Source</div>
          <div className="text-gray-900 text-sm">{finding.sourceDocumentId}</div>
        </div>
      )}
      
      {/* Action Buttons */}
      <div className={cn(
        "px-3 py-2 flex justify-end",
        isExpanded ? "border-t border-gray-100" : "border-t border-gray-100 bg-gray-50"
      )}>
        <ActionButtons 
          onAction={onAction}
          currentStatus={finding.status}
          size="sm"
        />
      </div>
    </div>
  );
};

export default FindingCard;
