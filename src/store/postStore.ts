import { create } from 'zustand';
import { Post } from '../types/post';
import { api } from '../api/client';

interface PostState {
  posts: Post[];
  loading: boolean;
  error: string | null;
  page: number;
}

export const usePostStore = create<PostState & {
  fetchPosts: () => Promise<void>;
  createPost: (content: string) => Promise<void>;
  toggleLike: (postId: string) => Promise<void>;
  toggleRepost: (postId: string) => Promise<void>;
  loadMore: () => void;
}>((set, get) => ({
  posts: [],
  loading: false,
  error: null,
  page: 1,

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

  createPost: async (content: string) => {
    try {
      await api.createPost(content);
      get().fetchPosts();
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to create post' });
    }
  },

  toggleLike: async (postId: string) => {
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

  toggleRepost: async (postId: string) => {
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
}));