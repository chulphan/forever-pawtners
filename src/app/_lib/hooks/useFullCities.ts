import { useEffect } from 'react';
import { getFullCities } from '../api';
import { useFullCityStore } from '../stores';

export default function useFullCities(cityCode?: string) {
  const fullCities = useFullCityStore((state) => state.fullCities);
  const setFullCities = useFullCityStore((state) => state.setFullCities);

  useEffect(() => {
    if (!cityCode || cityCode === '' || fullCities[cityCode]) {
      return;
    }

    const setFullCitiesByCode = async (cityCode: string) => {
      try {
        const _fullCities = await getFullCities(cityCode);

        setFullCities(cityCode, _fullCities);
      } catch (e: any) {
        alert(e.message);
      }
    };

    setFullCitiesByCode(cityCode);
  }, [cityCode, fullCities, setFullCities]);

  return fullCities;
}
