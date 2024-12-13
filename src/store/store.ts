import { create } from 'zustand';
import { Post, User } from '../types/post';
import { api } from '../api/client';

interface Store {
  // Auth State
  currentUser: User | null;
  isAuthenticated: boolean;
  error: string | null;
  
  // Posts State
  posts: Post[];
  loading: boolean;
  page: number;

  // Auth Actions
  signin: (userId: string, password: string) => Promise<void>;
  signup: (userId: string, password: string) => Promise<void>;
  signout: () => Promise<void>;
  
  // Post Actions
  fetchPosts: () => Promise<void>;
  createPost: (content: string) => Promise<void>;
  toggleLike: (postId: string) => Promise<void>;
  toggleRepost: (postId: string) => Promise<void>;
  loadMore: () => void;
  
  // UI Actions
  setError: (error: string | null) => void;
}

export const useStore = create<Store>((set, get) => ({
  // Initial State
  currentUser: null,
  isAuthenticated: false,
  error: null,
  posts: [],
  loading: false,
  page: 1,

  // Auth Actions
  signin: async (userId, password) => {
    try {
      const response = await api.signin(userId, password);
      set({
        currentUser: response.user,
        isAuthenticated: true,
        error: null
      });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to sign in' });
      throw error;
    }
  },

  signup: async (userId, password) => {
    try {
      const response = await api.signup(userId, password);
      set({
        currentUser: response.user,
        isAuthenticated: true,
        error: null
      });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to sign up' });
      throw error;
    }
  },

  signout: async () => {
    try {
      await api.signout();
      set({
        currentUser: null,
        isAuthenticated: false,
        posts: [],
        error: null
      });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to sign out' });
      throw error;
    }
  },

  // Post Actions
  fetchPosts: async () => {
    try {
      set({ loading: true });
      const { page } = get();
      const posts = await api.getTimeline(page);
      set((state) => ({
        posts: page === 1 ? posts : [...state.posts, ...posts],
        loading: false,
        error: null,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch posts',
        loading: false,
      });
    }
  },

  createPost: async (content) => {
    try {
      await api.createPost(content);
      get().fetchPosts();
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to create post' });
    }
  },

  toggleLike: async (postId) => {
    try {
      await api.toggleLike(postId);
      set((state) => ({
        posts: state.posts.map((post) =>
          post.id === postId
            ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
            : post
        ),
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to toggle like' });
    }
  },

  toggleRepost: async (postId) => {
    try {
      await api.repost(postId);
      set((state) => ({
        posts: state.posts.map((post) =>
          post.id === postId
            ? { ...post, isReposted: !post.isReposted, reposts: post.isReposted ? post.reposts - 1 : post.reposts + 1 }
            : post
        ),
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to toggle repost' });
    }
  },

  loadMore: () => set((state) => ({ page: state.page + 1 })),
  
  // UI Actions
  setError: (error) => set({ error }),
}));