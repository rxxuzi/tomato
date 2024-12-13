import React from 'react';
import { CircleIcon, Search } from 'lucide-react';

function Header() {
  return (
    <header className="border-b border-gray-100">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CircleIcon className="w-8 h-8 text-red-500" />
          <span className="text-xl font-semibold">Tomato</span>
        </div>
        
        <h1 className="text-lg font-medium">Share your thoughts</h1>
        
        <div className="relative">
          <input
            type="search"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:border-red-500"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>
    </header>
  );
}

export default Header;