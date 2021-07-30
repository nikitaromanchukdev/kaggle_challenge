import React, { Fragment, memo } from 'react';
import { useSelector } from 'react-redux';

import { withWorkInterfereByAge } from 'app/store/selectors';
import { Bar } from 'react-chartjs-2';
import { Typography } from '@material-ui/core';
import ChartFallback from 'components/ChartFallback';

const mapColors = {
  Often: 'rgba(75, 192, 192, 0.5)',
  Rarely: 'rgba(153, 102, 255, 0.5)',
  Never: 'rgba(255, 159, 64, 0.5)',
  Sometimes: 'rgba(255, 99, 132, 0.5)',
  NA: 'rgba(54, 162, 235, 0.5)',
};

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

  elements: {
    line: {
      backgroundColor: 'rgba(153, 102, 255, 0.5)',
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 3,
      fill: false,
    },
    point: {
      radius: 6,
      hoverRadius: 8,
    },
  },

  scales: {
    yAxes: [
      {
        stacked: true,
      },
    ],
    xAxes: [
      {
        display: false,
        beginAtZero: true,
      },
    ],
  },
};

const StatisticsByAge = () => {
  const { surveysByAgeGroups, workInterfereByAgeGroups } = useSelector(withWorkInterfereByAge);

  if (!surveysByAgeGroups.length || !workInterfereByAgeGroups.length) {
    return <ChartFallback />;
  }

  const workInterfereStacks = workInterfereByAgeGroups.map((item) => ({
    label: item.key,
    stack: 'workInterfere',
    data: item.data.map((itemData) => ({ x: itemData.quantity, y: itemData.ageGroup })),
    backgroundColor: mapColors[item.key],
  }));

  const data = {
    labels: surveysByAgeGroups.map((o) => o.ageGroup),
    datasets: [
      {
        label: '# of votes total',
        data: Object.values(surveysByAgeGroups).map((o) => o.quantity),
        stack: 'total',
        borderWidth: 1,
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      ...workInterfereStacks,
    ],
  };

  return (
    <Fragment>
      <Typography variant="subtitle1" style={{ textAlign: 'center', marginBottom: 12 }}>
        Representation of survey results by age groups:
      </Typography>
      <Typography variant="subtitle2" style={{ textAlign: 'center', marginBottom: 12 }}>
        {`Displays ratio of the amount of people in the age group
          who have a mental health condition, do you feel that it interferes with your work
        `}
      </Typography>
      <div className="chartWrapper">
        <Bar
          data={data}
          options={options}
        />
      </div>
    </Fragment>
  );
};

export default memo(StatisticsByAge);
