export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://portfolio-d559.onrender.com/api';

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
  isFeatured?: boolean;
};

export type ProjectPayload = {
  title: string;
  description: string[];
  techs: string[];
  live_link?: string;
  github_link?: string;
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

export type Profile = {
  resume_url?: string;
  theme_color?: string;
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

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch(`${API_URL}/upload`, {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) throw new Error('Failed to upload file');
  const data = await response.json();
  const baseUrl = API_URL.replace('/api', '');
  return `${baseUrl}${data.url}`;
};
