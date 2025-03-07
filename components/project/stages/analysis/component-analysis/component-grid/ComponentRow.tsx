"use client";

import React from 'react';
import { Edit, AlertTriangle, Check, X, ChevronDown, ChevronRight } from 'lucide-react';
import { JoineryComponent } from '../types';
import { cn } from '../../../../../../lib/utils';

interface ComponentRowProps {
  component: JoineryComponent;
  isSelected: boolean;
  isExpanded: boolean;
  onSelect: () => void;
  onToggleExpand: () => void;
  onCreateIssue: () => void;
  depth: number;
}

/**
 * ComponentRow
 * 
 * Row component for displaying a joinery component in the grid.
 */
export default function ComponentRow({
  component,
  isSelected,
  isExpanded,
  onSelect,
  onToggleExpand,
  onCreateIssue,
  depth = 0
}: ComponentRowProps) {
  // Format dimensions as string
  const dimensionsString = `${component.dimensions.width} × ${component.dimensions.height} × ${component.dimensions.depth} mm`;
  
  // Format estimated time as hours and minutes
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours === 0) {
      return `${mins}m`;
    } else if (mins === 0) {
      return `${hours}h`;
    } else {
      return `${hours}h ${mins}m`;
    }
  };
  
  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'to-review':
        return 'bg-blue-100 text-blue-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'modified':
        return 'bg-purple-100 text-purple-800';
      case 'discarded':
        return 'bg-gray-100 text-gray-800';
      case 'unclear':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Get complexity color
  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'standard':
        return 'bg-green-100 text-green-800';
      case 'custom':
        return 'bg-blue-100 text-blue-800';
      case 'high':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Check if component has children
  const hasChildren = component.childComponentIds && component.childComponentIds.length > 0;
  
  return (
    <tr 
      className={cn(
        "hover:bg-gray-50 transition-colors",
        isSelected ? "bg-blue-50" : ""
      )}
      onClick={onSelect}
    >
      {/* Component Name */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          {/* Indentation and expand/collapse button */}
          <div style={{ width: `${depth * 20}px` }} className="flex-shrink-0" />
          
          {hasChildren ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleExpand();
              }}
              className="mr-2 p-1 rounded-full hover:bg-gray-200"
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronRight className="h-4 w-4 text-gray-500" />
              )}
            </button>
          ) : (
            <div className="w-6" /> // Spacer for alignment
          )}
          
          <div className="flex flex-col">
            <div className="font-medium text-gray-900">{component.name}</div>
            <div className="text-sm text-gray-500">{component.type}</div>
          </div>
        </div>
      </td>
      
      {/* Quantity */}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {component.quantity}
      </td>
      
      {/* Dimensions */}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {dimensionsString}
      </td>
      
      {/* Material */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{component.material.type}</div>
        <div className="text-sm text-gray-500">{component.material.finish}</div>
      </td>
      
      {/* Complexity */}
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={cn(
          "px-2 py-1 text-xs font-medium rounded-full capitalize",
          getComplexityColor(component.complexity)
        )}>
          {component.complexity}
        </span>
      </td>
      
      {/* Estimated Time */}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {formatTime(component.estimatedTime)}
      </td>
      
      {/* Status */}
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={cn(
          "px-2 py-1 text-xs font-medium rounded-full capitalize",
          getStatusColor(component.status)
        )}>
          {component.status.replace('-', ' ')}
        </span>
      </td>
      
      {/* Actions */}
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex items-center justify-end space-x-2">
          {component.status === 'unclear' && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCreateIssue();
              }}
              className="p-1 rounded-full text-amber-600 hover:bg-amber-100"
              title="Create issue"
            >
              <AlertTriangle className="h-4 w-4" />
            </button>
          )}
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              // This would open an edit modal in a real implementation
              console.log('Edit component', component.id);
            }}
            className="p-1 rounded-full text-blue-600 hover:bg-blue-100"
            title="Edit component"
          >
            <Edit className="h-4 w-4" />
          </button>
          
          {component.status === 'to-review' && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // This would approve the component in a real implementation
                  console.log('Approve component', component.id);
                }}
                className="p-1 rounded-full text-green-600 hover:bg-green-100"
                title="Approve component"
              >
                <Check className="h-4 w-4" />
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // This would discard the component in a real implementation
                  console.log('Discard component', component.id);
                }}
                className="p-1 rounded-full text-red-600 hover:bg-red-100"
                title="Discard component"
              >
                <X className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
}
