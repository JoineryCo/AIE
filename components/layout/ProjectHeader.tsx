"use client";

import React from 'react';
import { cn } from '../../lib/utils';
import { Save, Download, Settings } from 'lucide-react';

type ProjectStatus = 'pending' | 'processing' | 'completed' | 'error' | 'discarded' | 'clarification';

interface ProjectHeaderProps {
  title: string;
  client: string;
  dueDate: string;
  progress: number; // 0-100
  status: {
    type: ProjectStatus;
    label: string;
  };
}

export function ProjectHeader({ title, client, dueDate, progress, status }: ProjectHeaderProps) {
  // Calculate progress width
  const progressWidth = `${progress}%`;

  // Map status type to color classes
  const statusColors: Record<ProjectStatus, string> = {
    pending: 'bg-status-pending text-status-pending-text',
    processing: 'bg-status-processing text-status-processing-text',
    completed: 'bg-status-completed text-status-completed-text',
    error: 'bg-status-error text-status-error-text',
    discarded: 'bg-status-discarded text-status-discarded-text',
    clarification: 'bg-status-clarification text-status-clarification-text',
  };

  return (
    <div className="h-20 bg-white border-b border-gray-200 px-6 flex flex-col justify-center">
      <div className="flex items-center justify-between">
        {/* Project Info */}
        <div className="flex-1">
          <h1 className="text-h2 text-gray-800 font-semibold">{title}</h1>
          <div className="flex items-center text-body text-gray-500 mt-1">
            <span>{client}</span>
            <span className="mx-2">•</span>
            <span>Due: {dueDate}</span>
          </div>
        </div>

        {/* Status Indicator */}
        <div className={cn(
          "px-3 py-1 rounded-pill text-button",
          statusColors[status.type]
        )}>
          {status.label}
        </div>

        {/* Action Buttons */}
        <div className="flex ml-4 space-x-2">
          <button className="p-2 rounded-md hover:bg-gray-100 text-gray-600">
            <Save size={20} />
          </button>
          <button className="p-2 rounded-md hover:bg-gray-100 text-gray-600">
            <Download size={20} />
          </button>
          <button className="p-2 rounded-md hover:bg-gray-100 text-gray-600">
            <Settings size={20} />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-2 bg-gray-100 rounded mt-3 overflow-hidden">
        <div 
          className="h-full bg-primary"
          style={{ width: progressWidth }}
        />
      </div>
    </div>
  );
}
