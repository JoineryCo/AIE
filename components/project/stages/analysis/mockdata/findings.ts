import { Finding, SpecificationIssue } from '../types';

// Sample findings for development purposes
export const mockFindings: Finding[] = [
  {
    id: 'finding-1',
    sourceDocumentId: 'doc-1',
    sourcePosition: {
      page: 0,
      rect: [100, 450, 400, 470]
    },
    category: 'Dimensions',
    extractedText: 'Overall kitchen width: 3600mm',
    currentValue: '3600mm',
    confidence: 95,
    status: 'to-review'
  },
  {
    id: 'finding-2',
    sourceDocumentId: 'doc-1',
    sourcePosition: {
      page: 0,
      rect: [100, 470, 400, 490]
    },
    category: 'Dimensions',
    extractedText: 'Overall kitchen depth: 650mm',
    currentValue: '650mm',
    confidence: 95,
    status: 'to-review'
  },
  {
    id: 'finding-3',
    sourceDocumentId: 'doc-1',
    sourcePosition: {
      page: 0,
      rect: [100, 600, 400, 620]
    },
    category: 'Materials',
    extractedText: 'Countertop: 20mm Quartz (Caesarstone Snow or equivalent)',
    currentValue: '20mm Quartz (Caesarstone Snow or equivalent)',
    confidence: 90,
    status: 'to-review'
  },
  {
    id: 'finding-4',
    sourceDocumentId: 'doc-1',
    sourcePosition: {
      page: 1,
      rect: [100, 150, 400, 170]
    },
    category: 'Plumbing',
    extractedText: 'Main sink: Franke Kubus KBX 110-55, stainless steel',
    currentValue: 'Franke Kubus KBX 110-55, stainless steel',
    confidence: 85,
    status: 'to-review'
  },
  {
    id: 'finding-5',
    sourceDocumentId: 'doc-1',
    sourcePosition: {
      page: 1,
      rect: [100, 250, 400, 270]
    },
    category: 'Electrical',
    extractedText: 'Power outlets: 10 double GPOs total',
    currentValue: '10 double GPOs',
    confidence: 88,
    status: 'to-review'
  },
  {
    id: 'finding-6',
    sourceDocumentId: 'doc-1',
    sourcePosition: {
      page: 1,
      rect: [100, 450, 400, 470]
    },
    category: 'Installation',
    extractedText: 'Flooring to be installed prior to cabinetry installation',
    currentValue: 'Flooring to be installed prior to cabinetry installation',
    confidence: 92,
    status: 'to-review'
  },
  {
    id: 'finding-7',
    sourceDocumentId: 'doc-2',
    sourcePosition: {
      page: 0,
      rect: [100, 150, 400, 170]
    },
    category: 'Electrical',
    extractedText: 'Kitchen area: 8 double GPOs',
    currentValue: '8 double GPOs',
    confidence: 75,
    status: 'to-review',
    issueId: 'issue-1'
  },
  {
    id: 'finding-8',
    sourceDocumentId: 'doc-1',
    sourcePosition: {
      page: 0,
      rect: [100, 650, 400, 670]
    },
    category: 'Appliances',
    extractedText: 'Refrigerator: Fisher & Paykel RF610ADX5 or equivalent',
    currentValue: 'Fisher & Paykel RF610ADX5 or equivalent',
    confidence: 95,
    status: 'approved'
  },
  {
    id: 'finding-9',
    sourceDocumentId: 'doc-1',
    sourcePosition: {
      page: 0,
      rect: [100, 670, 400, 690]
    },
    category: 'Appliances',
    extractedText: 'Oven: Miele H 7260 BP or equivalent',
    currentValue: 'Miele H 7260 BP or equivalent',
    confidence: 95,
    status: 'approved'
  },
  {
    id: 'finding-10',
    sourceDocumentId: 'doc-1',
    sourcePosition: {
      page: 0,
      rect: [100, 690, 400, 710]
    },
    category: 'Appliances',
    extractedText: 'Cooktop: Miele KM 7564 FL or equivalent',
    currentValue: 'Miele KM 7564 FL or equivalent',
    confidence: 95,
    status: 'approved'
  }
];

// Sample specification issues for development purposes
export const mockIssues: SpecificationIssue[] = [
  {
    id: 'issue-1',
    title: 'Discrepancy in power outlet count',
    description: 'The kitchen specifications document states 10 double GPOs total, but the electrical layout specifies only 8 double GPOs in the kitchen area plus additional outlets for specific appliances.',
    status: 'open',
    priority: 'medium',
    createdAt: '2025-03-04T09:30:00',
    assignedTo: 'John Smith',
    relatedFindings: ['finding-5', 'finding-7'],
    comments: [
      {
        id: 'comment-1',
        author: 'Jane Doe',
        text: 'I\'ve checked both documents. We need to clarify if the 10 GPOs in the specifications include the dedicated appliance outlets or not.',
        timestamp: '2025-03-04T10:15:00',
      },
      {
        id: 'comment-2',
        author: 'John Smith',
        text: 'I\'ll contact the client to clarify this discrepancy.',
        timestamp: '2025-03-04T11:20:00',
      },
    ],
  },
  {
    id: 'issue-2',
    title: 'Missing sink model availability',
    description: 'The specified Franke Kubus KBX 110-55 sink model may be discontinued. Need to verify availability.',
    status: 'pending',
    priority: 'low',
    createdAt: '2025-03-03T14:45:00',
    relatedFindings: ['finding-4'],
    comments: [
      {
        id: 'comment-3',
        author: 'Sarah Johnson',
        text: 'I\'ve contacted the supplier to check availability of this model.',
        timestamp: '2025-03-03T15:30:00',
      },
    ],
  }
];
