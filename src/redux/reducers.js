import { combineReducers } from 'redux';
import { CountryData } from './types';

const initialCountryState: CountryData[] = [];

const countryReducer = (state = initialCountryState, action: any) => {
  console.log("Reducer received:", action);
  switch (action.type) {
    case 'SET_COUNTRIES':
      return action.payload;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  countries: countryReducer,
});

export default rootReducer;