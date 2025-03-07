"use client";

import React, { useState } from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  ChevronLeft, 
  ChevronRight, 
  X,
  Download,
  Edit,
  Search,
  Printer
} from 'lucide-react';
import { cn } from '../../../../lib/utils';
import { Document } from './types';

interface DocumentPreviewManagementProps {
  document: Document | null;
  onClose: () => void;
  onDownload?: (id: string) => void;
  onRename?: (id: string) => void;
}

/**
 * DocumentPreviewManagement
 * 
 * Component for viewing and managing documents.
 * Provides document viewer, thumbnail navigation, and document metadata editing.
 */
export function DocumentPreviewManagement({
  document,
  onClose,
  onDownload,
  onRename
}: DocumentPreviewManagementProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [zoom, setZoom] = useState(1);
  
  // If no document is selected, don't render anything
  if (!document) {
    return null;
  }
  
  // Get total pages
  const totalPages = document.pages || 1;
  
  // Handle page navigation
  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  // Handle zoom
  const zoomIn = () => {
    setZoom(Math.min(zoom + 0.25, 3));
  };
  
  const zoomOut = () => {
    setZoom(Math.max(zoom - 0.25, 0.5));
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
          <h3 className="font-medium text-gray-800 truncate">{document.name}</h3>
          <div className="flex items-center space-x-2">
            {onDownload && (
              <button 
                onClick={() => onDownload(document.id)}
                className="p-1.5 rounded-full text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                title="Download"
              >
                <Download className="h-5 w-5" />
              </button>
            )}
            {onRename && (
              <button 
                onClick={() => onRename(document.id)}
                className="p-1.5 rounded-full text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                title="Rename"
              >
                <Edit className="h-5 w-5" />
              </button>
            )}
            <button 
              onClick={onClose}
              className="p-1.5 rounded-full text-gray-500 hover:text-red-600 hover:bg-red-50"
              title="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        {/* Toolbar */}
        <div className="px-4 py-2 border-b border-gray-200 flex items-center justify-between bg-gray-50">
          <div className="flex items-center space-x-2">
            <button 
              onClick={goToPrevPage}
              disabled={currentPage === 0}
              className={cn(
                "p-1.5 rounded-full",
                currentPage === 0 
                  ? "text-gray-300 cursor-not-allowed" 
                  : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"
              )}
              title="Previous Page"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="text-sm text-gray-600">
              Page {currentPage + 1} of {totalPages}
            </div>
            <button 
              onClick={goToNextPage}
              disabled={currentPage === totalPages - 1}
              className={cn(
                "p-1.5 rounded-full",
                currentPage === totalPages - 1 
                  ? "text-gray-300 cursor-not-allowed" 
                  : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"
              )}
              title="Next Page"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={zoomOut}
              disabled={zoom <= 0.5}
              className={cn(
                "p-1.5 rounded-full",
                zoom <= 0.5 
                  ? "text-gray-300 cursor-not-allowed" 
                  : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"
              )}
              title="Zoom Out"
            >
              <ZoomOut className="h-5 w-5" />
            </button>
            <div className="text-sm text-gray-600">
              {Math.round(zoom * 100)}%
            </div>
            <button 
              onClick={zoomIn}
              disabled={zoom >= 3}
              className={cn(
                "p-1.5 rounded-full",
                zoom >= 3 
                  ? "text-gray-300 cursor-not-allowed" 
                  : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"
              )}
              title="Zoom In"
            >
              <ZoomIn className="h-5 w-5" />
            </button>
            <button 
              className="p-1.5 rounded-full text-gray-500 hover:text-blue-600 hover:bg-blue-50"
              title="Rotate"
            >
              <RotateCw className="h-5 w-5" />
            </button>
            <button 
              className="p-1.5 rounded-full text-gray-500 hover:text-blue-600 hover:bg-blue-50"
              title="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            <button 
              className="p-1.5 rounded-full text-gray-500 hover:text-blue-600 hover:bg-blue-50"
              title="Print"
            >
              <Printer className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        {/* Main content area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Thumbnails sidebar */}
          <div className="w-24 border-r border-gray-200 bg-gray-50 overflow-y-auto p-2 hidden sm:block">
            {Array.from({ length: totalPages }).map((_, index) => (
              <div 
                key={index}
                onClick={() => setCurrentPage(index)}
                className={cn(
                  "mb-2 p-1 rounded cursor-pointer border",
                  currentPage === index 
                    ? "border-blue-500 bg-blue-50" 
                    : "border-gray-200 hover:border-gray-300"
                )}
              >
                <div className="bg-white aspect-[3/4] flex items-center justify-center text-xs text-gray-400">
                  {document.thumbnail ? (
                    <img 
                      src={document.thumbnail} 
                      alt={`Page ${index + 1}`} 
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    `Page ${index + 1}`
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* Document viewer */}
          <div 
            className="flex-1 bg-gray-100 overflow-auto flex items-center justify-center p-4"
            style={{ 
              backgroundImage: 'linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%, #f0f0f0), linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%, #f0f0f0)',
              backgroundSize: '20px 20px',
              backgroundPosition: '0 0, 10px 10px'
            }}
          >
            <div 
              className="bg-white shadow-lg"
              style={{ 
                transform: `scale(${zoom})`,
                transition: 'transform 0.2s ease-in-out',
                width: '100%',
                maxWidth: '800px',
                aspectRatio: '3/4'
              }}
            >
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                {document.thumbnail ? (
                  <img 
                    src={document.thumbnail} 
                    alt={`Page ${currentPage + 1}`} 
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <div className="text-center p-4">
                    <p>Preview not available</p>
                    <p className="text-sm mt-2">Page {currentPage + 1}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Metadata sidebar */}
          <div className="w-64 border-l border-gray-200 bg-gray-50 overflow-y-auto p-4 hidden lg:block">
            <h4 className="font-medium text-gray-700 mb-3">Document Information</h4>
            <div className="space-y-3">
              <div>
                <div className="text-xs text-gray-500">Name</div>
                <div className="text-sm text-gray-700">{document.name}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Type</div>
                <div className="text-sm text-gray-700">{document.type.toUpperCase()}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Size</div>
                <div className="text-sm text-gray-700">{document.size}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Uploaded</div>
                <div className="text-sm text-gray-700">{formatDate(document.uploadDate)}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Pages</div>
                <div className="text-sm text-gray-700">{totalPages}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Status</div>
                <div className="text-sm text-gray-700">{document.status}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Category</div>
                <div className="text-sm text-gray-700">{document.category || 'Uncategorized'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocumentPreviewManagement;
