import React from 'react';
import { Loader } from 'lucide-react';
import { motion } from 'motion/react';
import type { Paw } from '../../_types/index';
import PawListItem from './PawListItem';
import LoadingPawListItem from './LoadingPawListItem';

interface PawListProps {
  pawListItem: Paw[];
  loadMoreRef: React.RefObject<HTMLLIElement>;
  hasPawsNextPage: boolean;
  isFetchingPaws: boolean;
  onPawClick: (paw: Paw) => void;
}

function PawList({
  pawListItem,
  loadMoreRef,
  hasPawsNextPage,
  isFetchingPaws,
  onPawClick,
}: PawListProps) {
  return (
    <>
      <ul className={'grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full'}>
        {pawListItem.map((paw) => (
          <motion.li key={paw.desertionNo} whileHover={{ y: -10 }}>
            <PawListItem paw={paw} onClick={() => onPawClick(paw)} />
          </motion.li>
        ))}
        {isFetchingPaws &&
          Array.from({ length: 4 }).map((_, idx) => (
            <li key={`loading-scroll-${idx}`}>
              <LoadingPawListItem />
            </li>
          ))}
        <li ref={loadMoreRef} className={!hasPawsNextPage ? 'hidden' : ''} />
      </ul>
    </>
  );
}

export default PawList;
