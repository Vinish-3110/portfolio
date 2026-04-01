const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('./models/Project');
const Profile = require('./models/Profile');

dotenv.config();

const projects = [
  {
    title: 'Personal Portfolio',
    description: [
      'Personal portfolio showcasing About Me, project case studies — frontend built with Next.js and a Node.js backend providing REST APIs.',
      'Implemented SSR/SSG and dynamic routes to improve SEO and page-load performance.',
      'Built secure Node.js APIs to serve project data and handle contact submissions with server-side validation.',
      'Designed a responsive, accessible UI and a modular component library to accelerate feature development.'
    ],
    techs: ['Next.js', 'React', 'Node.js', 'REST APIs', 'TailwindCSS'],
    links: { live: '', github: '' },
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2000&auto=format&fit=crop',
    isFeatured: true
  },
  {
    title: 'Kulyx Marketplace',
    description: [
      'High-performance B2C marketplace discovery engine with learning, community, gamification, nutrition and job-search features.',
      'Engineered a fast, production-ready frontend using Next.js Server Components and optimized image delivery with Sharp.',
      'Architected robust client state management with Redux Toolkit and Redux Persist for seamless session continuity.',
      'Implemented 60fps micro-animations with Framer Motion to enhance user engagement.',
      'Integrated Stripe Elements for secure payments and added Axios interceptors for centralized error handling.'
    ],
    techs: ['Next.js 15', 'React 18', 'TypeScript', 'TailwindCSS 4', 'Redux Toolkit', 'Framer Motion', 'Axios', 'Sharp'],
    links: { live: 'https://kuilyx.com', github: '' },
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2000&auto=format&fit=crop',
    isFeatured: true
  },
  {
    title: 'Kulyx Superadmin',
    description: [
      'Developed a Superadmin analytics and operations dashboard to deliver actionable insights and manage enterprise workflows.',
      'Built interactive analytics visualizations and geographic heatmaps to surface trends and operational hotspots.',
      'Implemented RBAC-based admin controls and secure management interfaces for user and content moderation.',
      'Added advanced query and editing tools using Monaco Editor and validated complex forms with React Hook Form.'
    ],
    techs: ['Next.js', 'ApexCharts', 'Recharts', 'Monaco Editor', 'React Hook Form', 'Zod'],
    links: { live: '', github: '' },
    image: 'https://images.unsplash.com/photo-1551288049-bbbda536339a?q=80&w=2000&auto=format&fit=crop',
    isFeatured: false
  },
  {
    title: 'Kulyx API',
    description: [
      'Scalable microservice API and infrastructure orchestrator supporting the Kulyx platform.',
      'Designed modular REST APIs and service boundaries to support high throughput and maintainability.',
      'Implemented background job processing with Redis to offload intensive tasks and improve responsiveness.',
      'Integrated external services with secure authentication using JWT and applied rate limiting.',
      'Architected deployment-ready infrastructure with containerization and S3-backed storage.'
    ],
    techs: ['Node.js', 'NestJS', 'MongoDB', 'JWT', 'AWS S3', 'Redis'],
    links: { live: '', github: '' },
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc4b?q=80&w=2000&auto=format&fit=crop',
    isFeatured: false
  },
  {
    title: 'Responsive Marketing Website',
    description: [
      'Responsive marketing website built with React and TailwindCSS for cross-device compatibility.',
      'Implemented accessible components and optimized layouts for various screen sizes.',
      'Built an enquiry form with client-side validation and server-side handling for admin notifications.'
    ],
    techs: ['React', 'TailwindCSS', 'Framer Motion'],
    links: { live: '', github: '' },
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop',
    isFeatured: false
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
