import { redirect } from "next/navigation";

/**
 * Root Page
 * 
 * This page redirects to the dashboard, which is the main entry point
 * for the application according to our architecture (Chapter 3).
 * 
 * The dashboard is the AI Estimator landing page that shows all projects
 * in the system and provides access to create new projects.
 */
export default function Home() {
  redirect('/dashboard');
}
