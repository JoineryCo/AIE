"use client";

import React from 'react';
import { MapPin, Home } from 'lucide-react';
import { DrawingElement } from '../../../analysis/types';
import SectionContainer from './SectionContainer';
import MetadataField from './MetadataField';

interface LocationInfoSectionProps {
  element: DrawingElement;
  isEditing?: boolean;
  onFieldChange?: (field: string, value: any) => void;
}

/**
 * LocationInfoSection
 * 
 * Displays the location information for the element, including:
 * - Room or area designation
 * - Building context (if available)
 */
const LocationInfoSection: React.FC<LocationInfoSectionProps> = ({
  element,
  isEditing = false,
  onFieldChange
}) => {
  return (
    <SectionContainer 
      title="Location Information" 
      icon={<MapPin className="h-4 w-4" />}
      defaultExpanded={true}
    >
      <div className="grid grid-cols-1 gap-4">
        <MetadataField
          label="Room/Area"
          value={element.location}
          icon={<Home className="h-3 w-3" />}
          isRequired={true}
          tooltip="Room or area where this element is located"
          isEditing={isEditing}
          fieldName="location"
          onValueChange={onFieldChange}
        />
        
        {/* Additional location fields could be added here in the future */}
        {/* For example: Floor, Building, Zone, etc. */}
      </div>
    </SectionContainer>
  );
};

export default LocationInfoSection;
