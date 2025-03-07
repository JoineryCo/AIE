"use client";

import React, { useState, useMemo } from 'react';
import { Search, Filter, ArrowUpDown, ChevronDown, CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import { cn } from '../../../../lib/utils';
import { Document, DocumentStatus, DocumentCategory } from './types';
import DocumentTypeGroup from './DocumentTypeGroup';

interface DocumentListPanelProps {
  documents: Document[];
  onSelectDocument: (id: string) => void;
  onDeleteDocument: (id: string) => void;
  onViewDocument: (id: string) => void;
  onDownloadDocument?: (id: string) => void;
  onRenameDocument?: (id: string) => void;
  selectedDocumentId?: string | null;
}

type SortOption = 'name' | 'date' | 'size' | 'type';
type SortDirection = 'asc' | 'desc';

/**
 * DocumentListPanel
 * 
 * Component for displaying a list of documents organized by category.
 * Provides search, filtering, and sorting capabilities.
 */
export function DocumentListPanel({
  documents,
  onSelectDocument,
  onDeleteDocument,
  onViewDocument,
  onDownloadDocument,
  onRenameDocument,
  selectedDocumentId = null
}: DocumentListPanelProps) {
  // State for search, filter, and sort
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<DocumentStatus | 'all'>('all');
  const [sortBy, setSortBy] = useState<SortOption>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  // Filter documents based on search query and status filter
  const filteredDocuments = useMemo(() => {
    return documents.filter(doc => {
      // Filter by status
      if (filterStatus !== 'all' && doc.status !== filterStatus) {
        return false;
      }
      
      // Filter by search query
      if (searchQuery && !doc.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      return true;
    });
  }, [documents, searchQuery, filterStatus]);

  // Sort documents
  const sortedDocuments = useMemo(() => {
    return [...filteredDocuments].sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'date':
          comparison = new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime();
          break;
        case 'size':
          // Simple size comparison (would need more sophisticated parsing for real sizes)
          comparison = parseFloat(a.size) - parseFloat(b.size);
          break;
        case 'type':
          comparison = a.type.localeCompare(b.type);
          break;
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [filteredDocuments, sortBy, sortDirection]);

  // Group documents by category
  const documentsByCategory = useMemo(() => {
    const grouped: Record<DocumentCategory, Document[]> = {
      'specifications': [],
      'drawings': [],
      'schedules': [],
      'other': []
    };
    
    sortedDocuments.forEach(doc => {
      const category = doc.category || 'other';
      grouped[category].push(doc);
    });
    
    return grouped;
  }, [sortedDocuments]);

  // Toggle sort direction or change sort field
  const handleSortChange = (field: SortOption) => {
    if (sortBy === field) {
      // Toggle direction if same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new field and default to descending
      setSortBy(field);
      setSortDirection('desc');
    }
  };

  return (
    <div className="space-y-4">
      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
        {/* Search */}
        <div className="relative max-w-xs w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <input
            type="text"
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="flex space-x-2">
          {/* Status filter */}
          <div className="relative">
            <button className="inline-flex items-center gap-x-1.5 text-sm font-medium text-gray-700 rounded-md border border-gray-300 px-3 py-1.5 hover:bg-gray-50">
              <Filter className="h-4 w-4" />
              <span>Status: {filterStatus === 'all' ? 'All' : filterStatus}</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            {/* Dropdown would go here in a real implementation */}
          </div>
          
          {/* Sort */}
          <button 
            onClick={() => handleSortChange(sortBy)}
            className="inline-flex items-center gap-x-1.5 text-sm font-medium text-gray-700 rounded-md border border-gray-300 px-3 py-1.5 hover:bg-gray-50"
          >
            <ArrowUpDown className="h-4 w-4" />
            <span>Sort: {sortBy}</span>
            {sortDirection === 'asc' ? ' (A-Z)' : ' (Z-A)'}
          </button>
        </div>
      </div>

      {/* Document count summary */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div>
          {filteredDocuments.length} {filteredDocuments.length === 1 ? 'document' : 'documents'} found
        </div>
        
        <div className="flex space-x-4">
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
            <span>{documents.filter(d => d.status === 'completed').length} processed</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-amber-500 mr-1" />
            <span>{documents.filter(d => d.status === 'processing' || d.status === 'pending').length} pending</span>
          </div>
          <div className="flex items-center">
            <AlertTriangle className="h-4 w-4 text-red-500 mr-1" />
            <span>{documents.filter(d => d.status === 'error').length} errors</span>
          </div>
        </div>
      </div>

      {/* Document groups */}
      <div className="space-y-4">
        {Object.entries(documentsByCategory).map(([category, docs]) => {
          if (docs.length === 0) return null;
          
          const categoryTitle = {
            'specifications': 'Specifications',
            'drawings': 'Drawings',
            'schedules': 'Schedules',
            'other': 'Other Documents'
          }[category as DocumentCategory];
          
          return (
            <DocumentTypeGroup
              key={category}
              title={categoryTitle}
              category={category as DocumentCategory}
              documents={docs}
              selectedDocumentId={selectedDocumentId}
              onSelectDocument={onSelectDocument}
              onDeleteDocument={onDeleteDocument}
              onViewDocument={onViewDocument}
              onDownloadDocument={onDownloadDocument}
              onRenameDocument={onRenameDocument}
            />
          );
        })}
        
        {filteredDocuments.length === 0 && (
          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
            <p className="text-gray-500">
              {searchQuery || filterStatus !== 'all' 
                ? 'No documents match your filters' 
                : 'No documents uploaded yet'}
            </p>
            {(searchQuery || filterStatus !== 'all') && (
              <button
                onClick={() => { setSearchQuery(''); setFilterStatus('all'); }}
                className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
              >
                Clear filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default DocumentListPanel;
