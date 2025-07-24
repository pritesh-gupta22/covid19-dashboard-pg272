export const setCountries = (data: any) => {
  console.log("Dispatching SET_COUNTRIES with data:", data);
  return {
    type: 'SET_COUNTRIES',
    payload: data,
  };
};