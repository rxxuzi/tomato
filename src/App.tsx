import React from 'react';
import { Header } from '@/components/header/Header';
import { Navigation } from '@/components/navigation/Navigation';
import { Timeline } from '@/components/timeline/Timeline';
import { ProfileCard } from '@/components/profile/ProfileCard';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 grid grid-cols-12 gap-6 mt-4">
        <Navigation className="col-span-3" />
        <Timeline className="col-span-6" />
        <ProfileCard className="col-span-3" />
      </main>
    </div>
  );
}

export default App;