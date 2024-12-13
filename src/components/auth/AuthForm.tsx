import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { THEME } from '../../config/theme.config';

export const AuthForm: React.FC = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const { signin, signup, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isSignup) {
        await signup(userId, password);
      } else {
        await signin(userId, password);
      }
    } catch (error) {
      console.error('Auth error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-sm px-8">
        <div className="text-center mb-10">
          <div 
            className="w-16 h-16 rounded-full mx-auto mb-6 shadow-lg"
            style={{ backgroundColor: THEME.colors.primary }}
          />
          <h1 className="text-4xl font-bold mb-2" style={{ color: THEME.colors.text.primary }}>
            Tomato
          </h1>
          <p className="text-sm" style={{ color: THEME.colors.text.secondary }}>
            Share your thoughts
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 rounded-md bg-red-50 border border-red-200">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <input
                type="text"
                required
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-red-500 transition-colors"
                placeholder="Username"
                style={{ backgroundColor: THEME.colors.surface }}
              />
            </div>
            <div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-red-500 transition-colors"
                placeholder="Password"
                style={{ backgroundColor: THEME.colors.surface }}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg text-white font-medium transition-transform hover:scale-[1.02] active:scale-[0.98]"
            style={{ backgroundColor: THEME.colors.primary }}
          >
            {isSignup ? 'Create account' : 'Sign in'}
          </button>

          <button
            type="button"
            onClick={() => setIsSignup(!isSignup)}
            className="w-full text-center text-sm font-medium transition-colors"
            style={{ color: THEME.colors.primary }}
          >
            {isSignup ? 'Already have an account?' : 'Create an account'}
          </button>
        </form>
      </div>
    </div>
  );
};