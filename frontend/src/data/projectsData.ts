export interface ProjectCaseStudy {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  year: string;
  category: string;
  description?: string[];
  role: string;
  techs: string[];
  metrics: { label: string; value: string }[];
  problem: string;
  solution: string;
  architecture: string[];
  features: string[];
  impact: string[];
  links: {
    live?: string;
    github?: string;
    figma?: string;
  };
  image: string;
  featured: boolean;
}

export const curatedProjects: ProjectCaseStudy[] = [
  {
    id: "unified-ecosystem",
    title: "Unified Ecosystem",
    subtitle: "Enterprise Multi-Vertical Commerce, LMS, Jobs & Community Platform",
    tagline: "Consolidated full-stack digital ecosystem orchestrating commerce, education, talent acquisition, community networks, and gamification under unified SSO.",
    year: "2024 - 2025",
    category: "Full-Stack Enterprise Ecosystem",
    role: "Lead Full-Stack Architect",
    techs: ["Next.js 15", "React 19", "NestJS", "TypeScript", "PostgreSQL", "MongoDB", "Redis", "Stripe Elements", "Redux Toolkit", "Recharts", "Tailwind CSS"],
    metrics: [
      { label: "Lighthouse Performance", value: "98/100" },
      { label: "Integrated Verticals", value: "5 Ecosystems" },
      { label: "API Latency SLA", value: "< 28ms" }
    ],
    problem:
      "Modern multi-brand enterprises face severe operational fragmentation when operating distinct third-party platforms for e-commerce, student learning management (LMS), career job boards, community feeds, and customer engagement gamification—resulting in high subscription overhead, disparate databases, and disconnected user identities.",
    solution:
      "Architected a unified digital platform uniting all 5 verticals into a cohesive ecosystem. Built high-conversion consumer storefronts using Next.js App Router with React Server Components, a high-throughput NestJS microservices API with domain-driven design, and an executive Superadmin telemetry center featuring multi-tier RBAC and dynamic data visualizations.",
    architecture: [
      "Next.js App Router leveraging React Server Components for near-instant FCP and dynamic SEO indexing",
      "NestJS enterprise backend structured into isolated microservices with Redis BullMQ async task processing",
      "Single Sign-On (SSO) and unified user profile linking store orders, LMS certifications, and community karma",
      "Superadmin operational cockpit with 4-tier RBAC, live Recharts telemetry, and Monaco schema editors",
      "Stripe Elements multi-currency payment pipeline with automated webhook reconciliation"
    ],
    features: [
      "High-speed B2C E-Commerce storefront with real-time stock sync, faceted search, and animated cart drawer",
      "Study LMS module with video streaming, lesson milestone progress, and interactive quiz evaluations",
      "Job Board & Career Hub featuring candidate applicant tracking (ATS), resume parsing, and employer consoles",
      "Community discussion network with threaded comments, reactions, and automated content moderation",
      "Gamification engine with daily streaks, XP level progression, achievement badges, and rewards"
    ],
    impact: [
      "Eliminated 5 disparate vendor subscriptions by unifying business lines into 1 consolidated infrastructure",
      "Maintained 98/100 Google Lighthouse performance score despite rich interactive cross-platform feature sets",
      "Empowered administrative operations with instant real-time telemetry across revenue, course, and job metrics"
    ],
    links: {
      github: "https://github.com/Vinish-3110"
    },
    image: "/images/projects/omnisphere.jpg",
    featured: true
  },
  {
    id: "kinetix-pms",
    title: "Kinetix PMS",
    subtitle: "High-Velocity Agile Project Management & Gantt Planning Monorepo",
    tagline: "Modern Linear & Jira-grade project workspace engineered with dynamic Gantt scaling, double-precision float board sorting, and GenAI velocity analysis.",
    year: "2024 - 2025",
    category: "Enterprise SaaS / Monorepo",
    role: "Lead Frontend & Full-Stack Engineer",
    techs: ["Next.js 15", "React 19", "Redux Toolkit", "DnD Kit", "Node.js", "Express", "Sequelize ORM", "PostgreSQL", "Recharts", "Google GenAI", "Tailwind CSS"],
    metrics: [
      { label: "Gantt Scaling Engine", value: "Dynamic Math" },
      { label: "Board Reordering", value: "Double-Float Rank" },
      { label: "Audit Parity Score", value: "8.8 / 10" }
    ],
    problem:
      "Enterprise agile teams often grapple with sluggish issue trackers that lag during large backlog triage, lack fluid drag-and-drop Gantt timeline resizing, and drop incomplete sprint tasks into state voids rather than rolling them back to the active backlog.",
    solution:
      "Engineered a high-performance PMS monorepo combining a Next.js 15 frontend, an Express/Sequelize API, and a PostgreSQL database. Built a mathematically precise Gantt timeline engine with dynamic calendar cell scaling and date-bound drag resizing, implemented Lexorank-style double-precision float ranking for collision-free board ordering, and built automated sprint completion state machines.",
    architecture: [
      "Monorepo architecture cleanly isolating Next.js frontend, Express/Sequelize backend, and mobile client",
      "Double-precision float ranking (rank: DataTypes.DOUBLE) for O(1) infinite board drag-and-drop sorting",
      "Sequelize transactional integrity managing state transitions across planned, active, and completed sprints",
      "Intelligent storage service providing seamless AWS S3 uploads with zero-crash local filesystem fallback",
      "Redux Toolkit + React Query caching layer with conditional hasData guards preventing duplicate dispatches"
    ],
    features: [
      "Dynamic interactive Gantt timeline with date-bound dragging, milestone markers, and Epic progress pills",
      "Scrum and Kanban boards with deep URL search parameter filtering (?q=term) and smooth drag animations",
      "Automated sprint planning engine with seamless incomplete-issue rollover to the backlog stream",
      "Integrated Google GenAI (Genkit) module for automated sprint retrospectives and ticket summarization",
      "Visual burndown and team velocity telemetry graphs powered by Recharts"
    ],
    impact: [
      "Achieved sub-100ms board interaction response times with zero UI jank across 1,000+ backlog issues",
      "Passed comprehensive 20-vector product maturity audit with an 8.8/10 architecture rating",
      "Eliminated full-table database locking during ticket re-ordering via double-float calculations"
    ],
    links: {
      github: "https://github.com/Vinish-3110"
    },
    image: "/images/projects/kinetix.jpg",
    featured: true
  },
  {
    id: "flight-booking-engine",
    title: "Flight Booking Engine",
    subtitle: "Commercial Airline Reservation & Fleet Operations Platform",
    tagline: "Mission-critical flight reservation ecosystem featuring interactive aircraft seat maps, distributed concurrency locking, and fleet dispatch admin.",
    year: "2024",
    category: "Full-Stack Commercial Platform",
    role: "Full-Stack Software Engineer",
    techs: ["Next.js 15", "React 19", "Node.js", "Express", "PostgreSQL", "Redis", "Stripe", "PDFKit", "Tailwind CSS", "Docker"],
    metrics: [
      { label: "Seat Concurrency", value: "0 Collisions" },
      { label: "Matrix Search", value: "< 180ms" },
      { label: "Ticket Delivery", value: "Automated PDF" }
    ],
    problem:
      "Airline ticketing systems face catastrophic race conditions during fare sales when thousands of concurrent travelers attempt to select and purchase the exact same aircraft seat, while airline operations lack dynamic route pricing and real-time passenger manifest tools.",
    solution:
      "Developed a comprehensive full-stack airline reservation system featuring a customer booking portal (Next.js), an airline fleet administration console, and a Node.js REST API. Architected a distributed Redis mutex locking engine that secures seat reservations during the 10-minute checkout window, integrated Stripe Elements for payment processing, and created an automated QR-coded PDF boarding pass generator.",
    architecture: [
      "Three-tier architecture: Next.js Passenger App, Next.js Fleet Admin Console, and Node.js REST Engine",
      "Distributed Redis seat locking mechanism ensuring atomic seat allocation and automatic expiration",
      "Relational schema modeling aircraft cabin configurations, multi-leg flights, fares, and passenger manifests",
      "Event-driven PDF generation pipeline using PDFKit generating scannable boarding passes upon payment webhook"
    ],
    features: [
      "Interactive SVG aircraft cabin layout supporting real-time seat availability across Economy, Business, and First Class",
      "Multi-city and round-trip flight search matrix with dynamic date-range pricing and layover filters",
      "Dedicated Fleet Operations Admin portal for schedule management, route creation, and live manifest inspection",
      "Instant downloadable digital boarding pass with embedded scannable QR code and gate details",
      "Automated email notifications and SMS flight status alerts"
    ],
    impact: [
      "Guaranteed 100% seat concurrency integrity with zero double-bookings under peak traffic simulations",
      "Reduced complex multi-leg flight search queries down to under 180ms",
      "Streamlined airline fleet operations with centralized flight dispatch and real-time manifest reporting"
    ],
    links: {
      github: "https://github.com/Vinish-3110"
    },
    image: "/images/projects/aerovoyage.jpg",
    featured: true
  },
  {
    id: "zoho-books-clone",
    title: "Zoho Books Clone (In Progress)",
    subtitle: "Multi-Tenant Cloud Accounting & Financial Operations SaaS",
    tagline: "Full-stack cloud accounting engine inspired by Zoho Books, engineered with multi-tenant architecture, double-entry ledger foundations, 2FA MFA, and modular NestJS microservices.",
    year: "2024 — Present",
    category: "Enterprise SaaS / Cloud Accounting",
    role: "Backend & NestJS Architect",
    techs: ["NestJS 11", "TypeScript", "MongoDB", "Mongoose", "Passport.js", "JWT", "TOTP 2FA", "Swagger OpenAPI", "Docker"],
    metrics: [
      { label: "Core Inspiration", value: "Zoho Books" },
      { label: "Development Status", value: "Under Progress" },
      { label: "Security & MFA", value: "TOTP / 2FA QR" }
    ],
    problem:
      "Small to mid-sized enterprises need reliable, multi-tenant accounting and invoicing platforms to manage accounts receivable, payable, cash flows, and automated tax reporting without exorbitant monthly per-seat licensing fees from closed platforms.",
    solution:
      "Architecting a comprehensive cloud accounting SaaS modeled after Zoho Books. Built with NestJS 11, MongoDB/Mongoose, and TypeScript, the platform features multi-tenant organization isolation, Google Authenticator TOTP 2FA, cryptographically signed 24h employee onboarding invitations, active multi-device session management, and interactive dark-mode Swagger API documentation.",
    architecture: [
      "Modular domain-driven NestJS architecture: Auth, Users, Invoicing/Billing, Device Registry, and Organization Invites",
      "Multi-tenant data isolation guaranteeing strict tenant boundary segregation across MongoDB collections",
      "Global TransformInterceptor and HttpExceptionFilter guaranteeing uniform { success, data, message } API contracts",
      "Two-tiered onboarding token strategy: 15-minute cryptographically signed verification tokens + rotated refresh JWTs",
      "Strict DTO validation using NestJS ValidationPipe with whitelist and non-whitelisted payload protections"
    ],
    features: [
      "Zoho Books-inspired multi-tenant chart of accounts, invoices, and organization management (In Progress)",
      "Google Authenticator TOTP 2FA setup with dynamic SVG/PNG QR code provisioning and recovery keys",
      "Single-use 24-hour cryptographic employee and accountant invitation links",
      "Active device session registry tracking browser fingerprint, IP, and last activity with remote revocation",
      "Interactive Swagger UI documentation featuring custom dark-mode theme and persist-auth testing"
    ],
    impact: [
      "Successfully built robust multi-tenant authentication foundation with 0 security regressions and 100% DTO coverage",
      "Standardized microservice API contract envelopes across all 2xx responses and exception handlers",
      "Currently actively developing invoice PDF generation, automated payment reminders, and bank feed reconciliations"
    ],
    links: {
      github: "https://github.com/Vinish-3110"
    },
    image: "/images/projects/zohobooks.jpg",
    featured: true
  }
];
