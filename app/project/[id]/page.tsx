import { ProjectProcessingHub } from "../../../components/project/ProjectProcessingHub";

interface ProjectPageProps {
  params: {
    id: string;
  };
}

/**
 * Project Route
 * 
 * This route handles individual project workflow as described in Chapter 4
 * of the UX/UI documentation. It renders the ProjectProcessingHub component
 * which provides the workspace for working on a specific project.
 * 
 * This is separate from the Dashboard (Chapter 3) which shows all projects.
 */
export default function ProjectPage({ params }: ProjectPageProps) {
  return (
    <ProjectProcessingHub 
      projectId={params.id}
      initialStage="documents"
    />
  );
}
