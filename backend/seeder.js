const dotenv = require('dotenv');

dotenv.config();

const connectDB = require('./config/db').connectDB;
const Project = require('./models/Project');
const Skill = require('./models/Skill');
const Experience = require('./models/Experience');
const Profile = require('./models/Profile');
const { DEFAULT_PROFILE } = require('./siteDefaults');

const projects = [
  {
    title: 'Unified Ecosystem',
    description: [
      'Consolidated full-stack digital ecosystem orchestrating commerce, education, talent acquisition, community networks, and gamification under unified SSO.',
      'Built high-conversion consumer storefronts using Next.js App Router with React Server Components for near-instant FCP and dynamic SEO indexing.',
      'Architected a high-throughput NestJS microservices API with domain-driven design and Redis BullMQ asynchronous background queue workers.',
      'Developed an executive Superadmin telemetry center featuring multi-tier RBAC, live Recharts visualizations, and Monaco schema editors.',
      'Integrated Stripe Elements multi-currency payment pipeline with automated webhook reconciliation.',
    ],
    techs: ['Next.js 15', 'React 19', 'NestJS', 'TypeScript', 'PostgreSQL', 'MongoDB', 'Redis', 'Stripe', 'Redux Toolkit', 'TailwindCSS'],
    links: { live: '', github: 'https://github.com/Vinish-3110' },
    image: '/images/projects/omnisphere.jpg',
    isFeatured: true,
    showGithub: true,
  },
  {
    title: 'Kinetix PMS',
    description: [
      'Modern Linear & Jira-grade project workspace engineered with dynamic Gantt scaling, double-precision float board sorting, and GenAI velocity analysis.',
      'Built a mathematically precise Gantt timeline engine with dynamic calendar cell scaling and date-bound drag resizing.',
      'Implemented Lexorank-style double-precision float ranking (DataTypes.DOUBLE) for O(1) collision-free board drag-and-drop sorting.',
      'Engineered Sequelize transactional integrity managing state transitions across planned, active, and completed sprints with automated backlog rollover.',
      'Integrated Google GenAI (Genkit) module for automated sprint retrospectives and ticket summarization.',
    ],
    techs: ['Next.js 15', 'React 19', 'Redux Toolkit', 'DnD Kit', 'Node.js', 'Express', 'Sequelize', 'PostgreSQL', 'Recharts', 'Google GenAI'],
    links: { live: '', github: 'https://github.com/Vinish-3110' },
    image: '/images/projects/kinetix.jpg',
    isFeatured: true,
    showGithub: true,
  },
  {
    title: 'Flight Booking Engine',
    description: [
      'Mission-critical commercial flight reservation ecosystem featuring interactive aircraft seat maps, distributed concurrency locking, and fleet dispatch admin.',
      'Architected a distributed Redis mutex locking engine that secures seat reservations during the 10-minute checkout window, preventing double-bookings.',
      'Built an interactive SVG aircraft cabin layout supporting real-time seat availability across Economy, Business, and First Class.',
      'Engineered an automated QR-coded PDF boarding pass generation pipeline using PDFKit upon Stripe payment webhook confirmation.',
      'Developed a dedicated Next.js Fleet Operations Admin portal for schedule management, route creation, and live manifest inspection.',
    ],
    techs: ['Next.js 15', 'React 19', 'Node.js', 'Express', 'PostgreSQL', 'Redis', 'Stripe', 'PDFKit', 'Docker', 'TailwindCSS'],
    links: { live: '', github: 'https://github.com/Vinish-3110' },
    image: '/images/projects/aerovoyage.jpg',
    isFeatured: true,
    showGithub: true,
  },
  {
    title: 'Zoho Books Clone (In Progress)',
    description: [
      'Full-stack cloud accounting engine inspired by Zoho Books, engineered with multi-tenant architecture, double-entry ledger foundations, 2FA MFA, and modular NestJS microservices.',
      'Engineered cryptographic TOTP 2-factor authentication with Google Authenticator QR code provisioning and recovery keys.',
      'Built single-use 24-hour cryptographic invitation tokens with automatic invalidation upon onboarding registration.',
      'Created active device session registry tracking browser fingerprint, IP, and last activity with remote session revocation.',
      'Applied global TransformInterceptor and HttpExceptionFilter guaranteeing uniform { success, data, message } API contracts and interactive dark-mode Swagger UI.',
    ],
    techs: ['NestJS 11', 'TypeScript', 'MongoDB', 'Mongoose', 'Passport.js', 'JWT', 'TOTP 2FA', 'Swagger OpenAPI', 'Docker'],
    links: { live: '', github: 'https://github.com/Vinish-3110' },
    image: '/images/projects/zohobooks.jpg',
    isFeatured: true,
    showGithub: true,
  },
];

const skills = [
  { name: 'Next.js', level: 'Advanced', focus: 'App Router, Server Components, SSR/SSG, Optimization', category: 'frontend' },
  { name: 'React 18 / 19', level: 'Advanced', focus: 'Custom Hooks, Context, Suspense, Concurrent Mode', category: 'frontend' },
  { name: 'TypeScript', level: 'Advanced', focus: 'Strict Typing, Generics, Utility Types, Zod Schemas', category: 'frontend' },
  { name: 'JavaScript (ESNext)', level: 'Advanced', focus: 'Async/Await, Event Loop, DOM APIs, Canvas', category: 'frontend' },
  { name: 'Angular', level: 'Intermediate', focus: 'Components, Dependency Injection, RxJS Observables', category: 'frontend' },
  { name: 'Framer Motion', level: 'Advanced', focus: 'Spring Physics, Layout Animations, Gestures', category: 'frontend' },
  { name: 'Tailwind CSS', level: 'Advanced', focus: 'Design Systems, Responsive Layouts, Arbitrary Variants', category: 'frontend' },
  { name: 'Vanilla CSS & Modern Layouts', level: 'Advanced', focus: 'CSS Grid, Flexbox, Custom Properties, Fluid Clamp', category: 'frontend' },
  { name: 'Node.js', level: 'Advanced', focus: 'Event-driven runtime, Streams, Clustering, Buffer', category: 'backend' },
  { name: 'Express.js', level: 'Advanced', focus: 'RESTful architecture, Custom Middleware, Security', category: 'backend' },
  { name: 'Python', level: 'Proficient', focus: 'Async IO, Data Processing, Scripting, Automation', category: 'backend' },
  { name: 'FastAPI', level: 'Proficient', focus: 'Pydantic models, Async endpoints, Swagger docs', category: 'backend' },
  { name: 'Django', level: 'Proficient', focus: 'MTV architecture, ORM, Admin tooling, REST Framework', category: 'backend' },
  { name: 'RESTful API Design', level: 'Advanced', focus: 'Resource URI design, HTTP standards, Rate limiting', category: 'backend' },
  { name: 'Authentication & JWT', level: 'Advanced', focus: 'Token rotation, RBAC, OAuth, Secure cookies', category: 'backend' },
  { name: 'PostgreSQL', level: 'Proficient', focus: 'Relational modeling, Indexing, Transactions, Joins', category: 'database' },
  { name: 'MongoDB', level: 'Advanced', focus: 'Aggregation pipeline, Schema design, Mongoose', category: 'database' },
  { name: 'Redis', level: 'Proficient', focus: 'In-memory caching, Pub/Sub, BullMQ job queues', category: 'database' },
  { name: 'Prisma ORM', level: 'Proficient', focus: 'Type-safe migrations, Schema relations, Client generation', category: 'database' },
  { name: 'Docker', level: 'Proficient', focus: 'Multi-stage builds, Containerization, Docker Compose', category: 'devops' },
  { name: 'Git & GitHub', level: 'Advanced', focus: 'Branching strategies, Rebase, PR reviews, Actions', category: 'devops' },
  { name: 'CI / CD Pipelines', level: 'Proficient', focus: 'Automated linting, Test suites, Cloud deployments', category: 'devops' },
  { name: 'AWS S3', level: 'Proficient', focus: 'Presigned upload URLs, Asset storage, IAM access', category: 'devops' },
  { name: 'Vercel / Cloud Platforms', level: 'Advanced', focus: 'Edge middleware, DNS configuration, Deploy previews', category: 'devops' },
];

const experiences = [
  {
    role: 'Full Stack Web Developer',
    company: 'Banshi Software',
    companyUrl: 'https://banshisoftware.com',
    period: 'Jan 2024 — Present',
    type: 'Full-Time',
    location: 'Jodhpur, India',
    summary: 'Engineering robust end-to-end web applications, responsive customer interfaces, and scalable backend services. Responsible for architecting full-stack web solutions, developing RESTful APIs, and optimizing database performance for production environments.',
    achievements: [
      'Architected and deployed responsive, high-performance web applications using React, Next.js, TypeScript, and modern CSS architecture.',
      'Engineered secure and scalable backend REST APIs using Node.js and Express, incorporating JWT authentication and role-based access control.',
      'Designed and optimized relational and document databases with PostgreSQL and MongoDB for efficient query execution and high reliability.',
      'Spearheaded UI/UX modernizations with reusable component systems, achieving 95+ Google Lighthouse scores and smooth cross-browser responsiveness.',
      'Collaborated closely with cross-functional development teams and clients across all phases of the software development lifecycle (SDLC) from design to production deployment.',
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'JavaScript (ES6+)', 'Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'Tailwind CSS', 'REST APIs', 'Git & GitHub'],
  },
];

const seedProfile = async () => {
  let profile = await Profile.findOne();
  if (!profile) {
    profile = await Profile.create({ owner_email: 'admin@portfolio.com', theme_color: DEFAULT_PROFILE.theme_color });
  }
  Object.assign(profile, DEFAULT_PROFILE);
  await Profile.save(profile);
};

const seedDB = async () => {
  try {
    await connectDB();

    await Project.removeAll();
    for (const project of projects) {
      await Project.create(project);
    }

    await Skill.removeAll();
    for (const [index, skill] of skills.entries()) {
      await Skill.create({ ...skill, sortOrder: index });
    }

    await Experience.removeAll();
    for (const [index, experience] of experiences.entries()) {
      await Experience.create({ ...experience, sortOrder: index });
    }

    await seedProfile();

    console.log(`Seeded ${projects.length} projects, ${skills.length} skills, ${experiences.length} experience, and the site profile`);
    process.exit(0);
  } catch (error) {
    console.error('Seeding Error:', error);
    process.exit(1);
  }
};

seedDB();
