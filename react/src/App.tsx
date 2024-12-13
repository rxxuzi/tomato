import React from 'react';
import { Header } from './components/layout/Header';
import { CreatePost } from './components/CreatePost';
import { Post } from './components/post/Post';
import { AuthForm } from './components/auth/AuthForm';
import { useStore } from './store/useStore';

function App() {
  const { isAuthenticated, posts } = useStore();

  if (!isAuthenticated) {
    return <AuthForm />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-2xl mx-auto px-4 pt-20">
        <CreatePost />
        <div className="space-y-4">
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;