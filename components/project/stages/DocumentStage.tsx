"use client";

import React, { useState, useCallback } from 'react';
import { Upload, CheckCircle } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { Document, DocumentUploadProgress } from './documents/types';
import { mockDocuments } from './documents/mockdata/documents';
import DocumentUploadArea from './documents/DocumentUploadArea';
import DocumentListPanel from './documents/DocumentListPanel';
import ProcessingStatusPanel from './documents/ProcessingStatusPanel';
import DocumentPreviewManagement from './documents/DocumentPreviewManagement';

interface DocumentStageProps {
  projectId: string;
  onComplete: () => void;
}

/**
 * DocumentStage
 * 
 * Main component for the Document stage of the project workflow.
 * Provides document upload, management, and processing functionality.
 */
export function DocumentStage({ projectId, onComplete }: DocumentStageProps) {
  // State for documents
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  
  // State for upload progress
  const [uploadProgress, setUploadProgress] = useState<DocumentUploadProgress[]>([]);
  
  // State for selected document
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null);
  
  // State for document preview
  const [previewDocument, setPreviewDocument] = useState<Document | null>(null);
  
  // Handle file upload
  const handleUpload = useCallback((files: File[]) => {
    // Create upload progress entries
    const newProgress = files.map(file => ({
      fileName: file.name,
      progress: 0,
      status: 'uploading' as const
    }));
    
    setUploadProgress(prev => [...prev, ...newProgress]);
    
    // Simulate upload and processing for each file
    files.forEach((file, index) => {
      // Generate a unique ID for the document
      const docId = `doc-${Date.now()}-${index}`;
      
      // Determine document type based on file extension
      const extension = file.name.split('.').pop()?.toLowerCase() || '';
      let docType: Document['type'] = 'text';
      
      if (['pdf'].includes(extension)) {
        docType = 'pdf';
      } else if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) {
        docType = 'image';
      } else if (['dwg', 'dxf'].includes(extension)) {
        docType = 'cad';
      } else if (['xlsx', 'xls', 'csv'].includes(extension)) {
        docType = 'spreadsheet';
      } else if (['zip', 'rar', '7z'].includes(extension)) {
        docType = 'archive';
      }
      
      // Determine document category based on file name (simplified logic)
      let category: Document['category'] = 'other';
      const fileName = file.name.toLowerCase();
      
      if (fileName.includes('spec') || fileName.includes('requirement')) {
        category = 'specifications';
      } else if (fileName.includes('drawing') || fileName.includes('plan') || fileName.includes('layout')) {
        category = 'drawings';
      } else if (fileName.includes('schedule')) {
        category = 'schedules';
      }
      
      // Simulate upload progress
      let progress = 0;
      const uploadInterval = setInterval(() => {
        progress += 10;
        
        if (progress <= 100) {
          setUploadProgress(prev => 
            prev.map((item, i) => 
              i === index + prev.length - newProgress.length
                ? { ...item, progress }
                : item
            )
          );
        } else {
          clearInterval(uploadInterval);
          
          // Mark as processing
          setUploadProgress(prev => 
            prev.map((item, i) => 
              i === index + prev.length - newProgress.length
                ? { ...item, status: 'processing' as const }
                : item
            )
          );
          
          // Add document to the list in pending state
          const newDoc: Document = {
            id: docId,
            name: file.name,
            type: docType,
            size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
            uploadDate: new Date().toISOString(),
            status: 'pending',
            category,
            pages: docType === 'image' ? 1 : Math.floor(Math.random() * 20) + 1
          };
          
          setDocuments(prev => [...prev, newDoc]);
          
          // Simulate processing
          setTimeout(() => {
            setDocuments(docs => 
              docs.map(d => 
                d.id === docId 
                  ? { ...d, status: 'processing', processingProgress: 0 } 
                  : d
              )
            );
            
            // Simulate processing progress
            let processProgress = 0;
            const processInterval = setInterval(() => {
              processProgress += 5;
              
              if (processProgress <= 100) {
                setDocuments(docs => 
                  docs.map(d => 
                    d.id === docId 
                      ? { ...d, processingProgress: processProgress } 
                      : d
                  )
                );
              } else {
                clearInterval(processInterval);
                
                // Mark as complete
                setDocuments(docs => 
                  docs.map(d => 
                    d.id === docId 
                      ? { ...d, status: 'completed', processingProgress: undefined } 
                      : d
                  )
                );
                
                // Remove from upload progress
                setUploadProgress(prev => 
                  prev.map((item, i) => 
                    i === index + prev.length - newProgress.length
                      ? { ...item, status: 'complete' }
                      : item
                  )
                );
                
                // Clean up completed items after a delay
                setTimeout(() => {
                  setUploadProgress(prev => 
                    prev.filter(item => item.status !== 'complete')
                  );
                }, 3000);
              }
            }, 200);
          }, 1000);
        }
      }, 100);
    });
  }, []);
  
  // Handle document deletion
  const handleDeleteDocument = useCallback((id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
    
    // If the deleted document was selected, clear selection
    if (selectedDocumentId === id) {
      setSelectedDocumentId(null);
    }
    
    // If the deleted document was being previewed, close preview
    if (previewDocument?.id === id) {
      setPreviewDocument(null);
    }
  }, [selectedDocumentId, previewDocument]);
  
  // Handle document selection
  const handleSelectDocument = useCallback((id: string) => {
    setSelectedDocumentId(id);
  }, []);
  
  // Handle document view
  const handleViewDocument = useCallback((id: string) => {
    const doc = documents.find(d => d.id === id);
    if (doc) {
      setPreviewDocument(doc);
    }
  }, [documents]);
  
  // Handle document download (placeholder)
  const handleDownloadDocument = useCallback((id: string) => {
    console.log(`Downloading document ${id}`);
    // In a real app, this would trigger a download
  }, []);
  
  // Handle document rename (placeholder)
  const handleRenameDocument = useCallback((id: string) => {
    console.log(`Renaming document ${id}`);
    // In a real app, this would open a rename dialog
  }, []);
  
  // Handle retry for failed documents
  const handleRetryProcessing = useCallback((id: string) => {
    setDocuments(prev => 
      prev.map(doc => 
        doc.id === id 
          ? { ...doc, status: 'processing', processingProgress: 0, errorMessage: undefined } 
          : doc
      )
    );
    
    // Simulate processing
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      
      if (progress <= 100) {
        setDocuments(docs => 
          docs.map(d => 
            d.id === id 
              ? { ...d, processingProgress: progress } 
              : d
          )
        );
      } else {
        clearInterval(interval);
        
        // 80% chance of success on retry
        const success = Math.random() > 0.2;
        
        setDocuments(docs => 
          docs.map(d => 
            d.id === id 
              ? success 
                ? { ...d, status: 'completed', processingProgress: undefined } 
                : { ...d, status: 'error', processingProgress: undefined, errorMessage: 'Processing failed after retry' }
              : d
          )
        );
      }
    }, 200);
  }, []);
  
  // Handle cancel processing
  const handleCancelProcessing = useCallback((id: string) => {
    setDocuments(prev => 
      prev.map(doc => 
        doc.id === id 
          ? { ...doc, status: 'error', processingProgress: undefined, errorMessage: 'Processing cancelled by user' } 
          : doc
      )
    );
  }, []);
  
  // Check if all documents are processed
  const allDocumentsProcessed = documents.every(doc => 
    doc.status === 'completed' || doc.status === 'error'
  );
  
  // Count completed documents
  const completedCount = documents.filter(doc => doc.status === 'completed').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Document Management</h2>
        <button 
          onClick={onComplete}
          className={cn(
            "px-4 py-2 rounded-md",
            allDocumentsProcessed && documents.length > 0
              ? "bg-blue-600 hover:bg-blue-700 text-white" 
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          )}
          disabled={!allDocumentsProcessed || documents.length === 0}
        >
          Proceed to Analysis
        </button>
      </div>
      
      <p className="text-gray-600">
        Upload and manage project documents. All documents will be automatically processed and analyzed for relevant information.
      </p>
      
      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: Upload area and processing status */}
        <div className="lg:col-span-1 space-y-6">
          <DocumentUploadArea 
            onUpload={handleUpload}
            uploadProgress={uploadProgress}
          />
          
          <ProcessingStatusPanel 
            documents={documents}
            onRetry={handleRetryProcessing}
            onCancel={handleCancelProcessing}
          />
          
          {/* Processing Summary */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
              <span className="text-blue-800 font-medium">
                {completedCount} of {documents.length} documents processed
              </span>
            </div>
          </div>
        </div>
        
        {/* Right column: Document list */}
        <div className="lg:col-span-2">
          <DocumentListPanel 
            documents={documents}
            selectedDocumentId={selectedDocumentId}
            onSelectDocument={handleSelectDocument}
            onDeleteDocument={handleDeleteDocument}
            onViewDocument={handleViewDocument}
            onDownloadDocument={handleDownloadDocument}
            onRenameDocument={handleRenameDocument}
          />
        </div>
      </div>
      
      {/* Document preview modal */}
      {previewDocument && (
        <DocumentPreviewManagement 
          document={previewDocument}
          onClose={() => setPreviewDocument(null)}
          onDownload={handleDownloadDocument}
          onRename={handleRenameDocument}
        />
      )}
    </div>
  );
}

export default DocumentStage;
