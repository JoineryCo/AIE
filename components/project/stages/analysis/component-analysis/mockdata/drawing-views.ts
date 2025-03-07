import { DrawingView } from '../types';

/**
 * Mock data for drawing views
 */
export const mockDrawingViews: DrawingView[] = [
  // Kitchen Island Cabinet Views
  {
    id: 'draw-001',
    joineryUnitId: 'ju-001',
    type: 'elevation',
    imageUrl: '/mockImages/kitchen-island-elevation.jpg',
    width: 1200,
    height: 800,
    scale: '1:20',
    drawingNumber: 'A07-002',
    elementIds: ['elem-001', 'elem-002', 'elem-003']
  },
  {
    id: 'draw-002',
    joineryUnitId: 'ju-001',
    type: 'section',
    imageUrl: '/mockImages/kitchen-island-section.jpg',
    width: 1200,
    height: 800,
    scale: '1:20',
    drawingNumber: 'A07-003',
    elementIds: ['elem-004', 'elem-005']
  },
  {
    id: 'draw-003',
    joineryUnitId: 'ju-001',
    type: 'detail',
    imageUrl: '/mockImages/kitchen-island-detail.jpg',
    width: 800,
    height: 600,
    scale: '1:5',
    drawingNumber: 'A07-004',
    elementIds: ['elem-006']
  },
  
  // Master Bedroom Wardrobe Views
  {
    id: 'draw-004',
    joineryUnitId: 'ju-002',
    type: 'elevation',
    imageUrl: '/mockImages/wardrobe-elevation.jpg',
    width: 1200,
    height: 800,
    scale: '1:20',
    drawingNumber: 'A08-001',
    elementIds: ['elem-007', 'elem-008', 'elem-009']
  },
  {
    id: 'draw-005',
    joineryUnitId: 'ju-002',
    type: 'section',
    imageUrl: '/mockImages/wardrobe-section.jpg',
    width: 1200,
    height: 800,
    scale: '1:20',
    drawingNumber: 'A08-002',
    elementIds: ['elem-010', 'elem-011']
  },
  
  // Living Room Entertainment Unit Views
  {
    id: 'draw-006',
    joineryUnitId: 'ju-003',
    type: 'elevation',
    imageUrl: '/mockImages/entertainment-elevation.jpg',
    width: 1200,
    height: 800,
    scale: '1:20',
    drawingNumber: 'A09-001',
    elementIds: ['elem-012', 'elem-013']
  },
  {
    id: 'draw-007',
    joineryUnitId: 'ju-003',
    type: 'section',
    imageUrl: '/mockImages/entertainment-section.jpg',
    width: 1200,
    height: 800,
    scale: '1:20',
    drawingNumber: 'A09-002',
    elementIds: ['elem-014']
  },
  {
    id: 'draw-008',
    joineryUnitId: 'ju-003',
    type: 'detail',
    imageUrl: '/mockImages/entertainment-detail.jpg',
    width: 800,
    height: 600,
    scale: '1:5',
    drawingNumber: 'A09-003',
    elementIds: ['elem-015']
  },
  
  // Bathroom Vanity Views
  {
    id: 'draw-009',
    joineryUnitId: 'ju-004',
    type: 'elevation',
    imageUrl: '/mockImages/vanity-elevation.jpg',
    width: 1200,
    height: 800,
    scale: '1:20',
    drawingNumber: 'A10-001',
    elementIds: ['elem-016', 'elem-017']
  },
  {
    id: 'draw-010',
    joineryUnitId: 'ju-004',
    type: 'section',
    imageUrl: '/mockImages/vanity-section.jpg',
    width: 1200,
    height: 800,
    scale: '1:20',
    drawingNumber: 'A10-002',
    elementIds: ['elem-018', 'elem-019']
  },
  
  // Home Office Bookcase Views
  {
    id: 'draw-011',
    joineryUnitId: 'ju-005',
    type: 'elevation',
    imageUrl: '/mockImages/bookcase-elevation.jpg',
    width: 1200,
    height: 800,
    scale: '1:20',
    drawingNumber: 'A11-001',
    elementIds: ['elem-020', 'elem-021']
  },
  {
    id: 'draw-012',
    joineryUnitId: 'ju-005',
    type: 'section',
    imageUrl: '/mockImages/bookcase-section.jpg',
    width: 1200,
    height: 800,
    scale: '1:20',
    drawingNumber: 'A11-002',
    elementIds: ['elem-022', 'elem-023']
  },
  {
    id: 'draw-013',
    joineryUnitId: 'ju-005',
    type: 'detail',
    imageUrl: '/mockImages/bookcase-detail.jpg',
    width: 800,
    height: 600,
    scale: '1:5',
    drawingNumber: 'A11-003',
    elementIds: ['elem-024']
  }
];

/**
 * Get drawing views by joinery unit ID
 */
export const getDrawingViewsByJoineryUnitId = (joineryUnitId: string): DrawingView[] => {
  return mockDrawingViews.filter(view => view.joineryUnitId === joineryUnitId);
};

/**
 * Get drawing views by type
 */
export const getDrawingViewsByType = (joineryUnitId: string, type: 'elevation' | 'section' | 'detail'): DrawingView | undefined => {
  return mockDrawingViews.find(view => view.joineryUnitId === joineryUnitId && view.type === type);
};

/**
 * Get a drawing view by ID
 */
export const getDrawingViewById = (id: string): DrawingView | undefined => {
  return mockDrawingViews.find(view => view.id === id);
};
