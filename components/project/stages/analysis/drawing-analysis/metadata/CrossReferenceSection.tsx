"use client";

import React from 'react';
import { Link, ExternalLink } from 'lucide-react';
import { DrawingElement } from '../../../analysis/types';
import SectionContainer from './SectionContainer';

interface CrossReferenceSectionProps {
  element: DrawingElement;
  onNavigateToElement?: (elementId: string) => void;
  isEditing?: boolean;
  onFieldChange?: (field: string, value: any) => void;
}

/**
 * CrossReferenceSection
 * 
 * Displays cross-references to other drawings and elements.
 */
const CrossReferenceSection: React.FC<CrossReferenceSectionProps> = ({
  element,
  onNavigateToElement,
  isEditing = false,
  onFieldChange
}) => {
  if (!element.crossReferences || element.crossReferences.length === 0) {
    return (
      <SectionContainer 
        title="Cross References" 
        icon={<Link className="h-4 w-4" />}
        defaultExpanded={false}
      >
        <div className="text-sm text-gray-500 italic">
          No cross-references available
        </div>
      </SectionContainer>
    );
  }
  
  return (
    <SectionContainer 
      title="Cross References" 
      icon={<Link className="h-4 w-4" />}
      defaultExpanded={false}
    >
      <ul className="space-y-2">
        {element.crossReferences.map((ref, index) => (
          <li 
            key={index}
            className="p-2 bg-gray-50 rounded border border-gray-200 text-sm"
          >
            <div className="flex items-start">
              <div className="flex-1">
                <div className="font-medium text-gray-700">
                  {ref.description}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Drawing: {ref.drawingNumber}
                </div>
              </div>
              
              {onNavigateToElement && (
                <button
                  onClick={() => onNavigateToElement(ref.elementId)}
                  className="ml-2 p-1 text-blue-600 hover:text-blue-800 rounded-full hover:bg-blue-50"
                  title="Navigate to element"
                >
                  <ExternalLink className="h-4 w-4" />
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </SectionContainer>
  );
};

export default CrossReferenceSection;
