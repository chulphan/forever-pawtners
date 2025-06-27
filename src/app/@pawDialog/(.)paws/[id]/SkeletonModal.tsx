import React from 'react';

function SkeletonModal() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
      <div className="w-full max-w-2xl bg-white rounded-lg p-6 animate-pulse max-h-[80vh] overflow-y-auto">
        <div className="flex flex-col w-full mt-3 text-left">
          <div className="flex justify-between items-center my-2">
            <div className="h-6 w-32 bg-gray-200 rounded" />
            <div className="h-8 w-8 bg-gray-200 rounded-full" />
          </div>
          <div className="mt-2 relative h-[300px] xl:h-[400px] bg-gray-200 rounded" />
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
    </div>
  );
}

export default SkeletonModal;
