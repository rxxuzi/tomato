import React from 'react';
import { Home, Bell, MessageSquare, User, Settings } from 'lucide-react';

interface NavigationProps {
  className?: string;
}

function Navigation({ className }: NavigationProps) {
  const navItems = [
    { icon: Home, label: 'Home' },
    { icon: Bell, label: 'Notifications' },
    { icon: MessageSquare, label: 'Messages' },
    { icon: User, label: 'Profile' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className={className}>
      <div className="sticky top-4">
        <ul className="space-y-2">
          {navItems.map(({ icon: Icon, label }) => (
            <li key={label}>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-red-50 rounded-lg transition-colors">
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}