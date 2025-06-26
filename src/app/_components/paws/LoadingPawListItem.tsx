import React from 'react';
import { Loader } from 'lucide-react';

function LoadingPawListItem() {
  return (
    <div className={'flex flex-col gap-4 bg-[#F2F2F2] p-4 rounded-lg'}>
      <div
        className={
          'flex justify-between font-bold text-md rounded-lg bg-gray-300 text-white p-2 animate-pulse'
        }
      >
        <span className="w-24 h-4 bg-gray-200 rounded animate-pulse" />
        <span className="w-6 h-4 bg-gray-200 rounded animate-pulse" />
      </div>
      <div
        className={
          'h-[200px] rounded-lg bg-gray-200 flex items-center justify-center animate-pulse'
        }
        style={{ position: 'relative' }}
      ></div>
      <div className={'flex flex-col gap-2 font-normal text-md'}>
        <div className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
        <div className="w-32 h-4 bg-gray-200 rounded animate-pulse" />
      </div>
    </div>
  );
}

export default LoadingPawListItem;
