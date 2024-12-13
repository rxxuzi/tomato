import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AuthScreen } from '@/components/auth/AuthScreen';
import { MainLayout } from '@/components/layout/MainLayout';

export function AppContent() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <MainLayout /> : <AuthScreen />;
}