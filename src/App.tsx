import React from 'react';
import { AuthForm } from './components/auth/AuthForm';
import { Timeline } from './components/Timeline';
import { Header } from './components/layout/Header';
import { useStore } from './store/store';

function App() {
  const { isAuthenticated } = useStore();

  if (!isAuthenticated) {
    return <AuthForm />;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="max-w-xl mx-auto px-4 pt-16">
        <Timeline />
      </main>
    </div>
  );
}

export default App;