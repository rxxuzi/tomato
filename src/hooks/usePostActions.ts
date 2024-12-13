import { useCallback } from 'react';
import { useStore } from '../store/store';
import { api } from '../utils/api';

export const usePostActions = () => {
  const { updatePost, setError } = useStore();

  const toggleLike = useCallback(async (postId: string) => {
    try {
      await api.posts.like(postId);
      updatePost(postId, (post) => ({
        ...post,
        isLiked: !post.isLiked,
        likes: post.isLiked ? post.likes - 1 : post.likes + 1,
      }));
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to toggle like');
    }
  }, [updatePost, setError]);

  const toggleRepost = useCallback(async (postId: string) => {
    try {
      await api.posts.repost(postId);
      updatePost(postId, (post) => ({
        ...post,
        isReposted: !post.isReposted,
        reposts: post.isReposted ? post.reposts - 1 : post.reposts + 1,
      }));
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to toggle repost');
    }
  }, [updatePost, setError]);

  return {
    toggleLike,
    toggleRepost,
  };
};