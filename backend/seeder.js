const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('./models/Project');
const Profile = require('./models/Profile');

dotenv.config();

const projects = [
  {
    title: 'Unified Ecosystem',
    description: [
      'Consolidated full-stack digital ecosystem orchestrating commerce, education, talent acquisition, community networks, and gamification under unified SSO.',
      'Built high-conversion consumer storefronts using Next.js App Router with React Server Components for near-instant FCP and dynamic SEO indexing.',
      'Architected a high-throughput NestJS microservices API with domain-driven design and Redis BullMQ asynchronous background queue workers.',
      'Developed an executive Superadmin telemetry center featuring multi-tier RBAC, live Recharts visualizations, and Monaco schema editors.',
      'Integrated Stripe Elements multi-currency payment pipeline with automated webhook reconciliation.'
    ],
    techs: ['Next.js 15', 'React 19', 'NestJS', 'TypeScript', 'PostgreSQL', 'MongoDB', 'Redis', 'Stripe', 'Redux Toolkit', 'TailwindCSS'],
    links: { live: '', github: 'https://github.com/vinishpurohit' },
    image: '/images/projects/omnisphere.jpg',
    isFeatured: true
  },
  {
    title: 'Kinetix PMS',
    description: [
      'Modern Linear & Jira-grade project workspace engineered with dynamic Gantt scaling, double-precision float board sorting, and GenAI velocity analysis.',
      'Built a mathematically precise Gantt timeline engine with dynamic calendar cell scaling and date-bound drag resizing.',
      'Implemented Lexorank-style double-precision float ranking (DataTypes.DOUBLE) for O(1) collision-free board drag-and-drop sorting.',
      'Engineered Sequelize transactional integrity managing state transitions across planned, active, and completed sprints with automated backlog rollover.',
      'Integrated Google GenAI (Genkit) module for automated sprint retrospectives and ticket summarization.'
    ],
    techs: ['Next.js 15', 'React 19', 'Redux Toolkit', 'DnD Kit', 'Node.js', 'Express', 'Sequelize', 'PostgreSQL', 'Recharts', 'Google GenAI'],
    links: { live: '', github: 'https://github.com/vinishpurohit' },
    image: '/images/projects/kinetix.jpg',
    isFeatured: true
  },
  {
    title: 'Flight Booking Engine',
    description: [
      'Mission-critical commercial flight reservation ecosystem featuring interactive aircraft seat maps, distributed concurrency locking, and fleet dispatch admin.',
      'Architected a distributed Redis mutex locking engine that secures seat reservations during the 10-minute checkout window, preventing double-bookings.',
      'Built an interactive SVG aircraft cabin layout supporting real-time seat availability across Economy, Business, and First Class.',
      'Engineered an automated QR-coded PDF boarding pass generation pipeline using PDFKit upon Stripe payment webhook confirmation.',
      'Developed a dedicated Next.js Fleet Operations Admin portal for schedule management, route creation, and live manifest inspection.'
    ],
    techs: ['Next.js 15', 'React 19', 'Node.js', 'Express', 'PostgreSQL', 'Redis', 'Stripe', 'PDFKit', 'Docker', 'TailwindCSS'],
    links: { live: '', github: 'https://github.com/vinishpurohit' },
    image: '/images/projects/aerovoyage.jpg',
    isFeatured: true
  },
  {
    title: 'Zoho Books Clone (In Progress)',
    description: [
      'Full-stack cloud accounting engine inspired by Zoho Books, engineered with multi-tenant architecture, double-entry ledger foundations, 2FA MFA, and modular NestJS microservices.',
      'Engineered cryptographic TOTP 2-factor authentication with Google Authenticator QR code provisioning and recovery keys.',
      'Built single-use 24-hour cryptographic invitation tokens with automatic invalidation upon onboarding registration.',
      'Created active device session registry tracking browser fingerprint, IP, and last activity with remote session revocation.',
      'Applied global TransformInterceptor and HttpExceptionFilter guaranteeing uniform { success, data, message } API contracts and interactive dark-mode Swagger UI.'
    ],
    techs: ['NestJS 11', 'TypeScript', 'MongoDB', 'Mongoose', 'Passport.js', 'JWT', 'TOTP 2FA', 'Swagger OpenAPI', 'Docker'],
    links: { live: '', github: 'https://github.com/vinishpurohit' },
    image: '/images/projects/zohobooks.jpg',
    isFeatured: true
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { dbName: 'Portfolio' });
    
    await Project.deleteMany();
    await Profile.deleteMany();

    await Project.insertMany(projects);
    await Profile.create({ owner_email: 'admin@portfolio.com', resume_url: 'https://example.com/resume.pdf' });

    console.log('Database Seeded Successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seeding Error:', error);
    process.exit(1);
  }
};

seedDB();
