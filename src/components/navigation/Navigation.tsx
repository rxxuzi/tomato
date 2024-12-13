import React from 'react';
import { Home, Bell, MessageSquare, User, Settings } from 'lucide-react';
import { NavItem } from './NavItem';
import { cn } from '@/lib/utils';

interface NavigationProps {
  className?: string;
}

const navItems = [
  { icon: Home, label: 'Home' },
  { icon: Bell, label: 'Notifications' },
  { icon: MessageSquare, label: 'Messages' },
  { icon: User, label: 'Profile' },
  { icon: Settings, label: 'Settings' },
];

export function Navigation({ className }: NavigationProps) {
  return (
    <nav className={cn('sticky top-4', className)}>
      <ul className="space-y-2">
        {navItems.map((item) => (
          <NavItem key={item.label} {...item} />
        ))}
      </ul>
    </nav>
  );
}