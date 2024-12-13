import React from 'react';
import { CircleIcon } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <CircleIcon className="w-8 h-8 text-red-500" />
      <span className="text-xl font-semibold">Tomato</span>
    </div>
  );
}