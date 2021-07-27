import React, { Fragment } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

import { employeesQuantitySelector } from 'app/store/selectors';
import { Typography } from '@material-ui/core';


const options = {
  plugins: {
    tooltip: {
      callbacks: {
        label: (ctx) => `${ctx.label} - ${ctx.parsed}%`,
      },
    },
  },
};

const WorkInterfere = () => {
  const { proportion, data: surveyData } = useSelector(employeesQuantitySelector);

  const proportionOutput = `${proportion * 100}%`;

  const data = {
    labels: surveyData.map((payload) => payload.treatment),
    datasets: [
      {
        data: surveyData.map((payload) => payload.proportion),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
        ],
        hoverOffset: 24,
      },
    ],
  };

  return (
    <Fragment>
      <Typography variant="subtitle1" style={{ textAlign: 'center', marginBottom: 12 }}>
        {`${proportionOutput} of respondents feel that their mental health condition interfere with work.`}
      </Typography>
      <Typography variant="subtitle2" style={{ textAlign: 'center' }}>
        {`On the graph below you can see how many of them sought 
        treatment for a mental health condition.`}
      </Typography>
      <div className="chartWrapper">
        <Doughnut data={data} options={options} />
      </div>
    </Fragment>
  );
};

export default WorkInterfere;
