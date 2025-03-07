"use client";

import React, { useState, useEffect } from 'react';
import { 
  mockDrawings, 
  mockDrawingElements, 
  getElementsForDrawing,
  countElementsByStatus
} from '../mockdata/drawings';
import { DrawingElement, ElementStatus } from '../types';
import ThumbnailNavigator from './ThumbnailNavigator';
import ViewControls from './ViewControls';
import ElementCanvas from './ElementCanvas';
import ElementMetadataPanel from './ElementMetadataPanel';
import StatusTabsNavigation from './StatusTabsNavigation';
import ManualSelectionTool from './ManualSelectionTool';
import { PlusCircle } from 'lucide-react';

interface DrawingAnalysisTabProps {
  onCreateIssue?: (elementId: string) => void;
}

/**
 * DrawingAnalysisTab
 * 
 * Main component for the Drawing Analysis tab in the Analysis Stage.
 * Implements a dual-panel interface with drawing viewer on the left
 * and element metadata panel on the right.
 */
const DrawingAnalysisTab: React.FC<DrawingAnalysisTabProps> = ({
  onCreateIssue
}) => {
  // State for selected drawing
  const [currentDrawingId, setCurrentDrawingId] = useState<string>(mockDrawings[0]?.id || '');
  
  // State for current page index
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  
  // State for selected element
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  
  // State for elements with their status
  const [workingElements, setWorkingElements] = useState(mockDrawingElements);
  
  // State for view controls
  const [zoom, setZoom] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [isPanMode, setIsPanMode] = useState<boolean>(false);
  
  // State for status filter
  const [activeStatus, setActiveStatus] = useState<ElementStatus | 'all'>('to-review');
  
  // State for manual selection mode
  const [isSelectionMode, setIsSelectionMode] = useState<boolean>(false);
  const [isProcessingSelection, setIsProcessingSelection] = useState<boolean>(false);
  const [selectedBoundingBox, setSelectedBoundingBox] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const [newElement, setNewElement] = useState<DrawingElement | null>(null);
  
  // Get the current drawing
  const currentDrawing = mockDrawings.find(d => d.id === currentDrawingId);
  
  // Get elements for the current drawing, filtered by status
  const currentElements = workingElements.filter(e => 
    e.drawingId === currentDrawingId && 
    (activeStatus === 'all' || e.status === activeStatus)
  );
  
  // Get the selected element
  const selectedElement = selectedElementId 
    ? workingElements.find(e => e.id === selectedElementId) || null
    : null;
  
  // Count elements by status
  const statusCounts = {
    'all': workingElements.length,
    'to-review': workingElements.filter(e => e.status === 'to-review').length,
    'approved': workingElements.filter(e => e.status === 'approved').length,
    'modified': workingElements.filter(e => e.status === 'modified').length,
    'discarded': workingElements.filter(e => e.status === 'discarded').length,
    'unclear': workingElements.filter(e => e.status === 'unclear').length,
  };
  
  // Reset page index when drawing changes
  useEffect(() => {
    setCurrentPageIndex(0);
  }, [currentDrawingId]);
  
  // Select the first element in the current drawing if none is selected
  useEffect(() => {
    if (currentElements.length > 0 && !selectedElementId) {
      setSelectedElementId(currentElements[0].id);
    } else if (currentElements.length > 0 && !currentElements.some(e => e.id === selectedElementId)) {
      // If the selected element is not in the current drawing, select the first one
      setSelectedElementId(currentElements[0].id);
    }
  }, [currentElements, selectedElementId]);
  
  // Handle drawing selection
  const handleSelectDrawing = (drawingId: string, pageIndex: number) => {
    setCurrentDrawingId(drawingId);
    setCurrentPageIndex(pageIndex);
    // Exit selection mode when changing drawings
    setIsSelectionMode(false);
  };
  
  // Handle page change
  const handlePageChange = (pageIndex: number) => {
    setCurrentPageIndex(pageIndex);
    // Exit selection mode when changing pages
    setIsSelectionMode(false);
  };
  
  // Handle element selection
  const handleSelectElement = (elementId: string) => {
    // Only allow selection when not in selection mode
    if (!isSelectionMode) {
      setSelectedElementId(elementId);
    }
  };
  
  // Handle element status change
  const handleElementStatusChange = (elementId: string, newStatus: ElementStatus, notes?: string) => {
    setWorkingElements(prev => 
      prev.map(e => 
        e.id === elementId 
          ? { 
              ...e, 
              status: newStatus,
              ...(notes !== undefined ? { notes } : {})
            } 
          : e
      )
    );
    
    // Auto-advance to next element if there are more to review
    if (newStatus !== 'to-review') {
      const currentIndex = currentElements.findIndex(e => e.id === elementId);
      if (currentIndex < currentElements.length - 1) {
        setSelectedElementId(currentElements[currentIndex + 1].id);
      }
    }
  };
  
  // Handle zoom in
  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.25, 3));
  };
  
  // Handle zoom out
  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.25, 0.5));
  };
  
  // Handle fit to screen
  const handleFitToScreen = () => {
    setZoom(1);
    setRotation(0);
  };
  
  // Handle rotation
  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };
  
  // Handle pan mode toggle
  const handleTogglePanMode = () => {
    // Can't enable pan mode in selection mode
    if (isSelectionMode) return;
    
    setIsPanMode(prev => !prev);
  };
  
  // Handle flag issue
  const handleFlagIssue = (elementId: string) => {
    if (onCreateIssue) {
      onCreateIssue(elementId);
    }
    
    // Mark element as unclear
    handleElementStatusChange(elementId, 'unclear');
  };
  
  // Handle edit notes
  const handleEditNotes = (elementId: string, notes: string) => {
    setWorkingElements(prev => 
      prev.map(e => 
        e.id === elementId 
          ? { ...e, notes } 
          : e
      )
    );
  };
  
  // Handle edit element
  const handleEditElement = (elementId: string, updatedElement?: DrawingElement) => {
    // Find the element in the working elements
    const element = workingElements.find(e => e.id === elementId);
    if (element) {
      // Update the element with the edited values from the ElementMetadataPanel component
      // If updatedElement is provided, use it to update the element
      // Otherwise, just mark the element as modified
      
      // Mark the element as modified
      setWorkingElements(prev => 
        prev.map(e => 
          e.id === elementId 
            ? { 
                ...(updatedElement || e), 
                status: 'modified' 
              } 
            : e
        )
      );
      
      // Log the updated element
      console.log('Element updated:', updatedElement || element);
    }
  };
  
  // Get current element index and total count for the element counter
  const getCurrentElementInfo = () => {
    if (!selectedElementId) return { currentIndex: 1, totalCount: 0 };
    
    const filteredElements = workingElements.filter(e => 
      e.drawingId === currentDrawingId && 
      (activeStatus === 'all' || e.status === activeStatus)
    );
    
    const currentIndex = filteredElements.findIndex(e => e.id === selectedElementId);
    return {
      currentIndex: currentIndex !== -1 ? currentIndex + 1 : 1,
      totalCount: filteredElements.length
    };
  };
  
  // Get current element info
  const { currentIndex, totalCount } = getCurrentElementInfo();
  
  // Handle navigate to element
  const handleNavigateToElement = (elementId: string) => {
    // Check if this is a navigation request (prev/next)
    if (elementId.endsWith('_prev') || elementId.endsWith('_next')) {
      const baseId = elementId.split('_')[0];
      const direction = elementId.endsWith('_prev') ? -1 : 1;
      
      // Find the current element in the filtered list
      const currentElements = workingElements.filter(e => 
        e.drawingId === currentDrawingId && 
        (activeStatus === 'all' || e.status === activeStatus)
      );
      
      const currentIndex = currentElements.findIndex(e => e.id === baseId);
      if (currentIndex !== -1) {
        const newIndex = currentIndex + direction;
        if (newIndex >= 0 && newIndex < currentElements.length) {
          // Select the new element
          setSelectedElementId(currentElements[newIndex].id);
          
          // Auto-center the element in the view
          // This would be implemented in ElementCanvas
        }
      }
      return;
    }
    
    // Regular navigation to a specific element
    const element = workingElements.find(e => e.id === elementId);
    if (element) {
      // Find the drawing and page for this element
      const drawing = mockDrawings.find(d => d.id === element.drawingId);
      if (drawing) {
        // Find the page index that contains this element
        const pageIndex = drawing.pages.findIndex(p => 
          p.elements?.includes(elementId)
        );
        
        if (pageIndex !== -1) {
          // Navigate to the drawing and page
          setCurrentDrawingId(drawing.id);
          setCurrentPageIndex(pageIndex);
          setSelectedElementId(elementId);
          
          // Auto-center the element in the view
          // This would be implemented in ElementCanvas
        }
      }
    }
  };
  
  // Handle status filter change
  const handleStatusChange = (status: ElementStatus | 'all') => {
    setActiveStatus(status);
    // Reset selected element when changing status filter
    setSelectedElementId(null);
  };
  
  // Handle selection mode toggle
  const handleToggleSelectionMode = () => {
    // Can't enable selection mode in pan mode
    if (isPanMode) {
      setIsPanMode(false);
    }
    
    setIsSelectionMode(prev => !prev);
    
    // Reset selection when exiting selection mode
    if (isSelectionMode) {
      setSelectedBoundingBox(null);
    }
  };
  
  // Handle selection complete
  const handleSelectionComplete = (boundingBox: { x: number; y: number; width: number; height: number }) => {
    setSelectedBoundingBox(boundingBox);
    setIsProcessingSelection(true);
    
    // Simulate AI processing
    setTimeout(() => {
      // Generate a temporary ID for the new element
      const tempId = `temp-elem-${Date.now()}`;
      
      // Create a new element with AI-suggested data
      const suggestedElement: DrawingElement = {
        id: tempId,
        drawingId: currentDrawingId,
        boundingBox: boundingBox,
        type: 'cabinet',
        category: 'kitchen',
        location: 'Kitchen',
        joineryNumber: `J-${tempId}`,
        dimensions: {
          width: Math.round(boundingBox.width * 3), // Scale for real-world dimensions
          height: Math.round(boundingBox.height * 3),
          depth: 600 // Default depth
        },
        confidence: 0.85,
        status: 'to-review',
        notes: ''
      };
      
      // Set the new element
      setNewElement(suggestedElement);
      
      // End processing
      setIsProcessingSelection(false);
    }, 1500);
  };
  
  // Handle element creation
  const handleCreateElement = (element: Partial<DrawingElement>) => {
    // Generate a unique ID
    const newId = `elem-${workingElements.length + 1}`;
    
    // Create the new element
    const newElement: DrawingElement = {
      id: newId,
      drawingId: currentDrawingId,
      boundingBox: element.boundingBox!,
      type: element.type || 'cabinet',
      category: element.category || 'kitchen',
      location: element.location || '',
      joineryNumber: element.joineryNumber || `J-${newId}`,
      dimensions: {
        width: element.dimensions?.width || 0,
        height: element.dimensions?.height || 0,
        depth: element.dimensions?.depth || 0
      },
      confidence: element.confidence || 0.5,
      status: element.status || 'to-review',
      notes: element.notes
    };
    
    // Add the new element to the working elements
    setWorkingElements(prev => [...prev, newElement]);
    
    // Select the new element
    setSelectedElementId(newId);
    
    // Exit selection mode
    setIsSelectionMode(false);
    setSelectedBoundingBox(null);
  };
  
  // Handle cancel element creation
  const handleCancelElementCreation = () => {
    setSelectedBoundingBox(null);
    setNewElement(null);
    setIsSelectionMode(false);
  };
  
  // Handle save new element
  const handleSaveNewElement = (element: DrawingElement) => {
    // Add the new element to the working elements
    setWorkingElements(prev => [...prev, element]);
    
    // Select the new element
    setSelectedElementId(element.id);
    
    // Clear the new element state
    setNewElement(null);
    
    // Exit selection mode
    setIsSelectionMode(false);
    setSelectedBoundingBox(null);
  };
  
  return (
    <div className="flex flex-col h-[calc(100vh-280px)] min-h-[500px] border border-gray-200 rounded-lg overflow-hidden w-full">
      {/* Progress bar at the top */}
      <div className="w-full h-1 bg-gray-200">
        <div 
          className="h-full bg-blue-600"
          style={{ 
            width: `${Math.round(
              (workingElements.filter(e => e.status !== 'to-review').length / 
              workingElements.length) * 100
            )}%` 
          }}
        />
      </div>
      
      {/* Status tabs */}
      <StatusTabsNavigation 
        activeStatus={activeStatus}
        onStatusChange={handleStatusChange}
        counts={statusCounts}
      />
      
      {/* Main content area */}
      <div className="flex flex-1 w-full overflow-hidden">
        {/* Left sidebar - Thumbnail navigator */}
        <div className="w-64 min-w-[16rem] flex-shrink-0 border-r border-gray-200">
          <ThumbnailNavigator 
            drawings={mockDrawings}
            currentDrawingId={currentDrawingId}
            currentPageIndex={currentPageIndex}
            onSelectDrawing={handleSelectDrawing}
            onPageChange={handlePageChange}
          />
        </div>
        
        {/* Main drawing area */}
        <div className="flex-1 flex flex-col w-full">
          {/* View controls */}
          <div className="p-2 border-b border-gray-200 bg-gray-50 flex justify-between items-center w-full">
            <ViewControls 
              zoom={zoom}
              rotation={rotation}
              isPanMode={isPanMode}
              onZoomIn={handleZoomIn}
              onZoomOut={handleZoomOut}
              onFitToScreen={handleFitToScreen}
              onRotate={handleRotate}
              onTogglePanMode={handleTogglePanMode}
            />
            
            {/* Add element button */}
            <button
              onClick={handleToggleSelectionMode}
              className={`flex items-center px-3 py-1 rounded text-sm font-medium ${
                isSelectionMode 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-blue-600 border border-blue-600'
              }`}
            >
              <PlusCircle className="h-4 w-4 mr-1" />
              {isSelectionMode ? 'Cancel Selection' : 'Add Element'}
            </button>
          </div>
          
          {/* Drawing canvas */}
          <div className="flex-1 overflow-hidden w-full relative">
            <ElementCanvas 
              drawing={currentDrawing}
              currentPageIndex={currentPageIndex}
              elements={currentElements}
              selectedElementId={selectedElementId}
              zoom={zoom}
              rotation={rotation}
              isPanMode={isPanMode && !isSelectionMode}
              onSelectElement={handleSelectElement}
            />
            
            {/* Manual selection tool */}
            {isSelectionMode && (
              <ManualSelectionTool 
                isActive={isSelectionMode}
                onSelectionComplete={handleSelectionComplete}
                isProcessing={isProcessingSelection}
              />
            )}
          </div>
        </div>
        
      {/* Right sidebar - Element metadata */}
      <div className="w-80 min-w-[20rem] flex-shrink-0">
        {newElement ? (
          // Show the new element metadata panel
          <ElementMetadataPanel 
            element={newElement}
            onStatusChange={handleElementStatusChange}
            onSaveNewElement={handleSaveNewElement}
            onCancelNewElement={handleCancelElementCreation}
            isNewElement={true}
          />
        ) : (
          // Show the selected element metadata panel
          <ElementMetadataPanel 
            element={selectedElement}
            onStatusChange={handleElementStatusChange}
            onFlagIssue={handleFlagIssue}
            onEdit={selectedElement ? handleEditElement : undefined}
            onEditNotes={handleEditNotes}
            onNavigateToElement={handleNavigateToElement}
            currentElementIndex={currentIndex}
            totalElements={totalCount}
          />
        )}
      </div>
      </div>
      
      {/* We no longer need the ElementCreationForm since we're using the ElementMetadataPanel for new element creation */}
    </div>
  );
};

export default DrawingAnalysisTab;
