import { Post, User } from '../types/post';

const API_BASE = 'http://localhost:9300/api';

export interface ApiError {
  error: string;
}

export interface ApiResponse {
  message: string;
}

export const api = {
  // Auth
  async signup(userId: string, password: string): Promise<ApiResponse> {
    const formData = new FormData();
    formData.append('user_id', userId);
    formData.append('password', password);

    const response = await fetch(`${API_BASE}/signup`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.error);
    }

    return response.json();
  },

  async signin(userId: string, password: string): Promise<ApiResponse> {
    const formData = new FormData();
    formData.append('user_id', userId);
    formData.append('password', password);

    const response = await fetch(`${API_BASE}/signin`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.error);
    }

    return response.json();
  },

  async signout(): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE}/signout`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.error);
    }

    return response.json();
  },

  // Posts
  async createPost(content: string): Promise<ApiResponse> {
    const formData = new FormData();
    formData.append('content', content);

    const response = await fetch(`${API_BASE}/p/new`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.error);
    }

    return response.json();
  },

  async deletePost(postId: string): Promise<ApiResponse> {
    const formData = new FormData();
    formData.append('post_id', postId);

    const response = await fetch(`${API_BASE}/p/delete`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.error);
    }

    return response.json();
  },

  async editPost(postId: string, content: string): Promise<ApiResponse> {
    const formData = new FormData();
    formData.append('post_id', postId);
    formData.append('content', content);

    const response = await fetch(`${API_BASE}/p/edit`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.error);
    }

    return response.json();
  },

  async toggleLike(postId: string): Promise<ApiResponse> {
    const formData = new FormData();
    formData.append('post_id', postId);

    const response = await fetch(`${API_BASE}/p/like`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.error);
    }

    return response.json();
  },

  async repost(postId: string): Promise<ApiResponse> {
    const formData = new FormData();
    formData.append('post_id', postId);

    const response = await fetch(`${API_BASE}/p/retweet`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.error);
    }

    return response.json();
  },

  async searchPosts(keyword: string): Promise<Post[]> {
    const formData = new FormData();
    formData.append('keyword', keyword);

    const response = await fetch(`${API_BASE}/p/search`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.error);
    }

    return response.json();
  },

  async reply(postId: string, content: string): Promise<ApiResponse> {
    const formData = new FormData();
    formData.append('post_id', postId);
    formData.append('content', content);

    const response = await fetch(`${API_BASE}/p/reply`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.error);
    }

    return response.json();
  },
};