import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';
import { Logo } from '@/components/header/Logo';

export function AuthScreen() {
  const [isSignIn, setIsSignIn] = useState(true);
  const { login } = useAuth();

  const handleAuthSuccess = () => {
    login();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Logo />
          <h2 className="mt-4 text-gray-600">Share your thoughts</h2>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm">
          {isSignIn ? (
            <SignInForm onSuccess={handleAuthSuccess} />
          ) : (
            <SignUpForm onSuccess={() => setIsSignIn(true)} />
          )}

          <div className="mt-6 text-center text-sm">
            {isSignIn ? (
              <p>
                Don't have an account?{' '}
                <button
                  onClick={() => setIsSignIn(false)}
                  className="text-red-500 hover:text-red-600"
                >
                  Sign up
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  onClick={() => setIsSignIn(true)}
                  className="text-red-500 hover:text-red-600"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}