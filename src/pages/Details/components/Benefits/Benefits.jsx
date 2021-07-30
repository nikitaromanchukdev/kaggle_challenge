import React, { memo } from 'react';
import { Pie } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';

import { benefitsSelector } from 'app/store/selectors';
import { roundToPrecision } from 'utils/math';
import ChartFallback from 'components/ChartFallback';


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
  const surveyData = useSelector(benefitsSelector);

  if (!surveyData.length) {
    return <ChartFallback />;
  }

  const data = {
    labels: surveyData.map((payload) => payload.key),
    datasets: [
      {
        data: surveyData.map((payload) => payload.proportion),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(75, 192, 192, 0.5)',
        ],
        hoverOffset: 24,
      },
    ],
  };

  return (
    <div className="chartWrapper">
      <Typography variant="subtitle2" style={{ textAlign: 'center', marginBottom: 12 }}>
        Respondents answering whether their employer provides mental health benefits
      </Typography>
      <div className="chartWrapper">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default memo(Benefits);
