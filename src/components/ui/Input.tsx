import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export function Input({ className, icon, ...props }: InputProps) {
  return (
    <div className="relative">
      <input
        className={cn(
          'w-full rounded-full border border-gray-200 focus:outline-none focus:border-red-500 transition-colors',
          icon ? 'pl-10 pr-4' : 'px-4',
          'py-2',
          className
        )}
        {...props}
      />
      {icon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </span>
      )}
    </div>
  );
}