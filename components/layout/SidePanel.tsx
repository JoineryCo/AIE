"use client";

import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import { ChevronRight, ChevronLeft, AlertCircle, CheckCircle, Clock } from 'lucide-react';

interface ActionItem {
  id: string;
  title: string;
  description: string;
  type: 'warning' | 'error' | 'success' | 'info' | 'pending';
  link?: string;
}

interface SidePanelProps {
  projectName: string;
  stage: 'documents' | 'analysis' | 'estimation' | 'review';
  metrics: {
    label: string;
    value: string;
    highlight?: boolean;
  }[];
  actionItems: ActionItem[];
}

export function SidePanel({ projectName, stage, metrics, actionItems }: SidePanelProps) {
  const [collapsed, setCollapsed] = useState(false);

  // Get the appropriate metrics and title based on the stage
  const getStageName = (stage: string) => {
    switch (stage) {
      case 'documents': return 'Document Management';
      case 'analysis': return 'Analysis Dashboard';
      case 'estimation': return 'Estimation Summary';
      case 'review': return 'Review Status';
      default: return '';
    }
  };

  // Map action item type to icon and color
  const getActionItemStyles = (type: ActionItem['type']) => {
    switch (type) {
      case 'warning':
        return { 
          icon: <AlertCircle size={16} />, 
          colorClass: 'text-status-clarification-text bg-status-clarification-bg border-status-clarification-border'
        };
      case 'error':
        return { 
          icon: <AlertCircle size={16} />, 
          colorClass: 'text-status-error-text bg-status-error-bg border-status-error-border'
        };
      case 'success':
        return { 
          icon: <CheckCircle size={16} />, 
          colorClass: 'text-status-completed-text bg-status-completed-bg border-status-completed-border'
        };
      case 'pending':
        return { 
          icon: <Clock size={16} />, 
          colorClass: 'text-status-pending-text bg-status-pending-bg border-status-pending-border'
        };
      case 'info':
      default:
        return { 
          icon: <AlertCircle size={16} />, 
          colorClass: 'text-status-processing-text bg-status-processing-bg border-status-processing-border'
        };
    }
  };

  return (
    <div 
      className={cn(
        "h-full border-l border-gray-200 bg-gray-50 flex flex-col transition-all duration-300 flex-shrink-0",
        collapsed ? "w-12 min-w-[3rem]" : "w-[280px] min-w-[280px]"
      )}
    >
      {/* Toggle Button */}
      <button 
        className="absolute -right-3 top-32 bg-white border border-gray-200 rounded-full p-1.5 shadow-sm z-10 hover:bg-gray-50"
        onClick={() => setCollapsed(!collapsed)}
        title={collapsed ? "Expand" : "Collapse"}
      >
        {collapsed ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
      </button>

      {collapsed ? (
        // Collapsed View (Just icons)
        <div className="flex flex-col items-center pt-4 space-y-6">
          <div className="rounded-full h-8 w-8 bg-primary text-white flex items-center justify-center">
            {projectName.charAt(0)}
          </div>
          <div className="h-8 w-8 flex items-center justify-center text-gray-600">
            <AlertCircle size={20} />
          </div>
        </div>
      ) : (
        // Expanded View
        <div className="flex flex-col h-full">
          {/* Panel Header */}
          <div className="px-4 py-3 border-b border-gray-200">
            <h2 className="text-h5 font-medium text-gray-800">{getStageName(stage)}</h2>
            <p className="text-body-sm text-gray-500">{projectName}</p>
          </div>

          {/* Panel Content - scrollable */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Metrics Section */}
            <div>
              <h3 className="text-body font-medium text-gray-700 mb-3">Key Metrics</h3>
              <div className="space-y-2">
                {metrics.map((metric, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-body-sm text-gray-600">{metric.label}</span>
                    <span className={cn(
                      "text-body-sm font-medium",
                      metric.highlight ? "text-primary" : "text-gray-800"
                    )}>
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Items */}
            <div>
              <h3 className="text-body font-medium text-gray-700 mb-3">Action Items</h3>
              <div className="space-y-3">
                {actionItems.map((item) => {
                  const { icon, colorClass } = getActionItemStyles(item.type);
                  return (
                    <div 
                      key={item.id} 
                      className={cn(
                        "p-3 rounded-md border",
                        colorClass
                      )}
                    >
                      <div className="flex items-start">
                        <span className="mr-2 mt-0.5">{icon}</span>
                        <div>
                          <h4 className="text-body font-medium">{item.title}</h4>
                          <p className="text-body-sm mt-1">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom actions */}
          <div className="px-4 py-3 border-t border-gray-200 bg-white">
            <button className="w-full py-2 px-4 bg-primary hover:bg-primary-hover text-white rounded-md text-button">
              Continue to {stage === 'documents' ? 'Analysis' : 
                           stage === 'analysis' ? 'Estimation' : 
                           stage === 'estimation' ? 'Review' : 'Finalize'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
