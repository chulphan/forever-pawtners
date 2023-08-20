import { useRecoilState } from 'recoil';
import { fullCitiesState } from '../recoil/atom';
import { useEffect } from 'react';
import { getFullCities } from '../api';

export default function useFullCities(cityCode: string) {
  const [fullCities, setFullCities] = useRecoilState(fullCitiesState);

  useEffect(() => {
    if (cityCode === '' || cityCode === 'placeholder' || fullCities[cityCode]) {
      return;
    }

    const setFullCitiesByCode = async (cityCode: string) => {
      try {
        const _fullCities = await getFullCities(cityCode);

        setFullCities((prevState) => ({
          ...prevState,
          [cityCode]: _fullCities,
        }));
      } catch (e: any) {
        alert(e.message);
      }
    };

    setFullCitiesByCode(cityCode);
  }, [cityCode, fullCities, setFullCities]);

  return fullCities;
}
