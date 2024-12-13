import { useCallback } from 'react';
import { useStore } from '../store/store';
import { api } from '../utils/api';

export const useAuth = () => {
  const { setUser, setError, clearUser } = useStore();

  const signin = useCallback(async (userId: string, password: string) => {
    try {
      const response = await api.auth.signin(userId, password);
      setUser(response.user);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to sign in');
      throw error;
    }
  }, [setUser, setError]);

  const signup = useCallback(async (userId: string, password: string) => {
    try {
      const response = await api.auth.signup(userId, password);
      setUser(response.user);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to sign up');
      throw error;
    }
  }, [setUser, setError]);

  const signout = useCallback(async () => {
    try {
      await api.auth.signout();
      clearUser();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to sign out');
      throw error;
    }
  }, [clearUser, setError]);

  return { signin, signup, signout };
};