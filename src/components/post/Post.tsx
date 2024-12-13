import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Heart, Repeat2 } from 'lucide-react';
import { Post as PostType } from '../../types/post';
import { useStore } from '../../store/useStore';

interface PostProps {
  post: PostType;
}

export const Post: React.FC<PostProps> = ({ post }) => {
  const { toggleLike, toggleRepost } = useStore();

  return (
    <article className="border-b border-gray-800 p-4 hover:bg-gray-900/50 transition">
      <div className="flex space-x-3">
        <img
          src={post.author.avatar}
          alt=""
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-1 text-gray-400">
            <span className="font-bold text-white">{post.author.name}</span>
            <span>@{post.author.handle}</span>
            <span>·</span>
            <time>{formatDistanceToNow(post.createdAt)} ago</time>
          </div>
          <p className="mt-2 text-white whitespace-pre-wrap">{post.content}</p>
          <div className="flex items-center justify-between mt-3 max-w-md text-gray-400">
            <button
              onClick={() => toggleLike(post.id)}
              className={`flex items-center space-x-2 group ${
                post.isLiked ? 'text-pink-600' : ''
              }`}
            >
              <Heart
                size={18}
                className={`group-hover:text-pink-600 ${
                  post.isLiked ? 'fill-current' : ''
                }`}
              />
              <span className="group-hover:text-pink-600">{post.likes}</span>
            </button>
            <button
              onClick={() => toggleRepost(post.id)}
              className={`flex items-center space-x-2 group ${
                post.isReposted ? 'text-green-600' : ''
              }`}
            >
              <Repeat2
                size={18}
                className="group-hover:text-green-600"
              />
              <span className="group-hover:text-green-600">{post.reposts}</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};