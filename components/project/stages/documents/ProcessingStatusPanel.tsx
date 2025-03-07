"use client";

import React, { useState } from 'react';
import { 
  CheckCircle, 
  AlertTriangle, 
  RefreshCw, 
  Clock, 
  ChevronDown, 
  ChevronUp,
  XCircle,
  RotateCw
} from 'lucide-react';
import { cn } from '../../../../lib/utils';
import { Document } from './types';

interface ProcessingStatusPanelProps {
  documents: Document[];
  onRetry: (id: string) => void;
  onCancel: (id: string) => void;
}

/**
 * ProcessingStatusPanel
 * 
 * Component for displaying the processing status of documents.
 * Shows overall progress, individual file progress, and error notifications.
 */
export function ProcessingStatusPanel({
  documents,
  onRetry,
  onCancel
}: ProcessingStatusPanelProps) {
  const [expanded, setExpanded] = useState(true);

  // Get processing documents
  const processingDocuments = documents.filter(doc => 
    doc.status === 'processing' || doc.status === 'pending'
  );
  
  // Get error documents
  const errorDocuments = documents.filter(doc => 
    doc.status === 'error'
  );
  
  // Get completed documents
  const completedDocuments = documents.filter(doc => 
    doc.status === 'completed'
  );
  
  // Calculate overall progress
  const totalDocuments = documents.length;
  const completedCount = completedDocuments.length;
  const errorCount = errorDocuments.length;
  const processingCount = processingDocuments.length;
  
  const overallProgress = totalDocuments > 0 
    ? Math.round(((completedCount + errorCount) / totalDocuments) * 100) 
    : 0;
  
  // Estimate time remaining (simplified)
  const estimateTimeRemaining = () => {
    if (processingCount === 0) return null;
    
    // Simple estimate: 30 seconds per document
    const estimatedSecondsPerDocument = 30;
    const estimatedSeconds = processingCount * estimatedSecondsPerDocument;
    
    if (estimatedSeconds < 60) {
      return `${estimatedSeconds} seconds`;
    } else if (estimatedSeconds < 3600) {
      return `${Math.round(estimatedSeconds / 60)} minutes`;
    } else {
      return `${Math.round(estimatedSeconds / 3600)} hours`;
    }
  };
  
  const timeRemaining = estimateTimeRemaining();

  // Toggle expanded state
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  // If no documents or all completed, don't show the panel
  if (totalDocuments === 0 || (processingCount === 0 && errorCount === 0)) {
    return null;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gray-50 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <h3 className="font-medium text-gray-800">Processing Status</h3>
          {processingCount > 0 && (
            <div className="ml-2 flex items-center text-blue-600 text-sm">
              <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
              <span>{processingCount} in progress</span>
            </div>
          )}
          {errorCount > 0 && (
            <div className="ml-2 flex items-center text-red-600 text-sm">
              <AlertTriangle className="h-3 w-3 mr-1" />
              <span>{errorCount} errors</span>
            </div>
          )}
        </div>
        <button 
          onClick={toggleExpanded}
          className="text-gray-500 hover:text-gray-700"
        >
          {expanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1 bg-gray-200">
        <div 
          className={cn(
            "h-full",
            errorCount > 0 ? "bg-amber-500" : "bg-blue-600"
          )}
          style={{ width: `${overallProgress}%` }}
        />
      </div>

      {/* Content */}
      {expanded && (
        <div className="p-4 space-y-4">
          {/* Overall progress */}
          <div className="flex justify-between items-center text-sm">
            <div className="text-gray-700">
              {completedCount} of {totalDocuments} documents processed
              {errorCount > 0 && ` (${errorCount} with errors)`}
            </div>
            {timeRemaining && (
              <div className="text-gray-500 flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>Estimated time remaining: {timeRemaining}</span>
              </div>
            )}
          </div>

          {/* Processing documents */}
          {processingDocuments.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-700">Processing</h4>
              {processingDocuments.map(doc => (
                <div key={doc.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 flex-1 min-w-0">
                    <RefreshCw className="h-4 w-4 text-blue-500 animate-spin flex-shrink-0" />
                    <span className="text-sm text-gray-700 truncate">{doc.name}</span>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    {doc.processingProgress !== undefined && (
                      <>
                        <div className="w-32 bg-gray-200 rounded-full h-1.5">
                          <div
                            className="bg-blue-600 h-1.5 rounded-full"
                            style={{ width: `${doc.processingProgress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500 w-8 text-right">
                          {doc.processingProgress}%
                        </span>
                      </>
                    )}
                    <button 
                      onClick={() => onCancel(doc.id)}
                      className="p-1 rounded-full text-gray-400 hover:text-red-600 hover:bg-red-50"
                      title="Cancel"
                    >
                      <XCircle className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error documents */}
          {errorDocuments.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-700">Errors</h4>
              {errorDocuments.map(doc => (
                <div key={doc.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 flex-1 min-w-0">
                    <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0" />
                    <div className="min-w-0">
                      <div className="text-sm text-gray-700 truncate">{doc.name}</div>
                      {doc.errorMessage && (
                        <div className="text-xs text-red-500 truncate">{doc.errorMessage}</div>
                      )}
                    </div>
                  </div>
                  <div className="ml-4">
                    <button 
                      onClick={() => onRetry(doc.id)}
                      className="p-1 rounded-full text-gray-400 hover:text-blue-600 hover:bg-blue-50"
                      title="Retry"
                    >
                      <RotateCw className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ProcessingStatusPanel;
