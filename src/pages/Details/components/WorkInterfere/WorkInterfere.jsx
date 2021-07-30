import React, { Fragment, memo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';

import { treatmentWithWorkInterfereSelector } from 'app/store/selectors';
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

const WorkInterfere = () => {
  const { proportion, data: surveyData } = useSelector(treatmentWithWorkInterfereSelector);

  if (Number.isNaN(proportion)) {
    return (
      <Typography variant="subtitle1" style={{ textAlign: 'center', marginBottom: 12 }}>
        No data matched
      </Typography>
    );
  }

  const proportionOutput = (proportion * 100).toFixed(2);

  const data = {
    labels: surveyData.map((payload) => payload.key),
    datasets: [
      {
        data: surveyData.map((payload) => payload.proportion),
        backgroundColor: [
          'rgba(153, 102, 255, 0.5)',
          'rgba(54, 162, 235, 0.5)',
        ],
        hoverOffset: 24,
      },
    ],
  };

  return (
    <Fragment>
      <Typography variant="subtitle1" style={{ textAlign: 'center', marginBottom: 12 }}>
        {`${proportionOutput}% of respondents feel that their mental health condition interfere with work.`}
      </Typography>
      <Typography variant="subtitle2" style={{ textAlign: 'center' }}>
        {`The graph below you can see how many of them sought 
        treatment for a mental health condition.`}
      </Typography>
      <div className="chartWrapper">
        <Doughnut data={data} options={options} />
      </div>
    </Fragment>
  );
};

export default memo(WorkInterfere);
