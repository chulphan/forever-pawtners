'use client';

import { useState } from 'react';
import {
  ANIMAL_KIND_CODE,
  Breed,
  City,
  FullCity,
  PawQuery,
  SearchState,
} from '../_types';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { pawQueryState } from '../_lib/recoil/atom';
import Select from './Select';
import { getBreed, getFullCities, getPaws } from '../_lib/api';
import Button from './Button';
import usePawList from '../_lib/hooks/usePaws';
import useFullCities from '../_lib/hooks/useFullCities';

type SearchBoxProps = {
  citiesParam: City[];
  fullCitiesParam: FullCity[];
};

const ANIMAL_KINDS: Array<{ upkind: ANIMAL_KIND_CODE; label: string }> = [
  {
    upkind: '417000',
    label: '개',
  },
  {
    upkind: '422400',
    label: '고양이',
  },
  {
    upkind: '429900',
    label: '기타',
  },
];

export default function SearchBox({
  citiesParam,
  fullCitiesParam,
}: SearchBoxProps) {
  const [_, setPawList] = usePawList();
  const [searchState, setSearchState] = useState<SearchState>({});
  const [pawQuery, setPawQuery] = useRecoilState(pawQueryState);
  const resetPawQuery = useResetRecoilState(pawQueryState);
  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState<ANIMAL_KIND_CODE>();
  const [breed, setBreed] = useState<{
    [key in ANIMAL_KIND_CODE]?: Array<Breed>;
  }>({});
  const fullCities = useFullCities(searchState.upr_cd);

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    setSearchState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onAnimalKindChange = async (animalCode: ANIMAL_KIND_CODE) => {
    try {
      setSelectedAnimal(animalCode);
      if (breed[animalCode]) {
        return;
      }
      const breedResponseBody = await getBreed(animalCode);
      setBreed((prevState) => ({
        ...prevState,
        [animalCode]: breedResponseBody.items.item ?? [],
      }));
    } catch (e) {}
  };

  const onSearchBtnClick = async () => {
    try {
      const _pawQuery = {
        ...searchState,
        pageNo: 1,
        numOfRows: 48,
        totalCount: 0,
      } as PawQuery;

      const pawListResponseBody = await getPaws(_pawQuery);

      const { items, numOfRows, pageNo, totalCount } = pawListResponseBody;
      const { item } = items;

      setPawList(item);
      setPawQuery((prevState) => ({
        ...prevState,
        ...pawQuery,
        numOfRows: numOfRows ?? 0,
        pageNo: pageNo ?? 0,
        totalCount: totalCount ?? 0,
      }));
    } catch (e) {}
  };

  const initialize = () => {
    resetPawQuery();
  };

  return (
    <>
      <div className={'flex self-end'}>
        <Button
          className={
            'px-8 py-2 rounded bg-[#03A678] hover:opacity-80 text-white'
          }
          onClick={() => setIsSearchBoxOpen(!isSearchBoxOpen)}>
          검색
        </Button>
      </div>
      <div
        className={`flex flex-col gap-4 w-full transition-opacity ease-out duration-500 overflow-hidden ${
          isSearchBoxOpen ? 'opacity-100' : 'opacity-0 max-h-0'
        }`}>
        <div className={'flex flex-row gap-4'}>
          <Select
            className={'border-2 border-[#03A678] rounded p-2'}
            name={'upr_cd'}
            value={searchState.upr_cd ?? ''}
            onSelect={onSelectChange}>
            {citiesParam.map((city) => (
              <option key={city.orgCd} value={city.orgCd}>
                {city.orgdownNm}
              </option>
            ))}
          </Select>
          {searchState.upr_cd && fullCities[searchState.upr_cd] && (
            <Select
              className={'border-2 border-[#03A678] rounded p-2'}
              name={'org_cd'}
              value={searchState.org_cd ?? ''}
              onSelect={onSelectChange}>
              {fullCities[searchState.upr_cd].map((city) => (
                <option key={city.orgCd} value={city.orgCd}>
                  {city.orgdownNm}
                </option>
              ))}
            </Select>
          )}
        </div>
        <div className={'flex gap-4'}>
          {ANIMAL_KINDS.map((animalKind) => (
            <Button
              key={animalKind.upkind}
              onClick={() => onAnimalKindChange(animalKind.upkind)}
              className={
                'bg-[#03A678] hover:opacity-80 text-white rounded p-2'
              }>
              <span className={'block w-[50px]'}>{animalKind.label}</span>
            </Button>
          ))}
        </div>
        {selectedAnimal && breed[selectedAnimal] && (
          <div>
            <Select
              name={'kind'}
              value={searchState.kind ?? ''}
              className='border border-green-500 rounded p-2'
              onSelect={onSelectChange}>
              {breed[selectedAnimal]?.map((breed) => (
                <option key={breed.kindCd} value={breed.kindCd}>
                  {breed.knm}
                </option>
              ))}
            </Select>
          </div>
        )}
        <div className={'flex gap-4'}>
          <Button
            className='rounded bg-[#03A678] p-2 text-white'
            onClick={onSearchBtnClick}>
            <span className='block w-12'>찾기</span>
          </Button>
          <Button className='rounded bg-gray-200 p-2' onClick={initialize}>
            <span className={'block w-12'}>초기화</span>
          </Button>
        </div>
      </div>
    </>
  );
}
