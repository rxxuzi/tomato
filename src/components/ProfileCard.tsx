import React from 'react';
import { Calendar } from 'lucide-react';

interface ProfileCardProps {
  className?: string;
}

function ProfileCard({ className }: ProfileCardProps) {
  return (
    <div className={className}>
      <div className="sticky top-4">
        <div className="p-4 rounded-lg border border-gray-100">
          <div className="flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h2 className="font-semibold">John Doe</h2>
              <p className="text-sm text-gray-500">@johndoe</p>
            </div>
          </div>
          
          <div className="mt-4">
            <p className="text-gray-700">Software developer, food enthusiast, and amateur photographer 📸</p>
          </div>
          
          <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            <span>Joined December 2023</span>
          </div>
          
          <div className="mt-4 grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="font-semibold">245</div>
              <div className="text-sm text-gray-500">Posts</div>
            </div>
            <div>
              <div className="font-semibold">12.4k</div>
              <div className="text-sm text-gray-500">Followers</div>
            </div>
            <div>
              <div className="font-semibold">1,024</div>
              <div className="text-sm text-gray-500">Following</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}