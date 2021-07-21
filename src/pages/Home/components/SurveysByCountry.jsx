import React, {
  Fragment, useMemo, useState, memo,
} from 'react';
import { useSelector } from 'react-redux';
import { countriesSelector, surveysByCountriesSelector } from 'app/store/selectors';
import { MenuItem, TextField } from '@material-ui/core';

import BarChart from 'components/Charts/BarChart/BarChart';

const options = {
  indexAxis: 'y',
  plugins: {},
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

  const [ selectedCountry, setSelectedCountry ] = useState('');

  const surveysBySelectedCountry = selectedCountry
    ? surveysByCountries.filter((o) => o.country === selectedCountry)
    : surveysByCountries;

  const surveysByCountriesQuantity = surveysBySelectedCountry.map(({ data }) => data.length);

  const data = useMemo(
    () => ({
      labels: countries,
      datasets: [
        {
          label: 'Number of surveys',
          data: surveysByCountriesQuantity,
          backgroundColor: 'rgb(255, 99, 132)',
        },
        {
          label: '# of Blue Votes',
          data: [ 2, 3, 20, 5, 1, 4 ],
          backgroundColor: 'rgb(54, 162, 235)',
        },
      ],
    }),
    [ countries, surveysByCountriesQuantity ]
  );


  return (
    <Fragment>
      <TextField
        select
        label="Country"
        value={selectedCountry}
        onChange={(ev) => setSelectedCountry(ev.target.value)}
        helperText="Please select your currency"
        variant="outlined"
      >
        <MenuItem value="">All</MenuItem>
        {countries.map((o) => (
          <MenuItem key={o} value={o}>
            {o}
          </MenuItem>
        ))}
      </TextField>

      <BarChart
        data={data}
        options={options}
      />
    </Fragment>
  );
};

export default memo(SurveysByCountry);
