"use client";

import React from 'react';
import { 
  CheckCircle, 
  Edit, 
  Trash2, 
  AlertTriangle, 
  Clock 
} from 'lucide-react';
import { DrawingElement, ElementStatus } from '../../../analysis/types';
import SectionContainer from './SectionContainer';

interface StatusSectionProps {
  element: DrawingElement;
  isEditing?: boolean;
  onFieldChange?: (field: string, value: any) => void;
}

/**
 * StatusSection
 * 
 * Displays the current validation status of the element.
 */
const StatusSection: React.FC<StatusSectionProps> = ({
  element,
  isEditing = false,
  onFieldChange
}) => {
  // Get status icon and color
  const getStatusInfo = (status: ElementStatus) => {
    switch (status) {
      case 'approved':
        return {
          icon: <CheckCircle className="h-4 w-4" />,
          label: 'Approved',
          bgColor: 'bg-green-50',
          textColor: 'text-green-700',
          borderColor: 'border-green-200'
        };
      case 'modified':
        return {
          icon: <Edit className="h-4 w-4" />,
          label: 'Modified',
          bgColor: 'bg-blue-50',
          textColor: 'text-blue-700',
          borderColor: 'border-blue-200'
        };
      case 'discarded':
        return {
          icon: <Trash2 className="h-4 w-4" />,
          label: 'Discarded',
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-700',
          borderColor: 'border-gray-200'
        };
      case 'unclear':
        return {
          icon: <AlertTriangle className="h-4 w-4" />,
          label: 'Flagged as Unclear',
          bgColor: 'bg-yellow-50',
          textColor: 'text-yellow-700',
          borderColor: 'border-yellow-200'
        };
      case 'to-review':
      default:
        return {
          icon: <Clock className="h-4 w-4" />,
          label: 'Needs Review',
          bgColor: 'bg-blue-50',
          textColor: 'text-blue-700',
          borderColor: 'border-blue-200'
        };
    }
  };
  
  const statusInfo = getStatusInfo(element.status);
  
  return (
    <SectionContainer 
      title="Validation Status" 
      icon={statusInfo.icon}
      defaultExpanded={true}
    >
      {isEditing ? (
        <select
          value={element.status}
          onChange={(e) => onFieldChange && onFieldChange('status', e.target.value as ElementStatus)}
          className="w-full p-3 rounded border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <option value="to-review">Needs Review</option>
          <option value="approved">Approved</option>
          <option value="modified">Modified</option>
          <option value="discarded">Discarded</option>
          <option value="unclear">Flagged as Unclear</option>
        </select>
      ) : (
        <div 
          className={`p-3 rounded border flex items-center ${statusInfo.bgColor} ${statusInfo.textColor} ${statusInfo.borderColor}`}
        >
          <span className="mr-2">{statusInfo.icon}</span>
          <span className="font-medium">{statusInfo.label}</span>
        </div>
      )}
      
      {element.status === 'unclear' && element.issueId && (
        <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
          This element has been flagged with a specification issue.
        </div>
      )}
    </SectionContainer>
  );
};

export default StatusSection;
