"use client";

import React, { useState } from 'react';
import { 
  ArrowLeft,
  Save,
  FileText,
  Settings,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  AlertTriangle,
  Clock,
  RefreshCw,
  ExternalLink,
  Layers,
  MessageSquare,
  HelpCircle,
  FileInput,
  FileSearch,
  Calculator,
  CheckSquare
} from 'lucide-react';
import { SidePanel } from '../layout/SidePanel';
import { ProjectHeader } from '../layout/ProjectHeader';
import { cn } from '../../lib/utils';
import { AnalysisStage } from './stages/AnalysisStage';
import { DocumentStage } from './stages/DocumentStage';

// Import the ActionItem type
interface ActionItem {
  id: string;
  title: string;
  description: string;
  type: 'warning' | 'error' | 'success' | 'info' | 'pending';
  link?: string;
}

// Define workflow stages
type WorkflowStage = 'documents' | 'analysis' | 'estimation' | 'review';

interface ProjectProcessingHubProps {
  projectId: string;
  initialStage?: WorkflowStage;
  children?: React.ReactNode;
}

interface StageInfo {
  id: WorkflowStage;
  name: string;
  icon: React.ElementType;
  status: 'not-started' | 'in-progress' | 'completed';
  progress: number;
}

/**
 * ProjectProcessingHub
 * 
 * This component represents the individual project workspace described in Chapter 4
 * of the UX/UI documentation. It maintains project context while loading different
 * stage components (Documents, Analysis, Estimation, Review) in its content area.
 * 
 * It differs from the MainDashboard (Chapter 3) which is the landing page showing all projects.
 */
export function ProjectProcessingHub({ 
  projectId, 
  initialStage = 'documents', 
  children 
}: ProjectProcessingHubProps) {
  const [currentStage, setCurrentStage] = useState<WorkflowStage>(initialStage);
  const [sidePanelCollapsed, setSidePanelCollapsed] = useState(false);
  
  // Mock project data - in a real app, this would be fetched based on projectId
  const projectData = {
    id: projectId,
    title: "Kitchen Renovation Project",
    client: "Smith Residence",
    dueDate: "June 15, 2025",
    progress: 30,
    status: {
      type: "processing" as const,
      label: "In Progress",
    },
    lastSync: '2025-03-04T09:30:00',
    inSync: true,
  };

  // Stage navigation
  const stages: StageInfo[] = [
    { id: 'documents', name: 'Documents', icon: FileInput, status: 'completed', progress: 100 },
    { id: 'analysis', name: 'Analysis', icon: FileSearch, status: 'in-progress', progress: 60 },
    { id: 'estimation', name: 'Estimation', icon: Calculator, status: 'not-started', progress: 0 },
    { id: 'review', name: 'Review', icon: CheckSquare, status: 'not-started', progress: 0 },
  ];

  // Side panel data
  const sidePanelMetrics = [
    { label: 'Total Items', value: '36', highlight: false },
    { label: 'Estimated Cost', value: '$24,850', highlight: true },
    { label: 'Completion', value: '30%', highlight: false },
    { label: 'Time Remaining', value: '45 days', highlight: false },
  ];

  // Action items based on current stage
  const stageActionItems: Record<WorkflowStage, ActionItem[]> = {
    documents: [
      {
        id: 'doc-1',
        title: 'Missing floor plans',
        description: 'Request additional floor plans from client',
        type: 'warning',
      },
      {
        id: 'doc-2',
        title: 'Documents processed',
        description: 'All uploaded documents have been processed',
        type: 'success',
      },
    ],
    analysis: [
      {
        id: 'analysis-1',
        title: 'Cabinet dimensions need verification',
        description: 'Check supplier specifications before final estimation',
        type: 'warning',
      },
      {
        id: 'analysis-2',
        title: 'Price Request Sent',
        description: 'Awaiting custom countertop pricing from supplier',
        type: 'pending',
      },
    ],
    estimation: [
      {
        id: 'est-1',
        title: 'Material costs updated',
        description: 'Latest supplier prices have been applied',
        type: 'success',
      },
      {
        id: 'est-2',
        title: 'Labor estimate pending',
        description: 'Waiting for confirmation from installation team',
        type: 'pending',
      },
    ],
    review: [
      {
        id: 'review-1',
        title: 'Client approval required',
        description: 'Final quote ready for client review',
        type: 'info',
      },
      {
        id: 'review-2',
        title: 'Schedule installation',
        description: 'Coordinate with installation team once approved',
        type: 'pending',
      },
    ],
  };

  // Function to advance to next stage
  const advanceToNextStage = () => {
    switch (currentStage) {
      case 'documents':
        setCurrentStage('analysis');
        break;
      case 'analysis':
        setCurrentStage('estimation');
        break;
      case 'estimation':
        setCurrentStage('review');
        break;
      case 'review':
        // Handle completion or stay in review
        break;
    }
  };

  // Function to check if a stage is accessible
  const isStageAccessible = (stageId: WorkflowStage): boolean => {
    const currentIndex = stages.findIndex(s => s.id === currentStage);
    const targetIndex = stages.findIndex(s => s.id === stageId);
    
    // Can always access current or completed stages
    return targetIndex <= currentIndex || stages[targetIndex].status !== 'not-started';
  };

  // Function to handle stage click
  const handleStageClick = (stageId: WorkflowStage) => {
    if (isStageAccessible(stageId)) {
      setCurrentStage(stageId);
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
  
  // Format time
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  // Get stage-specific metrics based on current stage
  const getStageMetrics = () => {
    switch (currentStage) {
      case 'documents':
        return [
          { label: 'Processed Documents', value: '12', highlight: false },
          { label: 'Pending Documents', value: '0', highlight: false },
          { label: 'Total Pages', value: '36', highlight: false },
        ];
      case 'analysis':
        return [
          { label: 'Validated Items', value: '24', highlight: false },
          { label: 'Pending Issues', value: '3', highlight: true },
          { label: 'RFIs Sent', value: '1', highlight: false },
        ];
      case 'estimation':
        return [
          { label: 'Material Cost', value: '$18,450', highlight: false },
          { label: 'Labor Cost', value: '$6,400', highlight: false },
          { label: 'Total Estimate', value: '$24,850', highlight: true },
        ];
      case 'review':
        return [
          { label: 'Items Reviewed', value: '36/36', highlight: false },
          { label: 'Issues Resolved', value: '3/3', highlight: false },
          { label: 'Final Quote', value: '$24,850', highlight: true },
        ];
      default:
        return sidePanelMetrics;
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Project Header */}
      <ProjectHeader 
        title={projectData.title}
        client={projectData.client}
        dueDate={projectData.dueDate}
        progress={projectData.progress}
        status={projectData.status}
      />
      
      {/* Stage Navigation */}
      <div className="h-14 bg-gray-50 border-b border-gray-200">
        <div className="h-full max-w-7xl mx-auto flex">
          {stages.map((stage) => {
            const StageIcon = stage.icon;
            const isActive = currentStage === stage.id;
            const isAccessible = isStageAccessible(stage.id);
            
            return (
              <button
                key={stage.id}
                onClick={() => handleStageClick(stage.id)}
                disabled={!isAccessible}
                className={cn(
                  "flex-1 flex items-center justify-center relative",
                  isActive 
                    ? "text-blue-600 bg-white border-b-2 border-blue-600" 
                    : !isAccessible
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-600 hover:bg-gray-100"
                )}
              >
                <StageIcon className={cn("h-5 w-5 mr-2", isActive ? "text-blue-600" : "")} />
                <span className="font-medium">{stage.name}</span>
                
                {stage.status === 'completed' && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Main Content Area with Side Panel */}
      <div className="flex flex-1 w-full overflow-hidden">
        {/* Main Content - flex-grow-1 ensures it takes all available space */}
        <div className="flex-1 flex-grow overflow-auto bg-white p-6 w-full">
          {children ? (
            children
          ) : (
            <>
              {currentStage === 'documents' && (
                <DocumentStage 
                  projectId={projectId}
                  onComplete={advanceToNextStage}
                />
              )}
              
              {currentStage === 'analysis' && (
                <AnalysisStage 
                  projectId={projectId}
                  onComplete={advanceToNextStage}
                />
              )}
              
              {currentStage === 'estimation' && (
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Estimation Panel</h2>
                  <p className="text-gray-600 mb-6">
                    Review cost estimates based on analyzed data. Adjust quantities and pricing as needed.
                  </p>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-blue-800 mb-6">
                    This is a placeholder for the Estimation Panel component.
                  </div>
                  <button 
                    onClick={advanceToNextStage}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                  >
                    Proceed to Review
                  </button>
                </div>
              )}
              
              {currentStage === 'review' && (
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Review & Approval</h2>
                  <p className="text-gray-600 mb-6">
                    Review the final quote and project details before submission.
                  </p>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-blue-800 mb-6">
                    This is a placeholder for the Review & Approval component.
                  </div>
                  <button 
                    onClick={advanceToNextStage}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                    disabled={true}
                  >
                    Finalize Project
                  </button>
                </div>
              )}
            </>
          )}
        </div>
        
        {/* Side Panel - Using the existing SidePanel component */}
        <aside 
          className={cn(
            "bg-gray-50 border-l border-gray-200 flex flex-col transition-all duration-300",
            sidePanelCollapsed ? "w-12" : "w-72"
          )}
        >
          <div className="flex justify-start p-2">
            <button 
              onClick={() => setSidePanelCollapsed(!sidePanelCollapsed)}
              className="p-1 rounded-md hover:bg-gray-200 text-gray-500"
            >
              {sidePanelCollapsed ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>
          </div>
          
          {!sidePanelCollapsed && (
            <div className="flex-1 overflow-auto">
              {/* Project Summary */}
              <div className="px-4 py-3 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-800 mb-2">Project Summary</h3>
                <div className="text-sm text-gray-600">
                  <p className="mb-1">ID: {projectData.id}</p>
                  <p className="mb-1">Client: {projectData.client}</p>
                  <p className="mb-1">Due: {projectData.dueDate}</p>
                </div>
              </div>
              
              {/* Key Metrics */}
              <div className="px-4 py-3 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-800 mb-2">Key Metrics</h3>
                <div className="grid grid-cols-1 gap-2">
                  {getStageMetrics().map((metric, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-600">{metric.label}:</span>
                      <span className={cn(
                        "font-medium",
                        metric.highlight ? "text-blue-600" : "text-gray-800"
                      )}>
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Action Items */}
              <div className="px-4 py-3 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-800 mb-2">Action Items</h3>
                <div className="space-y-2">
                  {stageActionItems[currentStage]?.map(item => {
                    const getActionItemStyles = () => {
                      switch (item.type) {
                        case 'warning':
                          return { 
                            icon: <AlertTriangle className="h-4 w-4" />, 
                            colorClass: 'text-amber-600 bg-amber-50 border-amber-200'
                          };
                        case 'error':
                          return { 
                            icon: <AlertTriangle className="h-4 w-4" />, 
                            colorClass: 'text-red-600 bg-red-50 border-red-200'
                          };
                        case 'success':
                          return { 
                            icon: <CheckCircle className="h-4 w-4" />, 
                            colorClass: 'text-green-600 bg-green-50 border-green-200'
                          };
                        case 'pending':
                          return { 
                            icon: <Clock className="h-4 w-4" />, 
                            colorClass: 'text-blue-600 bg-blue-50 border-blue-200'
                          };
                        case 'info':
                        default:
                          return { 
                            icon: <AlertTriangle className="h-4 w-4" />, 
                            colorClass: 'text-blue-600 bg-blue-50 border-blue-200'
                          };
                      }
                    };
                    
                    const { icon, colorClass } = getActionItemStyles();
                    
                    return (
                      <div 
                        key={item.id}
                        className={cn(
                          "rounded-md border p-2 text-xs",
                          colorClass
                        )}
                      >
                        <div className="flex items-start">
                          <div className="mt-0.5 mr-1.5 flex-shrink-0">
                            {icon}
                          </div>
                          <div>
                            <div className="font-medium">{item.title}</div>
                            <div className="mt-1">{item.description}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Trave Integration */}
              <div className="px-4 py-3 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-800 mb-2">Trave Integration</h3>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 rounded-full mr-2 bg-green-500"></div>
                    <span className="text-gray-600">
                      In sync with Trave
                    </span>
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    Last sync: {formatDate(projectData.lastSync)} at {formatTime(projectData.lastSync)}
                  </div>
                  
                  <div className="flex space-x-2 mt-2">
                    <button className="text-xs text-blue-600 flex items-center hover:text-blue-800">
                      <RefreshCw className="h-3 w-3 mr-1" />
                      Sync Now
                    </button>
                    
                    <button className="text-xs text-blue-600 flex items-center hover:text-blue-800">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      View in Trave
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Quick Navigation */}
              <div className="px-4 py-3">
                <h3 className="text-sm font-semibold text-gray-800 mb-2">Quick Navigation</h3>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>
                    <button className="w-full text-left hover:text-blue-600 flex items-center">
                      <Layers className="h-4 w-4 mr-2" />
                      <span>Related Documents</span>
                    </button>
                  </li>
                  <li>
                    <button className="w-full text-left hover:text-blue-600 flex items-center">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      <span>Specification Issues</span>
                    </button>
                  </li>
                  <li>
                    <button className="w-full text-left hover:text-blue-600 flex items-center">
                      <HelpCircle className="h-4 w-4 mr-2" />
                      <span>Help & Resources</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
