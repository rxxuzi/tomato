import React from 'react';
import { Heart, MessageCircle, Share2 } from 'lucide-react';

interface TimelineProps {
  className?: string;
}

function Timeline({ className }: TimelineProps) {
  const posts = [
    {
      id: 1,
      author: 'John Doe',
      username: '@johndoe',
      content: 'Just discovered this amazing new recipe! 🍅 #cooking',
      timestamp: '2h ago',
      likes: 24,
      comments: 5,
    },
    {
      id: 2,
      author: 'Jane Smith',
      username: '@janesmith',
      content: 'Working on a new project. Can\'t wait to share it with everyone! 💻',
      timestamp: '4h ago',
      likes: 15,
      comments: 3,
    },
  ];

  return (
    <div className={className}>
      <div className="mb-4">
        <textarea
          placeholder="What's on your mind?"
          className="w-full p-4 rounded-lg border border-gray-200 focus:outline-none focus:border-red-500 resize-none"
          rows={3}
        />
        <div className="flex justify-end mt-2">
          <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
            Post
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <article key={post.id} className="p-4 rounded-lg border border-gray-100">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium">{post.author}</h3>
                <span className="text-sm text-gray-500">{post.username}</span>
              </div>
              <span className="text-sm text-gray-500">{post.timestamp}</span>
            </div>
            <p className="mt-2">{post.content}</p>
            <div className="flex gap-6 mt-4">
              <button className="flex items-center gap-2 text-gray-500 hover:text-red-500">
                <Heart className="w-5 h-5" />
                <span>{post.likes}</span>
              </button>
              <button className="flex items-center gap-2 text-gray-500 hover:text-red-500">
                <MessageCircle className="w-5 h-5" />
                <span>{post.comments}</span>
              </button>
              <button className="flex items-center gap-2 text-gray-500 hover:text-red-500">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}