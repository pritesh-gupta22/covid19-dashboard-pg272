import { CountryData } from '../types';

const countriesReducer = (state: CountryData[] = [], action: any) => {
  switch (action.type) {
    case 'SET_COUNTRIES':
      return action.payload;
    default:
      return state;
  }
};

export default countriesReducer;