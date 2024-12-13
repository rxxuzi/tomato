import { useCallback } from 'react';
import { useStore } from '../store/store';
import { api } from '../utils/api';

export const usePosts = () => {
  const { setPosts, updatePost, removePost, setError } = useStore();

  const fetchPosts = useCallback(async (page: number = 1) => {
    try {
      const posts = await api.posts.getTimeline(page);
      setPosts(posts);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch posts');
    }
  }, [setPosts, setError]);

  const createPost = useCallback(async (content: string) => {
    try {
      await api.posts.create(content);
      fetchPosts();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to create post');
    }
  }, [fetchPosts, setError]);

  const deletePost = useCallback(async (postId: string) => {
    try {
      await api.posts.delete(postId);
      removePost(postId);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to delete post');
    }
  }, [removePost, setError]);

  const editPost = useCallback(async (postId: string, content: string) => {
    try {
      await api.posts.edit(postId, content);
      updatePost(postId, { content });
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to edit post');
    }
  }, [updatePost, setError]);

  return {
    fetchPosts,
    createPost,
    deletePost,
    editPost,
  };
};