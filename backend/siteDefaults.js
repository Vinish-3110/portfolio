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

const presentProfile = (profile = {}) => ({
  resume_url: profile.resume_filename
    ? `${(process.env.PUBLIC_BASE_URL || '').replace(/\/$/, '')}/api/profile/resume`
    : (profile.resume_url || ''),
  theme_color: profile.theme_color || DEFAULT_PROFILE.theme_color,
  display_name: profile.display_name || DEFAULT_PROFILE.display_name,
  availability: profile.availability || DEFAULT_PROFILE.availability,
  role_badge: profile.role_badge || DEFAULT_PROFILE.role_badge,
  headline_before: profile.headline_before || DEFAULT_PROFILE.headline_before,
  headline_highlight: profile.headline_highlight || DEFAULT_PROFILE.headline_highlight,
  headline_after: profile.headline_after || DEFAULT_PROFILE.headline_after,
  hero_description: profile.hero_description || DEFAULT_PROFILE.hero_description,
  about_heading: profile.about_heading || DEFAULT_PROFILE.about_heading,
  about_paragraphs: profile.about_paragraphs?.length ? profile.about_paragraphs : DEFAULT_PROFILE.about_paragraphs,
  stats: profile.stats?.length ? profile.stats : DEFAULT_PROFILE.stats,
  email: profile.email || DEFAULT_PROFILE.email,
  phone: profile.phone || DEFAULT_PROFILE.phone,
  linkedin: profile.linkedin || DEFAULT_PROFILE.linkedin,
  github: profile.github || DEFAULT_PROFILE.github,
  engineer_name: profile.engineer_name || DEFAULT_PROFILE.engineer_name,
  discipline: profile.discipline || DEFAULT_PROFILE.discipline,
  experience_label: profile.experience_label || DEFAULT_PROFILE.experience_label,
  core_focus: profile.core_focus || DEFAULT_PROFILE.core_focus,
});

module.exports = { DEFAULT_PROFILE, presentProfile };
