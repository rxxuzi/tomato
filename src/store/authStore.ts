import { create } from 'zustand';
import { AuthState, AuthCredentials } from '../types/auth';
import { api } from '../api/client';

export const useAuthStore = create<AuthState & {
  signin: (credentials: AuthCredentials) => Promise<void>;
  signup: (credentials: AuthCredentials) => Promise<void>;
  signout: () => Promise<void>;
  setError: (error: string | null) => void;
}>((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,

  signin: async ({ userId, password }) => {
    try {
      const response = await api.signin(userId, password);
      set({ user: response.user, isAuthenticated: true, error: null });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to sign in' });
      throw error;
    }
  },

  signup: async ({ userId, password }) => {
    try {
      const response = await api.signup(userId, password);
      set({ user: response.user, isAuthenticated: true, error: null });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to sign up' });
      throw error;
    }
  },

  signout: async () => {
    try {
      await api.signout();
      set({ user: null, isAuthenticated: false, error: null });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to sign out' });
      throw error;
    }
  },

  setError: (error) => set({ error }),
}));