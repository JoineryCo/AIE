import { JoineryComponent } from '../types';

/**
 * Mock data for joinery components
 */
export const mockComponents: JoineryComponent[] = [
  // Kitchen Island Cabinet Components
  {
    id: 'comp-001',
    joineryUnitId: 'ju-001',
    name: 'Cabinet Base',
    type: 'base-cabinet',
    quantity: 1,
    dimensions: {
      width: 2400,
      height: 720,
      depth: 650
    },
    material: {
      type: 'MDF',
      finish: 'paint',
      color: 'White',
      thickness: 18
    },
    complexity: 'standard',
    hardware: [],
    estimatedTime: 240,
    status: 'to-review',
    confidence: 0.88,
    childComponentIds: ['comp-002', 'comp-003', 'comp-004', 'comp-005'],
    relatedDrawingElements: ['elem-001', 'elem-002']
  },
  {
    id: 'comp-002',
    joineryUnitId: 'ju-001',
    name: 'Drawer Box - Large',
    type: 'drawer',
    quantity: 3,
    dimensions: {
      width: 800,
      height: 200,
      depth: 600
    },
    material: {
      type: 'Plywood',
      finish: 'melamine',
      color: 'Natural',
      thickness: 16
    },
    complexity: 'standard',
    hardware: [
      {
        id: 'hw-001',
        type: 'drawer-slide',
        quantity: 2,
        description: 'Blum Tandem 600mm full extension'
      },
      {
        id: 'hw-002',
        type: 'handle',
        quantity: 1,
        description: 'Brushed nickel bar handle 200mm'
      }
    ],
    estimatedTime: 90,
    status: 'to-review',
    confidence: 0.92,
    parentComponentId: 'comp-001',
    relatedDrawingElements: ['elem-003']
  },
  {
    id: 'comp-003',
    joineryUnitId: 'ju-001',
    name: 'Drawer Box - Small',
    type: 'drawer',
    quantity: 2,
    dimensions: {
      width: 800,
      height: 150,
      depth: 600
    },
    material: {
      type: 'Plywood',
      finish: 'melamine',
      color: 'Natural',
      thickness: 16
    },
    complexity: 'standard',
    hardware: [
      {
        id: 'hw-003',
        type: 'drawer-slide',
        quantity: 2,
        description: 'Blum Tandem 600mm full extension'
      },
      {
        id: 'hw-004',
        type: 'handle',
        quantity: 1,
        description: 'Brushed nickel bar handle 200mm'
      }
    ],
    estimatedTime: 75,
    status: 'to-review',
    confidence: 0.90,
    parentComponentId: 'comp-001',
    relatedDrawingElements: ['elem-004']
  },
  {
    id: 'comp-004',
    joineryUnitId: 'ju-001',
    name: 'Cabinet Door',
    type: 'door',
    quantity: 2,
    dimensions: {
      width: 400,
      height: 720,
      depth: 18
    },
    material: {
      type: 'MDF',
      finish: 'paint',
      color: 'White',
      thickness: 18
    },
    complexity: 'standard',
    hardware: [
      {
        id: 'hw-005',
        type: 'hinge',
        quantity: 2,
        description: 'Blum soft-close hinge'
      },
      {
        id: 'hw-006',
        type: 'handle',
        quantity: 1,
        description: 'Brushed nickel bar handle 200mm'
      }
    ],
    estimatedTime: 60,
    status: 'to-review',
    confidence: 0.85,
    parentComponentId: 'comp-001',
    relatedDrawingElements: ['elem-005']
  },
  {
    id: 'comp-005',
    joineryUnitId: 'ju-001',
    name: 'Countertop',
    type: 'countertop',
    quantity: 1,
    dimensions: {
      width: 2400,
      height: 40,
      depth: 650
    },
    material: {
      type: 'Stone',
      finish: 'other',
      color: 'Carrara White',
      thickness: 40
    },
    complexity: 'high',
    hardware: [],
    estimatedTime: 120,
    status: 'unclear',
    confidence: 0.65,
    notes: 'Need to confirm edge profile and cutouts',
    issueId: 'issue-001',
    parentComponentId: 'comp-001',
    relatedDrawingElements: ['elem-006']
  },
  
  // Master Bedroom Wardrobe Components
  {
    id: 'comp-006',
    joineryUnitId: 'ju-002',
    name: 'Wardrobe Carcass',
    type: 'cabinet',
    quantity: 1,
    dimensions: {
      width: 3600,
      height: 2400,
      depth: 600
    },
    material: {
      type: 'MDF',
      finish: 'melamine',
      color: 'White',
      thickness: 18
    },
    complexity: 'standard',
    hardware: [],
    estimatedTime: 300,
    status: 'to-review',
    confidence: 0.82,
    childComponentIds: ['comp-007', 'comp-008', 'comp-009'],
    relatedDrawingElements: ['elem-007', 'elem-008']
  },
  {
    id: 'comp-007',
    joineryUnitId: 'ju-002',
    name: 'Sliding Door',
    type: 'door',
    quantity: 3,
    dimensions: {
      width: 1200,
      height: 2400,
      depth: 18
    },
    material: {
      type: 'MDF',
      finish: 'paint',
      color: 'Light Grey',
      thickness: 18
    },
    complexity: 'custom',
    hardware: [
      {
        id: 'hw-007',
        type: 'other',
        quantity: 1,
        description: 'Sliding door track system'
      },
      {
        id: 'hw-008',
        type: 'handle',
        quantity: 1,
        description: 'Recessed finger pull'
      }
    ],
    estimatedTime: 120,
    status: 'to-review',
    confidence: 0.78,
    parentComponentId: 'comp-006',
    relatedDrawingElements: ['elem-009']
  },
  {
    id: 'comp-008',
    joineryUnitId: 'ju-002',
    name: 'Wardrobe Shelves',
    type: 'shelf',
    quantity: 8,
    dimensions: {
      width: 1200,
      height: 18,
      depth: 550
    },
    material: {
      type: 'MDF',
      finish: 'melamine',
      color: 'White',
      thickness: 18
    },
    complexity: 'standard',
    hardware: [
      {
        id: 'hw-009',
        type: 'shelf-support',
        quantity: 4,
        description: 'Adjustable shelf pins'
      }
    ],
    estimatedTime: 60,
    status: 'to-review',
    confidence: 0.90,
    parentComponentId: 'comp-006',
    relatedDrawingElements: ['elem-010']
  },
  {
    id: 'comp-009',
    joineryUnitId: 'ju-002',
    name: 'Hanging Rail',
    type: 'other',
    quantity: 2,
    dimensions: {
      width: 1200,
      height: 30,
      depth: 30
    },
    material: {
      type: 'Metal',
      finish: 'other',
      color: 'Chrome'
    },
    complexity: 'standard',
    hardware: [
      {
        id: 'hw-010',
        type: 'other',
        quantity: 4,
        description: 'Rail support brackets'
      }
    ],
    estimatedTime: 30,
    status: 'unclear',
    confidence: 0.70,
    notes: 'Need to confirm rail height and position',
    issueId: 'issue-002',
    parentComponentId: 'comp-006',
    relatedDrawingElements: ['elem-011']
  },
  
  // Living Room Entertainment Unit Components
  {
    id: 'comp-010',
    joineryUnitId: 'ju-003',
    name: 'Entertainment Unit Base',
    type: 'cabinet',
    quantity: 1,
    dimensions: {
      width: 3200,
      height: 600,
      depth: 450
    },
    material: {
      type: 'MDF',
      finish: 'veneer',
      color: 'Oak',
      thickness: 18
    },
    complexity: 'custom',
    hardware: [],
    estimatedTime: 240,
    status: 'approved',
    confidence: 0.95,
    childComponentIds: ['comp-011', 'comp-012'],
    relatedDrawingElements: ['elem-012', 'elem-013']
  },
  {
    id: 'comp-011',
    joineryUnitId: 'ju-003',
    name: 'Entertainment Unit Drawers',
    type: 'drawer',
    quantity: 4,
    dimensions: {
      width: 800,
      height: 200,
      depth: 400
    },
    material: {
      type: 'MDF',
      finish: 'veneer',
      color: 'Oak',
      thickness: 16
    },
    complexity: 'custom',
    hardware: [
      {
        id: 'hw-011',
        type: 'drawer-slide',
        quantity: 2,
        description: 'Blum Tandem 400mm soft-close'
      },
      {
        id: 'hw-012',
        type: 'handle',
        quantity: 1,
        description: 'Integrated edge pull'
      }
    ],
    estimatedTime: 90,
    status: 'approved',
    confidence: 0.92,
    parentComponentId: 'comp-010',
    relatedDrawingElements: ['elem-014']
  },
  {
    id: 'comp-012',
    joineryUnitId: 'ju-003',
    name: 'Entertainment Unit Shelving',
    type: 'shelf',
    quantity: 6,
    dimensions: {
      width: 1600,
      height: 18,
      depth: 350
    },
    material: {
      type: 'MDF',
      finish: 'veneer',
      color: 'Oak',
      thickness: 18
    },
    complexity: 'standard',
    hardware: [],
    estimatedTime: 60,
    status: 'approved',
    confidence: 0.90,
    parentComponentId: 'comp-010',
    relatedDrawingElements: ['elem-015']
  }
];

/**
 * Get components by joinery unit ID
 */
export const getComponentsByJoineryUnitId = (joineryUnitId: string): JoineryComponent[] => {
  return mockComponents.filter(component => component.joineryUnitId === joineryUnitId);
};

/**
 * Get a component by ID
 */
export const getComponentById = (id: string): JoineryComponent | undefined => {
  return mockComponents.find(component => component.id === id);
};

/**
 * Get child components of a parent component
 */
export const getChildComponents = (parentId: string): JoineryComponent[] => {
  return mockComponents.filter(component => component.parentComponentId === parentId);
};

/**
 * Get components by status
 */
export const getComponentsByStatus = (status: string): JoineryComponent[] => {
  return mockComponents.filter(component => component.status === status);
};
