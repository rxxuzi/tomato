const API_BASE_URL = 'http://10.133.0.61:8080';

export async function signUp(userId: string, password: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: userId, password }),
  });

  if (!response.ok) {
    throw new Error('Failed to sign up');
  }
}

export async function signIn(userId: string, password: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: userId, password }),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to sign in');
  }
}

export async function signOut(): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/signout`, {
    method: 'POST',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to sign out');
  }
}

export async function getProfile(): Promise<Profile> {
  const response = await fetch(`${API_BASE_URL}/profile`, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch profile');
  }

  return response.json();
}

export async function createPost(content: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/p/new`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ content }),
  });

  if (!response.ok) {
    throw new Error('Failed to create post');
  }
}

export async function getTimeline(): Promise<Post[]> {
  const response = await fetch(`${API_BASE_URL}/api/tl`);

  if (!response.ok) {
    throw new Error('Failed to fetch timeline');
  }

  return response.json();
}