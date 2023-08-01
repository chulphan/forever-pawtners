'use client';

import { useRecoilState } from 'recoil';
import { fullCitiesState, selectCityState } from '../_lib/recoil/atom';
import { useEffect, useRef } from 'react';
import { FullCity } from '../_types';

export default function FullCities({
  fullCitiesParam,
}: {
  fullCitiesParam?: FullCity[];
}) {
  const isInitialRender = useRef(true);
  const [selectCity, setSelectCity] = useRecoilState(selectCityState);
  const [fullCities, setFullCities] = useRecoilState(fullCitiesState);

  useEffect(() => {
    if (isInitialRender.current) {
      setSelectCity((prevState) => ({
        ...prevState,
        fullCityCode: fullCitiesParam?.[0]?.orgCd,
      }));
      setFullCities(fullCitiesParam);
      isInitialRender.current = false;
    }
  }, []);

  return (
    <select
      className={'rounded-full p-2'}
      value={selectCity.fullCityCode}
      onChange={(e) => {
        setSelectCity((prevState) => ({
          ...prevState,
          fullCityCode: e.target.value,
        }));
      }}>
      {(isInitialRender.current ? fullCitiesParam : fullCities)?.map((city) => (
        <option key={city.orgCd} value={city.orgCd}>
          {city.orgdownNm}
        </option>
      ))}
    </select>
  );
}
