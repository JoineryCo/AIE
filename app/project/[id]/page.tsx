import { ProjectProcessingHub } from "../../../components/project/ProjectProcessingHub";
import type { Metadata } from 'next';

interface ProjectPageProps {
  params: {
    id: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}

// You can also add this for better metadata handling
export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  return {
    title: `Project ${params.id}`,
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  return (
    <ProjectProcessingHub 
      projectId={params.id}
      initialStage="documents"
    />
  );
}