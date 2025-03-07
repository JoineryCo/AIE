import { DashboardPage } from "../../components/dashboard/DashboardPage";

/**
 * Dashboard Route
 * 
 * This is the route component that renders the MainDashboard component 
 * (via the DashboardPage wrapper). According to the application architecture:
 * 
 * 1. MainDashboard is the AI Estimator landing page (Chapter 3)
 *    - Shows all projects in the system
 *    - Displays system-wide metrics
 *    - Entry point for creating new projects
 * 
 * 2. ProjectProcessingHub is a separate component (Chapter 4)
 *    - For individual project workflow
 *    - Will be implemented in another route
 */
export default function DashboardRoute() {
  return <DashboardPage />;
}
