import React from 'react';
import { useStore } from '../../store/useStore';

export const Header: React.FC = () => {
  const { currentUser } = useStore();

  return (
    <header className="bg-white border-b border-gray-200 fixed w-full top-0 z-10">
      <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-red-500" />
          <h1 className="text-xl font-bold text-gray-900">Tomato</h1>
        </div>
        <div className="flex items-center space-x-3">
          <img
            src={currentUser?.avatar}
            alt={currentUser?.name}
            className="w-8 h-8 rounded-full"
          />
          <span className="font-medium">{currentUser?.name}</span>
        </div>
      </div>
    </header>
  );
};