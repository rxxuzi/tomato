import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

interface PostContentProps {
  content: string;
}

export const PostContent: React.FC<PostContentProps> = ({ content }) => {
  const renderContent = (text: string) => {
    const parts = text.split(/(\$\$.*?\$\$|\$.*?\$)/g);
    return parts.map((part, index) => {
      if (part.startsWith('$$') && part.endsWith('$$')) {
        return <BlockMath key={index}>{part.slice(2, -2)}</BlockMath>;
      } else if (part.startsWith('$') && part.endsWith('$')) {
        return <InlineMath key={index}>{part.slice(1, -1)}</InlineMath>;
      }
      return <span key={index}>{part}</span>;
    });
  };

  return <div className="mt-2">{renderContent(content)}</div>;
};