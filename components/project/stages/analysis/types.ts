// Types and interfaces for the Analysis Stage components

export type AnalysisTab = 'text' | 'drawings' | 'components' | 'issues';

export type FindingStatus = 'to-review' | 'approved' | 'modified' | 'discarded' | 'unclear';

export interface Finding {
  id: string;
  sourceDocumentId: string;
  sourcePosition: {
    page: number;
    rect: [number, number, number, number]; // [x1, y1, x2, y2]
  };
  category: string;
  extractedText: string;
  currentValue: string;
  confidence: number;
  status: FindingStatus;
  notes?: string;
  issueId?: string;
}

export interface SourceDocument {
  id: string;
  title: string;
  pages: {
    content: string;
    highlights?: {
      findingId: string;
      rect: [number, number, number, number];
    }[];
  }[];
}

export interface SpecificationIssue {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'resolved' | 'pending';
  priority: 'high' | 'medium' | 'low';
  createdAt: string;
  assignedTo?: string;
  relatedFindings: string[]; // Finding IDs
  comments: {
    id: string;
    author: string;
    text: string;
    timestamp: string;
  }[];
}

// Drawing Analysis Types

export type DrawingType = 'plan' | 'elevation' | 'section' | 'detail';

export type ElementStatus = FindingStatus; // Reuse the same status types for consistency

export interface DrawingElement {
  id: string;
  drawingId: string;
  boundingBox: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  type: 'cabinet' | 'countertop' | 'shelf' | 'drawer' | 'door' | 'window' | 'other';
  category: 'kitchen' | 'bathroom' | 'laundry' | 'storage' | 'other';
  location: string; // Room or area
  joineryNumber: string; // Assigned identifier
  dimensions: {
    width: number;
    height: number;
    depth?: number;
  };
  confidence: number;
  status: ElementStatus;
  notes?: string;
  issueId?: string;
  
  // Additional metadata fields based on specification
  elementNumber?: string; // Element number (e.g., "1", "8")
  drawingReference?: {
    drawingNumber: string; // Reference code (e.g., "A07-002")
    pageNumber: number; // Location in the original PDF
    revision?: string; // Version of the drawing (e.g., "Rev 5")
    viewType?: DrawingType; // Type of view (plan, elevation, section, detail)
  };
  documentSource?: {
    fileName: string; // Original file name
    pageNumber: number; // Page in the original document
  };
  scale?: string; // Drawing scale (e.g., "1:20", "1:50")
  crossReferences?: {
    elementId: string;
    drawingNumber: string;
    description: string;
  }[]; // Links to other drawing elements
}

export interface Drawing {
  id: string;
  title: string;
  type: DrawingType;
  scale?: string;
  referenceNumber: string;
  uploadDate: string;
  pages: {
    pageNumber: number;
    imageUrl: string;
    width: number;
    height: number;
    elements?: string[]; // Element IDs
    annotations?: Annotation[];
  }[];
}

export interface Annotation {
  id: string;
  type: 'note' | 'measurement' | 'highlight' | 'markup';
  position: {
    x: number;
    y: number;
  };
  content: string;
  color?: string;
  createdBy: string;
  createdAt: string;
}

export interface Measurement {
  id: string;
  startPoint: {
    x: number;
    y: number;
  };
  endPoint: {
    x: number;
    y: number;
  };
  value: number;
  unit: 'mm' | 'cm' | 'm' | 'in' | 'ft';
  label?: string;
}
