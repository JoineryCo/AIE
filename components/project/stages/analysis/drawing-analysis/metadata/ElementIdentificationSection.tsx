"use client";

import React from 'react';
import { Tag, FileText, Layout } from 'lucide-react';
import { DrawingElement, DrawingType } from '../../../analysis/types';
import SectionContainer from './SectionContainer';
import MetadataField from './MetadataField';
import ConfidenceIndicator from '../../../analysis/text-analysis/ConfidenceIndicator';

interface ElementIdentificationSectionProps {
  element: DrawingElement;
  isEditing?: boolean;
  onFieldChange?: (field: string, value: any) => void;
}

/**
 * ElementIdentificationSection
 * 
 * Displays the element's identification information, including:
 * - Reference number (e.g., "J01", "D01")
 * - View type (elevation, plan, section, detail)
 * - Element type
 * - Joinery number
 * - Confidence score
 */
const ElementIdentificationSection: React.FC<ElementIdentificationSectionProps> = ({
  element,
  isEditing = false,
  onFieldChange
}) => {
  // Format element type for display
  const formatElementType = (type: string): string => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };
  
  // Get reference number (e.g., "J01", "D01")
  const getReferenceNumber = (): string => {
    if (element.joineryNumber && element.joineryNumber.match(/^[A-Z][0-9]+/)) {
      return element.joineryNumber;
    }
    // If no proper joinery number, create one based on element type
    const prefix = element.type.charAt(0).toUpperCase();
    const number = element.elementNumber || element.id.split('-')[1];
    return `${prefix}${number.padStart(2, '0')}`;
  };
  
  // Get view type (elevation, plan, section, detail)
  const getViewType = (): DrawingType => {
    return element.drawingReference?.viewType || 'plan';
  };
  
  // Format view type for display
  const formatViewType = (viewType: DrawingType): string => {
    return viewType.charAt(0).toUpperCase() + viewType.slice(1);
  };
  
  return (
    <SectionContainer 
      title="Element Identification" 
      icon={<Tag className="h-4 w-4" />}
      defaultExpanded={true}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="flex flex-col mr-3">
            <span className="text-lg font-semibold text-gray-800">
              {getReferenceNumber()}
            </span>
            <span className="text-xs text-gray-500">
              {formatViewType(getViewType())}
            </span>
          </div>
          <span className="text-base font-medium text-gray-600">
            {formatElementType(element.type)}
          </span>
        </div>
        <ConfidenceIndicator confidence={element.confidence} />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <MetadataField
          label="Joinery Number"
          value={element.joineryNumber}
          icon={<FileText className="h-3 w-3" />}
          isRequired={true}
          tooltip="Unique identifier for this joinery element"
          isEditing={isEditing}
          fieldName="joineryNumber"
          onValueChange={onFieldChange}
        />
        
        <MetadataField
          label="View Type"
          value={formatViewType(getViewType())}
          icon={<Layout className="h-3 w-3" />}
          isRequired={true}
          tooltip="Type of architectural view (plan, elevation, section, detail)"
          isEditing={isEditing && !!element.drawingReference}
          fieldName="drawingReference.viewType"
          onValueChange={onFieldChange}
        />
        
        <MetadataField
          label="Category"
          value={formatElementType(element.category)}
          isEditing={isEditing}
          fieldName="category"
          onValueChange={onFieldChange}
        />
        
        <MetadataField
          label="Type"
          value={formatElementType(element.type)}
          isEditing={isEditing}
          fieldName="type"
          onValueChange={onFieldChange}
        />
      </div>
    </SectionContainer>
  );
};

export default ElementIdentificationSection;
