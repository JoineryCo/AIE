"use client";

import React, { useState } from 'react';
import { 
  FileText, 
  Image, 
  Layers, 
  AlertTriangle 
} from 'lucide-react';
import { cn } from '../../../../lib/utils';
import { AnalysisTab } from './types';
import { mockDocuments } from './mockdata/documents';
import { mockFindings, mockIssues } from './mockdata/findings';
import { mockDrawingElements } from './mockdata/drawings';
import TextAnalysisTab from './text-analysis/TextAnalysisTab';
import DrawingAnalysisTab from './drawing-analysis/DrawingAnalysisTab';
import ComponentAnalysisTab from './component-analysis/ComponentAnalysisTab';

interface AnalysisStageProps {
  projectId: string;
  onComplete: () => void;
}

/**
 * AnalysisStage
 * 
 * Container component for the Analysis stage of the project workflow.
 * Provides tab navigation between different analysis views:
 * - Text Analysis: For validating extracted text information
 * - Drawing Analysis: For validating measurements and annotations from drawings
 * - Components Analysis: For reviewing identified components
 * - Specification Issues: For managing specification issues and clarifications
 */
export function AnalysisStage({ projectId, onComplete }: AnalysisStageProps) {
  // State for active tab
  const [activeTab, setActiveTab] = useState<AnalysisTab>('text');
  
  // Count of unresolved issues
  const unresolvedIssuesCount = mockIssues.filter(issue => issue.status !== 'resolved').length;
  
  // Check if all items are validated and all issues are resolved
  const allItemsValidated = mockFindings.every(item => 
    item.status !== 'to-review'
  );
  
  const allIssuesResolved = mockIssues.every(issue => 
    issue.status === 'resolved'
  );
  
  // Can proceed to next stage if all items are validated and all issues are resolved
  const canProceed = allItemsValidated && allIssuesResolved;
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Analysis Dashboard</h2>
        <button 
          onClick={onComplete}
          className={cn(
            "px-4 py-2 rounded-md",
            canProceed 
              ? "bg-blue-600 hover:bg-blue-700 text-white" 
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          )}
          disabled={!canProceed}
        >
          Proceed to Estimation
        </button>
      </div>
      
      <p className="text-gray-600">
        Review and validate extracted information from documents. Address any specification issues before proceeding to estimation.
      </p>
      
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          <button
            onClick={() => setActiveTab('text')}
            className={cn(
              "py-2 px-4 text-sm font-medium border-b-2 whitespace-nowrap",
              activeTab === 'text'
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            )}
          >
            <div className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Text Analysis
            </div>
          </button>
          
          <button
            onClick={() => setActiveTab('drawings')}
            className={cn(
              "py-2 px-4 text-sm font-medium border-b-2 whitespace-nowrap",
              activeTab === 'drawings'
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            )}
          >
            <div className="flex items-center">
              <Image className="h-4 w-4 mr-2" />
              Drawing Analysis
            </div>
          </button>
          
          <button
            onClick={() => setActiveTab('components')}
            className={cn(
              "py-2 px-4 text-sm font-medium border-b-2 whitespace-nowrap",
              activeTab === 'components'
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            )}
          >
            <div className="flex items-center">
              <Layers className="h-4 w-4 mr-2" />
              Components
            </div>
          </button>
          
          <button
            onClick={() => setActiveTab('issues')}
            className={cn(
              "py-2 px-4 text-sm font-medium border-b-2 whitespace-nowrap",
              activeTab === 'issues'
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            )}
          >
            <div className="flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Specification Issues
              {unresolvedIssuesCount > 0 && (
                <span className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-red-100 text-red-800">
                  {unresolvedIssuesCount}
                </span>
              )}
            </div>
          </button>
        </nav>
      </div>
      
      {/* Tab Content - Using a fixed height container to maintain stable layout */}
      <div className="w-full">
        {/* Text Analysis Tab - Always render but control visibility for stable layout */}
        <div className={activeTab === 'text' ? 'block' : 'hidden'}>
          <TextAnalysisTab 
            documents={mockDocuments}
            findings={mockFindings}
            issues={mockIssues}
          />
        </div>
        
        {/* Drawing Analysis Tab */}
        <div className={activeTab === 'drawings' ? 'block' : 'hidden'}>
          <DrawingAnalysisTab 
            onCreateIssue={(elementId) => {
              console.log('Create issue for element', elementId);
              // In a real implementation, this would open the issue form
            }}
          />
        </div>
        
        {/* Components Tab */}
        <div className={activeTab === 'components' ? 'block' : 'hidden'}>
          <ComponentAnalysisTab 
            onCreateIssue={(componentId) => {
              console.log('Create issue for component', componentId);
              // In a real implementation, this would open the issue form
            }}
          />
        </div>
        
        {/* Issues Tab */}
        <div className={`bg-white rounded-lg shadow-sm p-6 border border-gray-200 ${activeTab === 'issues' ? 'block' : 'hidden'}`}>
          <div className="text-center py-8">
            <AlertTriangle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Specification Issues</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              This is a placeholder for the Specification Issues component. In a real implementation, this would show a list of specification issues that need to be resolved before proceeding to estimation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalysisStage;
