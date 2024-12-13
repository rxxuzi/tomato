import React, { useEffect, useState } from 'react';
import { PostComposer } from '@/components/post/PostComposer';
import { PostCard } from '@/components/post/PostCard';
import { getTimeline } from '@/lib/api';
import type { Post } from '@/types/api';
import { cn } from '@/lib/utils';

interface TimelineProps {
  className?: string;
}

export function Timeline({ className }: TimelineProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const timelinePosts = await getTimeline();
        setPosts(timelinePosts);
      } catch (error) {
        console.error('Failed to fetch timeline:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return <div className="text-center py-8">Loading posts...</div>;
  }

  return (
    <div className={className}>
      <PostComposer />
      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}