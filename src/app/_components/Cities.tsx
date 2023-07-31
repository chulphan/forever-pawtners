'use client';

import { useRecoilState, useSetRecoilState } from 'recoil';
import { fullCitiesState, selectCityState } from '../_lib/recoil/atom';
import { useEffect, useRef } from 'react';
import { getFullCities } from '../page';

export default function Cities({ cities }: { cities: any }) {
  const [selectCity, setSelectCity] = useRecoilState(selectCityState);
  const setFullCitiesState = useSetRecoilState(fullCitiesState);

  useEffect(() => {
    setSelectCity((prevState) => ({
      ...prevState,
      cityCode: cities?.[0]?.orgCd,
    }));
  }, []);

  const onChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const fullCities = (
      await getFullCities(value)
    )?.response?.body?.items?.item?.filter((city) => city.orgCd !== '6119999');
    console.log('selectCityCode ', selectCity);
    const firstFullCityCode = fullCities?.[0].orgCd;

    setSelectCity((prevState) => ({
      ...prevState,
      cityCode: value,
      fullCityCode: firstFullCityCode,
    }));
    setFullCitiesState(fullCities);
    console.log('full Cities in Cities ', fullCities);
  };

  return (
    <select
      className={'rounded-full p-2'}
      value={selectCity.cityCode}
      onChange={onChange}>
      {cities?.map((city) => (
        <option key={city.orgCd} value={city.orgCd}>
          {city.orgdownNm}
        </option>
      ))}
    </select>
  );
}
