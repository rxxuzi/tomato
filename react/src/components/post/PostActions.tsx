import React from 'react';
import { Heart, Repeat2, Edit2 } from 'lucide-react';

interface PostActionsProps {
  isLiked: boolean;
  isReposted: boolean;
  likes: number;
  reposts: number;
  onLike: () => void;
  onRepost: () => void;
  onEdit?: () => void;
  showEdit?: boolean;
}

export const PostActions: React.FC<PostActionsProps> = ({
  isLiked,
  isReposted,
  likes,
  reposts,
  onLike,
  onRepost,
  onEdit,
  showEdit,
}) => {
  return (
    <div className="flex items-center space-x-6 mt-3">
      <button
        onClick={onLike}
        className={`flex items-center space-x-2 ${
          isLiked ? 'text-red-600' : 'text-gray-500'
        } hover:text-red-600`}
      >
        <Heart size={20} className={isLiked ? 'fill-current' : ''} />
        <span>{likes}</span>
      </button>
      <button
        onClick={onRepost}
        className={`flex items-center space-x-2 ${
          isReposted ? 'text-green-600' : 'text-gray-500'
        } hover:text-green-600`}
      >
        <Repeat2 size={20} />
        <span>{reposts}</span>
      </button>
      {showEdit && onEdit && (
        <button
          onClick={onEdit}
          className="text-gray-500 hover:text-blue-600"
        >
          <Edit2 size={20} />
        </button>
      )}
    </div>
  );
};