"use client";

import React, { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { ProjectHeader } from './ProjectHeader';
import { SidePanel } from './SidePanel';

interface MainLayoutProps {
  children: ReactNode;
  stage?: 'documents' | 'analysis' | 'estimation' | 'review';
  showProjectHeader?: boolean;
  showSidePanel?: boolean;
  projectData?: {
    title: string;
    client: string;
    dueDate: string;
    progress: number;
    status: {
      type: 'pending' | 'processing' | 'completed' | 'error' | 'discarded' | 'clarification';
      label: string;
    }
  };
  sidePanelData?: {
    projectName: string;
    metrics: {
      label: string;
      value: string;
      highlight?: boolean;
    }[];
    actionItems: {
      id: string;
      title: string;
      description: string;
      type: 'warning' | 'error' | 'success' | 'info' | 'pending';
      link?: string;
    }[];
  };
}

export function MainLayout({ 
  children, 
  stage = 'documents',
  showProjectHeader = true,
  showSidePanel = true,
  projectData,
  sidePanelData,
}: MainLayoutProps) {
  // Default project data
  const defaultProjectData = {
    title: 'New Joinery Project',
    client: 'Sample Client',
    dueDate: '2025-06-30',
    progress: 25,
    status: {
      type: 'processing' as const,
      label: 'In Progress',
    }
  };

  // Define types to match SidePanel component
  type ActionItemType = 'warning' | 'error' | 'success' | 'info' | 'pending';
  
  // Default side panel data
  const defaultSidePanelData = {
    projectName: 'Sample Project',
    metrics: [
      { label: 'Total Items', value: '24', highlight: false },
      { label: 'Estimated Cost', value: '$12,450', highlight: true },
      { label: 'Completion', value: '25%', highlight: false },
    ],
    actionItems: [
      {
        id: '1',
        title: 'Missing Document',
        description: 'Floor plan diagram is required for accurate estimation',
        type: 'warning' as ActionItemType,
      },
      {
        id: '2',
        title: 'Price Check Needed',
        description: 'Verify pricing for custom handles from supplier',
        type: 'pending' as ActionItemType,
      },
    ],
  };

  // Use provided data or defaults
  const finalProjectData = projectData || defaultProjectData;
  const finalSidePanelData = sidePanelData || defaultSidePanelData;

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 w-full overflow-hidden">
        {/* Project Header */}
        {showProjectHeader && (
          <ProjectHeader 
            title={finalProjectData.title}
            client={finalProjectData.client}
            dueDate={finalProjectData.dueDate}
            progress={finalProjectData.progress}
            status={finalProjectData.status}
          />
        )}

        {/* Content Area + Side Panel */}
        <div className="flex flex-1 w-full overflow-hidden">
          {/* Main Content */}
          <div className="flex-1 w-full overflow-y-auto p-6">
            {children}
          </div>

          {/* Side Panel */}
          {showSidePanel && (
            <SidePanel 
              projectName={finalSidePanelData.projectName}
              stage={stage}
              metrics={finalSidePanelData.metrics}
              actionItems={finalSidePanelData.actionItems}
            />
          )}
        </div>
      </div>
    </div>
  );
}
