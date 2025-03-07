import React, { useEffect, useRef } from 'react';
import { SourceDocument, Finding } from '../types';
import { FileText, ZoomIn, ZoomOut, Search, ChevronLeft, ChevronRight } from 'lucide-react';

interface DocumentViewerProps {
  document: SourceDocument | null | undefined;
  selectedFinding: Finding | null | undefined;
}

/**
 * DocumentViewer
 * 
 * Left panel component that displays the source document with highlighted text.
 * Provides navigation controls and auto-scrolls to the relevant section when a finding is selected.
 */
const DocumentViewer: React.FC<DocumentViewerProps> = ({ document, selectedFinding }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to the highlighted section when a finding is selected
  useEffect(() => {
    if (selectedFinding && highlightRef.current) {
      highlightRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    }
  }, [selectedFinding]);
  
  // Prepare content based on whether a document is selected
  const renderDocumentContent = () => {
    if (!document) {
      return (
        <div className="flex flex-col items-center justify-center h-full p-8 text-center">
          <FileText className="h-16 w-16 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-500 mb-2">No Document Selected</h3>
          <p className="text-gray-400 max-w-md">
            Select a finding from the right panel to view the source document.
          </p>
        </div>
      );
    }
    
    // Get the current page based on the selected finding
    const currentPage = selectedFinding ? selectedFinding.sourcePosition.page : 0;
    const pageContent = document.pages[currentPage]?.content || '';
    
    // Get the highlight for the current page and selected finding
    const highlight = selectedFinding 
      ? document.pages[currentPage]?.highlights?.find(h => h.findingId === selectedFinding.id)
      : null;
    
    // If there's no highlight, just render the content
    if (!highlight) {
      return <div className="whitespace-pre-wrap">{pageContent}</div>;
    }
    
    // Split the content into before, highlighted, and after sections
    // In a real implementation, this would use the highlight rect coordinates
    // to determine the exact text to highlight. For this demo, we'll use a simple
    // approach to highlight the text that contains the extracted text.
    
    // Find the text to highlight based on the extracted text
    const textToHighlight = selectedFinding?.extractedText || '';
    const index = pageContent.indexOf(textToHighlight);
    
    if (index === -1) {
      // If the exact text isn't found, just render the content
      return <div className="whitespace-pre-wrap">{pageContent}</div>;
    }
    
    const beforeText = pageContent.substring(0, index);
    const highlightedText = pageContent.substring(index, index + textToHighlight.length);
    const afterText = pageContent.substring(index + textToHighlight.length);
    
    return (
      <div className="whitespace-pre-wrap">
        {beforeText}
        <div 
          ref={highlightRef}
          className="bg-yellow-200 px-1 -mx-1 rounded"
        >
          {highlightedText}
        </div>
        {afterText}
      </div>
    );
  };
  
  
  return (
    <div className="flex flex-col h-full">
      {/* Document header */}
      <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200 bg-white">
        <h3 className="font-medium text-gray-800 truncate">
          {document ? document.title : 'No Document Selected'}
        </h3>
        <div className="flex items-center space-x-2">
          {document && (
            <span className="text-sm text-gray-500">
              Page {(selectedFinding ? selectedFinding.sourcePosition.page : 0) + 1} of {document.pages.length}
            </span>
          )}
        </div>
      </div>
      
      {/* Navigation controls - always visible for consistent layout */}
      <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200 bg-white">
        <div className="flex items-center space-x-2">
          <button 
            className="p-1 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!document || (selectedFinding?.sourcePosition.page || 0) === 0}
            title="Previous Page"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button 
            className="p-1 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!document || (selectedFinding?.sourcePosition.page || 0) === (document?.pages.length || 1) - 1}
            title="Next Page"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex items-center space-x-2">
          <button 
            className="p-1 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!document}
            title="Zoom Out"
          >
            <ZoomOut className="h-5 w-5" />
          </button>
          <button 
            className="p-1 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!document}
            title="Zoom In"
          >
            <ZoomIn className="h-5 w-5" />
          </button>
          <button 
            className="p-1 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!document}
            title="Search"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      {/* Document content */}
      <div 
        ref={contentRef}
        className="flex-1 p-8 overflow-auto font-mono text-sm"
      >
        {renderDocumentContent()}
      </div>
    </div>
  );
};

export default DocumentViewer;
