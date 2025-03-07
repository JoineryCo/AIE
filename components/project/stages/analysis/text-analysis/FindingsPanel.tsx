import React, { useState } from 'react';
import { Finding, SpecificationIssue } from '../types';
import FindingCard from './FindingCard';
import EditModal from './EditModal';
import IssueForm from './IssueForm';

interface FindingsPanelProps {
  findings: Finding[];
  selectedFindingId: string | null;
  onSelectFinding: (findingId: string) => void;
  onStatusChange: (findingId: string, newStatus: 'approved' | 'modified' | 'discarded' | 'unclear', updatedValue?: string, notes?: string) => void;
  onCreateIssue: (findingId: string, issueDetails: Omit<SpecificationIssue, 'id' | 'createdAt' | 'comments' | 'relatedFindings'>) => void;
}

/**
 * FindingsPanel
 * 
 * Right panel component that displays a list of findings.
 * Allows users to select, view, and take actions on findings.
 */
const FindingsPanel: React.FC<FindingsPanelProps> = ({ 
  findings, 
  selectedFindingId,
  onSelectFinding,
  onStatusChange,
  onCreateIssue
}) => {
  // State for modals
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [issueFormOpen, setIssueFormOpen] = useState(false);
  
  // Get the selected finding
  const selectedFinding = selectedFindingId 
    ? findings.find(f => f.id === selectedFindingId) 
    : null;
  
  // Handle finding selection
  const handleSelectFinding = (findingId: string) => {
    onSelectFinding(findingId);
  };
  
  // Handle action button clicks
  const handleAction = (findingId: string, action: 'approve' | 'edit' | 'discard' | 'flag') => {
    switch (action) {
      case 'approve':
        onStatusChange(findingId, 'approved');
        break;
      case 'edit':
        onSelectFinding(findingId);
        setEditModalOpen(true);
        break;
      case 'discard':
        onStatusChange(findingId, 'discarded');
        break;
      case 'flag':
        onSelectFinding(findingId);
        setIssueFormOpen(true);
        break;
    }
  };
  
  // Handle edit save
  const handleEditSave = (updatedValue: string, notes: string) => {
    if (selectedFindingId) {
      onStatusChange(selectedFindingId, 'modified', updatedValue, notes);
    }
  };
  
  // Handle issue submit
  const handleIssueSubmit = (issueDetails: Omit<SpecificationIssue, 'id' | 'createdAt' | 'comments' | 'relatedFindings'>) => {
    if (selectedFindingId) {
      onCreateIssue(selectedFindingId, issueDetails);
    }
  };
  
  return (
    <div className="p-4 h-full flex flex-col">
      <h3 className="text-lg font-medium text-gray-800 mb-4">
        {findings.length === 0 ? 'No findings to display' : `Findings (${findings.length})`}
      </h3>
      
      <div className="flex-1 min-h-0">
        {findings.length === 0 ? (
          <div className="flex items-center justify-center h-full text-center py-8 text-gray-500 border border-dashed border-gray-200 rounded-lg bg-gray-50">
            <div>
              <p className="mb-2">No findings match the current filter.</p>
              <p className="text-sm text-gray-400">Try selecting a different status tab.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {findings.map(finding => (
              <FindingCard
                key={finding.id}
                finding={finding}
                isSelected={finding.id === selectedFindingId}
                onSelect={() => handleSelectFinding(finding.id)}
                onAction={(action) => handleAction(finding.id, action)}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Edit Modal */}
      {selectedFinding && (
        <EditModal
          finding={selectedFinding}
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          onSave={handleEditSave}
        />
      )}
      
      {/* Issue Form */}
      {selectedFinding && (
        <IssueForm
          finding={selectedFinding}
          isOpen={issueFormOpen}
          onClose={() => setIssueFormOpen(false)}
          onSubmit={handleIssueSubmit}
        />
      )}
    </div>
  );
};

export default FindingsPanel;
