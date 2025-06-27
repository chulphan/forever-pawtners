import React from 'react';

export default function PawDetailSkeleton() {
  return (
    <div className="flex flex-col p-6 w-full items-center animate-pulse">
      <div className="grid lg:grid-cols-2 gap-2 lg:max-w-[900px] w-full">
        {/* Image skeleton */}
        <div className="relative h-[250px] lg:h-full bg-gray-200 rounded" />
        {/* Details skeleton */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <div className="h-7 w-40 bg-gray-200 rounded" />
            <div className="h-8 w-8 bg-gray-200 rounded-full" />
          </div>
          <div className="flex gap-4">
            <div className="h-5 w-24 bg-gray-200 rounded" />
            <div className="h-5 w-32 bg-gray-200 rounded" />
          </div>
          <div className="h-5 w-40 bg-gray-200 rounded" />
          <div className="h-5 w-32 bg-gray-200 rounded" />
          <div className="h-5 w-16 bg-gray-200 rounded" />
          <div className="h-5 w-16 bg-gray-200 rounded" />
          <div className="h-5 w-16 bg-gray-200 rounded" />
          <div className="h-5 w-24 bg-gray-200 rounded" />
          <div className="h-5 w-32 bg-gray-200 rounded" />
          <div className="h-5 w-32 bg-gray-200 rounded" />
          <div className="h-5 w-48 bg-gray-200 rounded" />
          <div className="h-5 w-32 bg-gray-200 rounded" />
          <div className="h-5 w-32 bg-gray-200 rounded" />
          <div className="h-5 w-32 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}
