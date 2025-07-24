import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setCountries } from '../redux/reducers/countriesReducer';
import { Link } from 'react-router-dom';

const CountryList = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const countriesPerPage = 10;

  useEffect(() => {
    axios.get('https://disease.sh/v3/covid-19/countries')
      .then(res => {
        dispatch(setCountries(res.data));
      })
      .catch(err => console.error(err));
  }, [dispatch]);

  const filtered = countries.filter(c => c.country.toLowerCase().includes(search.toLowerCase()));

  // Pagination logic
  const indexOfLast = currentPage * countriesPerPage;
  const indexOfFirst = indexOfLast - countriesPerPage;
  const currentCountries = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / countriesPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <h2>Country-wise COVID Stats</h2>
      <input placeholder="Search country..." value={search} onChange={e => setSearch(e.target.value)} />
      <table className="country-table" border={1} cellPadding={5} style={{ marginTop: '10px' }}>
        <thead>
          <tr>
            <th>Country</th>
            <th>Cases</th>
            <th>Deaths</th>
            <th>Recovered</th>
          </tr>
        </thead>
        <tbody>
          {currentCountries.map(country => (
            <tr key={country.country}>
              <td><Link to={`/country/${encodeURIComponent(country.country)}`}>{country.country}</Link></td>
              <td>{country.cases}</td>
              <td>{country.deaths}</td>
              <td>{country.recovered}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: '10px' }}>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
        <span style={{ margin: '0 10px' }}>Page {currentPage} of {totalPages}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
};

export default CountryList;