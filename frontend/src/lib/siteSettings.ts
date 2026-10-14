export type Palette = {
  background: string;
  surface: string;
  elevated: string;
  text: string;
  secondary: string;
  muted: string;
  textAccent: string;
  accent: string;
  accentSecondary: string;
  success: string;
};

export type LoaderSettings = {
  background: string;
  road: string;
  island: string;
  shoulder: string;
  brokenLines: string;
  sticks: string;
  leftCars: string[];
  rightCars: string[];
  hudAccent: string;
  hudSecondary: string;
  hudHighlight: string;
  title: string;
  titleMid: string;
  statuses: string[];
};

export type SiteCopy = {
  seoTitle: string;
  seoDescription: string;
  navAbout: string;
  navStack: string;
  navExperience: string;
  navWorks: string;
  navContact: string;
  navCta: string;
  navNote: string;
  heroProjects: string;
  heroContact: string;
  heroScroll: string;
  telemetryFile: string;
  telemetryEngineer: string;
  telemetryDiscipline: string;
  telemetryExperience: string;
  telemetryPing: string;
  telemetryFocus: string;
  telemetryTech: string;
  telemetryOptimal: string;
  aboutTag: string;
  aboutResume: string;
  aboutTimeline: string;
  skillsTag: string;
  skillsHeading: string;
  skillsSub: string;
  skillsAll: string;
  skillsFrontend: string;
  skillsBackend: string;
  skillsDatabase: string;
  skillsDevops: string;
  experienceTag: string;
  experienceHeading: string;
  experienceSub: string;
  projectsTag: string;
  projectsHeading: string;
  projectsSub: string;
  projectLabel: string;
  projectCaseStudy: string;
  projectLive: string;
  projectCode: string;
  projectLivePreview: string;
  projectSource: string;
  projectTechnologies: string;
  contactTag: string;
  contactHeading: string;
  contactHighlight: string;
  contactBody: string;
  contactName: string;
  contactEmail: string;
  contactMessage: string;
  contactNamePlaceholder: string;
  contactEmailPlaceholder: string;
  contactMessagePlaceholder: string;
  contactSend: string;
  contactSending: string;
  contactSuccess: string;
  contactError: string;
  contactGithub: string;
  contactLinkedin: string;
  contactResume: string;
  contactCopy: string;
  contactCopied: string;
  footerStatus: string;
  footerPlace: string;
  footerCredit: string;
  githubSettings: string;
  githubLearn: string;
  githubLess: string;
  githubMore: string;
  loaderBadge: string;
  loaderTitle: string;
  loaderWarp: string;
  loaderHold: string;
  loaderAccelerate: string;
};

export type SiteSettings = {
  colors: Palette;
  light: Palette;
  loader: LoaderSettings;
  copy: SiteCopy;
};

export const PALETTE_FIELDS: { key: keyof Palette; label: string }[] = [
  { key: 'background', label: 'Background' },
  { key: 'surface', label: 'Surface' },
  { key: 'elevated', label: 'Elevated surface' },
  { key: 'text', label: 'Text' },
  { key: 'secondary', label: 'Secondary text' },
  { key: 'muted', label: 'Muted text' },
  { key: 'textAccent', label: 'Accent text' },
  { key: 'accent', label: 'Accent' },
  { key: 'accentSecondary', label: 'Secondary accent' },
  { key: 'success', label: 'Success' },
];

export const COPY_FIELDS: { key: keyof SiteCopy; label: string; group: string }[] = [
  { group: 'Search & share', key: 'seoTitle', label: 'Page title' },
  { group: 'Search & share', key: 'seoDescription', label: 'Page description' },
  { group: 'Navigation', key: 'navAbout', label: 'About link' },
  { group: 'Navigation', key: 'navStack', label: 'Stack link' },
  { group: 'Navigation', key: 'navExperience', label: 'Experience link' },
  { group: 'Navigation', key: 'navWorks', label: 'Works link' },
  { group: 'Navigation', key: 'navContact', label: 'Contact link' },
  { group: 'Navigation', key: 'navCta', label: 'Talk button' },
  { group: 'Navigation', key: 'navNote', label: 'Mobile note' },
  { group: 'Hero', key: 'heroProjects', label: 'Projects button' },
  { group: 'Hero', key: 'heroContact', label: 'Contact button' },
  { group: 'Hero', key: 'heroScroll', label: 'Scroll hint' },
  { group: 'Hero', key: 'telemetryFile', label: 'Card filename' },
  { group: 'Hero', key: 'telemetryEngineer', label: 'Engineer label' },
  { group: 'Hero', key: 'telemetryDiscipline', label: 'Discipline label' },
  { group: 'Hero', key: 'telemetryExperience', label: 'Experience label' },
  { group: 'Hero', key: 'telemetryPing', label: 'Ping label' },
  { group: 'Hero', key: 'telemetryFocus', label: 'Focus label' },
  { group: 'Hero', key: 'telemetryTech', label: 'Technologies label' },
  { group: 'Hero', key: 'telemetryOptimal', label: 'Ping status' },
  { group: 'About', key: 'aboutTag', label: 'Section tag' },
  { group: 'About', key: 'aboutResume', label: 'Resume button' },
  { group: 'About', key: 'aboutTimeline', label: 'Timeline button' },
  { group: 'Skills', key: 'skillsTag', label: 'Section tag' },
  { group: 'Skills', key: 'skillsHeading', label: 'Heading' },
  { group: 'Skills', key: 'skillsSub', label: 'Subheading' },
  { group: 'Skills', key: 'skillsAll', label: 'All filter' },
  { group: 'Skills', key: 'skillsFrontend', label: 'Frontend filter' },
  { group: 'Skills', key: 'skillsBackend', label: 'Backend filter' },
  { group: 'Skills', key: 'skillsDatabase', label: 'Data filter' },
  { group: 'Skills', key: 'skillsDevops', label: 'DevOps filter' },
  { group: 'Experience', key: 'experienceTag', label: 'Section tag' },
  { group: 'Experience', key: 'experienceHeading', label: 'Heading' },
  { group: 'Experience', key: 'experienceSub', label: 'Subheading' },
  { group: 'Projects', key: 'projectsTag', label: 'Section tag' },
  { group: 'Projects', key: 'projectsHeading', label: 'Heading' },
  { group: 'Projects', key: 'projectsSub', label: 'Subheading' },
  { group: 'Projects', key: 'projectLabel', label: 'Index label' },
  { group: 'Projects', key: 'projectCaseStudy', label: 'Case study button' },
  { group: 'Projects', key: 'projectLive', label: 'Live button' },
  { group: 'Projects', key: 'projectCode', label: 'Code button' },
  { group: 'Projects', key: 'projectLivePreview', label: 'Modal live button' },
  { group: 'Projects', key: 'projectSource', label: 'Modal code button' },
  { group: 'Projects', key: 'projectTechnologies', label: 'Technologies heading' },
  { group: 'Contact', key: 'contactTag', label: 'Section tag' },
  { group: 'Contact', key: 'contactHeading', label: 'Heading' },
  { group: 'Contact', key: 'contactHighlight', label: 'Highlighted line' },
  { group: 'Contact', key: 'contactBody', label: 'Paragraph' },
  { group: 'Contact', key: 'contactName', label: 'Name label' },
  { group: 'Contact', key: 'contactEmail', label: 'Email label' },
  { group: 'Contact', key: 'contactMessage', label: 'Message label' },
  { group: 'Contact', key: 'contactNamePlaceholder', label: 'Name placeholder' },
  { group: 'Contact', key: 'contactEmailPlaceholder', label: 'Email placeholder' },
  { group: 'Contact', key: 'contactMessagePlaceholder', label: 'Message placeholder' },
  { group: 'Contact', key: 'contactSend', label: 'Send button' },
  { group: 'Contact', key: 'contactSending', label: 'Sending label' },
  { group: 'Contact', key: 'contactSuccess', label: 'Success message' },
  { group: 'Contact', key: 'contactError', label: 'Error message' },
  { group: 'Contact', key: 'contactGithub', label: 'GitHub button' },
  { group: 'Contact', key: 'contactLinkedin', label: 'LinkedIn button' },
  { group: 'Contact', key: 'contactResume', label: 'Resume button' },
  { group: 'Contact', key: 'contactCopy', label: 'Copy label' },
  { group: 'Contact', key: 'contactCopied', label: 'Copied label' },
  { group: 'Footer', key: 'footerStatus', label: 'Status' },
  { group: 'Footer', key: 'footerPlace', label: 'Location' },
  { group: 'Footer', key: 'footerCredit', label: 'Credit line' },
  { group: 'GitHub', key: 'githubSettings', label: 'Settings label' },
  { group: 'GitHub', key: 'githubLearn', label: 'Learn link' },
  { group: 'GitHub', key: 'githubLess', label: 'Less' },
  { group: 'GitHub', key: 'githubMore', label: 'More' },
  { group: 'Intro loader', key: 'loaderBadge', label: 'Badge' },
  { group: 'Intro loader', key: 'loaderTitle', label: 'Title' },
  { group: 'Intro loader', key: 'loaderWarp', label: 'Speed label' },
  { group: 'Intro loader', key: 'loaderHold', label: 'Hold prompt' },
  { group: 'Intro loader', key: 'loaderAccelerate', label: 'Accelerating prompt' },
];
