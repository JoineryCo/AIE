export type DocumentStatus = 'processing' | 'completed' | 'error' | 'pending';
export type DocumentType = 'pdf' | 'image' | 'cad' | 'spreadsheet' | 'text' | 'archive';

export interface Document {
  id: string;
  name: string;
  type: DocumentType;
  size: string;
  uploadDate: string;
  status: DocumentStatus;
  processingProgress?: number;
  errorMessage?: string;
  category?: DocumentCategory;
  pages?: number;
  thumbnail?: string;
}

export type DocumentCategory = 'specifications' | 'drawings' | 'schedules' | 'other';

export interface DocumentUploadProgress {
  fileName: string;
  progress: number;
  status: 'uploading' | 'processing' | 'error' | 'complete';
  error?: string;
}
