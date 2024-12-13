import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { createPost } from '@/lib/api';

export function PostComposer() {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim()) return;
    
    try {
      setIsLoading(true);
      await createPost(content);
      setContent('');
    } catch (error) {
      console.error('Failed to create post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mb-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        className="w-full p-4 rounded-lg border border-gray-200 focus:outline-none focus:border-red-500 resize-none"
        rows={3}
      />
      <div className="flex justify-end mt-2">
        <Button onClick={handleSubmit} disabled={isLoading || !content.trim()}>
          {isLoading ? 'Posting...' : 'Post'}
        </Button>
      </div>
    </div>
  );
}