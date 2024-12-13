import React from 'react';

interface StatsItemProps {
  value: number | string;
  label: string;
}

function StatsItem({ value, label }: StatsItemProps) {
  return (
    <div>
      <div className="font-semibold">{value}</div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  );
}

export function ProfileStats() {
  return (
    <div className="grid grid-cols-3 gap-4 text-center">
      <StatsItem value={245} label="Posts" />
      <StatsItem value="12.4k" label="Followers" />
      <StatsItem value={1024} label="Following" />
    </div>
  );
}