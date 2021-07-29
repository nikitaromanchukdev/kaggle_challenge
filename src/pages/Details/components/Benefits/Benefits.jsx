import React, { memo } from 'react';
import { Pie } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';

import { benefitsSelector } from 'app/store/selectors';
import { roundToPrecision } from 'utils/math';


const options = {
  plugins: {
    tooltip: {
      callbacks: {
        label: (ctx) => `${ctx.label} - ${roundToPrecision(ctx.parsed, 2).toFixed(2)}%`,
      },
    },
  },
};

const Benefits = () => {
  const { data: surveyData } = useSelector(benefitsSelector);

  if (!surveyData.length) {
    return (
      <Typography variant="subtitle1" style={{ textAlign: 'center', marginBottom: 12 }}>
        No data matched
      </Typography>
    );
  }

  const data = {
    labels: surveyData.map((payload) => payload.benefits),
    datasets: [
      {
        data: surveyData.map((payload) => payload.proportion),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.2)',
        ],
        hoverOffset: 24,
      },
    ],
  };

  return (
    <div className="chartWrapper">
      <Typography variant="subtitle1" style={{ textAlign: 'center', marginBottom: 12 }}>
        Respondents answering whether their employer provides mental health benefits
      </Typography>
      <div className="chartWrapper">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default memo(Benefits);
