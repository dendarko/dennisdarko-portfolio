export type ProjectCategory =
  | "Python"
  | "Data Science"
  | "Machine Learning"
  | "MLOps"
  | "LLMOps/RAG"
  | "Evaluation"
  | "Analytics";

export type ProjectStage =
  | "Python"
  | "Data Science"
  | "Machine Learning"
  | "ML Engineering"
  | "MLOps"
  | "LLMOps";

export type ProofChip = "Docker" | "CI" | "Tests" | "Monitoring" | "API" | "Infra";
export type StackChipCategory =
  | "Backend"
  | "Frontend"
  | "Infra"
  | "ML"
  | "LLM"
  | "Data"
  | "Observability"
  | "DevOps";

export interface ProjectStackItem {
  name: string;
  category: StackChipCategory;
}

export interface ProjectMetrics {
  latencyMs?: number;
  costPer1kTokensUsd?: number;
  accuracyOrScore?: string;
  evalNotes?: string;
}

interface ProjectRecordBase {
  slug: string;
  title: string;
  stage: ProjectStage;
  featured: boolean;
  date: string;
  impact: string;
  tags: string[];
  proof: ProofChip[];
  highlights?: string[];
  stack?: ProjectStackItem[];
  metrics?: ProjectMetrics;
  nextImprovements?: string;
  demoUrl?: string;
  recruiterNotes?: string;
  caseStudy: boolean;
  architectureImage?: string;
  categories: ProjectCategory[];
  relevanceScore: number;
}

export interface ProjectRecordSource extends ProjectRecordBase {
  repo?: string;
  repoPath?: string;
  externalUrl?: string;
}

export interface ProjectRecord extends ProjectRecordSource {
  githubUrl?: string;
  projectUrl: string;
}

export interface MdxFrontmatter {
  title: string;
  description: string;
  date: string;
  updated?: string;
  tags?: string[];
  featured?: boolean;
}

export interface ProjectCaseStudyFrontmatter extends MdxFrontmatter {
  slug: string;
  stack: string[];
  problem: string;
  built: string;
  architectureImage?: string;
  links?: {
    github?: string;
    demo?: string;
    docs?: string;
  };
}

export interface PlaybookFrontmatter extends MdxFrontmatter {
  slug: string;
  checklistLength: number;
  audience: string;
}

export interface MdxDocument<TFrontmatter extends MdxFrontmatter> {
  slug: string;
  frontmatter: TFrontmatter;
  content: string;
}

export interface ArchitectureGalleryItem {
  src: string;
  caption: string;
  projectSlug?: string;
  projectTitle?: string;
}
