// Types and interfaces for the Component Analysis components

import { ElementStatus, DrawingElement } from '../../analysis/types';

/**
 * Complexity level of a joinery component
 */
export type ComponentComplexity = 'standard' | 'custom' | 'high';

/**
 * Material finish type
 */
export type MaterialFinish = 'laminate' | 'veneer' | 'solid-wood' | 'paint' | 'melamine' | 'other';

/**
 * Status of a component in the validation workflow
 */
export type ComponentStatus = ElementStatus; // Reuse the same status types for consistency

/**
 * Hardware type
 */
export type HardwareType = 'hinge' | 'handle' | 'drawer-slide' | 'shelf-support' | 'lock' | 'other';

/**
 * Represents a joinery component within a joinery unit
 */
export interface JoineryComponent {
  id: string;
  joineryUnitId: string;
  name: string;
  type: string;
  quantity: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  material: {
    type: string;
    finish: MaterialFinish;
    color?: string;
    thickness?: number;
  };
  complexity: ComponentComplexity;
  hardware: {
    id: string;
    type: HardwareType;
    quantity: number;
    description: string;
  }[];
  estimatedTime: number; // In minutes
  status: ComponentStatus;
  confidence: number;
  notes?: string;
  issueId?: string;
  parentComponentId?: string; // For hierarchical components
  childComponentIds?: string[]; // For hierarchical components
  relatedDrawingElements?: string[]; // IDs of related drawing elements
}

/**
 * Represents a complete joinery unit (e.g., a cabinet, bookcase, etc.)
 */
export interface JoineryUnit {
  id: string;
  name: string;
  description: string;
  location: string;
  joineryNumber: string;
  status: ComponentStatus;
  confidence: number;
  componentIds: string[]; // IDs of components that make up this unit
  drawingIds: {
    elevation?: string;
    section?: string;
    detail?: string;
  };
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  notes?: string;
  issueCount: number;
}

/**
 * Drawing view for the component analysis
 */
export interface DrawingView {
  id: string;
  joineryUnitId: string;
  type: 'elevation' | 'section' | 'detail';
  imageUrl: string;
  width: number;
  height: number;
  scale?: string;
  drawingNumber: string;
  elementIds: string[]; // IDs of elements visible in this view
}

/**
 * Filter options for the component grid
 */
export interface ComponentFilterOptions {
  status?: ComponentStatus;
  complexity?: ComponentComplexity;
  material?: string;
  search?: string;
  sortBy?: 'name' | 'type' | 'dimensions' | 'complexity' | 'estimatedTime';
  sortDirection?: 'asc' | 'desc';
}
