import React, { useEffect, useState } from 'react';
import { Post } from './post/Post';
import { api } from '../api/client';
import { Post as PostType } from '../types/post';

export const Timeline: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const fetchPosts = async () => {
    try {
      const response = await api.getTimeline(page);
      setPosts(prev => [...prev, ...response]);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch timeline:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page]);

  if (loading && posts.length === 0) {
    return <div className="flex justify-center py-8">Loading...</div>;
  }

  return (
    <div className="space-y-4 py-4">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      <button
        onClick={() => setPage(p => p + 1)}
        className="w-full py-3 text-blue-400 hover:bg-gray-900 rounded-lg transition"
      >
        Load more
      </button>
    </div>
  );
};