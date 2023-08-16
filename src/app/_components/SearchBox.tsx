'use client';

import { useEffect, useState } from 'react';
import { City, FullCity } from '../_types';
import { useRecoilState } from 'recoil';
import { fullCitiesState, selectCityState } from '../_lib/recoil/atom';
import Select from './Select';
import { getFullCities } from '../_lib/api';

type SearchBoxProps = {
  citiesParam: City[];
  fullCitiesParam: FullCity[];
};

export default function SearchBox({
  citiesParam,
  fullCitiesParam,
}: SearchBoxProps) {
  const [selectedCity, setSelectedCity] = useRecoilState(selectCityState);
  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false);
  const [fullCities, setFullCities] = useRecoilState(fullCitiesState);

  useEffect(() => {
    const cityCode = citiesParam[0].orgCd;
    setFullCities((prevState) => ({
      ...prevState,
      [cityCode]: fullCitiesParam,
    }));
    setSelectedCity((prevState) => ({
      ...prevState,
      cityCode: cityCode,
      fullCityCode: fullCitiesParam[0]?.orgCd,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedCity.cityCode !== '' && !fullCities[selectedCity.cityCode]) {
      setFullCityByCityCode(selectedCity.cityCode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCity.cityCode]);

  const setFullCityByCityCode = async (selectedCity: string) => {
    try {
      const _fullCities = await getFullCities(selectedCity);

      setFullCities((prevState) => ({
        ...prevState,
        [selectedCity]: _fullCities,
      }));
    } catch (e: any) {
      alert(e.message);
    }
  };

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSelectedCity((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

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
        className={`flex flex-row gap-4 w-full transition-opacity ease-out duration-500 overflow-hidden ${
          isSearchBoxOpen ? 'opacity-100 max-h-40' : 'opacity-0 max-h-0'
        }`}>
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
        <button className='border-2 border-blue-400 rounded p-2'>찾기</button>
      </div>
    </>
  );
}
