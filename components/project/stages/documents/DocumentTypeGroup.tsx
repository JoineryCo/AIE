"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronRight, FileText, Image, File, FileArchive } from 'lucide-react';
import { cn } from '../../../../lib/utils';
import { Document, DocumentCategory } from './types';
import DocumentItem from './DocumentItem';

interface DocumentTypeGroupProps {
  title: string;
  category: DocumentCategory;
  documents: Document[];
  selectedDocumentId: string | null;
  onSelectDocument: (id: string) => void;
  onDeleteDocument: (id: string) => void;
  onViewDocument: (id: string) => void;
  onDownloadDocument?: (id: string) => void;
  onRenameDocument?: (id: string) => void;
  initialExpanded?: boolean;
}

/**
 * DocumentTypeGroup
 * 
 * Component for grouping documents by type (specifications, drawings, etc.).
 * Provides a collapsible section with a header and list of documents.
 */
export function DocumentTypeGroup({
  title,
  category,
  documents,
  selectedDocumentId,
  onSelectDocument,
  onDeleteDocument,
  onViewDocument,
  onDownloadDocument,
  onRenameDocument,
  initialExpanded = true
}: DocumentTypeGroupProps) {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);

  // Get category icon
  const getCategoryIcon = () => {
    switch (category) {
      case 'specifications':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'drawings':
        return <Image className="h-5 w-5 text-green-500" />;
      case 'schedules':
        return <FileText className="h-5 w-5 text-purple-500" />;
      case 'other':
      default:
        return <File className="h-5 w-5 text-gray-500" />;
    }
  };

  // Toggle expansion
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden mb-4">
      {/* Group header */}
      <div 
        className="bg-gray-50 px-4 py-3 flex items-center justify-between cursor-pointer"
        onClick={toggleExpanded}
      >
        <div className="flex items-center space-x-2">
          {getCategoryIcon()}
          <h3 className="font-medium text-gray-800">{title}</h3>
          <span className="text-sm text-gray-500">({documents.length})</span>
        </div>
        <button className="text-gray-500 hover:text-gray-700">
          {isExpanded ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </button>
      </div>

      {/* Document list */}
      {isExpanded && (
        <div className="divide-y divide-gray-200">
          {documents.length === 0 ? (
            <div className="py-4 px-4 text-center text-gray-500 text-sm">
              No documents in this category
            </div>
          ) : (
            documents.map(document => (
              <DocumentItem
                key={document.id}
                document={document}
                isSelected={document.id === selectedDocumentId}
                onSelect={onSelectDocument}
                onDelete={onDeleteDocument}
                onView={onViewDocument}
                onDownload={onDownloadDocument}
                onRename={onRenameDocument}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default DocumentTypeGroup;
