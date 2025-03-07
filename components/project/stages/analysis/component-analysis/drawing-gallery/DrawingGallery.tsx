"use client";

import React, { useState } from 'react';
import { Maximize2, ZoomIn, ZoomOut, RotateCw } from 'lucide-react';
import { DrawingView } from '../types';
import { getComponentById } from '../mockdata/components';
import { cn } from '../../../../../../lib/utils';

interface DrawingGalleryProps {
  drawingViews: DrawingView[];
  selectedComponentId: string | null;
  onComponentSelect: (componentId: string) => void;
}

/**
 * DrawingGallery
 * 
 * Component that displays the drawing views for a joinery unit,
 * including elevation, section, and detail views.
 */
export default function DrawingGallery({
  drawingViews,
  selectedComponentId,
  onComponentSelect
}: DrawingGalleryProps) {
  // State for zoom level
  const [zoomLevel, setZoomLevel] = useState(1);
  
  // State for rotation
  const [rotation, setRotation] = useState(0);
  
  // State for fullscreen view
  const [fullscreenView, setFullscreenView] = useState<'elevation' | 'section' | 'detail' | null>(null);
  
  // Get the elevation, section, and detail views
  const elevationView = drawingViews.find(view => view.type === 'elevation');
  const sectionView = drawingViews.find(view => view.type === 'section');
  const detailView = drawingViews.find(view => view.type === 'detail');
  
  // Handle zoom in
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 3));
  };
  
  // Handle zoom out
  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
  };
  
  // Handle rotation
  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };
  
  // Handle fullscreen toggle
  const handleFullscreenToggle = (viewType: 'elevation' | 'section' | 'detail' | null) => {
    setFullscreenView(viewType);
  };
  
  // Get the selected component
  const selectedComponent = selectedComponentId ? getComponentById(selectedComponentId) : null;
  
  // If no drawing views are available, show a message
  if (drawingViews.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-500">No drawing views available for this joinery unit.</div>
      </div>
    );
  }
  
  // If in fullscreen mode, show only the selected view
  if (fullscreenView) {
    const fullscreenDrawingView = drawingViews.find(view => view.type === fullscreenView);
    
    if (!fullscreenDrawingView) {
      return null;
    }
    
    return (
      <div className="relative w-full h-full overflow-hidden">
        {/* Drawing View */}
        <div 
          className="w-full h-full flex items-center justify-center bg-gray-100 overflow-auto"
          style={{
            transform: `scale(${zoomLevel}) rotate(${rotation}deg)`,
            transformOrigin: 'center center',
            transition: 'transform 0.3s ease'
          }}
        >
          <img 
            src={fullscreenDrawingView.imageUrl} 
            alt={`${fullscreenDrawingView.type} view`}
            className="max-w-full max-h-full object-contain"
          />
        </div>
        
        {/* Controls */}
        <div className="absolute top-4 right-4 flex space-x-2 bg-white rounded-md shadow-md p-1">
          <button 
            onClick={handleZoomIn}
            className="p-1 rounded-md hover:bg-gray-100"
            aria-label="Zoom in"
          >
            <ZoomIn className="h-5 w-5 text-gray-600" />
          </button>
          
          <button 
            onClick={handleZoomOut}
            className="p-1 rounded-md hover:bg-gray-100"
            aria-label="Zoom out"
          >
            <ZoomOut className="h-5 w-5 text-gray-600" />
          </button>
          
          <button 
            onClick={handleRotate}
            className="p-1 rounded-md hover:bg-gray-100"
            aria-label="Rotate"
          >
            <RotateCw className="h-5 w-5 text-gray-600" />
          </button>
          
          <button 
            onClick={() => handleFullscreenToggle(null)}
            className="p-1 rounded-md hover:bg-gray-100"
            aria-label="Exit fullscreen"
          >
            <Maximize2 className="h-5 w-5 text-gray-600" />
          </button>
        </div>
        
        {/* View Title */}
        <div className="absolute top-4 left-4 bg-white rounded-md shadow-md p-2">
          <h3 className="text-sm font-medium text-gray-900 capitalize">
            {fullscreenDrawingView.type} View
          </h3>
          <p className="text-xs text-gray-500">
            Drawing: {fullscreenDrawingView.drawingNumber}
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col w-full h-full">
      {/* Gallery Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Drawing Gallery</h3>
        
        {selectedComponent && (
          <div className="text-sm text-gray-500">
            Selected: <span className="font-medium text-gray-900">{selectedComponent.name}</span>
          </div>
        )}
      </div>
      
      {/* Gallery Content */}
      <div className="flex flex-col flex-1 p-4 space-y-4 overflow-auto">
        {/* Elevation View (Primary) */}
        {elevationView && (
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-gray-900">Elevation View</h4>
              <button 
                onClick={() => handleFullscreenToggle('elevation')}
                className="p-1 rounded-md hover:bg-gray-100"
                aria-label="Fullscreen"
              >
                <Maximize2 className="h-4 w-4 text-gray-600" />
              </button>
            </div>
            
            <div className="relative w-full h-64 bg-gray-100 rounded-md overflow-hidden">
              <img 
                src={elevationView.imageUrl} 
                alt="Elevation view"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        )}
        
        {/* Section and Detail Views (Secondary) */}
        <div className="grid grid-cols-2 gap-4">
          {/* Section View */}
          {sectionView && (
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-900">Section View</h4>
                <button 
                  onClick={() => handleFullscreenToggle('section')}
                  className="p-1 rounded-md hover:bg-gray-100"
                  aria-label="Fullscreen"
                >
                  <Maximize2 className="h-4 w-4 text-gray-600" />
                </button>
              </div>
              
              <div className="relative w-full h-48 bg-gray-100 rounded-md overflow-hidden">
                <img 
                  src={sectionView.imageUrl} 
                  alt="Section view"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          )}
          
          {/* Detail View */}
          {detailView && (
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-900">Detail View</h4>
                <button 
                  onClick={() => handleFullscreenToggle('detail')}
                  className="p-1 rounded-md hover:bg-gray-100"
                  aria-label="Fullscreen"
                >
                  <Maximize2 className="h-4 w-4 text-gray-600" />
                </button>
              </div>
              
              <div className="relative w-full h-48 bg-gray-100 rounded-md overflow-hidden">
                <img 
                  src={detailView.imageUrl} 
                  alt="Detail view"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          )}
        </div>
        
        {/* Drawing Information */}
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Drawing Information</h4>
          
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {elevationView && (
              <>
                <div className="text-gray-500">Drawing Number:</div>
                <div className="text-gray-900">{elevationView.drawingNumber}</div>
              </>
            )}
            
            {elevationView && elevationView.scale && (
              <>
                <div className="text-gray-500">Scale:</div>
                <div className="text-gray-900">{elevationView.scale}</div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
