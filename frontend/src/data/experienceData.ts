export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  type: string;
  location: string;
  summary: string;
  achievements: string[];
  technologies: string[];
}

export const experienceData: ExperienceItem[] = [
  {
    id: "banshi-software",
    role: "Full Stack Web Developer",
    company: "Banshi Software",
    companyUrl: "https://banshisoftware.com",
    period: "Jan 2024 — Present",
    type: "Full-Time",
    location: "Jodhpur, India",
    summary:
      "Engineering robust end-to-end web applications, responsive customer interfaces, and scalable backend services. Responsible for architecting full-stack web solutions, developing RESTful APIs, and optimizing database performance for production environments.",
    achievements: [
      "Architected and deployed responsive, high-performance web applications using React, Next.js, TypeScript, and modern CSS architecture.",
      "Engineered secure and scalable backend REST APIs using Node.js and Express, incorporating JWT authentication and role-based access control.",
      "Designed and optimized relational and document databases with PostgreSQL and MongoDB for efficient query execution and high reliability.",
      "Spearheaded UI/UX modernizations with reusable component systems, achieving 95+ Google Lighthouse scores and smooth cross-browser responsiveness.",
      "Collaborated closely with cross-functional development teams and clients across all phases of the software development lifecycle (SDLC) from design to production deployment."
    ],
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript (ES6+)",
      "Node.js",
      "Express.js",
      "MongoDB",
      "PostgreSQL",
      "Tailwind CSS",
      "REST APIs",
      "Git & GitHub"
    ]
  }
];
