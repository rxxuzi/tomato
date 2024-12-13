import { create } from 'zustand';
import { Post, User } from '../types/post';
import { api } from '../api/client';

interface Store {
  posts: Post[];
  currentUser: User | null;
  isAuthenticated: boolean;
  error: string | null;
  
  // Auth actions
  signup: (userId: string, password: string) => Promise<void>;
  signin: (userId: string, password: string) => Promise<void>;
  signout: () => Promise<void>;
  
  // Post actions
  addPost: (content: string) => Promise<void>;
  deletePost: (postId: string) => Promise<void>;
  toggleLike: (postId: string) => Promise<void>;
  toggleRepost: (postId: string) => Promise<void>;
  editPost: (postId: string, content: string) => Promise<void>;
  searchPosts: (keyword: string) => Promise<void>;
  reply: (postId: string, content: string) => Promise<void>;
  
  // UI actions
  setError: (error: string | null) => void;
}

export const useStore = create<Store>((set, get) => ({
  posts: [],
  currentUser: null,
  isAuthenticated: false,
  error: null,

  signup: async (userId, password) => {
    try {
      const response = await api.signup(userId, password);
      set({
        currentUser: response.user,
        isAuthenticated: true,
        error: null,
      });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to signup' });
      throw error;
    }
  },

  signin: async (userId, password) => {
    try {
      const response = await api.signin(userId, password);
      set({
        currentUser: response.user,
        isAuthenticated: true,
        error: null,
      });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to signin' });
      throw error;
    }
  },

  signout: async () => {
    try {
      await api.signout();
      set({
        isAuthenticated: false,
        currentUser: null,
        posts: [],
        error: null,
      });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to signout' });
      throw error;
    }
  },

  addPost: async (content) => {
    try {
      await api.createPost(content);
      const timeline = await api.getTimeline(1);
      set({ posts: timeline, error: null });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to create post' });
      throw error;
    }
  },

  deletePost: async (postId) => {
    try {
      await api.deletePost(postId);
      set(state => ({
        posts: state.posts.filter(post => post.id !== postId),
        error: null,
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to delete post' });
      throw error;
    }
  },

  toggleLike: async (postId) => {
    try {
      await api.toggleLike(postId);
      set(state => ({
        posts: state.posts.map(post =>
          post.id === postId
            ? {
                ...post,
                likes: post.isLiked ? post.likes - 1 : post.likes + 1,
                isLiked: !post.isLiked,
              }
            : post
        ),
        error: null,
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to toggle like' });
      throw error;
    }
  },

  toggleRepost: async (postId) => {
    try {
      await api.repost(postId);
      set(state => ({
        posts: state.posts.map(post =>
          post.id === postId
            ? {
                ...post,
                reposts: post.isReposted ? post.reposts - 1 : post.reposts + 1,
                isReposted: !post.isReposted,
              }
            : post
        ),
        error: null,
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to repost' });
      throw error;
    }
  },

  editPost: async (postId, content) => {
    try {
      await api.editPost(postId, content);
      set(state => ({
        posts: state.posts.map(post =>
          post.id === postId
            ? {
                ...post,
                content,
                updatedAt: new Date(),
              }
            : post
        ),
        error: null,
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to edit post' });
      throw error;
    }
  },

  searchPosts: async (keyword) => {
    try {
      const posts = await api.searchPosts(keyword);
      set({ posts, error: null });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to search posts' });
      throw error;
    }
  },

  reply: async (postId, content) => {
    try {
      await api.reply(postId, content);
      const timeline = await api.getTimeline(1);
      set({ posts: timeline, error: null });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to reply' });
      throw error;
    }
  },

  setError: (error) => set({ error }),
}));