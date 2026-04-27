const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8000/api/v1';

export const authStorage = {
  getToken() {
    return localStorage.getItem('talent_pulse_token');
  },
  setToken(token) {
    localStorage.setItem('talent_pulse_token', token);
  },
  clearToken() {
    localStorage.removeItem('talent_pulse_token');
  },
};

async function request(path, options = {}) {
  const headers = {
    ...(options.body ? { 'Content-Type': 'application/json' } : {}),
    ...(options.headers || {}),
  };

  const token = authStorage.getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers,
    });
  } catch {
    throw new Error(`Unable to connect to API at ${API_BASE_URL}. Ensure the backend server is running and CORS is configured.`);
  }

  if (!response.ok) {
    let message = 'Request failed';
    try {
      const data = await response.json();
      message = data.detail || data.message || message;
    } catch {
      message = response.statusText || message;
    }
    throw new Error(message);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export function login(payload) {
  return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function register(payload) {
  return request('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function getMe() {
  return request('/users/me');
}

export function updateMe(payload) {
  return request('/users/me', {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export function listJobs(params = {}) {
  const searchParams = new URLSearchParams();
  if (params.q) searchParams.set('q', params.q);
  if (params.status && params.status !== 'all') searchParams.set('status', params.status);
  if (params.onlyMine) searchParams.set('only_mine', 'true');
  return request(`/jobs${searchParams.toString() ? `?${searchParams.toString()}` : ''}`);
}

export function createJob(payload) {
  return request('/jobs', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function updateJob(jobId, payload) {
  return request(`/jobs/${jobId}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export function deleteJob(jobId) {
  return request(`/jobs/${jobId}`, {
    method: 'DELETE',
  });
}

export function getRecommendations() {
  return request('/recommendations');
}

export function listNotifications() {
  return request('/notifications');
}

export function markNotificationRead(notificationId) {
  return request(`/notifications/${notificationId}/read`, {
    method: 'PATCH',
  });
}
