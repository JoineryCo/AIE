"use client";

import React from 'react';
import { StickyNote, Edit } from 'lucide-react';
import { DrawingElement } from '../../../analysis/types';
import SectionContainer from './SectionContainer';

interface NotesSectionProps {
  element: DrawingElement;
  onEditNotes?: (elementId: string, notes: string) => void;
  isEditing?: boolean;
  onFieldChange?: (field: string, value: any) => void;
}

/**
 * NotesSection
 * 
 * Displays any notes associated with the element.
 * Allows for editing notes if the onEditNotes callback is provided.
 */
const NotesSection: React.FC<NotesSectionProps> = ({
  element,
  onEditNotes,
  isEditing = false,
  onFieldChange
}) => {
  return (
    <SectionContainer 
      title="Notes" 
      icon={<StickyNote className="h-4 w-4" />}
      defaultExpanded={!!element.notes}
    >
      {isEditing ? (
        <textarea
          value={element.notes || ''}
          onChange={(e) => onFieldChange && onFieldChange('notes', e.target.value)}
          className="w-full p-3 bg-yellow-50 rounded border border-yellow-200 text-sm text-gray-700 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-yellow-300"
          placeholder="Add notes about this element..."
        />
      ) : element.notes ? (
        <div className="relative">
          <div className="p-3 bg-yellow-50 rounded border border-yellow-200 text-sm text-gray-700 whitespace-pre-wrap">
            {element.notes}
          </div>
          
          {onEditNotes && !isEditing && (
            <button
              onClick={() => onEditNotes(element.id, element.notes || '')}
              className="absolute top-2 right-2 p-1 text-gray-500 hover:text-gray-700 rounded-full hover:bg-yellow-100"
              title="Edit notes"
            >
              <Edit className="h-4 w-4" />
            </button>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 italic">No notes available</span>
          
          {onEditNotes && !isEditing && (
            <button
              onClick={() => onEditNotes(element.id, '')}
              className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
            >
              <Edit className="h-3 w-3 mr-1" />
              Add notes
            </button>
          )}
        </div>
      )}
    </SectionContainer>
  );
};

export default NotesSection;
