"use client";

import React from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  Maximize, 
  RotateCw, 
  Hand, 
  Move 
} from 'lucide-react';
import { cn } from '../../../../../lib/utils';

interface ViewControlsProps {
  zoom: number;
  rotation: number;
  isPanMode: boolean;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFitToScreen: () => void;
  onRotate: () => void;
  onTogglePanMode: () => void;
}

/**
 * ViewControls
 * 
 * Component for controlling the view of the drawing.
 * Provides zoom, rotation, and pan controls.
 */
const ViewControls: React.FC<ViewControlsProps> = ({
  zoom,
  rotation,
  isPanMode,
  onZoomIn,
  onZoomOut,
  onFitToScreen,
  onRotate,
  onTogglePanMode
}) => {
  return (
    <div className="flex items-center space-x-1 bg-white border border-gray-200 rounded-md shadow-sm p-1">
      {/* Zoom controls */}
      <button
        onClick={onZoomOut}
        disabled={zoom <= 0.5}
        className={cn(
          "p-1.5 rounded-md",
          zoom <= 0.5
            ? "text-gray-300 cursor-not-allowed"
            : "text-gray-700 hover:bg-gray-100"
        )}
        title="Zoom Out"
      >
        <ZoomOut className="h-4 w-4" />
      </button>
      
      <div className="text-xs text-gray-600 w-12 text-center">
        {Math.round(zoom * 100)}%
      </div>
      
      <button
        onClick={onZoomIn}
        disabled={zoom >= 3}
        className={cn(
          "p-1.5 rounded-md",
          zoom >= 3
            ? "text-gray-300 cursor-not-allowed"
            : "text-gray-700 hover:bg-gray-100"
        )}
        title="Zoom In"
      >
        <ZoomIn className="h-4 w-4" />
      </button>
      
      <div className="w-px h-5 bg-gray-200 mx-1"></div>
      
      {/* Fit to screen */}
      <button
        onClick={onFitToScreen}
        className="p-1.5 rounded-md text-gray-700 hover:bg-gray-100"
        title="Fit to Screen"
      >
        <Maximize className="h-4 w-4" />
      </button>
      
      <div className="w-px h-5 bg-gray-200 mx-1"></div>
      
      {/* Rotation control */}
      <button
        onClick={onRotate}
        className="p-1.5 rounded-md text-gray-700 hover:bg-gray-100"
        title={`Rotate (Current: ${rotation}°)`}
      >
        <RotateCw className="h-4 w-4" />
      </button>
      
      <div className="w-px h-5 bg-gray-200 mx-1"></div>
      
      {/* Pan mode toggle */}
      <button
        onClick={onTogglePanMode}
        className={cn(
          "p-1.5 rounded-md",
          isPanMode
            ? "bg-blue-100 text-blue-700"
            : "text-gray-700 hover:bg-gray-100"
        )}
        title={isPanMode ? "Exit Pan Mode" : "Enter Pan Mode"}
      >
        {isPanMode ? <Move className="h-4 w-4" /> : <Hand className="h-4 w-4" />}
      </button>
    </div>
  );
};

export default ViewControls;
