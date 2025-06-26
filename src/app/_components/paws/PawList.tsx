import React from 'react';
import { Loader } from 'lucide-react';
import { motion } from 'motion/react';
import type { Paw } from '../../_types/index';
import PawListItem from './PawListItem';

interface PawListProps {
  pawListItem: Paw[];
  loadMoreRef: React.RefObject<HTMLLIElement>;
  hasPawsNextPage: boolean;
  isFetchingPaws: boolean;
  onPawClick: (paw: Paw) => void;
}

const PawList: React.FC<PawListProps> = ({
  pawListItem,
  loadMoreRef,
  hasPawsNextPage,
  isFetchingPaws,
  onPawClick,
}) => {
  return (
    <>
      <ul className={'grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full'}>
        {pawListItem.map((paw) => (
          <motion.li key={paw.desertionNo} whileHover={{ y: -10 }}>
            <PawListItem paw={paw} onClick={() => onPawClick(paw)} />
          </motion.li>
        ))}
        <li ref={loadMoreRef} className={!hasPawsNextPage ? 'hidden' : ''} />
      </ul>
      {isFetchingPaws && (
        <div className="w-full flex justify-center">
          <Loader className="animate-spin" />
        </div>
      )}
    </>
  );
};

export default PawList;
