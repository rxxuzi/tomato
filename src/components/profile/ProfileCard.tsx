import React, { useEffect, useState } from 'react';
import { Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getProfile } from '@/lib/api';
import type { Profile } from '@/types/api';
import { format } from 'date-fns';

interface ProfileCardProps {
  className?: string;
}

export function ProfileCard({ className }: ProfileCardProps) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getProfile();
        setProfile(profileData);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (isLoading) {
    return <div className="text-center py-8">Loading profile...</div>;
  }

  if (!profile) {
    return null;
  }

  return (
    <div className={cn('sticky top-4', className)}>
      <div className="p-4 rounded-lg border border-gray-100">
        <div>
          <h2 className="font-semibold">{profile.name}</h2>
        </div>
        
        <div className="mt-4">
          <p className="text-gray-700">{profile.description}</p>
        </div>
        
        <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
          <Calendar className="w-4 h-4" />
          <span>Joined {format(new Date(profile.created_at), 'MMMM yyyy')}</span>
        </div>
      </div>
    </div>
  );
}