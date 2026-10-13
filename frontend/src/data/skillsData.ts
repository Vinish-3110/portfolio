export interface SkillItem {
  name: string;
  level: string;
  focus: string;
  category: "frontend" | "backend" | "database" | "devops";
}

export const skillsCategories = [
  { id: "all", label: "All Stack" },
  { id: "frontend", label: "Frontend Architecture" },
  { id: "backend", label: "Backend & Services" },
  { id: "database", label: "Data & Caching" },
  { id: "devops", label: "DevOps & Tooling" },
] as const;

export const skillsList: SkillItem[] = [
  // Frontend
  { name: "Next.js", level: "Advanced", focus: "App Router, Server Components, SSR/SSG, Optimization", category: "frontend" },
  { name: "React 18 / 19", level: "Advanced", focus: "Custom Hooks, Context, Suspense, Concurrent Mode", category: "frontend" },
  { name: "TypeScript", level: "Advanced", focus: "Strict Typing, Generics, Utility Types, Zod Schemas", category: "frontend" },
  { name: "JavaScript (ESNext)", level: "Advanced", focus: "Async/Await, Event Loop, DOM APIs, Canvas", category: "frontend" },
  { name: "Angular", level: "Intermediate", focus: "Components, Dependency Injection, RxJS Observables", category: "frontend" },
  { name: "Framer Motion", level: "Advanced", focus: "Spring Physics, Layout Animations, Gestures", category: "frontend" },
  { name: "Tailwind CSS", level: "Advanced", focus: "Design Systems, Responsive Layouts, Arbitrary Variants", category: "frontend" },
  { name: "Vanilla CSS & Modern Layouts", level: "Advanced", focus: "CSS Grid, Flexbox, Custom Properties, Fluid Clamp", category: "frontend" },

  // Backend
  { name: "Node.js", level: "Advanced", focus: "Event-driven runtime, Streams, Clustering, Buffer", category: "backend" },
  { name: "Express.js", level: "Advanced", focus: "RESTful architecture, Custom Middleware, Security", category: "backend" },
  { name: "Python", level: "Proficient", focus: "Async IO, Data Processing, Scripting, Automation", category: "backend" },
  { name: "FastAPI", level: "Proficient", focus: "Pydantic models, Async endpoints, Swagger docs", category: "backend" },
  { name: "Django", level: "Proficient", focus: "MTV architecture, ORM, Admin tooling, REST Framework", category: "backend" },
  { name: "RESTful API Design", level: "Advanced", focus: "Resource URI design, HTTP standards, Rate limiting", category: "backend" },
  { name: "Authentication & JWT", level: "Advanced", focus: "Token rotation, RBAC, OAuth, Secure cookies", category: "backend" },

  // Database
  { name: "PostgreSQL", level: "Proficient", focus: "Relational modeling, Indexing, Transactions, Joins", category: "database" },
  { name: "MongoDB", level: "Advanced", focus: "Aggregation pipeline, Schema design, Mongoose", category: "database" },
  { name: "Redis", level: "Proficient", focus: "In-memory caching, Pub/Sub, BullMQ job queues", category: "database" },
  { name: "Prisma ORM", level: "Proficient", focus: "Type-safe migrations, Schema relations, Client generation", category: "database" },

  // DevOps & Tools
  { name: "Docker", level: "Proficient", focus: "Multi-stage builds, Containerization, Docker Compose", category: "devops" },
  { name: "Git & GitHub", level: "Advanced", focus: "Branching strategies, Rebase, PR reviews, Actions", category: "devops" },
  { name: "CI / CD Pipelines", level: "Proficient", focus: "Automated linting, Test suites, Cloud deployments", category: "devops" },
  { name: "AWS S3", level: "Proficient", focus: "Presigned upload URLs, Asset storage, IAM access", category: "devops" },
  { name: "Vercel / Cloud Platforms", level: "Advanced", focus: "Edge middleware, DNS configuration, Deploy previews", category: "devops" }
];

export const marqueeTechs = [
  "Next.js 16",
  "React 19",
  "TypeScript",
  "Node.js",
  "Python",
  "FastAPI",
  "Django",
  "Angular",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "Docker",
  "Framer Motion",
  "Tailwind CSS",
  "REST APIs",
  "Prisma ORM"
];
