import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setCountries } from '../redux/actions';
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

  const indexOfLast = currentPage * countriesPerPage;
  const indexOfFirst = indexOfLast - countriesPerPage;
  const currentCountries = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / countriesPerPage);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        🌐 COVID Stats by Country
      </h2>

      <input
        type="text"
        placeholder="Search countries..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 mb-8 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {currentCountries.map((c) => (
          <Link
            to={`/country/${c.countryInfo.iso2}`}
            key={c.country}
            className="flex items-center gap-4 bg-white rounded-xl shadow p-4 hover:shadow-lg hover:scale-[1.02] transition-transform"
          >
            
            <img
              src={c.countryInfo.flag}
              alt={c.country}
              className="w-20 h-12 object-cover rounded border"
            />
            <div className="flex flex-col">
              <p className="text-lg font-semibold text-gray-800">{c.country}</p>
              <p className="text-sm text-gray-600">Cases: {c.cases.toLocaleString()}</p>
            </div>
      
          </Link>
        ))}
      </div>

      <div className="flex justify-center mt-10 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              currentPage === i + 1
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CountryList;
