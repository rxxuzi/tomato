import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { THEME } from '../../config/theme.config';

export const Header: React.FC = () => {
  const { signout } = useAuth();
  
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b z-50" style={{ borderColor: THEME.colors.border }}>
      <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div 
            className="w-8 h-8 rounded-full"
            style={{ backgroundColor: THEME.colors.primary }}
          />
          <span className="font-bold text-lg" style={{ color: THEME.colors.text.primary }}>
            Tomato
          </span>
        </div>
        
        <button
          onClick={signout}
          className="px-4 py-1.5 rounded-full text-sm font-medium transition-colors"
          style={{ 
            backgroundColor: THEME.colors.surface,
            color: THEME.colors.text.primary
          }}
        >
          Sign out
        </button>
      </div>
    </header>
  );
};