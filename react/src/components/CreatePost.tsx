import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { useStore } from '../store/useStore';

export const CreatePost: React.FC = () => {
  const [content, setContent] = useState('');
  const { addPost } = useStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      addPost(content);
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Share your research insights... (Use $...$ for inline math and $$...$$ for block math)"
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
        rows={4}
      />
      <div className="flex justify-between items-center mt-3">
        <p className="text-sm text-gray-500">
          Support for LaTeX: Inline math with $...$ and block math with $$...$$
        </p>
        <button
          type="submit"
          disabled={!content.trim()}
          className="px-4 py-2 bg-red-500 text-white rounded-full flex items-center space-x-2 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>Post</span>
          <Send size={18} />
        </button>
      </div>
    </form>
  );
};