"use client";

import React from 'react';
import { FileText, File, FileDigit } from 'lucide-react';
import { DrawingElement } from '../../../analysis/types';
import SectionContainer from './SectionContainer';
import MetadataField from './MetadataField';

interface SourceSectionProps {
  element: DrawingElement;
  isEditing?: boolean;
  onFieldChange?: (field: string, value: any) => void;
}

/**
 * SourceSection
 * 
 * Displays the document source information for the element, including:
 * - Original document name
 * - Page number in the original document
 */
const SourceSection: React.FC<SourceSectionProps> = ({
  element,
  isEditing = false,
  onFieldChange
}) => {
  return (
    <SectionContainer 
      title="Document Source" 
      icon={<FileText className="h-4 w-4" />}
      defaultExpanded={false}
    >
      <div className="grid grid-cols-1 gap-4">
        <MetadataField
          label="Source Document"
          value={element.documentSource?.fileName || 'N/A'}
          icon={<File className="h-3 w-3" />}
          tooltip="Original document containing this element"
          isEditing={isEditing && !!element.documentSource}
          fieldName="documentSource.fileName"
          onValueChange={onFieldChange}
        />
        
        <MetadataField
          label="Page Number"
          value={element.documentSource?.pageNumber || 'N/A'}
          icon={<FileDigit className="h-3 w-3" />}
          tooltip="Page in the original document"
          isEditing={isEditing && !!element.documentSource}
          fieldName="documentSource.pageNumber"
          onValueChange={onFieldChange}
        />
      </div>
    </SectionContainer>
  );
};

export default SourceSection;
