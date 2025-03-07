"use client";

import React, { ReactNode, ChangeEvent } from 'react';
import { cn } from '../../../../../../lib/utils';
import { InfoIcon } from 'lucide-react';

interface MetadataFieldProps {
  label: string;
  value: string | number | ReactNode;
  icon?: ReactNode;
  isRequired?: boolean;
  tooltip?: string;
  className?: string;
  isEditing?: boolean;
  fieldName?: string;
  onValueChange?: (fieldName: string, value: string | number) => void;
}

/**
 * MetadataField
 * 
 * A reusable component for displaying label/value pairs in metadata sections.
 * Supports icons, required indicators, and tooltips.
 */
const MetadataField: React.FC<MetadataFieldProps> = ({
  label,
  value,
  icon,
  isRequired = false,
  tooltip,
  className,
  isEditing = false,
  fieldName = '',
  onValueChange
}) => {
  // Handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (onValueChange && fieldName) {
      // Convert to number if the input type is number
      const inputValue = e.target.type === 'number' 
        ? parseFloat(e.target.value) 
        : e.target.value;
      
      onValueChange(fieldName, inputValue);
    }
  };
  
  // Determine if the value is a React node or a simple string/number
  const isReactNode = React.isValidElement(value);
  
  return (
    <div className={cn("flex flex-col", className)}>
      <div className="flex items-center mb-1 text-xs text-gray-500">
        {icon && <span className="mr-1">{icon}</span>}
        <span>{label}</span>
        {isRequired && <span className="text-red-500 ml-1">*</span>}
        {tooltip && (
          <div className="relative ml-1 group">
            <InfoIcon className="h-3 w-3 text-gray-400" />
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
              {tooltip}
            </div>
          </div>
        )}
      </div>
      
      {isEditing && !isReactNode ? (
        <input
          type={typeof value === 'number' ? 'number' : 'text'}
          value={value as string | number}
          onChange={handleChange}
          className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ) : (
        <div className="text-sm font-medium text-gray-700">
          {value || <span className="text-gray-400 italic">Not specified</span>}
        </div>
      )}
    </div>
  );
};

export default MetadataField;
