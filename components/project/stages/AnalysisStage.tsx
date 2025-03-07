"use client";

import { AnalysisStage as ModularAnalysisStage } from './analysis/AnalysisStage';

interface AnalysisStageProps {
  projectId: string;
  onComplete: () => void;
}

/**
 * AnalysisStage
 * 
 * Wrapper component that uses the modular implementation of the Analysis stage.
 */
export function AnalysisStage({ projectId, onComplete }: AnalysisStageProps) {
  return (
    <ModularAnalysisStage 
      projectId={projectId}
      onComplete={onComplete}
    />
  );
}

export default AnalysisStage;
