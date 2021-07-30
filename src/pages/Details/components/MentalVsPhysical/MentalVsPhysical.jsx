import React, { Fragment, memo } from 'react';
import { useSelector } from 'react-redux';
import { Radar } from 'react-chartjs-2';
import { Typography } from '@material-ui/core';

import { mentalPhysicalSelector } from 'app/store/selectors';
import { roundToPrecision } from 'utils/math';
import ChartFallback from 'components/ChartFallback';

const options = {
  pointHitDetectionRadius: 1,

  plugins: {
    tooltip: {
      callbacks: {
        label: (ctx) => `${roundToPrecision(ctx.parsed.r, 2).toFixed(2)}${ctx.dataset.label} - ${ctx.label}`,
      },
    },
  },

  scale: {
    ticks: {
      label: false,
      maxTicksLimit: 2,
      min: 0,
      max: 100,
    },

    gridLines: {
      display: false,
    },
  },

  interaction: {
    mode: 'nearest',
  },

  elements: {
    point: {
      radius: 6,
      hoverRadius: 12,
    },
    line: {
      borderWidth: 3,
    },
  },
};

const MentalVsPhysical = () => {
  const mentalPhysical = useSelector(mentalPhysicalSelector);

  if (!mentalPhysical.length) {
    return <ChartFallback />;
  }

  const data = {
    labels: mentalPhysical.map((o) => o.key),
    datasets: [
      {
        label: '% of votes total',
        data: mentalPhysical.map((dataset) => dataset.proportion * 100),
        backgroundColor: 'rgba(255, 159, 64, 0.5)',
        borderColor: 'rgba(255, 159, 64, 1)',
      },
    ],
  };

  return (
    <Fragment>
      <Typography variant="subtitle2" style={{ textAlign: 'center', marginBottom: 12 }}>
        {`Respondents answering if they feel that your employer 
          takes mental health as seriously as physical health`}
      </Typography>
      <div className="chartWrapper">
        <Radar data={data} options={options} />
      </div>
    </Fragment>
  );
};

export default memo(MentalVsPhysical);
