"use client";

import React from 'react';
import { ChevronLeft, ChevronRight, AlertTriangle } from 'lucide-react';
import { JoineryUnit } from '../types';
import { cn } from '../../../../../../lib/utils';

interface JoineryHeaderProps {
  joineryUnit: JoineryUnit;
  availableJoineryUnits: JoineryUnit[];
  onJoineryUnitChange: (unitId: string) => void;
}

/**
 * JoineryHeader
 * 
 * Header component for the Component Analysis tab that displays
 * information about the current joinery unit and provides navigation
 * controls to switch between units.
 */
export default function JoineryHeader({
  joineryUnit,
  availableJoineryUnits,
  onJoineryUnitChange
}: JoineryHeaderProps) {
  // Find the current index of the joinery unit
  const currentIndex = availableJoineryUnits.findIndex(unit => unit.id === joineryUnit.id);
  
  // Determine if we can navigate to previous or next
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < availableJoineryUnits.length - 1;
  
  // Handle navigation to previous joinery unit
  const handlePrevious = () => {
    if (hasPrevious) {
      onJoineryUnitChange(availableJoineryUnits[currentIndex - 1].id);
    }
  };
  
  // Handle navigation to next joinery unit
  const handleNext = () => {
    if (hasNext) {
      onJoineryUnitChange(availableJoineryUnits[currentIndex + 1].id);
    }
  };
  
  // Format confidence as percentage
  const confidencePercentage = Math.round(joineryUnit.confidence * 100);
  
  // Determine confidence color
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return 'text-green-600';
    if (confidence >= 0.75) return 'text-yellow-600';
    return 'text-red-600';
  };
  
  return (
    <div className="flex items-center justify-between w-full p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Left section: Joinery ID and Navigation */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrevious}
            disabled={!hasPrevious}
            className={cn(
              "p-1 rounded-full",
              hasPrevious
                ? "text-gray-600 hover:bg-gray-100"
                : "text-gray-300 cursor-not-allowed"
            )}
            aria-label="Previous joinery unit"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-gray-900">{joineryUnit.joineryNumber}</span>
              <span className={cn(
                "text-sm",
                getConfidenceColor(joineryUnit.confidence)
              )}>
                {confidencePercentage}% confidence
              </span>
            </div>
            <span className="text-sm text-gray-500">{currentIndex + 1} of {availableJoineryUnits.length}</span>
          </div>
          
          <button
            onClick={handleNext}
            disabled={!hasNext}
            className={cn(
              "p-1 rounded-full",
              hasNext
                ? "text-gray-600 hover:bg-gray-100"
                : "text-gray-300 cursor-not-allowed"
            )}
            aria-label="Next joinery unit"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      {/* Center section: Joinery Name and Location */}
      <div className="flex flex-col items-center">
        <h2 className="text-lg font-semibold text-gray-900">{joineryUnit.name}</h2>
        <span className="text-sm text-gray-500">Location: {joineryUnit.location}</span>
      </div>
      
      {/* Right section: Issues and Actions */}
      <div className="flex items-center space-x-4">
        {joineryUnit.issueCount > 0 && (
          <div className="flex items-center space-x-1 text-amber-600">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-sm font-medium">{joineryUnit.issueCount} issue{joineryUnit.issueCount !== 1 ? 's' : ''}</span>
          </div>
        )}
        
        <div className="flex space-x-2">
          <button className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            Generate Package
          </button>
          <button className="px-3 py-1 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
