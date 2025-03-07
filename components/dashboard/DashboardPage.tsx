"use client";

import React from 'react';
import { MainDashboard } from './MainDashboard';

/**
 * DashboardContainer
 * 
 * This is a simple wrapper component for the MainDashboard.
 * It serves as a container for the dashboard page route.
 * 
 * According to the architecture:
 * - MainDashboard is the AI Estimator landing page (Chapter 3)
 * - ProjectProcessingHub will be the workspace for individual projects (Chapter 4)
 */
export function DashboardPage() {
  return (
    <div className="flex h-full w-full overflow-hidden">
      <div className="flex-1 w-full overflow-auto">
        <MainDashboard />
      </div>
    </div>
  );
}
