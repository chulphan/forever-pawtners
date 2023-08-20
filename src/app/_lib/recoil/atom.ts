import { FullCity, Paw, PawQuery } from '@/app/_types';
import { atom } from 'recoil';

export const modalState = atom({
  key: 'modalState',
  default: false,
});

export const pawState = atom<Paw | undefined>({
  key: 'pawState',
  default: undefined,
});

export const fullCitiesState = atom<{ [key: string]: FullCity[] }>({
  key: 'fullCitiesState',
  default: {},
});

export const pawListState = atom<Paw[]>({
  key: 'pawListState',
  default: [],
});

export const pawQueryState = atom<PawQuery>({
  key: 'pawQueryState',
  default: {
    pageNo: 1,
    numOfRows: 48,
    totalCount: 0,
  },
});
