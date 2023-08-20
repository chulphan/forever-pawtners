'use client';

import { useEffect, useState } from 'react';
import { ANIMAL_KIND_CODE, City, FullCity, PawQuery } from '../_types';
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';
import {
  fullCitiesState,
  pawListState,
  pawQueryState,
  selectCityState,
} from '../_lib/recoil/atom';
import Select from './Select';
import { getFullCities, getPaws } from '../_lib/api';
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
  const [setPawQuery, resetPawQuery] = [
    useSetRecoilState(pawQueryState),
    useResetRecoilState(pawQueryState),
  ];
  const [selectedCity, setSelectedCity] = useRecoilState(selectCityState);
  const resetSelectedCity = useResetRecoilState(selectCityState);
  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false);
  // const [fullCities, setFullCities] = useRecoilState(fullCitiesState);
  const fullCities = useFullCities(selectedCity.cityCode);

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSelectedCity((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSearchBtnClick = async () => {
    try {
      const pawQuery = {
        pageNo: 1,
        numOfRows: 48,
        upr_cd: selectedCity.cityCode,
        org_cd: selectedCity.fullCityCode,
        totalCount: 0,
      } as PawQuery;

      if (
        selectedCity.cityCode === '' ||
        selectedCity.cityCode === 'placeholder'
      ) {
        delete pawQuery.upr_cd;
      }

      if (
        selectedCity.fullCityCode === '' ||
        selectedCity.fullCityCode === 'placeholder'
      ) {
        delete pawQuery.org_cd;
      }

      const pawListResponseBody = await getPaws(pawQuery);

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
    console.log(selectedCity);
    resetPawQuery();
    resetSelectedCity();
  };

  return (
    <>
      <div className={'flex self-end'}>
        <Button
          className={
            'px-8 py-4  border-4 rounded-[4px] border-blue-400 hover:opacity-80'
          }
          onClick={() => setIsSearchBoxOpen(!isSearchBoxOpen)}>
          검색
        </Button>
      </div>
      <div
        className={`flex flex-col gap-4 w-full transition-opacity ease-out duration-500 overflow-hidden ${
          isSearchBoxOpen ? 'opacity-100 max-h-40' : 'opacity-0 max-h-0'
        }`}>
        <div className={'flex flex-row gap-4'}>
          <Select
            className={'border-2 border-blue-400 rounded p-2'}
            name={'cityCode'}
            value={selectedCity.cityCode}
            onSelect={onSelectChange}>
            {citiesParam.map((city) => (
              <option key={city.orgCd} value={city.orgCd}>
                {city.orgdownNm}
              </option>
            ))}
          </Select>
          {fullCities[selectedCity.cityCode] && (
            <Select
              className={'border-2 border-blue-400 rounded p-2'}
              name={'fullCityCode'}
              value={selectedCity.fullCityCode}
              onSelect={onSelectChange}>
              {fullCities[selectedCity.cityCode].map((city) => (
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
              onClick={() => {}}
              className={'bg-green-400 text-white rounded p-2'}>
              <span className={'block w-[50px]'}>{animalKind.label}</span>
            </Button>
          ))}
        </div>
        <div className={'flex gap-4'}>
          <Button
            className='border-2 border-blue-400 rounded p-2'
            onClick={onSearchBtnClick}>
            찾기
          </Button>
          <Button
            className='border-2 border-gray-400 rounded p-2'
            onClick={initialize}>
            초기화
          </Button>
        </div>
      </div>
    </>
  );
}
