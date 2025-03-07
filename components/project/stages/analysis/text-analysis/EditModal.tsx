import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../../../../lib/utils';
import { Finding } from '../types';

interface EditModalProps {
  finding: Finding;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedValue: string, notes: string) => void;
}

/**
 * EditModal
 * 
 * Modal dialog for editing finding values.
 * Allows users to modify the extracted text and add notes.
 */
const EditModal: React.FC<EditModalProps> = ({ 
  finding, 
  isOpen, 
  onClose, 
  onSave 
}) => {
  const [value, setValue] = useState(finding.currentValue);
  const [notes, setNotes] = useState(finding.notes || '');
  
  // Reset form when finding changes
  useEffect(() => {
    if (isOpen) {
      setValue(finding.currentValue);
      setNotes(finding.notes || '');
    }
  }, [finding, isOpen]);
  
  // Handle save
  const handleSave = () => {
    onSave(value, notes);
    onClose();
  };
  
  // Handle cancel
  const handleCancel = () => {
    onClose();
  };
  
  // Handle click outside
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Edit Finding</h3>
          <button 
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-4">
          <div className="mb-4">
            <div className="text-sm font-medium text-gray-700 mb-1">Original Value</div>
            <div className="p-2 bg-gray-50 border border-gray-200 rounded-md text-gray-700">
              {finding.extractedText}
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="value" className="block text-sm font-medium text-gray-700 mb-1">
              Current Value
            </label>
            <textarea
              id="value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={3}
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
              Notes (Optional)
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={2}
              placeholder="Add any notes about this change..."
            />
          </div>
        </div>
        
        {/* Footer */}
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={handleCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
