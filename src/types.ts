export type AgentId =
  | 'director'
  | 'architect'
  | 'designer'
  | 'coder'
  | 'database'
  | 'security'
  | 'tester'
  | 'workflow'
  | 'memory';

export type ProjectPhase =
  | 'vision'
  | 'architecture'
  | 'design'
  | 'code'
  | 'database'
  | 'security'
  | 'testing'
  | 'documentation';

export interface AgentInfo {
  id: AgentId;
  name: string;
  role: string;
  badge: string;
  color: string;
  avatarBg: string;
  iconName: string;
  description: string;
  responsibilities: string[];
  capabilities: string[];
}

export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'failed';

export interface ProjectTask {
  id: string;
  agentId: AgentId;
  phase: ProjectPhase;
  title: string;
  description: string;
  status: TaskStatus;
  output?: string;
  timestamp?: string;
  durationMs?: number;
}

export interface CodeArtifact {
  filename: string;
  language: string;
  content: string;
  description: string;
}

export interface UIWireframe {
  title: string;
  htmlMockup: string; // Valid self-contained HTML/Tailwind for preview
  componentsList: string[];
}

export interface TestSuite {
  name: string;
  type: 'unit' | 'integration' | 'security' | 'e2e';
  code: string;
}

export interface ProjectMemory {
  keyDecisions: string[];
  architectureOverview: string;
  apiEndpoints: { method: string; path: string; description: string }[];
  databaseSchemaSql: string;
  securityPolicies: string[];
  codeArtifacts: CodeArtifact[];
  uiWireframes: UIWireframe[];
  testSuites: TestSuite[];
  masterReadme: string;
  logs: { timestamp: string; agentId: AgentId; event: string }[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | AgentId;
  message: string;
  timestamp: string;
  phase?: ProjectPhase;
  codeSnippet?: string;
}

export interface Project {
  id: string;
  title: string;
  ideaPrompt: string;
  description: string;
  targetAudience: string;
  techStack: {
    frontend: string;
    backend: string;
    database: string;
    auth: string;
    styling: string;
  };
  createdAt: string;
  updatedAt: string;
  progress: number; // 0 to 100
  currentPhase: ProjectPhase;
  tasks: ProjectTask[];
  memory: ProjectMemory;
  chatHistory: ChatMessage[];
}

export interface QuickTemplate {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  prompt: string;
  icon: string;
}
