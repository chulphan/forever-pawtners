import { Paw } from '@/app/_types';
import { useRecoilState } from 'recoil';
import { pawListState } from '../recoil/atom';
import { useEffect } from 'react';

type UsePawListProps = Paw[];
export default function usePawList(initial?: UsePawListProps) {
  const [pawList, setPawList] = useRecoilState(pawListState);

  useEffect(() => {
    if (initial) {
      setPawList(initial);
    }
  }, [initial, setPawList]);

  return [pawList, setPawList] as const;
}
