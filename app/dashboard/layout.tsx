"use client";

import React from 'react';
import { MainLayout } from '../../components/layout/MainLayout';
import { Sidebar } from '../../components/layout/Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  // Pass empty sidePanelData and projectData since the DashboardPage component
  // will handle its own SidePanel and doesn't need MainLayout's default
  const emptyProjectData = {
    title: "AI Estimator Dashboard",
    client: "",
    dueDate: "",
    progress: 0,
    status: {
      type: "processing" as const,
      label: "Ready",
    }
  };

  // Empty side panel data since we'll use our custom SidePanel in the DashboardPage
  const emptySidePanelData = {
    projectName: "",
    metrics: [],
    actionItems: [],
  };

  return (
    // Use the full height and width of the viewport
    <div className="h-screen w-screen flex flex-col">
      {/* Custom layout for the dashboard that takes full height and width */}
      <div className="flex flex-1 w-full overflow-hidden">
        {/* Include the Sidebar in the layout */}
        <Sidebar />
        
        {/* Main content area - children will be the DashboardPage */}
        <div className="flex-1 w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
