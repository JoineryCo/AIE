"use client";

import React, { useState, useEffect } from 'react';
import { mockJoineryUnits, getJoineryUnitById } from './mockdata/joinery-units';
import { getComponentsByJoineryUnitId } from './mockdata/components';
import { getDrawingViewsByJoineryUnitId } from './mockdata/drawing-views';
import { JoineryUnit, ComponentStatus, ComponentFilterOptions } from './types';
import JoineryHeader from './header/JoineryHeader';
import ComponentStatusNav from './status-nav/ComponentStatusNav';
import DrawingGallery from './drawing-gallery/DrawingGallery';
import ComponentGrid from './component-grid/ComponentGrid';

interface ComponentAnalysisTabProps {
  onCreateIssue?: (componentId: string) => void;
}

/**
 * ComponentAnalysisTab
 * 
 * Main container component for the Component Analysis tab.
 * Provides a comprehensive environment for reviewing and validating
 * the detailed components identified within each joinery unit.
 */
export default function ComponentAnalysisTab({ onCreateIssue }: ComponentAnalysisTabProps) {
  // State for the currently selected joinery unit
  const [selectedJoineryUnit, setSelectedJoineryUnit] = useState<JoineryUnit | null>(null);
  
  // State for the active status filter
  const [activeStatus, setActiveStatus] = useState<ComponentStatus>('to-review');
  
  // State for component filter options
  const [filterOptions, setFilterOptions] = useState<ComponentFilterOptions>({
    status: 'to-review',
    sortBy: 'name',
    sortDirection: 'asc'
  });
  
  // State for selected component ID
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  
  // Initialize with the first joinery unit
  useEffect(() => {
    if (mockJoineryUnits.length > 0) {
      setSelectedJoineryUnit(mockJoineryUnits[0]);
    }
  }, []);
  
  // Handle joinery unit change
  const handleJoineryUnitChange = (unitId: string) => {
    const unit = getJoineryUnitById(unitId);
    if (unit) {
      setSelectedJoineryUnit(unit);
      setSelectedComponentId(null);
    }
  };
  
  // Handle status change
  const handleStatusChange = (status: ComponentStatus) => {
    setActiveStatus(status);
    setFilterOptions(prev => ({ ...prev, status }));
  };
  
  // Handle component selection
  const handleComponentSelect = (componentId: string) => {
    setSelectedComponentId(componentId);
  };
  
  // Handle filter change
  const handleFilterChange = (options: Partial<ComponentFilterOptions>) => {
    setFilterOptions(prev => ({ ...prev, ...options }));
  };
  
  // Handle issue creation
  const handleCreateIssue = (componentId: string) => {
    if (onCreateIssue) {
      onCreateIssue(componentId);
    }
  };
  
  // If no joinery unit is selected, show a loading state
  if (!selectedJoineryUnit) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-gray-500">Loading joinery units...</div>
      </div>
    );
  }
  
  // Get components and drawing views for the selected joinery unit
  const components = getComponentsByJoineryUnitId(selectedJoineryUnit.id);
  const drawingViews = getDrawingViewsByJoineryUnitId(selectedJoineryUnit.id);
  
  return (
    <div className="flex flex-col w-full h-full space-y-4">
      {/* Joinery Header */}
      <JoineryHeader 
        joineryUnit={selectedJoineryUnit}
        onJoineryUnitChange={handleJoineryUnitChange}
        availableJoineryUnits={mockJoineryUnits}
      />
      
      {/* Status Navigation */}
      <ComponentStatusNav 
        activeStatus={activeStatus}
        onStatusChange={handleStatusChange}
        statusCounts={{
          'to-review': components.filter(c => c.status === 'to-review').length,
          'approved': components.filter(c => c.status === 'approved').length,
          'modified': components.filter(c => c.status === 'modified').length,
          'discarded': components.filter(c => c.status === 'discarded').length,
          'unclear': components.filter(c => c.status === 'unclear').length
        }}
        onFilterChange={handleFilterChange}
      />
      
      {/* Main Content Area */}
      <div className="flex flex-1 w-full space-x-4 overflow-hidden">
        {/* Drawing Gallery */}
        <div className="w-1/2 h-full overflow-hidden bg-white rounded-lg shadow-sm border border-gray-200">
          <DrawingGallery 
            drawingViews={drawingViews}
            selectedComponentId={selectedComponentId}
            onComponentSelect={handleComponentSelect}
          />
        </div>
        
        {/* Component Grid */}
        <div className="w-1/2 h-full overflow-hidden bg-white rounded-lg shadow-sm border border-gray-200">
          <ComponentGrid 
            components={components}
            filterOptions={filterOptions}
            selectedComponentId={selectedComponentId}
            onComponentSelect={handleComponentSelect}
            onCreateIssue={handleCreateIssue}
          />
        </div>
      </div>
    </div>
  );
}
