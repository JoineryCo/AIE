import { JoineryUnit } from '../types';

/**
 * Mock data for joinery units
 */
export const mockJoineryUnits: JoineryUnit[] = [
  {
    id: 'ju-001',
    name: 'Kitchen Island Cabinet',
    description: 'Main kitchen island with drawers and cabinets',
    location: 'Kitchen',
    joineryNumber: 'JO-01-1a',
    status: 'to-review',
    confidence: 0.85,
    componentIds: ['comp-001', 'comp-002', 'comp-003', 'comp-004', 'comp-005'],
    drawingIds: {
      elevation: 'draw-001',
      section: 'draw-002',
      detail: 'draw-003'
    },
    dimensions: {
      width: 2400,
      height: 900,
      depth: 650
    },
    issueCount: 2
  },
  {
    id: 'ju-002',
    name: 'Master Bedroom Wardrobe',
    description: 'Built-in wardrobe with sliding doors',
    location: 'Master Bedroom',
    joineryNumber: 'JO-02-1b',
    status: 'to-review',
    confidence: 0.78,
    componentIds: ['comp-006', 'comp-007', 'comp-008', 'comp-009'],
    drawingIds: {
      elevation: 'draw-004',
      section: 'draw-005'
    },
    dimensions: {
      width: 3600,
      height: 2400,
      depth: 600
    },
    issueCount: 1
  },
  {
    id: 'ju-003',
    name: 'Living Room Entertainment Unit',
    description: 'TV and media storage unit with shelving',
    location: 'Living Room',
    joineryNumber: 'JO-03-1c',
    status: 'approved',
    confidence: 0.92,
    componentIds: ['comp-010', 'comp-011', 'comp-012'],
    drawingIds: {
      elevation: 'draw-006',
      section: 'draw-007',
      detail: 'draw-008'
    },
    dimensions: {
      width: 3200,
      height: 1800,
      depth: 450
    },
    issueCount: 0
  },
  {
    id: 'ju-004',
    name: 'Bathroom Vanity',
    description: 'Double sink vanity with drawers',
    location: 'Main Bathroom',
    joineryNumber: 'JO-04-1d',
    status: 'modified',
    confidence: 0.88,
    componentIds: ['comp-013', 'comp-014', 'comp-015'],
    drawingIds: {
      elevation: 'draw-009',
      section: 'draw-010'
    },
    dimensions: {
      width: 1800,
      height: 850,
      depth: 550
    },
    issueCount: 0
  },
  {
    id: 'ju-005',
    name: 'Home Office Bookcase',
    description: 'Floor-to-ceiling bookcase with adjustable shelves',
    location: 'Home Office',
    joineryNumber: 'JO-05-1e',
    status: 'unclear',
    confidence: 0.72,
    componentIds: ['comp-016', 'comp-017', 'comp-018', 'comp-019'],
    drawingIds: {
      elevation: 'draw-011',
      section: 'draw-012',
      detail: 'draw-013'
    },
    dimensions: {
      width: 2800,
      height: 2700,
      depth: 400
    },
    issueCount: 3
  }
];

/**
 * Get a joinery unit by ID
 */
export const getJoineryUnitById = (id: string): JoineryUnit | undefined => {
  return mockJoineryUnits.find(unit => unit.id === id);
};

/**
 * Get joinery units by status
 */
export const getJoineryUnitsByStatus = (status: string): JoineryUnit[] => {
  return mockJoineryUnits.filter(unit => unit.status === status);
};
