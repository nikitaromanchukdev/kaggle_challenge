import React, {
  Fragment,
  memo,
} from 'react';
import { useSelector } from 'react-redux';
import {
  countriesSelector,
  surveysByCountriesSelector,
  gendersByCountriesSelector,
} from 'app/store/selectors';

import BarChart from 'components/Charts/BarChart/BarChart';


const options = {
  indexAxis: 'y',
  plugins: {},
  maintainAspectRatio: true,
  aspectRatio: 0.5,
  scales: {
    yAxes: [
      {
        stacked: true,
        ticks: {
          beginAtZero: true,
        },
      },
    ],
    xAxes: [
      {
        stacked: true,
      },
    ],
  },
};


const SurveysByCountry = () => {
  const countries = useSelector(countriesSelector);
  const surveysByCountries = useSelector(surveysByCountriesSelector);
  const gendersByCountries = useSelector(gendersByCountriesSelector);


  const surveysByCountriesQuantity = surveysByCountries.map(({ data }) => data.length);

  // console.log({ gendersByCountries });

  const genderStacks = Object.entries(gendersByCountries)
    .map(([ key, data ]) => {
      const r = Math.floor(Math.random() * 255);
      const g = Math.floor(Math.random() * 255);
      const b = Math.floor(Math.random() * 255);

      const color = `rgb(${r},${g},${b})`;

      return {
        label: key,
        data: data.map((s) => {
          if (s.country === 'Canada') {
            console.log(s.country, key, s.data.length);
          }

          return ({ y: s.country, quantity: s.data.length });
        }),
        parsing: {
          xAxisKey: 'quantity',
        },
        backgroundColor: color,
        stack: 'gender',
      };
    });

  const data = {
    labels: countries,
    datasets: [
      {
        label: 'Surveys total',
        data: surveysByCountriesQuantity,
        backgroundColor: 'rgb(255, 99, 132)',
        stack: 'total',
      },
      ...genderStacks,
    ],
  };

  return (
    <Fragment>
      <BarChart
        data={data}
        height={500}
        options={options}
      />
    </Fragment>
  );
};

export default memo(SurveysByCountry);
