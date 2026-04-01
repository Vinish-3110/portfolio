const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://portfolio-d559.onrender.com/api';

export const fetchProjects = async () => {
  const response = await fetch(`${API_URL}/projects`);
  if (!response.ok) throw new Error('Failed to fetch projects');
  return response.json();
};

export const createProject = async (project: any, token: string) => {
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

export const deleteProject = async (id: number, token: string) => {
  const response = await fetch(`${API_URL}/projects/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    },
  });
  if (!response.ok) throw new Error('Failed to delete project');
  return response.json();
};

export const loginAdmin = async (credentials: any) => {
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
export const submitEnquiry = async (enquiry: any) => {
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

export const fetchEnquiries = async (token: string) => {
  const response = await fetch(`${API_URL}/enquiries`, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
  });
  if (!response.ok) throw new Error('Failed to fetch enquiries');
  return response.json();
};

// Profile / Resume
export const fetchProfile = async () => {
  const response = await fetch(`${API_URL}/profile`);
  if (!response.ok) throw new Error('Failed to fetch profile');
  return response.json(); // { resume_url: '...', theme_color: '...' }
};

export const updateProfile = async (data: any, token: string) => {
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
