import React from 'react';
import { Search } from 'lucide-react';
import { Logo } from './Logo';
import { Input } from '@/components/ui/Input';

export function Header() {
  return (
    <header className="border-b border-gray-100">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Logo />
        <h1 className="text-lg font-medium">Share your thoughts</h1>
        <Input
          type="search"
          placeholder="Search..."
          icon={<Search className="w-5 h-5" />}
          className="w-64"
        />
      </div>
    </header>
  );
}