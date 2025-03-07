import { Drawing, DrawingElement } from '../types';

// Mock drawings data
export const mockDrawings: Drawing[] = [
  {
    id: 'drw-1',
    title: 'Kitchen Floor Plan',
    type: 'plan',
    scale: '1:50',
    referenceNumber: 'A-101',
    uploadDate: '2025-03-01T10:30:00',
    pages: [
      {
        pageNumber: 1,
        imageUrl: '/mockdata/drawings/kitchen-floor-plan.jpg',
        width: 1200,
        height: 900,
        elements: ['elem-1', 'elem-2', 'elem-3', 'elem-4'],
        annotations: [
          {
            id: 'ann-1',
            type: 'note',
            position: { x: 300, y: 200 },
            content: 'Verify cabinet dimensions',
            color: '#FF9800',
            createdBy: 'AI',
            createdAt: '2025-03-01T10:35:00',
          },
        ],
      },
    ],
  },
  {
    id: 'drw-2',
    title: 'Kitchen Elevations',
    type: 'elevation',
    scale: '1:20',
    referenceNumber: 'A-102',
    uploadDate: '2025-03-01T10:40:00',
    pages: [
      {
        pageNumber: 1,
        imageUrl: '/mockdata/drawings/kitchen-elevation-north.jpg',
        width: 1200,
        height: 800,
        elements: ['elem-5', 'elem-6', 'elem-7'],
      },
      {
        pageNumber: 2,
        imageUrl: '/mockdata/drawings/kitchen-elevation-east.jpg',
        width: 1200,
        height: 800,
        elements: ['elem-8', 'elem-9'],
      },
    ],
  },
  {
    id: 'drw-3',
    title: 'Cabinet Details',
    type: 'detail',
    scale: '1:10',
    referenceNumber: 'A-501',
    uploadDate: '2025-03-01T11:15:00',
    pages: [
      {
        pageNumber: 1,
        imageUrl: '/mockdata/drawings/cabinet-detail-1.jpg',
        width: 1000,
        height: 1200,
        elements: ['elem-10', 'elem-11'],
      },
    ],
  },
  {
    id: 'drw-4',
    title: 'Kitchen Sections',
    type: 'section',
    scale: '1:20',
    referenceNumber: 'A-301',
    uploadDate: '2025-03-02T09:20:00',
    pages: [
      {
        pageNumber: 1,
        imageUrl: '/mockdata/drawings/kitchen-section-a.jpg',
        width: 1400,
        height: 800,
        elements: ['elem-12', 'elem-13'],
      },
    ],
  },
];

// Mock drawing elements data
export const mockDrawingElements: DrawingElement[] = [
  {
    id: 'elem-1',
    drawingId: 'drw-1',
    boundingBox: {
      x: 200,
      y: 150,
      width: 300,
      height: 100,
    },
    type: 'cabinet',
    category: 'kitchen',
    location: 'Kitchen',
    joineryNumber: 'K-CAB-01',
    dimensions: {
      width: 900,
      height: 720,
      depth: 600,
    },
    confidence: 0.92,
    status: 'to-review',
    elementNumber: '1',
    drawingReference: {
      drawingNumber: 'A-101',
      pageNumber: 1,
      revision: 'Rev 2'
    },
    documentSource: {
      fileName: 'Kitchen_Plans_2025.pdf',
      pageNumber: 5
    },
    scale: '1:50',
    crossReferences: [
      {
        elementId: 'elem-5',
        drawingNumber: 'A-102',
        description: 'See elevation view'
      }
    ]
  },
  {
    id: 'elem-2',
    drawingId: 'drw-1',
    boundingBox: {
      x: 500,
      y: 150,
      width: 300,
      height: 100,
    },
    type: 'cabinet',
    category: 'kitchen',
    location: 'Kitchen',
    joineryNumber: 'K-CAB-02',
    dimensions: {
      width: 900,
      height: 720,
      depth: 600,
    },
    confidence: 0.88,
    status: 'to-review',
  },
  {
    id: 'elem-3',
    drawingId: 'drw-1',
    boundingBox: {
      x: 200,
      y: 300,
      width: 600,
      height: 100,
    },
    type: 'countertop',
    category: 'kitchen',
    location: 'Kitchen',
    joineryNumber: 'K-TOP-01',
    dimensions: {
      width: 1800,
      height: 40,
      depth: 600,
    },
    confidence: 0.95,
    status: 'to-review',
  },
  {
    id: 'elem-4',
    drawingId: 'drw-1',
    boundingBox: {
      x: 200,
      y: 400,
      width: 150,
      height: 150,
    },
    type: 'drawer',
    category: 'kitchen',
    location: 'Kitchen',
    joineryNumber: 'K-DRW-01',
    dimensions: {
      width: 450,
      height: 150,
      depth: 550,
    },
    confidence: 0.85,
    status: 'to-review',
  },
  {
    id: 'elem-5',
    drawingId: 'drw-2',
    boundingBox: {
      x: 100,
      y: 200,
      width: 200,
      height: 400,
    },
    type: 'cabinet',
    category: 'kitchen',
    location: 'Kitchen',
    joineryNumber: 'K-CAB-03',
    dimensions: {
      width: 600,
      height: 2100,
      depth: 600,
    },
    confidence: 0.91,
    status: 'to-review',
  },
  {
    id: 'elem-6',
    drawingId: 'drw-2',
    boundingBox: {
      x: 300,
      y: 200,
      width: 200,
      height: 400,
    },
    type: 'cabinet',
    category: 'kitchen',
    location: 'Kitchen',
    joineryNumber: 'K-CAB-04',
    dimensions: {
      width: 600,
      height: 2100,
      depth: 600,
    },
    confidence: 0.89,
    status: 'to-review',
  },
  {
    id: 'elem-7',
    drawingId: 'drw-2',
    boundingBox: {
      x: 500,
      y: 200,
      width: 200,
      height: 400,
    },
    type: 'cabinet',
    category: 'kitchen',
    location: 'Kitchen',
    joineryNumber: 'K-CAB-05',
    dimensions: {
      width: 600,
      height: 2100,
      depth: 600,
    },
    confidence: 0.87,
    status: 'to-review',
  },
  {
    id: 'elem-8',
    drawingId: 'drw-2',
    boundingBox: {
      x: 200,
      y: 300,
      width: 400,
      height: 200,
    },
    type: 'cabinet',
    category: 'kitchen',
    location: 'Kitchen',
    joineryNumber: 'K-CAB-06',
    dimensions: {
      width: 1200,
      height: 720,
      depth: 600,
    },
    confidence: 0.93,
    status: 'to-review',
  },
  {
    id: 'elem-9',
    drawingId: 'drw-2',
    boundingBox: {
      x: 600,
      y: 300,
      width: 200,
      height: 200,
    },
    type: 'cabinet',
    category: 'kitchen',
    location: 'Kitchen',
    joineryNumber: 'K-CAB-07',
    dimensions: {
      width: 600,
      height: 720,
      depth: 600,
    },
    confidence: 0.86,
    status: 'to-review',
  },
  {
    id: 'elem-10',
    drawingId: 'drw-3',
    boundingBox: {
      x: 100,
      y: 100,
      width: 400,
      height: 400,
    },
    type: 'drawer',
    category: 'kitchen',
    location: 'Kitchen',
    joineryNumber: 'K-DRW-02',
    dimensions: {
      width: 600,
      height: 150,
      depth: 550,
    },
    confidence: 0.94,
    status: 'to-review',
  },
  {
    id: 'elem-11',
    drawingId: 'drw-3',
    boundingBox: {
      x: 500,
      y: 100,
      width: 400,
      height: 400,
    },
    type: 'door',
    category: 'kitchen',
    location: 'Kitchen',
    joineryNumber: 'K-DR-01',
    dimensions: {
      width: 600,
      height: 720,
      depth: 20,
    },
    confidence: 0.92,
    status: 'to-review',
  },
  {
    id: 'elem-12',
    drawingId: 'drw-4',
    boundingBox: {
      x: 200,
      y: 200,
      width: 400,
      height: 300,
    },
    type: 'cabinet',
    category: 'kitchen',
    location: 'Kitchen',
    joineryNumber: 'K-CAB-08',
    dimensions: {
      width: 1200,
      height: 900,
      depth: 600,
    },
    confidence: 0.90,
    status: 'to-review',
  },
  {
    id: 'elem-13',
    drawingId: 'drw-4',
    boundingBox: {
      x: 600,
      y: 200,
      width: 200,
      height: 300,
    },
    type: 'shelf',
    category: 'kitchen',
    location: 'Kitchen',
    joineryNumber: 'K-SH-01',
    dimensions: {
      width: 600,
      height: 25,
      depth: 300,
    },
    confidence: 0.88,
    status: 'to-review',
  },
];

// Helper function to get elements for a specific drawing
export const getElementsForDrawing = (drawingId: string): DrawingElement[] => {
  return mockDrawingElements.filter(element => element.drawingId === drawingId);
};

// Helper function to get drawing by ID
export const getDrawingById = (drawingId: string): Drawing | undefined => {
  return mockDrawings.find(drawing => drawing.id === drawingId);
};

// Helper function to get element by ID
export const getElementById = (elementId: string): DrawingElement | undefined => {
  return mockDrawingElements.find(element => element.id === elementId);
};

// Count elements by status
export const countElementsByStatus = (status: 'to-review' | 'approved' | 'modified' | 'discarded' | 'unclear' | 'all'): number => {
  if (status === 'all') {
    return mockDrawingElements.length;
  }
  return mockDrawingElements.filter(element => element.status === status).length;
};
