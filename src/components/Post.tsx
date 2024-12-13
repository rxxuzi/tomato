import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Heart, Repeat2, Edit2, Check, X } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import { Post as PostType } from '../types/post';
import { useStore } from '../store/useStore';

interface PostProps {
  post: PostType;
}

export const Post: React.FC<PostProps> = ({ post }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(post.content);
  const { toggleLike, toggleRepost, editPost } = useStore();

  const handleEdit = () => {
    editPost(post.id, editContent);
    setIsEditing(false);
  };

  const renderContent = (content: string) => {
    const parts = content.split(/(\$\$.*?\$\$|\$.*?\$)/g);
    return parts.map((part, index) => {
      if (part.startsWith('$$') && part.endsWith('$$')) {
        return <BlockMath key={index}>{part.slice(2, -2)}</BlockMath>;
      } else if (part.startsWith('$') && part.endsWith('$')) {
        return <InlineMath key={index}>{part.slice(1, -1)}</InlineMath>;
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4">
      <div className="flex items-start space-x-3">
        <img
          src={post.author.avatar}
          alt={post.author.name}
          className="w-12 h-12 rounded-full"
        />
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <span className="font-semibold">{post.author.name}</span>
            <span className="text-gray-500">{post.author.handle}</span>
            <span className="text-gray-400">·</span>
            <span className="text-gray-500">
              {formatDistanceToNow(post.createdAt, { addSuffix: true })}
            </span>
          </div>
          
          {isEditing ? (
            <div className="mt-2">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                rows={3}
              />
              <div className="flex justify-end space-x-2 mt-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
                >
                  <X size={20} />
                </button>
                <button
                  onClick={handleEdit}
                  className="p-2 text-green-600 hover:bg-green-50 rounded-full"
                >
                  <Check size={20} />
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-2">{renderContent(post.content)}</div>
          )}

          <div className="flex items-center space-x-6 mt-3">
            <button
              onClick={() => toggleLike(post.id)}
              className={`flex items-center space-x-2 ${
                post.isLiked ? 'text-red-600' : 'text-gray-500'
              } hover:text-red-600`}
            >
              <Heart
                size={20}
                className={post.isLiked ? 'fill-current' : ''}
              />
              <span>{post.likes}</span>
            </button>
            <button
              onClick={() => toggleRepost(post.id)}
              className={`flex items-center space-x-2 ${
                post.isReposted ? 'text-green-600' : 'text-gray-500'
              } hover:text-green-600`}
            >
              <Repeat2 size={20} />
              <span>{post.reposts}</span>
            </button>
            {post.author.id === useStore.getState().currentUser.id && (
              <button
                onClick={() => setIsEditing(true)}
                className="text-gray-500 hover:text-blue-600"
              >
                <Edit2 size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};