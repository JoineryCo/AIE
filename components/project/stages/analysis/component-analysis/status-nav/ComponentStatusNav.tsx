"use client";

import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { ComponentStatus, ComponentFilterOptions } from '../types';
import { cn } from '../../../../../../lib/utils';
import StatusTab from './StatusTab';

interface StatusCounts {
  'to-review': number;
  'approved': number;
  'modified': number;
  'discarded': number;
  'unclear': number;
}

interface ComponentStatusNavProps {
  activeStatus: ComponentStatus;
  statusCounts: StatusCounts;
  onStatusChange: (status: ComponentStatus) => void;
  onFilterChange: (options: Partial<ComponentFilterOptions>) => void;
}

/**
 * ComponentStatusNav
 * 
 * Navigation component for filtering components by status and providing
 * additional filtering and search options.
 */
export default function ComponentStatusNav({
  activeStatus,
  statusCounts,
  onStatusChange,
  onFilterChange
}: ComponentStatusNavProps) {
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ search: e.target.value });
  };
  
  // Handle sort change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ sortBy: e.target.value as any });
  };
  
  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between p-4">
        {/* Status Tabs */}
        <div className="flex space-x-1">
          <StatusTab
            label="To Review"
            count={statusCounts['to-review']}
            isActive={activeStatus === 'to-review'}
            onClick={() => onStatusChange('to-review')}
            color="bg-blue-100 text-blue-800"
          />
          
          <StatusTab
            label="Approved"
            count={statusCounts['approved']}
            isActive={activeStatus === 'approved'}
            onClick={() => onStatusChange('approved')}
            color="bg-green-100 text-green-800"
          />
          
          <StatusTab
            label="Modified"
            count={statusCounts['modified']}
            isActive={activeStatus === 'modified'}
            onClick={() => onStatusChange('modified')}
            color="bg-purple-100 text-purple-800"
          />
          
          <StatusTab
            label="Discarded"
            count={statusCounts['discarded']}
            isActive={activeStatus === 'discarded'}
            onClick={() => onStatusChange('discarded')}
            color="bg-gray-100 text-gray-800"
          />
          
          <StatusTab
            label="Needs Clarification"
            count={statusCounts['unclear']}
            isActive={activeStatus === 'unclear'}
            onClick={() => onStatusChange('unclear')}
            color="bg-amber-100 text-amber-800"
          />
        </div>
        
        {/* Search and Filter */}
        <div className="flex items-center space-x-2">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search components..."
              className="pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onChange={handleSearchChange}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <SlidersHorizontal className="h-4 w-4 text-gray-500" />
            <select
              className="text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 py-2 px-3"
              onChange={handleSortChange}
              defaultValue="name"
            >
              <option value="name">Sort by Name</option>
              <option value="type">Sort by Type</option>
              <option value="complexity">Sort by Complexity</option>
              <option value="estimatedTime">Sort by Est. Time</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
