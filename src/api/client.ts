// Production API Client - Connects directly to real backend API server & PostgreSQL
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const token = localStorage.getItem('onlyus_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options?.headers,
  };

  const url = endpoint.startsWith('http') ? endpoint : `${BACKEND_URL}/api${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Backend API request failed' }));
    throw new Error(errorData.message || `HTTP Error ${response.status}`);
  }

  return response.json();
}

export async function apiUpload<T>(endpoint: string, formData: FormData): Promise<T> {
  const token = localStorage.getItem('onlyus_token');
  const url = endpoint.startsWith('http') ? endpoint : `${BACKEND_URL}/api${endpoint}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Media Upload Failed' }));
    throw new Error(errorData.message || `HTTP Error ${response.status}`);
  }

  return response.json();
}
