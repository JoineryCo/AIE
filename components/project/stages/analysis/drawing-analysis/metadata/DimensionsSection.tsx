"use client";

import React from 'react';
import { Ruler, ArrowRightLeft, ArrowUpDown, Box } from 'lucide-react';
import { DrawingElement } from '../../../analysis/types';
import SectionContainer from './SectionContainer';
import MetadataField from './MetadataField';

interface DimensionsSectionProps {
  element: DrawingElement;
  isEditing?: boolean;
  onFieldChange?: (field: string, value: any) => void;
}

/**
 * DimensionsSection
 * 
 * Displays the dimensions information for the element, including:
 * - Width
 * - Height
 * - Depth (if available)
 */
const DimensionsSection: React.FC<DimensionsSectionProps> = ({
  element,
  isEditing = false,
  onFieldChange
}) => {
  // Format dimension value with unit
  const formatDimension = (value: number | undefined, unit: string = 'mm'): string => {
    if (value === undefined) return 'N/A';
    return `${value} ${unit}`;
  };
  
  // Extract numeric value from formatted dimension string
  const extractDimensionValue = (formattedValue: string): number | undefined => {
    if (formattedValue === 'N/A') return undefined;
    const match = formattedValue.match(/^(\d+(\.\d+)?)/);
    return match ? parseFloat(match[1]) : undefined;
  };
  
  // Calculate volume if all dimensions are available
  const calculateVolume = (): string => {
    const { width, height, depth } = element.dimensions;
    if (width && height && depth) {
      const volumeMm3 = width * height * depth;
      // Convert to cubic meters for readability
      const volumeM3 = volumeMm3 / 1000000000;
      return `${volumeM3.toFixed(3)} m³`;
    }
    return 'N/A';
  };
  
  return (
    <SectionContainer 
      title="Dimensions" 
      icon={<Ruler className="h-4 w-4" />}
      defaultExpanded={true}
    >
      <div className="grid grid-cols-3 gap-4">
        <MetadataField
          label="Width"
          value={isEditing ? (element.dimensions.width || '') : formatDimension(element.dimensions.width)}
          icon={<ArrowRightLeft className="h-3 w-3" />}
          isRequired={true}
          isEditing={isEditing}
          fieldName="dimensions.width"
          onValueChange={onFieldChange}
        />
        
        <MetadataField
          label="Height"
          value={isEditing ? (element.dimensions.height || '') : formatDimension(element.dimensions.height)}
          icon={<ArrowUpDown className="h-3 w-3" />}
          isRequired={true}
          isEditing={isEditing}
          fieldName="dimensions.height"
          onValueChange={onFieldChange}
        />
        
        <MetadataField
          label="Depth"
          value={isEditing ? (element.dimensions.depth || '') : formatDimension(element.dimensions.depth)}
          icon={<Box className="h-3 w-3" />}
          isEditing={isEditing}
          fieldName="dimensions.depth"
          onValueChange={onFieldChange}
        />
      </div>
      
      {/* Volume calculation */}
      <div className="mt-4 p-2 bg-gray-50 rounded border border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">Volume:</span>
          <span className="text-sm text-gray-700">{calculateVolume()}</span>
        </div>
      </div>
    </SectionContainer>
  );
};

export default DimensionsSection;
