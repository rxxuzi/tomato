import { Post, User } from '../types/post';
import { API_CONFIG } from './config';
import { ENDPOINTS } from './endpoints';

export interface ApiError {
  error: string;
}

export interface ApiResponse {
  message: string;
}

export interface AuthResponse extends ApiResponse {
  user: User;
}

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
    const error: ApiError = await response.json();
    throw new Error(error.error);
  }

  return response.json();
};

export const api = {
  // Auth endpoints
  signup: (userId: string, password: string) =>
    fetchApi<AuthResponse>(ENDPOINTS.AUTH.SIGNUP, {
      method: 'POST',
      body: JSON.stringify({ user_id: userId, password }),
    }),

  signin: (userId: string, password: string) =>
    fetchApi<AuthResponse>(ENDPOINTS.AUTH.SIGNIN, {
      method: 'POST',
      body: JSON.stringify({ user_id: userId, password }),
    }),

  signout: () =>
    fetchApi<ApiResponse>(ENDPOINTS.AUTH.SIGNOUT, {
      method: 'POST',
    }),

  // Timeline
  getTimeline: (page: number = 1, limit: number = 20) =>
    fetchApi<Post[]>(`${ENDPOINTS.POSTS.TIMELINE}?page=${page}&limit=${limit}`),

  // Post actions
  createPost: (content: string) =>
    fetchApi<ApiResponse>(ENDPOINTS.POSTS.NEW, {
      method: 'POST',
      body: JSON.stringify({ content }),
    }),

  deletePost: (postId: string) =>
    fetchApi<ApiResponse>(ENDPOINTS.POSTS.DELETE, {
      method: 'POST',
      body: JSON.stringify({ post_id: postId }),
    }),

  editPost: (postId: string, content: string) =>
    fetchApi<ApiResponse>(ENDPOINTS.POSTS.EDIT, {
      method: 'POST',
      body: JSON.stringify({ post_id: postId, content }),
    }),

  toggleLike: (postId: string) =>
    fetchApi<ApiResponse>(ENDPOINTS.POSTS.LIKE, {
      method: 'POST',
      body: JSON.stringify({ post_id: postId }),
    }),

  repost: (postId: string) =>
    fetchApi<ApiResponse>(ENDPOINTS.POSTS.RETWEET, {
      method: 'POST',
      body: JSON.stringify({ post_id: postId }),
    }),

  searchPosts: (keyword: string) =>
    fetchApi<Post[]>(ENDPOINTS.POSTS.SEARCH, {
      method: 'POST',
      body: JSON.stringify({ keyword }),
    }),

  reply: (postId: string, content: string) =>
    fetchApi<ApiResponse>(ENDPOINTS.POSTS.REPLY, {
      method: 'POST',
      body: JSON.stringify({ post_id: postId, content }),
    }),
};