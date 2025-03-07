"use client";

import React, { useRef, useState, useEffect } from 'react';
import { cn } from '../../../../../lib/utils';
import { Drawing, DrawingElement } from '../../analysis/types';

interface ElementCanvasProps {
  drawing: Drawing | undefined;
  currentPageIndex: number;
  elements: DrawingElement[];
  selectedElementId: string | null;
  zoom: number;
  rotation: number;
  isPanMode: boolean;
  onSelectElement: (elementId: string) => void;
  onAddElement?: (boundingBox: { x: number; y: number; width: number; height: number }) => void;
}

/**
 * ElementCanvas
 * 
 * Component for displaying the drawing with interactive elements.
 * Handles element selection, zooming, panning, and rotation.
 */
const ElementCanvas: React.FC<ElementCanvasProps> = ({
  drawing,
  currentPageIndex,
  elements,
  selectedElementId,
  zoom,
  rotation,
  isPanMode,
  onSelectElement,
  onAddElement
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  // Reset pan offset when drawing changes
  useEffect(() => {
    setPanOffset({ x: 0, y: 0 });
  }, [drawing?.id, currentPageIndex]);
  
  // Get current page
  const currentPage = drawing?.pages[currentPageIndex];
  
  // Handle mouse down
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !isPanMode) return;
    
    setIsDragging(true);
    setDragStart({
      x: e.clientX - panOffset.x,
      y: e.clientY - panOffset.y
    });
  };
  
  // Handle mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !isPanMode) return;
    
    setPanOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };
  
  // Handle mouse up
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  // Handle element click
  const handleElementClick = (e: React.MouseEvent, elementId: string) => {
    e.stopPropagation();
    onSelectElement(elementId);
  };
  
  // Calculate element position with zoom and rotation
  const getElementStyle = (element: DrawingElement) => {
    const { x, y, width, height } = element.boundingBox;
    
    return {
      left: `${x * zoom}px`,
      top: `${y * zoom}px`,
      width: `${width * zoom}px`,
      height: `${height * zoom}px`,
      transform: `rotate(${rotation}deg)`,
      cursor: isPanMode ? 'grab' : 'pointer'
    };
  };
  
  // If no drawing is selected, show placeholder
  if (!drawing || !currentPage) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <div className="text-gray-500 text-center">
          <p className="text-lg font-medium">No drawing selected</p>
          <p className="text-sm">Select a drawing from the list to view it here</p>
        </div>
      </div>
    );
  }
  
  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative w-full h-full overflow-hidden bg-gray-100",
        isDragging && isPanMode ? "cursor-grabbing" : isPanMode ? "cursor-grab" : "cursor-default"
      )}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Drawing container with zoom, rotation, and pan */}
      <div
        className="absolute"
        style={{
          transform: `translate(${panOffset.x}px, ${panOffset.y}px) rotate(${rotation}deg) scale(${zoom})`,
          transformOrigin: 'center',
          transition: isDragging ? 'none' : 'transform 0.2s ease-out'
        }}
      >
        {/* Drawing image */}
        <div className="relative">
          {/* Placeholder for the actual image - in a real app, this would be an actual image */}
          <div 
            className="bg-white border border-gray-300 shadow-sm"
            style={{
              width: `${currentPage.width}px`,
              height: `${currentPage.height}px`,
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              {/* In a real app, this would be replaced with an actual image */}
              <p className="text-center">
                Drawing Image: {drawing.title}<br />
                Page {currentPageIndex + 1}<br />
                {currentPage.imageUrl}
              </p>
            </div>
          </div>
          
          {/* Element bounding boxes */}
          {elements.map(element => (
            <div
              key={element.id}
              className={cn(
                "absolute border-2 rounded-sm",
                element.id === selectedElementId
                  ? "border-blue-500 bg-blue-100 bg-opacity-30"
                  : "border-green-500 bg-green-100 bg-opacity-20 hover:bg-opacity-30"
              )}
              style={getElementStyle(element)}
              onClick={(e) => handleElementClick(e, element.id)}
            >
              <div className="absolute top-0 left-0 bg-green-500 text-white text-xs px-1 py-0.5 rounded-br">
                {element.joineryNumber}
              </div>
            </div>
          ))}
          
          {/* Annotations would go here in a real implementation */}
        </div>
      </div>
    </div>
  );
};

export default ElementCanvas;
