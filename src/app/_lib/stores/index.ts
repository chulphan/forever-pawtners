import { FullCity, Paw } from '@/app/_types';
import { create } from 'zustand';

interface PawState {
  paw: Paw | undefined;
  setPaw: (paw: Paw | undefined) => void;
  reset: () => void;
}

const usePawStore = create<PawState>((set) => ({
  paw: undefined,
  setPaw: (paw: Paw | undefined) => set(() => ({ paw })),
  reset: () => set(() => ({ paw: undefined })),
}));

interface FullCityState {
  fullCities: { [key: string]: FullCity[] };
  setFullCities: (cityCode: string, fullCities: FullCity[]) => void;
}

const useFullCityStore = create<FullCityState>((set) => ({
  fullCities: {},
  setFullCities: (cityCode, fullCities) =>
    set((state) => ({
      fullCities: {
        ...state.fullCities,
        [cityCode]: fullCities,
      },
    })),
}));

type PawQuery = {
  pageNo: number;
  numOfRows: number;
  totalCount: number;
};

interface PawQueryState {
  query: PawQuery;
  setQuery: (query: PawQuery) => void;
}

const usePawQueryStore = create<PawQueryState>((set) => ({
  query: {
    pageNo: 1,
    numOfRows: 48,
    totalCount: 0,
  },
  setQuery: (query: PawQuery) => set(() => ({ query })),
}));

export { usePawStore, useFullCityStore, usePawQueryStore };
