import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { useStore } from '../store/useStore';

export const CreatePost: React.FC = () => {
  const [content, setContent] = useState('');
  const { addPost } = useStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      await addPost(content);
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-b border-gray-800 pb-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's happening?"
        className="w-full bg-transparent border-none resize-none focus:ring-0 text-white placeholder-gray-500"
        rows={3}
      />
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={!content.trim()}
          className="px-4 py-2 bg-blue-500 text-white rounded-full flex items-center space-x-2 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>Post</span>
          <Send size={18} />
        </button>
      </div>
    </form>
  );
};