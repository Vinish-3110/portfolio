export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.vinishpurohit.in/api';

export const apiOrigin = (apiUrl = API_URL) => apiUrl.replace(/\/api\/?$/, '');

export type Project = {
  _id?: string;
  id?: string | number;
  title: string;
  description: string | string[];
  techs?: string[];
  links?: {
    live?: string;
    github?: string;
    figma?: string;
  };
  image?: string;
  showGithub?: boolean;
  isFeatured?: boolean;
};

export type ProjectView = {
  id: string;
  title: string;
  description: string[];
  techs: string[];
  links: {
    live?: string;
    github?: string;
    figma?: string;
  };
  image?: string;
};

export function projectMediaUrl(url?: string) {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  const origin = apiOrigin();
  return `${origin}${url.startsWith('/') ? url : `/${url}`}`;
}

export type ProjectPayload = {
  title: string;
  description: string[];
  techs: string[];
  live_link?: string;
  github_link?: string;
  show_github?: boolean;
  is_featured?: boolean;
  image?: string;
};

export type Enquiry = {
  _id?: string;
  id?: string | number;
  name: string;
  email: string;
  message: string;
  createdAt?: string;
  created_at?: string;
};

export type EnquiryPayload = {
  name: string;
  email: string;
  message: string;
};

export type SiteStat = { value: string; label: string; sub: string };

export type Profile = {
  resume_url?: string;
  theme_color?: string;
  display_name?: string;
  availability?: string;
  role_badge?: string;
  headline_before?: string;
  headline_highlight?: string;
  headline_after?: string;
  hero_description?: string;
  about_heading?: string;
  about_paragraphs?: string[];
  stats?: SiteStat[];
  email?: string;
  phone?: string;
  linkedin?: string;
  github?: string;
  engineer_name?: string;
  discipline?: string;
  experience_label?: string;
  core_focus?: string;
  site_settings?: import('@/lib/siteSettings').SiteSettings;
  message?: string;
};

export type ExperienceItem = {
  _id?: string;
  id?: string;
  role: string;
  company: string;
  companyUrl?: string;
  period?: string;
  type?: string;
  location?: string;
  summary?: string;
  achievements: string[];
  technologies: string[];
  sortOrder?: number;
};

export type SkillItem = {
  _id?: string;
  name: string;
  level?: string;
  focus?: string;
  category: 'frontend' | 'backend' | 'database' | 'devops';
  sortOrder?: number;
};

export const fetchProjects = async (): Promise<Project[]> => {
  const response = await fetch(`${API_URL}/projects`);
  if (!response.ok) throw new Error('Failed to fetch projects');
  return response.json();
};

export const createProject = async (project: ProjectPayload, token: string): Promise<Project> => {
  const response = await fetch(`${API_URL}/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(project),
  });
  if (!response.ok) throw new Error('Failed to create project');
  return response.json();
};

export const fetchProject = async (id: string): Promise<Project> => {
  const response = await fetch(`${API_URL}/projects/${id}`);
  if (!response.ok) throw new Error('Failed to fetch project');
  return response.json();
};

export const updateProject = async (id: string, project: Partial<ProjectPayload> | FormData, token: string): Promise<Project> => {
  const isFormData = project instanceof FormData;
  const headers: Record<string, string> = {
    'Authorization': `Bearer ${token}`
  };
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(`${API_URL}/projects/${id}`, {
    method: 'PUT',
    headers,
    body: isFormData ? project : JSON.stringify(project),
  });
  if (!response.ok) throw new Error('Failed to update project');
  return response.json();
};

export const deleteProject = async (id: string | number, token: string) => {
  const response = await fetch(`${API_URL}/projects/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    },
  });
  if (!response.ok) throw new Error('Failed to delete project');
  return response.json();
};

export const loginAdmin = async (credentials: { username: string; password: string }) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) throw new Error('Login failed');
  return response.json();
};

// Enquiries
export const submitEnquiry = async (enquiry: EnquiryPayload) => {
  const response = await fetch(`${API_URL}/enquiries`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(enquiry),
  });
  if (!response.ok) throw new Error('Failed to submit enquiry');
  return response.json();
};

export const fetchEnquiries = async (token: string): Promise<Enquiry[]> => {
  const response = await fetch(`${API_URL}/enquiries`, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
  });
  if (!response.ok) throw new Error('Failed to fetch enquiries');
  return response.json();
};

export type AnalyticsStats = {
  totalVisitors: number;
  uniqueVisitors: number;
  realtimeVisitors: number;
  dailyVisitors: { date: string; count: number }[];
  topCountries: { country: string; count: number }[];
  topPages: { path: string; count: number }[];
};

export const fetchAnalyticsStats = async (token: string): Promise<AnalyticsStats> => {
  const response = await fetch(`${API_URL}/admin/stats`, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
  });
  if (!response.ok) throw new Error('Failed to fetch analytics stats');
  return response.json();
};

// Profile / Resume
export const downloadResume = async () => {
  const response = await fetch(`${API_URL}/profile/resume`);
  if (!response.ok) throw new Error('Resume is not available');

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Vinish_Purohit_Resume.pdf';
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

export const fetchProfile = async (): Promise<Profile> => {
  const response = await fetch(`${API_URL}/profile`);
  if (!response.ok) throw new Error('Failed to fetch profile');
  return response.json(); // { resume_url: '...', theme_color: '...' }
};

export const updateProfile = async (data: Profile, token: string) => {
  const response = await fetch(`${API_URL}/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update profile');
  return response.json();
};

async function readError(response: Response, fallback: string) {
  try {
    const body = await response.json();
    if (body.message) return body.message;
  } catch {
    // The server did not return JSON.
  }
  return fallback;
}

export const fetchExperiences = async (): Promise<ExperienceItem[]> => {
  const response = await fetch(`${API_URL}/experience`);
  if (!response.ok) throw new Error('Failed to fetch experience');
  return response.json();
};

export const saveExperience = async (item: Partial<ExperienceItem>, token: string, id?: string) => {
  const response = await fetch(`${API_URL}/experience${id ? `/${id}` : ''}`, {
    method: id ? 'PUT' : 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(item),
  });
  if (!response.ok) throw new Error(await readError(response, 'Failed to save experience'));
  return response.json();
};

export const deleteExperience = async (id: string, token: string) => {
  const response = await fetch(`${API_URL}/experience/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Failed to delete experience');
  return response.json();
};

export const fetchSkills = async (): Promise<SkillItem[]> => {
  const response = await fetch(`${API_URL}/skills`);
  if (!response.ok) throw new Error('Failed to fetch skills');
  return response.json();
};

export const saveSkill = async (item: Partial<SkillItem>, token: string, id?: string) => {
  const response = await fetch(`${API_URL}/skills${id ? `/${id}` : ''}`, {
    method: id ? 'PUT' : 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(item),
  });
  if (!response.ok) throw new Error(await readError(response, 'Failed to save skill'));
  return response.json();
};

export const deleteSkill = async (id: string, token: string) => {
  const response = await fetch(`${API_URL}/skills/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Failed to delete skill');
  return response.json();
};

export const deleteEnquiry = async (id: string, token: string) => {
  const response = await fetch(`${API_URL}/enquiries/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Failed to delete enquiry');
  return response.json();
};

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch(`${API_URL}/upload`, {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) throw new Error('Failed to upload file');
  const data = await response.json();
  if (typeof data.url === 'string' && /^https?:\/\//i.test(data.url)) return data.url;
  const path = typeof data.url === 'string' && data.url.startsWith('/') ? data.url : `/${data.url || ''}`;
  return `${apiOrigin()}${path}`;
};
