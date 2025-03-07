"use client";

import React, { useState, useRef, useCallback } from 'react';
import { Upload, FileText, X, AlertTriangle, CheckCircle } from 'lucide-react';
import { cn } from '../../../../lib/utils';
import { DocumentUploadProgress } from './types';

interface DocumentUploadAreaProps {
  onUpload: (files: File[]) => void;
  uploadProgress: DocumentUploadProgress[];
  supportedFileTypes?: string[];
  maxFileSize?: number; // in MB
}

/**
 * DocumentUploadArea
 * 
 * Component for uploading documents via drag-and-drop or file browser.
 * Shows upload progress and supports batch uploads.
 */
export function DocumentUploadArea({
  onUpload,
  uploadProgress,
  supportedFileTypes = ['.pdf', '.docx', '.xlsx', '.jpg', '.png', '.dwg', '.zip'],
  maxFileSize = 50
}: DocumentUploadAreaProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle drag events
  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  }, [isDragging]);

  // Handle file drop
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files);
      onUpload(files);
    }
  }, [onUpload]);

  // Handle file input change
  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      onUpload(files);
      
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }, [onUpload]);

  // Handle browse button click
  const handleBrowseClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  // Get status icon
  const getStatusIcon = (status: DocumentUploadProgress['status']) => {
    switch (status) {
      case 'uploading':
      case 'processing':
        return <div className="h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />;
      case 'complete':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {/* Drag and drop area */}
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center transition-colors",
          isDragging 
            ? "border-blue-500 bg-blue-50" 
            : "border-gray-300 bg-gray-50 hover:bg-gray-100",
          "min-h-[200px] flex flex-col items-center justify-center"
        )}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className="h-10 w-10 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-700 mb-2">
          Drag and drop files here
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          or
        </p>
        <button
          type="button"
          onClick={handleBrowseClick}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Browse Files
        </button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleFileInputChange}
          accept={supportedFileTypes.join(',')}
        />
        <p className="text-xs text-gray-500 mt-4">
          Supported file types: {supportedFileTypes.join(', ')}
        </p>
        <p className="text-xs text-gray-500">
          Maximum file size: {maxFileSize} MB
        </p>
      </div>

      {/* Upload progress */}
      {uploadProgress.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Upload Progress
          </h4>
          {uploadProgress.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2 flex-1 min-w-0">
                <FileText className="h-5 w-5 text-gray-400 flex-shrink-0" />
                <span className="text-sm text-gray-700 truncate">{item.fileName}</span>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                {item.status !== 'complete' && item.status !== 'error' && (
                  <div className="w-32 bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-blue-600 h-1.5 rounded-full"
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                )}
                <span className="text-xs text-gray-500 w-8 text-right">
                  {item.status === 'complete' ? 'Done' : item.status === 'error' ? 'Error' : `${item.progress}%`}
                </span>
                <span className="flex-shrink-0">
                  {getStatusIcon(item.status)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DocumentUploadArea;
