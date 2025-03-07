"use client";

import React, { useState, useMemo } from 'react';
import { Edit, AlertTriangle, Check, X, ChevronDown, ChevronRight } from 'lucide-react';
import { JoineryComponent, ComponentFilterOptions } from '../types';
import { cn } from '../../../../../../lib/utils';
import ComponentRow from './ComponentRow';

interface ComponentGridProps {
  components: JoineryComponent[];
  filterOptions: ComponentFilterOptions;
  selectedComponentId: string | null;
  onComponentSelect: (componentId: string) => void;
  onCreateIssue: (componentId: string) => void;
}

/**
 * ComponentGrid
 * 
 * Grid component that displays the components for a joinery unit,
 * with filtering, sorting, and selection capabilities.
 */
export default function ComponentGrid({
  components,
  filterOptions,
  selectedComponentId,
  onComponentSelect,
  onCreateIssue
}: ComponentGridProps) {
  // State for expanded components (for hierarchical view)
  const [expandedComponents, setExpandedComponents] = useState<Record<string, boolean>>({});
  
  // Toggle component expansion
  const toggleComponentExpansion = (componentId: string) => {
    setExpandedComponents(prev => ({
      ...prev,
      [componentId]: !prev[componentId]
    }));
  };
  
  // Filter and sort components based on filter options
  const filteredComponents = useMemo(() => {
    // Start with all components
    let result = [...components];
    
    // Filter by status if specified
    if (filterOptions.status) {
      result = result.filter(component => component.status === filterOptions.status);
    }
    
    // Filter by complexity if specified
    if (filterOptions.complexity) {
      result = result.filter(component => component.complexity === filterOptions.complexity);
    }
    
    // Filter by material if specified
    if (filterOptions.material) {
      result = result.filter(component => component.material.type.toLowerCase().includes(filterOptions.material!.toLowerCase()));
    }
    
    // Filter by search term if specified
    if (filterOptions.search) {
      const searchTerm = filterOptions.search.toLowerCase();
      result = result.filter(component => 
        component.name.toLowerCase().includes(searchTerm) ||
        component.type.toLowerCase().includes(searchTerm)
      );
    }
    
    // Sort components
    if (filterOptions.sortBy) {
      result.sort((a, b) => {
        let valueA, valueB;
        
        switch (filterOptions.sortBy) {
          case 'name':
            valueA = a.name.toLowerCase();
            valueB = b.name.toLowerCase();
            break;
          case 'type':
            valueA = a.type.toLowerCase();
            valueB = b.type.toLowerCase();
            break;
          case 'complexity':
            // Map complexity to numeric values for sorting
            const complexityMap: Record<string, number> = {
              'standard': 1,
              'custom': 2,
              'high': 3
            };
            valueA = complexityMap[a.complexity] || 0;
            valueB = complexityMap[b.complexity] || 0;
            break;
          case 'estimatedTime':
            valueA = a.estimatedTime;
            valueB = b.estimatedTime;
            break;
          default:
            valueA = a.name.toLowerCase();
            valueB = b.name.toLowerCase();
        }
        
        // Apply sort direction
        const direction = filterOptions.sortDirection === 'desc' ? -1 : 1;
        
        if (valueA < valueB) return -1 * direction;
        if (valueA > valueB) return 1 * direction;
        return 0;
      });
    }
    
    // Organize components hierarchically
    // First, get all top-level components (those without a parent)
    const topLevelComponents = result.filter(component => !component.parentComponentId);
    
    // Then, for each top-level component, add its children recursively
    const organizedComponents: JoineryComponent[] = [];
    
    // Function to add a component and its children to the organized list
    const addComponentWithChildren = (component: JoineryComponent, depth: number = 0) => {
      // Add the component itself
      organizedComponents.push({
        ...component,
        depth // Add a depth property for indentation
      } as JoineryComponent & { depth: number });
      
      // If the component has children and is expanded, add them too
      if (component.childComponentIds && component.childComponentIds.length > 0 && expandedComponents[component.id]) {
        component.childComponentIds.forEach(childId => {
          const childComponent = result.find(c => c.id === childId);
          if (childComponent) {
            addComponentWithChildren(childComponent, depth + 1);
          }
        });
      }
    };
    
    // Add all top-level components with their children
    topLevelComponents.forEach(component => {
      addComponentWithChildren(component);
    });
    
    return organizedComponents;
  }, [components, filterOptions, expandedComponents]);
  
  // If no components are available, show a message
  if (components.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-500">No components available for this joinery unit.</div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col w-full h-full">
      {/* Grid Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Components</h3>
        
        <div className="text-sm text-gray-500">
          {filteredComponents.length} component{filteredComponents.length !== 1 ? 's' : ''}
        </div>
      </div>
      
      {/* Grid Content */}
      <div className="flex-1 overflow-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">
                Component
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dimensions
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Material
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Complexity
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Est. Time
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredComponents.map((component) => (
              <ComponentRow
                key={component.id}
                component={component}
                isSelected={component.id === selectedComponentId}
                isExpanded={!!expandedComponents[component.id]}
                onSelect={() => onComponentSelect(component.id)}
                onToggleExpand={() => toggleComponentExpansion(component.id)}
                onCreateIssue={() => onCreateIssue(component.id)}
                depth={(component as any).depth || 0}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
