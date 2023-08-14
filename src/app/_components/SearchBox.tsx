'use client';

import { useEffect, useState } from 'react';

export default function SearchBox() {
  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false);

  return (
    <>
      <div className={'flex self-end'}>
        <button
          className={
            'px-8 py-4  border-4 rounded-[4px] border-blue-400 hover:opacity-80'
          }
          onClick={() => setIsSearchBoxOpen(!isSearchBoxOpen)}>
          검색
        </button>
      </div>
      <div
        className={`transition-opacity ease-out duration-500 overflow-hidden ${
          isSearchBoxOpen ? 'opacity-100 max-h-40' : 'opacity-0 max-h-0'
        }`}>
        검색 박스
      </div>
    </>
  );
}
