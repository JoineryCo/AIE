"use client";

import React, { useState, useEffect } from 'react';
import { getDrawingById } from '../mockdata/drawings';
import { DrawingElement, ElementStatus } from '../../analysis/types';
import { 
  CheckCircle, 
  Edit, 
  Trash2, 
  Flag,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '../../../../../lib/utils';

// Import metadata section components
import ElementIdentificationSection from './metadata/ElementIdentificationSection';
import DrawingReferenceSection from './metadata/DrawingReferenceSection';
import LocationInfoSection from './metadata/LocationInfoSection';
import DimensionsSection from './metadata/DimensionsSection';
import SourceSection from './metadata/SourceSection';
import CrossReferenceSection from './metadata/CrossReferenceSection';
import NotesSection from './metadata/NotesSection';
import StatusSection from './metadata/StatusSection';

interface ElementMetadataPanelProps {
  element: DrawingElement | null;
  onStatusChange: (elementId: string, newStatus: ElementStatus, notes?: string) => void;
  onEdit?: (elementId: string, updatedElement?: DrawingElement) => void;
  onDelete?: (elementId: string) => void;
  onFlagIssue?: (elementId: string) => void;
  onEditNotes?: (elementId: string, notes: string) => void;
  onNavigateToElement?: (elementId: string) => void;
  currentElementIndex?: number;
  totalElements?: number;
  isNewElement?: boolean;
  onSaveNewElement?: (element: DrawingElement) => void;
  onCancelNewElement?: () => void;
}

/**
 * ElementMetadataPanel
 * 
 * Component for displaying and editing element metadata.
 * Shows element details and provides actions for validation.
 * Uses modular section components for better organization and maintainability.
 * 
 * Can also be used for creating new elements when isNewElement is true.
 */
const ElementMetadataPanel: React.FC<ElementMetadataPanelProps> = ({
  element,
  onStatusChange,
  onEdit,
  onDelete,
  onFlagIssue,
  onEditNotes,
  onNavigateToElement,
  currentElementIndex = 8,
  totalElements = 22,
  isNewElement = false,
  onSaveNewElement,
  onCancelNewElement
}) => {
  // State for editing mode
  const [isEditing, setIsEditing] = useState<boolean>(isNewElement);
  const [editedElement, setEditedElement] = useState<DrawingElement | null>(null);
  
  // Initialize edited element when element changes
  useEffect(() => {
    if (element) {
      setEditedElement(element);
    }
  }, [element]);
  
  // Handle edit mode toggle
  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      if (editedElement && onEdit) {
        // In a real implementation, this would save the changes to the backend
        // For now, we'll just log the changes and pass the edited element to the onEdit callback
        console.log('Saving changes:', editedElement);
        
        // Update the element in the parent component
        // We pass the edited element ID and the edited element to the parent component
        // The parent component will update the element in its state
        onEdit(editedElement.id, editedElement);
      }
    }
    setIsEditing(!isEditing);
  };
  
  // Handle field change
  const handleFieldChange = (field: string, value: any) => {
    if (!editedElement) return;
    
    // Handle nested fields (e.g., "dimensions.width")
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      
      // Create a copy of the edited element
      const updatedElement = { ...editedElement };
      
      // Handle specific known nested fields
      if (parent === 'dimensions') {
        updatedElement.dimensions = {
          ...updatedElement.dimensions,
          [child]: value
        };
      } else if (parent === 'drawingReference' && updatedElement.drawingReference) {
        updatedElement.drawingReference = {
          ...updatedElement.drawingReference,
          [child]: value
        };
      } else if (parent === 'documentSource' && updatedElement.documentSource) {
        updatedElement.documentSource = {
          ...updatedElement.documentSource,
          [child]: value
        };
      }
      
      setEditedElement(updatedElement);
    } else {
      // Handle top-level fields with type assertion
      setEditedElement({
        ...editedElement,
        [field]: value
      } as DrawingElement);
    }
  };
  // If no element is selected, show placeholder
  if (!element) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white p-6">
        <div className="text-gray-500 text-center">
          <p className="text-lg font-medium">No element selected</p>
          <p className="text-sm">Select an element from the drawing to view its details</p>
        </div>
      </div>
    );
  }
  
  // Get drawing title for reference
  const drawing = getDrawingById(element.drawingId);
  const drawingTitle = drawing?.title;
  
  // Handle approve action
  const handleApprove = () => {
    onStatusChange(element.id, 'approved');
  };
  
  // Handle discard action
  const handleDiscard = () => {
    onStatusChange(element.id, 'discarded');
  };
  
  // Handle flag as unclear action
  const handleFlagUnclear = () => {
    if (onFlagIssue) {
      onFlagIssue(element.id);
    } else {
      onStatusChange(element.id, 'unclear');
    }
  };
  
  return (
    <div className="flex flex-col h-full w-full bg-white border-l border-gray-200">
      {/* Header with navigation and action controls */}
      <div className="border-b border-gray-200 bg-white">
        {isNewElement ? (
          // Header for new element mode
          <div className="flex justify-between items-center px-4 py-3">
            <h3 className="text-lg font-medium">New Element</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={onCancelNewElement}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (editedElement && onSaveNewElement) {
                    onSaveNewElement(editedElement);
                  }
                }}
                className="px-3 py-1 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700"
              >
                Save Element
              </button>
            </div>
          </div>
        ) : (
          // Header for existing element mode
          <div className="flex justify-between items-center px-2 py-2">
            {/* Left navigation arrow */}
            <button 
              className="p-1 text-gray-500 hover:text-gray-700"
              onClick={() => onNavigateToElement?.(element.id + '_prev')}
              title="Previous element"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            {/* Element counter */}
            <div className="font-medium text-gray-800">
              {currentElementIndex}/{totalElements}
            </div>
            
            {/* Action buttons */}
            <div className="flex items-center space-x-2">
              {/* Approve button */}
              <button
                onClick={handleApprove}
                disabled={element.status === 'approved'}
                className={cn(
                  "p-1 rounded-full",
                  element.status === 'approved'
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-green-500 hover:bg-green-50"
                )}
                title="Approve"
              >
                <CheckCircle className="h-6 w-6" />
              </button>
              
              {/* Edit button */}
              <button
                onClick={handleEditToggle}
                className={cn(
                  "p-1 rounded-full",
                  isEditing
                    ? "text-white bg-blue-500 hover:bg-blue-600"
                    : "text-blue-500 hover:bg-blue-50"
                )}
                title={isEditing ? "Save" : "Edit"}
              >
                <Edit className="h-6 w-6" />
              </button>
              
              {/* Discard button */}
              <button
                onClick={handleDiscard}
                disabled={element.status === 'discarded'}
                className={cn(
                  "p-1 rounded-full",
                  element.status === 'discarded'
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-red-500 hover:bg-red-50"
                )}
                title="Discard"
              >
                <Trash2 className="h-6 w-6" />
              </button>
              
              {/* Flag as unclear button */}
              <button
                onClick={handleFlagUnclear}
                disabled={element.status === 'unclear'}
                className={cn(
                  "p-1 rounded-full",
                  element.status === 'unclear'
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-yellow-500 hover:bg-yellow-50"
                )}
                title="Flag as Unclear"
              >
                <Flag className="h-6 w-6" />
              </button>
            </div>
            
            {/* Right navigation arrow */}
            <button 
              className="p-1 text-gray-500 hover:text-gray-700"
              onClick={() => onNavigateToElement?.(element.id + '_next')}
              title="Next element"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        {/* Element identification */}
        <ElementIdentificationSection 
          element={isEditing ? editedElement! : element} 
          isEditing={isEditing}
          onFieldChange={handleFieldChange}
        />
        
        {/* Drawing reference */}
        <DrawingReferenceSection 
          element={isEditing ? editedElement! : element} 
          drawingTitle={drawingTitle}
          isEditing={isEditing}
          onFieldChange={handleFieldChange}
        />
        
        {/* Location information */}
        <LocationInfoSection 
          element={isEditing ? editedElement! : element}
          isEditing={isEditing}
          onFieldChange={handleFieldChange}
        />
        
        {/* Dimensions */}
        <DimensionsSection 
          element={isEditing ? editedElement! : element}
          isEditing={isEditing}
          onFieldChange={handleFieldChange}
        />
        
        {/* Document source */}
        <SourceSection 
          element={isEditing ? editedElement! : element}
          isEditing={isEditing}
          onFieldChange={handleFieldChange}
        />
        
        {/* Cross references */}
        <CrossReferenceSection 
          element={isEditing ? editedElement! : element} 
          onNavigateToElement={onNavigateToElement}
          isEditing={isEditing}
          onFieldChange={handleFieldChange}
        />
        
        {/* Notes */}
        <NotesSection 
          element={isEditing ? editedElement! : element} 
          onEditNotes={onEditNotes}
          isEditing={isEditing}
          onFieldChange={handleFieldChange}
        />
        
        {/* Status */}
        <StatusSection 
          element={isEditing ? editedElement! : element}
          isEditing={isEditing}
          onFieldChange={handleFieldChange}
        />
      </div>
    </div>
  );
};

export default ElementMetadataPanel;
