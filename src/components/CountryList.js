import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setCountries } from '../redux/reducers/countriesReducer';
import { Link } from 'react-router-dom';
import '../CountryList.css'; // make sure you have this CSS file

const CountryList = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const countriesPerPage = 10;

  useEffect(() => {
    axios
      .get('https://disease.sh/v3/covid-19/countries')
      .then((res) => {
        dispatch(setCountries(res.data));
      })
      .catch((err) => console.error(err));
  }, [dispatch]);

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const filtered = countries.filter((c) =>
    c.country.toLowerCase().includes(search.toLowerCase())
  );

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
    <div className="country-container">
      <h2 className="heading">
        🌍 <span>Country-wise</span> <strong>COVID Stats</strong>
      </h2>
      <input
        className="search-input"
        placeholder="Search country..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table className="country-table">
        <thead>
          <tr>
            <th>Country</th>
            <th>Cases</th>
            <th>Deaths</th>
            <th>Recovered</th>
          </tr>
        </thead>
        <tbody>
          {currentCountries.map((country) => (
            <tr key={country.country}>
              <td>
                <Link to={`/country/${encodeURIComponent(country.country)}`}>
                  {country.country}
                </Link>
              </td>
              <td>{country.cases.toLocaleString()}</td>
              <td>{country.deaths.toLocaleString()}</td>
              <td>{country.recovered.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {filtered.length > 0 && (
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
          >
            ◀ Prev
          </button>
          <span>
            Page {Math.min(currentPage, totalPages)} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
          >
            Next ▶
          </button>
        </div>
      )}
    </div>
  );
};

export default CountryList;
