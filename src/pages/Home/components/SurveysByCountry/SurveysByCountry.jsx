import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import {
  countriesSelector,
  surveysByCountriesSelector,
  selectByCountry,
  ageByCountriesSelector,
} from 'app/store/selectors';

import generateRandomRgb from 'utils/generateRandomRgb';
import { Bar } from 'react-chartjs-2';


const options = {
  pointHitDetectionRadius: 1,
  indexAxis: 'y',
  plugins: {
    tooltip: {
      callbacks: {
        title: ([ ctx ]) => ctx.dataset.overrideTitle || ctx.label,
      },
    },
  },
  maintainAspectRatio: true,
  aspectRatio: 0.5,
  interaction: {
    mode: 'y',
  },
  scales: {
    yAxes: [
      {
        stacked: true,
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};


const genderSelector = selectByCountry('gender');
const familyHistorySelector = selectByCountry('familyHistory');
const treatmentSelector = selectByCountry('treatment');

const SurveysByCountry = () => {
  const countries = useSelector(countriesSelector);
  const surveysByCountries = useSelector(surveysByCountriesSelector);
  const gendersByCountries = useSelector(genderSelector);
  const ageByCountry = useSelector(ageByCountriesSelector);
  const familyHistory = useSelector(familyHistorySelector);
  const treatmentByCountry = useSelector(treatmentSelector);

  const surveysByCountriesQuantity = surveysByCountries.map(({ data }) => data.length);

  const genderStacks = Object.entries(gendersByCountries)
    .map(([ key, data ]) => ({
      overrideTitle: 'Respondent gender',
      label: key,
      data: data.map((s) => ({ y: s.country, x: s.data.length })),
      backgroundColor: generateRandomRgb(),
      stack: 'gender',
    }));

  const ageStacks = Object.entries(ageByCountry)
    .map(([ key, data ]) => ({
      overrideTitle: 'Respondent age',
      label: key,
      data: data.map((s) => ({ y: s.country, x: s.data.length })),
      backgroundColor: generateRandomRgb(),
      stack: 'age',
    }));

  const familyHistoryStacks = Object.entries(familyHistory)
    .map(([ key, data ]) => ({
      overrideTitle: 'Having a family history of mental illness',
      label: key,
      data: data.map((s) => ({ y: s.country, x: s.data.length })),
      backgroundColor: generateRandomRgb(),
      stack: 'familyHistory',
    }));

  const treatmentStacks = Object.entries(treatmentByCountry)
    .map(([ key, data ]) => ({
      overrideTitle: 'Respondent sought treatment for a mental health condition',
      label: key,
      data: data.map((s) => ({ y: s.country, x: s.data.length })),
      backgroundColor: generateRandomRgb(),
      stack: 'treatmentByCountry',
    }));

  const data = {
    labels: countries,
    datasets: [
      {
        label: 'Surveys total',
        data: surveysByCountriesQuantity,
        backgroundColor: 'rgba(54, 162, 235, 0.4)',
        stack: 'total',
        borderWidth: 1,
        borderColor: [ 'rgba(54, 162, 235, 0.7)' ],
      },
      ...genderStacks,
      ...ageStacks,
      ...familyHistoryStacks,
      ...treatmentStacks,
    ],
  };

  return (
    <div className="chartWrapper">
      <Bar
        data={data}
        height={500}
        options={options}
      />
    </div>
  );
};

export default memo(SurveysByCountry);
