const DEFAULT_PROFILE = {
  display_name: 'VINISH',
  availability: 'AVAILABLE',
  role_badge: 'WEB DEVELOPER • 2+ YEARS PROFESSIONAL EXP',
  headline_before: 'Building modern',
  headline_highlight: 'digital experiences',
  headline_after: '& scalable web apps.',
  hero_description:
    'Engineering high-performance web products with Next.js, React, Node.js, and Python. Focused on fluid 60fps micro-interactions, clean system architecture, and accessible user interfaces.',
  about_heading: 'I build scalable, interactive, and user-focused web experiences.',
  about_paragraphs: [
    'I am a Web Developer with 2+ years of professional engineering experience, specializing in the modern JavaScript and Python ecosystems. My focus is at the intersection of robust system design and delightful, polished user interfaces.',
    'Over the past two years, I have architected high-performance frontends with Next.js and React, built resilient Node.js and Python (FastAPI/Django) microservices, and engineered data pipelines with PostgreSQL, MongoDB, and Redis.',
    'I care deeply about software craftsmanship: zero layout shifts, accessible semantic HTML, modular component architecture, and fluid transitions that make digital products feel alive without compromising speed.',
  ],
  stats: [
    { value: '2+', label: 'Years Experience', sub: 'Production software engineering' },
    { value: '15+', label: 'Projects & Modules', sub: 'Shipped to real users' },
    { value: '98%', label: 'Lighthouse Target', sub: 'Performance & Accessibility' },
    { value: '60fps', label: 'Interaction Goal', sub: 'Fluid UI micro-interactions' },
  ],
  email: 'vinishpurohit3110@gmail.com',
  phone: '+91 8107593443',
  linkedin: 'https://www.linkedin.com/in/vinishpurohit',
  github: 'https://github.com/Vinish-3110',
  engineer_name: 'Vinish Purohit',
  discipline: 'Frontend Architecture & Full-Stack',
  experience_label: '2+ Years Production Grade',
  core_focus: 'SSR, App Router, REST APIs, Micro-interactions',
  theme_color: '#b87af0',
};

const publicAssetUrl = (pathname) => {
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const raw = (process.env.PUBLIC_BASE_URL || '').trim().replace(/\/$/, '');
  if (!raw) return path;
  const base = /^https?:\/\//i.test(raw) ? raw : `https://${raw.replace(/^\/+/, '')}`;
  return `${base}${path}`;
};

const DEFAULT_PALETTE = {
  background: '#08090d',
  surface: '#0f1118',
  elevated: '#161924',
  text: '#f8fafc',
  secondary: '#94a3b8',
  muted: '#64748b',
  textAccent: '#818cf8',
  accent: '#6366f1',
  accentSecondary: '#06b6d4',
  success: '#10b981',
};

const DEFAULT_LIGHT_PALETTE = {
  background: '#f8fafc',
  surface: '#ffffff',
  elevated: '#f1f5f9',
  text: '#0f172a',
  secondary: '#475569',
  muted: '#64748b',
  textAccent: '#4f46e5',
  accent: '#4f46e5',
  accentSecondary: '#0891b2',
  success: '#059669',
};

const DEFAULT_SITE_SETTINGS = {
  colors: DEFAULT_PALETTE,
  light: DEFAULT_LIGHT_PALETTE,
  loader: {
    background: '#000000',
    road: '#06070a',
    island: '#0a0c12',
    shoulder: '#6366f1',
    brokenLines: '#38bdf8',
    sticks: '#06b6d4',
    leftCars: ['#d856bf', '#818cf8', '#c084fc'],
    rightCars: ['#06b6d4', '#0ea5e9', '#38bdf8'],
    hudAccent: '#6366f1',
    hudSecondary: '#06b6d4',
    hudHighlight: '#ec4899',
    title: '#ffffff',
    titleMid: '#c7d2fe',
    statuses: [
      'INITIALIZING TELEMETRY & SYSTEM CORES...',
      'SYNTHESIZING 2+ YEARS PRODUCTION EXPERIENCE...',
      'COMPILING FULL-STACK APPS & ARCHITECTURE...',
      'APPROACHING TARGET: VINISH PUROHIT...',
      'WARP COMPLETE. ENTERING WORKSPACE...',
    ],
  },
  copy: {
    seoTitle: 'Vinish Purohit — Web Developer & Frontend Engineer (2+ Years)',
    seoDescription: 'Portfolio of Vinish Purohit, a Web Developer with 2+ years of professional experience specializing in Next.js, React, Node.js, TypeScript, Python, and modern modular architectures.',
    navAbout: 'About',
    navStack: 'Stack',
    navExperience: 'Experience',
    navWorks: 'Works',
    navContact: 'Contact',
    navCta: "Let's Talk",
    navNote: 'Based in India • Open to Worldwide Remote Roles',
    heroProjects: 'View Projects',
    heroContact: 'Contact Me',
    heroScroll: 'SCROLL TO EXPLORE ARCHITECTURE',
    telemetryFile: 'developer-telemetry.config.ts',
    telemetryEngineer: 'engineer',
    telemetryDiscipline: 'primary_discipline',
    telemetryExperience: 'experience',
    telemetryPing: 'telemetry_ping',
    telemetryFocus: 'core_focus',
    telemetryTech: 'active_technologies',
    telemetryOptimal: 'Optimal',
    aboutTag: 'ABOUT / 01',
    aboutResume: 'Request Resume',
    aboutTimeline: 'View Career Timeline',
    skillsTag: 'CAPABILITIES / 02',
    skillsHeading: 'Full-spectrum engineering stack.',
    skillsSub: 'Carefully chosen tools and frameworks engineered for developer ergonomics, scale, and high-performance user interfaces.',
    skillsAll: 'All Stack',
    skillsFrontend: 'Frontend Architecture',
    skillsBackend: 'Backend & Services',
    skillsDatabase: 'Data & Caching',
    skillsDevops: 'DevOps & Tooling',
    experienceTag: 'CAREER / 03',
    experienceHeading: 'Professional trajectory & engineering milestones.',
    experienceSub: 'A chronological record of hands-on impact, product ownership, and technical contributions.',
    projectsTag: 'SELECTED WORKS / 04',
    projectsHeading: 'Featured case studies & systems.',
    projectsSub: 'Deep dive into architectures, engineering trade-offs, and measurable outcomes.',
    projectLabel: 'PROJECT',
    projectCaseStudy: 'Case Study',
    projectLive: 'Live',
    projectCode: 'Code',
    projectLivePreview: 'Live Preview',
    projectSource: 'Source Code',
    projectTechnologies: 'Technologies',
    contactTag: 'GET IN TOUCH / 05',
    contactHeading: 'Have an idea?',
    contactHighlight: "Let's build something great.",
    contactBody: 'Whether you are looking to build a high-performance web application, scale your backend services, or add a frontend specialist to your team — my inbox is open.',
    contactName: 'YOUR NAME',
    contactEmail: 'YOUR EMAIL',
    contactMessage: 'MESSAGE',
    contactNamePlaceholder: 'e.g. Alex Morgan',
    contactEmailPlaceholder: 'e.g. alex@example.com',
    contactMessagePlaceholder: 'Describe your project, timeline, or role...',
    contactSend: 'Send Message',
    contactSending: 'Transmitting...',
    contactSuccess: 'Message delivered! I will get back to you shortly.',
    contactError: 'Message could not be sent. Try again in a moment.',
    contactGithub: 'GitHub',
    contactLinkedin: 'LinkedIn',
    contactResume: 'Request Resume',
    contactCopy: 'Copy',
    contactCopied: 'Copied!',
    footerStatus: 'SYS.ONLINE',
    footerPlace: 'NEW DELHI (IST)',
    footerCredit: 'ENGINEERED WITH NEXT.JS 16 & FRAMER MOTION',
    githubSettings: 'Contribution settings',
    githubLearn: 'Learn how we count contributions',
    githubLess: 'Less',
    githubMore: 'More',
    loaderBadge: 'SYS.TELEMETRY: CONNECTED',
    loaderTitle: "Taking you to Vinish's work life",
    loaderWarp: 'WARP VELOCITY',
    loaderHold: 'HOLD CLICK OR TOUCH TO ACCELERATE',
    loaderAccelerate: 'HYPER-ACCELERATING...',
  },
};

const kept = (value, fallback) => (value === undefined || value === null ? fallback : value);

const colorList = (value, fallback) => (
  Array.isArray(value) && value.filter(Boolean).length ? value.map(String) : fallback
);

const mergeSiteSettings = (saved) => {
  const source = saved && typeof saved === 'object' && !Array.isArray(saved) ? saved : {};
  const loader = source.loader && typeof source.loader === 'object' ? source.loader : {};
  return {
    colors: { ...DEFAULT_SITE_SETTINGS.colors, ...(source.colors || {}) },
    light: { ...DEFAULT_SITE_SETTINGS.light, ...(source.light || {}) },
    loader: {
      ...DEFAULT_SITE_SETTINGS.loader,
      ...loader,
      leftCars: colorList(loader.leftCars, DEFAULT_SITE_SETTINGS.loader.leftCars),
      rightCars: colorList(loader.rightCars, DEFAULT_SITE_SETTINGS.loader.rightCars),
      statuses: colorList(loader.statuses, DEFAULT_SITE_SETTINGS.loader.statuses),
    },
    copy: { ...DEFAULT_SITE_SETTINGS.copy, ...(source.copy || {}) },
  };
};

const presentProfile = (profile = {}) => ({
  resume_url: profile.resume_filename
    ? publicAssetUrl('/api/profile/resume')
    : (profile.resume_url || ''),
  theme_color: kept(profile.theme_color, DEFAULT_PROFILE.theme_color),
  display_name: kept(profile.display_name, DEFAULT_PROFILE.display_name),
  availability: kept(profile.availability, DEFAULT_PROFILE.availability),
  role_badge: kept(profile.role_badge, DEFAULT_PROFILE.role_badge),
  headline_before: kept(profile.headline_before, DEFAULT_PROFILE.headline_before),
  headline_highlight: kept(profile.headline_highlight, DEFAULT_PROFILE.headline_highlight),
  headline_after: kept(profile.headline_after, DEFAULT_PROFILE.headline_after),
  hero_description: kept(profile.hero_description, DEFAULT_PROFILE.hero_description),
  about_heading: kept(profile.about_heading, DEFAULT_PROFILE.about_heading),
  about_paragraphs: Array.isArray(profile.about_paragraphs) ? profile.about_paragraphs : DEFAULT_PROFILE.about_paragraphs,
  stats: Array.isArray(profile.stats) ? profile.stats : DEFAULT_PROFILE.stats,
  email: kept(profile.email, DEFAULT_PROFILE.email),
  phone: kept(profile.phone, DEFAULT_PROFILE.phone),
  linkedin: kept(profile.linkedin, DEFAULT_PROFILE.linkedin),
  github: kept(profile.github, DEFAULT_PROFILE.github),
  engineer_name: kept(profile.engineer_name, DEFAULT_PROFILE.engineer_name),
  discipline: kept(profile.discipline, DEFAULT_PROFILE.discipline),
  experience_label: kept(profile.experience_label, DEFAULT_PROFILE.experience_label),
  core_focus: kept(profile.core_focus, DEFAULT_PROFILE.core_focus),
  site_settings: mergeSiteSettings(profile.site_settings),
});

module.exports = { DEFAULT_PROFILE, DEFAULT_SITE_SETTINGS, mergeSiteSettings, presentProfile, publicAssetUrl };
