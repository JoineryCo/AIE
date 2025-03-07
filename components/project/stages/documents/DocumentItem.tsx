"use client";

import React from 'react';
import { 
  FileText, 
  Image, 
  File, 
  FileArchive, 
  Trash2, 
  CheckCircle, 
  AlertTriangle,
  Clock,
  RefreshCw,
  MoreVertical,
  Eye,
  Download,
  Edit
} from 'lucide-react';
import { cn } from '../../../../lib/utils';
import { Document, DocumentType } from './types';

interface DocumentItemProps {
  document: Document;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
  onDownload?: (id: string) => void;
  onRename?: (id: string) => void;
}

/**
 * DocumentItem
 * 
 * Component for displaying a single document in the document list.
 * Shows document information, status, and actions.
 */
export function DocumentItem({
  document,
  isSelected,
  onSelect,
  onDelete,
  onView,
  onDownload,
  onRename
}: DocumentItemProps) {
  // Get document icon based on type
  const getDocumentIcon = (type: DocumentType) => {
    switch (type) {
      case 'pdf':
        return <FileText className="h-6 w-6 text-red-500" />;
      case 'image':
        return <Image className="h-6 w-6 text-blue-500" />;
      case 'cad':
        return <File className="h-6 w-6 text-purple-500" />;
      case 'spreadsheet':
        return <FileText className="h-6 w-6 text-green-500" />;
      case 'text':
        return <FileText className="h-6 w-6 text-gray-500" />;
      case 'archive':
        return <FileArchive className="h-6 w-6 text-amber-500" />;
      default:
        return <File className="h-6 w-6 text-gray-500" />;
    }
  };

  // Get status indicator
  const getStatusIndicator = (status: Document['status']) => {
    switch (status) {
      case 'completed':
        return (
          <div className="flex items-center text-green-600">
            <CheckCircle className="h-4 w-4 mr-1" />
            <span>Processed</span>
          </div>
        );
      case 'processing':
        return (
          <div className="flex items-center text-blue-600">
            <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
            <span>Processing</span>
          </div>
        );
      case 'error':
        return (
          <div className="flex items-center text-red-600">
            <AlertTriangle className="h-4 w-4 mr-1" />
            <span>Error</span>
          </div>
        );
      case 'pending':
        return (
          <div className="flex items-center text-amber-600">
            <Clock className="h-4 w-4 mr-1" />
            <span>Pending</span>
          </div>
        );
      default:
        return null;
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });
  };

  return (
    <div 
      className={cn(
        "border-b border-gray-200 p-4 hover:bg-gray-50 transition-colors cursor-pointer",
        isSelected && "bg-blue-50 hover:bg-blue-50"
      )}
      onClick={() => onSelect(document.id)}
    >
      <div className="flex items-center justify-between">
        {/* Document info */}
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div className="flex-shrink-0">
            {getDocumentIcon(document.type)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-gray-900 truncate">{document.name}</div>
            <div className="flex items-center text-xs text-gray-500 space-x-2">
              <span>{document.type.toUpperCase()}</span>
              <span>•</span>
              <span>{document.size}</span>
              <span>•</span>
              <span>{formatDate(document.uploadDate)}</span>
              {document.pages && (
                <>
                  <span>•</span>
                  <span>{document.pages} {document.pages === 1 ? 'page' : 'pages'}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="flex-shrink-0 mx-4">
          {getStatusIndicator(document.status)}
          {document.status === 'processing' && document.processingProgress !== undefined && (
            <div className="mt-1 w-32">
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-blue-600 h-1.5 rounded-full"
                  style={{ width: `${document.processingProgress}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">{document.processingProgress}%</div>
            </div>
          )}
          {document.status === 'error' && document.errorMessage && (
            <div className="text-xs text-red-500 mt-1">{document.errorMessage}</div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          <button 
            onClick={(e) => { e.stopPropagation(); onView(document.id); }}
            className="p-1.5 rounded-full text-gray-400 hover:text-blue-600 hover:bg-blue-50"
            title="View"
          >
            <Eye className="h-4 w-4" />
          </button>
          
          {onDownload && (
            <button 
              onClick={(e) => { e.stopPropagation(); onDownload(document.id); }}
              className="p-1.5 rounded-full text-gray-400 hover:text-blue-600 hover:bg-blue-50"
              title="Download"
            >
              <Download className="h-4 w-4" />
            </button>
          )}
          
          {onRename && (
            <button 
              onClick={(e) => { e.stopPropagation(); onRename(document.id); }}
              className="p-1.5 rounded-full text-gray-400 hover:text-blue-600 hover:bg-blue-50"
              title="Rename"
            >
              <Edit className="h-4 w-4" />
            </button>
          )}
          
          <button 
            onClick={(e) => { e.stopPropagation(); onDelete(document.id); }}
            className="p-1.5 rounded-full text-gray-400 hover:text-red-600 hover:bg-red-50"
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </button>
          
          <div className="relative">
            <button 
              className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              title="More options"
              onClick={(e) => { e.stopPropagation(); }}
            >
              <MoreVertical className="h-4 w-4" />
            </button>
            {/* Dropdown menu would go here */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocumentItem;
