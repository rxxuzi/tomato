import React from 'react';
import { Check, X } from 'lucide-react';

interface PostEditorProps {
  content: string;
  onChange: (content: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export const PostEditor: React.FC<PostEditorProps> = ({
  content,
  onChange,
  onSave,
  onCancel,
}) => {
  return (
    <div className="mt-2">
      <textarea
        value={content}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md"
        rows={3}
      />
      <div className="flex justify-end space-x-2 mt-2">
        <button
          onClick={onCancel}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
        >
          <X size={20} />
        </button>
        <button
          onClick={onSave}
          className="p-2 text-green-600 hover:bg-green-50 rounded-full"
        >
          <Check size={20} />
        </button>
      </div>
    </div>
  );
};