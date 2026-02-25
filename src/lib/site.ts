const identityLinks = {
  github: "https://github.com/dendarko",
  linkedin: "https://www.linkedin.com/in/dennis-darko/"
} as const;

export const siteConfig = {
  name: "Dennis Darko",
  headline: "AI Engineer | LLMOps | MLOps | Educator",
  description:
    "AI Engineer specializing in production LLM systems, RAG architectures, evaluation frameworks, and ML platform engineering. I design, deploy, and monitor scalable AI systems with strong observability, guardrails, and cost optimization. I also teach Python, machine learning, and AI engineering.",
  url: "https://dennisdarko.darkolab.com",
  email: "dennisdarko0909@gmail.com",
  location: "Canada",
  links: identityLinks,
  keywords: [
    "AI Engineer",
    "LLMOps Engineer",
    "MLOps Engineer",
    "Machine Learning Engineer",
    "RAG systems",
    "Retrieval-Augmented Generation",
    "LLM evaluation",
    "LLM observability",
    "Prompt engineering",
    "LLM guardrails",
    "Model monitoring",
    "FastAPI",
    "Python backend",
    "Vector databases",
    "Kubernetes",
    "Docker",
    "CI/CD for ML",
    "Production AI systems",
    "Generative AI engineering",
    "AI infrastructure",
    "ML platform engineering",
    "Technical AI educator"
  ],
  shortName: "Dennis Darko",
  title: "Dennis Darko | AI Engineer | LLMOps | MLOps | Educator",
  social: {
    ...identityLinks,
    x: "https://x.com/dendarko"
  },
  nav: [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/teaching", label: "Teaching" },
    { href: "/playbooks", label: "Playbooks" },
    { href: "/architecture", label: "Architecture" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/resume", label: "Resume" }
  ] as const,
  recruiterQuickLinks: [
    { href: "/projects", label: "Case Studies" },
    { href: "/resume", label: "Resume" },
    { href: "/contact", label: "Contact" },
    { href: "/recruiter", label: "Recruiter Snapshot" }
  ] as const,
  roles: ["Senior AI Engineer", "ML Platform Engineer", "LLMOps Engineer", "Technical Educator"],
  recruiterSkillSnapshot: [
    "RAG systems",
    "LLM evaluation",
    "FastAPI",
    "Python",
    "Docker",
    "CI/CD",
    "Observability",
    "Kubernetes"
  ],
  capabilityChips: ["Docker", "CI", "Tests", "Monitoring", "API", "Infra", "Prompt Safety", "Evaluation"],
  homePillars: [
    {
      title: "Retrieval & Data",
      description: "Grounded pipelines, indexing strategies, chunking tradeoffs, and fresh data sync patterns."
    },
    {
      title: "Evaluation & Regression Testing",
      description: "Task-level scorecards, golden sets, failure triage, and release gates for prompt/model changes."
    },
    {
      title: "Guardrails & Safety",
      description: "Prompt injection defenses, policy checks, content filtering, and abuse-aware request handling."
    },
    {
      title: "Observability & Monitoring",
      description: "Tracing, token/cost telemetry, latency budgets, and production issue diagnosis."
    },
    {
      title: "Cost / Latency",
      description: "Model routing, batching/caching, async pipelines, and quality-to-cost optimization."
    },
    {
      title: "CI/CD & Deployment",
      description: "Static checks, test automation, artifact versioning, and reliable rollouts to cloud infra."
    }
  ],
  teachingTopics: [
    "Prompt engineering for production",
    "RAG architecture decisions",
    "LLM evaluation and QA",
    "MLOps fundamentals",
    "Python for AI systems",
    "Observability for AI products"
  ]
} as const;

export const journeyTimeline = [
  { phase: "Python", period: "Foundation", note: "Automation, APIs, testing discipline, and software craftsmanship." },
  { phase: "Data Science", period: "Analytics", note: "EDA, dashboards, forecasting, and business-focused modeling." },
  { phase: "ML Engineering", period: "Applied ML", note: "Model packaging, inference services, experiment tracking, and reproducibility." },
  { phase: "MLOps", period: "Platforms", note: "CI/CD, orchestration, observability, and production reliability at scale." },
  { phase: "LLMOps", period: "AI Systems", note: "RAG, evaluation frameworks, guardrails, and multi-service AI application architecture." }
] as const;
