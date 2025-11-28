export interface WorkflowTool {
  name: string;
  id: string;
  desc: string;
}

export interface WorkflowStep {
  title: string;
  id: string;
  agent: string;
  agentId: string;
  foreach?: string;
  tools: WorkflowTool[];
  input: string;
  output: string;
}

export interface WorkflowMeta {
  title: string;
  workflowId: string;
  input: string;
}

export interface WorkflowData {
  meta: WorkflowMeta;
  steps: WorkflowStep[];
}
