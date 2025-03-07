"use client";

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../../../../lib/utils';
import { Loader2 } from 'lucide-react';

interface ManualSelectionToolProps {
  isActive: boolean;
  onSelectionComplete: (boundingBox: { x: number; y: number; width: number; height: number }) => void;
  isProcessing: boolean;
}

/**
 * ManualSelectionTool
 * 
 * Component for manually selecting areas on a drawing to identify elements
 * that the AI missed. Allows users to draw bounding boxes around elements.
 */
const ManualSelectionTool: React.FC<ManualSelectionToolProps> = ({
  isActive,
  onSelectionComplete,
  isProcessing
}) => {
  const [selectionStart, setSelectionStart] = useState<{ x: number; y: number } | null>(null);
  const [currentSelection, setCurrentSelection] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Reset selection when tool is deactivated
  useEffect(() => {
    if (!isActive) {
      setSelectionStart(null);
      setCurrentSelection(null);
      setIsDragging(false);
    }
  }, [isActive]);
  
  // Handle mouse down to start selection
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isActive || isProcessing || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setSelectionStart({ x, y });
    setCurrentSelection({ x, y, width: 0, height: 0 });
    setIsDragging(true);
  };
  
  // Handle mouse move to update selection
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !selectionStart || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate the width and height of the selection
    const width = Math.abs(x - selectionStart.x);
    const height = Math.abs(y - selectionStart.y);
    
    // Calculate the top-left corner of the selection
    const selectionX = x < selectionStart.x ? x : selectionStart.x;
    const selectionY = y < selectionStart.y ? y : selectionStart.y;
    
    setCurrentSelection({
      x: selectionX,
      y: selectionY,
      width,
      height
    });
  };
  
  // Handle mouse up to complete selection
  const handleMouseUp = () => {
    if (!isDragging || !currentSelection) return;
    
    setIsDragging(false);
    
    // Only complete selection if it has a meaningful size
    if (currentSelection.width > 10 && currentSelection.height > 10) {
      onSelectionComplete(currentSelection);
    } else {
      // Reset selection if it's too small
      setSelectionStart(null);
      setCurrentSelection(null);
    }
  };
  
  // Handle mouse leave to cancel selection
  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      setSelectionStart(null);
      setCurrentSelection(null);
    }
  };
  
  if (!isActive) return null;
  
  return (
    <div 
      ref={containerRef}
      className={cn(
        "absolute inset-0 z-10",
        isActive ? "cursor-crosshair" : "pointer-events-none"
      )}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      {/* Selection overlay */}
      {currentSelection && (
        <div 
          className="absolute border-2 border-blue-500 bg-blue-100 bg-opacity-30"
          style={{
            left: `${currentSelection.x}px`,
            top: `${currentSelection.y}px`,
            width: `${currentSelection.width}px`,
            height: `${currentSelection.height}px`
          }}
        />
      )}
      
      {/* Processing indicator */}
      {isProcessing && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md flex items-center space-x-2">
            <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />
            <span className="text-sm font-medium">Processing selection...</span>
          </div>
        </div>
      )}
      
      {/* Instructions */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white px-4 py-2 rounded-md text-sm">
        Draw a box around an element the AI missed
      </div>
    </div>
  );
};

export default ManualSelectionTool;
