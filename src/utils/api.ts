import { API_CONFIG } from '../config/api.config';
import { ApiResponse, AuthResponse } from '../types/api';
import { Post } from '../types/post';

const fetchApi = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }

  return response.json();
};

export const api = {
  auth: {
    signin: (userId: string, password: string) =>
      fetchApi<AuthResponse>('/signin', {
        method: 'POST',
        body: JSON.stringify({ user_id: userId, password }),
      }),

    signup: (userId: string, password: string) =>
      fetchApi<AuthResponse>('/signup', {
        method: 'POST',
        body: JSON.stringify({ user_id: userId, password }),
      }),

    signout: () =>
      fetchApi<ApiResponse>('/signout', { method: 'POST' }),
  },

  posts: {
    getTimeline: (page: number = 1, limit: number = 20) =>
      fetchApi<Post[]>(`/tl?page=${page}&limit=${limit}`),

    create: (content: string) =>
      fetchApi<ApiResponse>('/p/new', {
        method: 'POST',
        body: JSON.stringify({ content }),
      }),

    delete: (postId: string) =>
      fetchApi<ApiResponse>('/p/delete', {
        method: 'POST',
        body: JSON.stringify({ post_id: postId }),
      }),

    edit: (postId: string, content: string) =>
      fetchApi<ApiResponse>('/p/edit', {
        method: 'POST',
        body: JSON.stringify({ post_id: postId, content }),
      }),

    like: (postId: string) =>
      fetchApi<ApiResponse>('/p/like', {
        method: 'POST',
        body: JSON.stringify({ post_id: postId }),
      }),

    repost: (postId: string) =>
      fetchApi<ApiResponse>('/p/retweet', {
        method: 'POST',
        body: JSON.stringify({ post_id: postId }),
      }),

    search: (keyword: string) =>
      fetchApi<Post[]>('/p/search', {
        method: 'POST',
        body: JSON.stringify({ keyword }),
      }),
  },
};