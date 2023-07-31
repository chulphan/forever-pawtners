import { atom } from 'recoil';

export const selectCityState = atom({
  key: 'selectCityState',
  default: {
    cityCode: '',
    fullCityCode: '',
  },
});

export const fullCitiesState = atom({
  key: 'fullCitiesState',
  default: [],
});
