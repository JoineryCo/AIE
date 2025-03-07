"use client";

import React, { ReactNode, useState } from 'react';
import { cn } from '../../../../../../lib/utils';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface SectionContainerProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  defaultExpanded?: boolean;
  className?: string;
}

/**
 * SectionContainer
 * 
 * A collapsible container for grouping related metadata fields.
 * Provides a consistent styling and behavior for metadata sections.
 */
const SectionContainer: React.FC<SectionContainerProps> = ({
  title,
  icon,
  children,
  defaultExpanded = true,
  className
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  
  return (
    <div className={cn("border border-gray-200 rounded-md overflow-hidden mb-4", className)}>
      <button
        type="button"
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 text-left"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          {icon && <span className="mr-2">{icon}</span>}
          <h4 className="text-sm font-medium text-gray-700">{title}</h4>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-4 w-4 text-gray-500" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-500" />
        )}
      </button>
      
      {isExpanded && (
        <div className="p-4 bg-white">
          {children}
        </div>
      )}
    </div>
  );
};

export default SectionContainer;
