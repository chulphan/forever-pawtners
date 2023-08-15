'use client';

import { useEffect, useState } from 'react';
import { City, FullCity } from '../_types';
import { useRecoilState } from 'recoil';
import { fullCitiesState } from '../_lib/recoil/atom';
import { getFullCities } from '../page';

type SearchBoxProps = {
  citiesParam: City[];
  fullCitiesParam: FullCity[];
};

export default function SearchBox({
  citiesParam,
  fullCitiesParam,
}: SearchBoxProps) {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedFullCity, setSelectedFullCity] = useState('');
  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false);
  const [fullCities, setFullCities] = useRecoilState(fullCitiesState);

  useEffect(() => {
    const cityCode = citiesParam[0].orgCd;
    setSelectedCity(cityCode);
    setSelectedFullCity(fullCitiesParam[0]?.orgCd);
    setFullCities((prevState) => ({
      ...prevState,
      [cityCode]: fullCitiesParam,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(fullCities);

  useEffect(() => {
    if (selectedCity !== '' && !fullCities[selectedCity]) {
      setFullCityByCityCode(selectedCity);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCity]);

  const setFullCityByCityCode = async (selectedCity: string) => {
    try {
      const fullCitiesResponse = (await getFullCities(selectedCity)).response;
      const responseHeader = fullCitiesResponse.header;

      if (responseHeader.errorMsg) {
        throw new Error(responseHeader.errorMsg);
      }

      const responseBody = fullCitiesResponse?.body;
      const _fullCities = responseBody?.items?.item ?? [];

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

    if (name === 'city') {
      setSelectedCity(value);
    }

    if (name === 'fullCity') {
      setSelectedFullCity(value);
    }
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
        <select
          name={'city'}
          className={'border-2 border-blue-400 rounded'}
          value={selectedCity}
          onChange={onSelectChange}>
          {citiesParam.map((city) => (
            <option key={city.orgCd} value={city.orgCd}>
              {city.orgdownNm}
            </option>
          ))}
        </select>
        {fullCities[selectedCity] && (
          <select
            name={'fullCity'}
            className={'border-2 border-blue-400 rounded'}
            value={selectedFullCity}
            onChange={onSelectChange}>
            {fullCities[selectedCity].map((city) => (
              <option key={city.orgCd} value={city.orgCd}>
                {city.orgdownNm}
              </option>
            ))}
          </select>
        )}
      </div>
    </>
  );
}
