import React from 'react';

function SkeletonModal() {
  return (
    <div className="sm:max-w-[70%] xl:max-w-[60%] overflow-y-auto max-h-[550px] bg-white rounded-lg p-6 animate-pulse">
      <div className="flex flex-col w-full mt-3 text-left overflow-y-auto">
        <div className="flex justify-between items-center my-2">
          <div className="h-6 w-32 bg-gray-200 rounded" />
          <div className="h-8 w-8 bg-gray-200 rounded-full" />
        </div>
        <div className="mt-2 relative h-[400px] xl:h-[500px] bg-gray-200 rounded" />
        <div className="mt-2 flex gap-4">
          <div className="h-4 w-24 bg-gray-200 rounded" />
          <div className="h-4 w-32 bg-gray-200 rounded" />
        </div>
        <div className="flex gap-4 mt-2">
          <div className="h-4 w-40 bg-gray-200 rounded" />
        </div>
        <div className="mt-2 h-4 w-32 bg-gray-200 rounded" />
        <div className="flex gap-4 mt-2">
          <div className="h-4 w-16 bg-gray-200 rounded" />
          <div className="h-4 w-16 bg-gray-200 rounded" />
          <div className="h-4 w-16 bg-gray-200 rounded" />
        </div>
        <div className="flex gap-4 mt-2">
          <div className="h-4 w-24 bg-gray-200 rounded" />
        </div>
        <div className="mt-2 h-4 w-32 bg-gray-200 rounded" />
        <div className="mt-2 h-4 w-32 bg-gray-200 rounded" />
        <div className="flex mt-2">
          <div className="h-4 w-48 bg-gray-200 rounded" />
        </div>
        <div className="mt-2 h-4 w-32 bg-gray-200 rounded" />
        <div className="mt-2 h-4 w-32 bg-gray-200 rounded" />
        <div className="mt-2 h-4 w-32 bg-gray-200 rounded" />
      </div>
      <div className="flex justify-end mt-4">
        <div className="h-10 w-24 bg-gray-200 rounded" />
      </div>
    </div>
  );
}

export default SkeletonModal;
