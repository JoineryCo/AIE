"use client";

import React from 'react';
import { Sidebar } from '../../../components/layout/Sidebar';

interface ProjectLayoutProps {
  children: React.ReactNode;
}

/**
 * Project Layout
 * 
 * This layout is used for all project pages to ensure they have consistent structure.
 * It includes the sidebar but differs from the dashboard layout in that it doesn't
 * include a side panel directly - the ProjectProcessingHub component will handle that.
 */
export default function ProjectLayout({ children }: ProjectLayoutProps) {
  return (
    <div className="h-screen w-full flex flex-col">
      {/* Main layout area */}
      <div className="flex flex-1 w-full overflow-hidden">
        {/* Include the Sidebar in the layout */}
        <Sidebar />
        
        {/* Main content area - children will be the ProjectProcessingHub */}
        <div className="flex-1 w-full overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
