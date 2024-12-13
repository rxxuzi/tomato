import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Post as PostType } from '../../types/post';
import { useStore } from '../../store/useStore';
import { PostContent } from './PostContent';
import { PostActions } from './PostActions';
import { PostEditor } from './PostEditor';

interface PostProps {
  post: PostType;
}

export const Post: React.FC<PostProps> = ({ post }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(post.content);
  const { toggleLike, toggleRepost, editPost, currentUser } = useStore();

  const handleEdit = () => {
    editPost(post.id, editContent);
    setIsEditing(false);
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
            <PostEditor
              content={editContent}
              onChange={setEditContent}
              onSave={handleEdit}
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <PostContent content={post.content} />
          )}

          <PostActions
            isLiked={post.isLiked}
            isReposted={post.isReposted}
            likes={post.likes}
            reposts={post.reposts}
            onLike={() => toggleLike(post.id)}
            onRepost={() => toggleRepost(post.id)}
            onEdit={() => setIsEditing(true)}
            showEdit={post.author.id === currentUser.id}
          />
        </div>
      </div>
    </div>
  );
};