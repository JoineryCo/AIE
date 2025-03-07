"use client";

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../../../../lib/utils';
import { Drawing } from '../../analysis/types';

interface ThumbnailNavigatorProps {
  drawings: Drawing[];
  currentDrawingId: string;
  currentPageIndex: number;
  onSelectDrawing: (drawingId: string, pageIndex: number) => void;
  onPageChange: (pageIndex: number) => void;
}

/**
 * ThumbnailNavigator
 * 
 * Component for navigating between drawings and pages.
 * Displays thumbnails of all drawings and pages with pagination controls.
 */
const ThumbnailNavigator: React.FC<ThumbnailNavigatorProps> = ({
  drawings,
  currentDrawingId,
  currentPageIndex,
  onSelectDrawing,
  onPageChange
}) => {
  // Get the current drawing
  const currentDrawing = drawings.find(d => d.id === currentDrawingId);
  
  // Calculate total pages in the current drawing
  const totalPages = currentDrawing?.pages.length || 0;
  
  // Handle previous page
  const handlePrevPage = () => {
    if (currentPageIndex > 0) {
      onPageChange(currentPageIndex - 1);
    } else {
      // If we're at the first page of the current drawing, go to the last page of the previous drawing
      const currentDrawingIndex = drawings.findIndex(d => d.id === currentDrawingId);
      if (currentDrawingIndex > 0) {
        const prevDrawing = drawings[currentDrawingIndex - 1];
        onSelectDrawing(prevDrawing.id, prevDrawing.pages.length - 1);
      }
    }
  };
  
  // Handle next page
  const handleNextPage = () => {
    if (currentPageIndex < totalPages - 1) {
      onPageChange(currentPageIndex + 1);
    } else {
      // If we're at the last page of the current drawing, go to the first page of the next drawing
      const currentDrawingIndex = drawings.findIndex(d => d.id === currentDrawingId);
      if (currentDrawingIndex < drawings.length - 1) {
        onSelectDrawing(drawings[currentDrawingIndex + 1].id, 0);
      }
    }
  };
  
  // Get drawing type label
  const getDrawingTypeLabel = (type: string): string => {
    switch (type) {
      case 'plan': return 'Plan';
      case 'elevation': return 'Elevation';
      case 'section': return 'Section';
      case 'detail': return 'Detail';
      default: return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };
  
  return (
    <div className="flex flex-col h-full w-full bg-gray-100 border-r border-gray-200">
      {/* Drawing thumbnails */}
      <div className="flex-1 overflow-auto p-2">
        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 px-1">
          Drawings
        </h3>
        <div className="space-y-2">
          {drawings.map((drawing) => (
            <div key={drawing.id} className="space-y-1">
              <div 
                className={cn(
                  "text-xs font-medium px-2 py-1 rounded cursor-pointer",
                  drawing.id === currentDrawingId
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-200"
                )}
                onClick={() => onSelectDrawing(drawing.id, 0)}
              >
                {drawing.title}
                <span className="ml-1 text-xs text-gray-500">
                  ({getDrawingTypeLabel(drawing.type)})
                </span>
              </div>
              
              {/* Show pages for the current drawing */}
              {drawing.id === currentDrawingId && drawing.pages.length > 1 && (
                <div className="pl-4 space-y-1">
                  {drawing.pages.map((page, index) => (
                    <div
                      key={`${drawing.id}-page-${index}`}
                      className={cn(
                        "text-xs px-2 py-1 rounded cursor-pointer flex items-center",
                        index === currentPageIndex
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-600 hover:bg-gray-100"
                      )}
                      onClick={() => onPageChange(index)}
                    >
                      <div 
                        className="w-6 h-6 bg-white border border-gray-300 rounded flex items-center justify-center mr-2 text-xs"
                      >
                        {index + 1}
                      </div>
                      <span className="truncate">Page {index + 1}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Navigation controls */}
      <div className="p-2 border-t border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevPage}
            className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
            title="Previous Page"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <div className="text-xs text-gray-600">
            Page {currentPageIndex + 1} of {totalPages}
          </div>
          
          <button
            onClick={handleNextPage}
            className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
            title="Next Page"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThumbnailNavigator;
