"use client";

import React, { useState, useEffect } from 'react';
import { Finding, SourceDocument, SpecificationIssue, FindingStatus } from '../types';
import DocumentViewer from './DocumentViewer';
import FindingsPanel from './FindingsPanel';
import StatusTabs from './StatusTabs';

interface TextAnalysisTabProps {
  documents: SourceDocument[];
  findings: Finding[];
  issues: SpecificationIssue[];
}

/**
 * TextAnalysisTab
 * 
 * Main component for the Text Analysis tab in the Analysis Stage.
 * Implements a dual-panel interface with document viewer on the left
 * and findings panel on the right.
 */
const TextAnalysisTab: React.FC<TextAnalysisTabProps> = ({ 
  documents, 
  findings, 
  issues 
}) => {
  // State for selected finding
  const [selectedFindingId, setSelectedFindingId] = useState<string | null>(null);
  
  // State for active status filter
  const [activeStatus, setActiveStatus] = useState<FindingStatus | 'all'>('to-review');
  
  // State for findings with their status
  const [workingFindings, setWorkingFindings] = useState<Finding[]>(findings);
  
  // Get the selected finding
  const selectedFinding = selectedFindingId 
    ? workingFindings.find(f => f.id === selectedFindingId) 
    : null;
  
  // Get the document for the selected finding
  const selectedDocument = selectedFinding 
    ? documents.find(d => d.id === selectedFinding.sourceDocumentId) 
    : null;
  
  // Filter findings by status
  const filteredFindings = activeStatus === 'all'
    ? workingFindings
    : workingFindings.filter(f => f.status === activeStatus);
  
  // Count findings by status
  const findingCounts = {
    'all': workingFindings.length,
    'to-review': workingFindings.filter(f => f.status === 'to-review').length,
    'approved': workingFindings.filter(f => f.status === 'approved').length,
    'modified': workingFindings.filter(f => f.status === 'modified').length,
    'discarded': workingFindings.filter(f => f.status === 'discarded').length,
    'unclear': workingFindings.filter(f => f.status === 'unclear').length,
  };
  
  // Calculate progress percentage
  const progressPercentage = Math.round(
    ((findingCounts.approved + findingCounts.modified + findingCounts.discarded + findingCounts.unclear) / 
    findingCounts.all) * 100
  );
  
  // Select the first finding in the filtered list if none is selected
  useEffect(() => {
    if (filteredFindings.length > 0 && !selectedFindingId) {
      setSelectedFindingId(filteredFindings[0].id);
    } else if (filteredFindings.length > 0 && !filteredFindings.some(f => f.id === selectedFindingId)) {
      // If the selected finding is not in the filtered list, select the first one
      setSelectedFindingId(filteredFindings[0].id);
    }
  }, [filteredFindings, selectedFindingId]);
  
  // Handle finding selection
  const handleSelectFinding = (findingId: string) => {
    setSelectedFindingId(findingId);
  };
  
  // Handle finding status change
  const handleStatusChange = (findingId: string, newStatus: FindingStatus, updatedValue?: string, notes?: string) => {
    setWorkingFindings(prev => 
      prev.map(f => 
        f.id === findingId 
          ? { 
              ...f, 
              status: newStatus,
              ...(updatedValue ? { currentValue: updatedValue } : {}),
              ...(notes !== undefined ? { notes } : {})
            } 
          : f
      )
    );
    
    // Auto-advance to next finding if there are more to review
    if (newStatus !== 'to-review' && activeStatus === 'to-review') {
      const currentIndex = filteredFindings.findIndex(f => f.id === findingId);
      if (currentIndex < filteredFindings.length - 1) {
        setSelectedFindingId(filteredFindings[currentIndex + 1].id);
      }
    }
  };
  
  // Handle creating a new issue
  const handleCreateIssue = (findingId: string, issueDetails: Omit<SpecificationIssue, 'id' | 'createdAt' | 'comments' | 'relatedFindings'>) => {
    // In a real app, this would create a new issue in the backend
    console.log('Creating issue for finding', findingId, issueDetails);
    
    // Update the finding status to unclear
    handleStatusChange(findingId, 'unclear');
  };
  
  return (
    <div className="flex flex-col h-[calc(100vh-280px)] min-h-[500px] border border-gray-200 rounded-lg overflow-hidden w-full">
      {/* Progress bar at the top */}
      <div className="w-full h-1 bg-gray-200">
        <div 
          className="h-full bg-blue-600"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      
      {/* Status tabs */}
      <div className="w-full bg-white border-b border-gray-200">
        <StatusTabs 
          activeStatus={activeStatus}
          onStatusChange={setActiveStatus}
          counts={findingCounts}
        />
      </div>
      
      {/* Main content area with document viewer and findings panel */}
      <div className="flex flex-1 w-full overflow-hidden">
        {/* Document viewer (left panel - 60% width) */}
        <div className="w-3/5 flex-shrink-0 bg-gray-50 border-r border-gray-200 overflow-auto min-w-[400px]">
          <DocumentViewer 
            document={selectedDocument}
            selectedFinding={selectedFinding}
          />
        </div>
        
        {/* Findings panel (right panel - 40% width) */}
        <div className="w-2/5 flex-shrink-0 bg-white overflow-auto min-w-[300px]">
          <FindingsPanel 
            findings={filteredFindings}
            selectedFindingId={selectedFindingId}
            onSelectFinding={handleSelectFinding}
            onStatusChange={handleStatusChange}
            onCreateIssue={handleCreateIssue}
          />
        </div>
      </div>
    </div>
  );
};

export default TextAnalysisTab;
