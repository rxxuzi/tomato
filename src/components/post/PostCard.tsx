import React from 'react';
import type { Post } from '@/types/api';
import { formatDistanceToNow } from 'date-fns';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="p-4 rounded-lg border border-gray-100">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-sm text-gray-500">User #{post.user_id}</span>
        </div>
        <span className="text-sm text-gray-500">
          {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
        </span>
      </div>
      <p className="mt-2">{post.content}</p>
    </article>
  );
}