import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface NavItemProps {
  icon: LucideIcon;
  label: string;
}

export function NavItem({ icon: Icon, label }: NavItemProps) {
  return (
    <li>
      <Button variant="ghost" className="w-full justify-start gap-3">
        <Icon className="w-5 h-5" />
        <span>{label}</span>
      </Button>
    </li>
  );
}