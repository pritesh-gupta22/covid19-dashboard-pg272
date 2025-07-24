// redux/reducers/countriesReducer.js
import { createSlice } from '@reduxjs/toolkit';

const countriesSlice = createSlice({
  name: 'countries',
  initialState: [],
  reducers: {
    setCountries: (state, action) => {
      return action.payload;
    }
  },
});

export const { setCountries } = countriesSlice.actions;

export default countriesSlice.reducer;