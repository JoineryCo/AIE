"use client";

import React from 'react';
import { FileSymlink, FileDigit, GitBranch, Scale } from 'lucide-react';
import { DrawingElement } from '../../../analysis/types';
import SectionContainer from './SectionContainer';
import MetadataField from './MetadataField';

interface DrawingReferenceSectionProps {
  element: DrawingElement;
  drawingTitle?: string;
  isEditing?: boolean;
  onFieldChange?: (field: string, value: any) => void;
}

/**
 * DrawingReferenceSection
 * 
 * Displays the drawing reference information, including:
 * - Drawing number
 * - Page number
 * - Revision information
 * - Scale
 */
const DrawingReferenceSection: React.FC<DrawingReferenceSectionProps> = ({
  element,
  drawingTitle,
  isEditing = false,
  onFieldChange
}) => {
  return (
    <SectionContainer 
      title="Drawing Reference" 
      icon={<FileSymlink className="h-4 w-4" />}
      defaultExpanded={true}
    >
      <div className="grid grid-cols-2 gap-4">
        <MetadataField
          label="Drawing Number"
          value={element.drawingReference?.drawingNumber || 'N/A'}
          icon={<FileDigit className="h-3 w-3" />}
          isRequired={true}
          tooltip="Reference code for the drawing"
          isEditing={isEditing && !!element.drawingReference}
          fieldName="drawingReference.drawingNumber"
          onValueChange={onFieldChange}
        />
        
        <MetadataField
          label="Page Number"
          value={element.drawingReference?.pageNumber || 'N/A'}
          isEditing={isEditing && !!element.drawingReference}
          fieldName="drawingReference.pageNumber"
          onValueChange={onFieldChange}
        />
        
        <MetadataField
          label="Revision"
          value={element.drawingReference?.revision || 'N/A'}
          icon={<GitBranch className="h-3 w-3" />}
          isEditing={isEditing && !!element.drawingReference}
          fieldName="drawingReference.revision"
          onValueChange={onFieldChange}
        />
        
        <MetadataField
          label="Scale"
          value={element.scale || 'N/A'}
          icon={<Scale className="h-3 w-3" />}
          isEditing={isEditing}
          fieldName="scale"
          onValueChange={onFieldChange}
        />
      </div>
      
      {drawingTitle && (
        <div className="mt-4 p-2 bg-gray-50 rounded border border-gray-200 text-sm text-gray-700">
          <span className="font-medium">Drawing Title:</span> {drawingTitle}
        </div>
      )}
    </SectionContainer>
  );
};

export default DrawingReferenceSection;
