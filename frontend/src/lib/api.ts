const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

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
  const response = await fetch(`${API_URL}/enquiry`, {
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
  const response = await fetch(`${API_URL}/enquiry`, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
  });
  if (!response.ok) throw new Error('Failed to fetch enquiries');
  return response.json();
};

// Profile / Resume
export const fetchResume = async () => {
  const response = await fetch(`${API_URL}/profile`);
  if (!response.ok) throw new Error('Failed to fetch resume');
  return response.json(); // { resume_url: '...' }
};

export const updateResume = async (resumeUrl: string, token: string) => {
  const response = await fetch(`${API_URL}/profile/resume`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ resume_url: resumeUrl }),
  });
  if (!response.ok) throw new Error('Failed to update resume');
  return response.json();
};
