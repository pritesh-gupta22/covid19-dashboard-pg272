import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CountryDetail = () => {
  const { name } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    console.log("Country name from URL param:", name);
    axios.get(`https://disease.sh/v3/covid-19/countries/${name}`)
      .then(res => {
        console.log("Country detail data:", res.data);
        setData(res.data);
      });
  }, [name]);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h2>{data.country}</h2>
      <p>Cases: {data.cases}</p>
      <p>Deaths: {data.deaths}</p>
      <p>Recovered: {data.recovered}</p>
      <p>Active: {data.active}</p>
    </div>
  );
};

export default CountryDetail;