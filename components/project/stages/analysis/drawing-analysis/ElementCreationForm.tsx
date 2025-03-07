"use client";

import React, { useState } from 'react';
import { 
  X, 
  Save, 
  Loader2 
} from 'lucide-react';
import { cn } from '../../../../../lib/utils';
import { DrawingElement } from '../types';

interface ElementCreationFormProps {
  boundingBox: { x: number; y: number; width: number; height: number };
  drawingId: string;
  onSave: (element: Partial<DrawingElement>) => void;
  onCancel: () => void;
  isProcessing: boolean;
  suggestedData?: Partial<DrawingElement>; // AI-suggested data
}

/**
 * ElementCreationForm
 * 
 * Form for creating a new element after manual selection.
 * Simulates AI processing to auto-detect element properties,
 * then allows users to review and adjust the metadata.
 */
const ElementCreationForm: React.FC<ElementCreationFormProps> = ({
  boundingBox,
  drawingId,
  onSave,
  onCancel,
  isProcessing: externalProcessing,
  suggestedData
}) => {
  // Internal processing state to simulate AI analysis
  const [internalProcessing, setInternalProcessing] = useState<boolean>(true);
  const [processingStep, setProcessingStep] = useState<string>("Analyzing element dimensions...");
  const [processingProgress, setProcessingProgress] = useState<number>(0);
  
  // Form state
  const [formData, setFormData] = useState<Partial<DrawingElement>>({
    drawingId,
    boundingBox,
    type: 'cabinet',
    category: 'kitchen',
    location: '',
    joineryNumber: '',
    dimensions: {
      width: 0,
      height: 0,
      depth: 0
    },
    confidence: 0.85, // AI-detected elements start with high confidence
    status: 'to-review'
  });
  
  // Combined processing state
  const isProcessing = externalProcessing || internalProcessing;
  
  // Simulate AI processing
  React.useEffect(() => {
    if (internalProcessing) {
      const steps = [
        "Analyzing element dimensions...",
        "Detecting element type...",
        "Identifying location...",
        "Generating reference number...",
        "Finalizing element metadata..."
      ];
      
      let currentStep = 0;
      
      const interval = setInterval(() => {
        if (currentStep < steps.length) {
          setProcessingStep(steps[currentStep]);
          setProcessingProgress(Math.round((currentStep + 1) / steps.length * 100));
          currentStep++;
        } else {
          clearInterval(interval);
          
          // Generate AI-suggested data
          const aiSuggestedData = {
            type: suggestedData?.type || ['cabinet', 'drawer', 'shelf', 'countertop'][Math.floor(Math.random() * 4)] as any,
            category: suggestedData?.category || 'kitchen',
            location: suggestedData?.location || 'Kitchen',
            joineryNumber: `J${Math.floor(Math.random() * 100).toString().padStart(2, '0')}`,
            dimensions: {
              width: suggestedData?.dimensions?.width || Math.round(boundingBox.width * 3),
              height: suggestedData?.dimensions?.height || Math.round(boundingBox.height * 3),
              depth: suggestedData?.dimensions?.depth || 600
            },
            drawingReference: {
              drawingNumber: `A${Math.floor(Math.random() * 10)}-${Math.floor(Math.random() * 100).toString().padStart(3, '0')}`,
              pageNumber: 1,
              revision: `Rev ${Math.floor(Math.random() * 5) + 1}`,
              viewType: ['plan', 'elevation', 'section', 'detail'][Math.floor(Math.random() * 4)] as any
            },
            confidence: 0.85 + (Math.random() * 0.1)
          };
          
          // Update form data with AI suggestions
          setFormData(prev => ({
            ...prev,
            ...aiSuggestedData
          }));
          
          setInternalProcessing(false);
        }
      }, 800);
      
      return () => clearInterval(interval);
    }
  }, [internalProcessing, boundingBox, suggestedData]);
  
  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('dimensions.')) {
      const dimensionKey = name.split('.')[1] as 'width' | 'height' | 'depth';
      setFormData(prev => {
        // Ensure dimensions object exists and has all required properties
        const currentDimensions = prev.dimensions || { width: 0, height: 0, depth: 0 };
        
        return {
          ...prev,
          dimensions: {
            width: currentDimensions.width || 0,
            height: currentDimensions.height || 0,
            depth: currentDimensions.depth || 0,
            [dimensionKey]: parseFloat(value) || 0
          }
        };
      });
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-medium">Add New Element</h3>
          <button 
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700"
            disabled={isProcessing}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {internalProcessing ? (
          <div className="p-6 space-y-4">
            <div className="text-center">
              <Loader2 className="h-12 w-12 mx-auto animate-spin text-blue-600 mb-4" />
              <h3 className="text-lg font-medium text-gray-800 mb-2">AI Processing</h3>
              <p className="text-gray-600 mb-4">{processingStep}</p>
              
              {/* Progress bar */}
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out" 
                  style={{ width: `${processingProgress}%` }}
                />
              </div>
              
              <p className="text-sm text-gray-500">
                Our AI is analyzing the selected area to identify and classify the element.
                This will automatically populate metadata fields for you to review.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Element Type */}
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
              Element Type
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isProcessing}
            >
              <option value="cabinet">Cabinet</option>
              <option value="countertop">Countertop</option>
              <option value="shelf">Shelf</option>
              <option value="drawer">Drawer</option>
              <option value="door">Door</option>
              <option value="window">Window</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isProcessing}
            >
              <option value="kitchen">Kitchen</option>
              <option value="bathroom">Bathroom</option>
              <option value="laundry">Laundry</option>
              <option value="storage">Storage</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g., Kitchen, Master Bathroom"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isProcessing}
            />
          </div>
          
          {/* Joinery Number */}
          <div>
            <label htmlFor="joineryNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Joinery Number
            </label>
            <input
              type="text"
              id="joineryNumber"
              name="joineryNumber"
              value={formData.joineryNumber}
              onChange={handleChange}
              placeholder="e.g., K-CAB-01"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isProcessing}
            />
          </div>
          
          {/* Dimensions */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Dimensions</h4>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label htmlFor="dimensions.width" className="block text-xs text-gray-500 mb-1">
                  Width (mm)
                </label>
                <input
                  type="number"
                  id="dimensions.width"
                  name="dimensions.width"
                  value={formData.dimensions?.width || 0}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isProcessing}
                />
              </div>
              <div>
                <label htmlFor="dimensions.height" className="block text-xs text-gray-500 mb-1">
                  Height (mm)
                </label>
                <input
                  type="number"
                  id="dimensions.height"
                  name="dimensions.height"
                  value={formData.dimensions?.height || 0}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isProcessing}
                />
              </div>
              <div>
                <label htmlFor="dimensions.depth" className="block text-xs text-gray-500 mb-1">
                  Depth (mm)
                </label>
                <input
                  type="number"
                  id="dimensions.depth"
                  name="dimensions.depth"
                  value={formData.dimensions?.depth || 0}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isProcessing}
                />
              </div>
            </div>
          </div>
          
          {/* Notes */}
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
              Notes (Optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes || ''}
              onChange={(e) => {
                setFormData(prev => {
                  // Create a new object with all the previous properties
                  return {
                    ...prev,
                    notes: e.target.value
                  };
                });
              }}
              placeholder="Add any additional notes about this element"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px]"
              disabled={isProcessing}
            />
          </div>
          
          {/* Actions */}
          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isProcessing}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-blue-500",
                isProcessing 
                  ? "bg-blue-400 cursor-not-allowed" 
                  : "bg-blue-600 hover:bg-blue-700"
              )}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <span className="flex items-center">
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processing...
                </span>
              ) : (
                <span className="flex items-center">
                  <Save className="h-4 w-4 mr-2" />
                  Save Element
                </span>
              )}
            </button>
          </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ElementCreationForm;
