import React, { Fragment, memo } from 'react';
import { useSelector } from 'react-redux';
import { PolarArea } from 'react-chartjs-2';

import { careOptionsSelector } from 'app/store/selectors';
import { roundToPrecision } from 'utils/math';
import { Typography } from '@material-ui/core';
import ChartFallback from 'components/ChartFallback';

const options = {
  plugins: {
    tooltip: {
      callbacks: {
        label: (ctx) => `${ctx.label} - ${roundToPrecision(ctx.parsed.r, 2).toFixed(2)}%`,
      },
    },
  },

  scale: {
    ticks: {
      maxTicksLimit: 5,
      min: 0,
      max: 100,
    },
  },
};

const CareOptions = () => {
  const careOptions = useSelector(careOptionsSelector);

  if (!careOptions.length) {
    return <ChartFallback />;
  }

  const data = {
    labels: careOptions.map((o) => o.key),
    datasets: [
      {
        data: careOptions.map((o) => o.proportion * 100),
        backgroundColor: [
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
        ],
      },
    ],
  };

  return (
    <Fragment>
      <Typography variant="subtitle2" style={{ textAlign: 'center', marginBottom: 12 }}>
        {`Respondents answering weather they know the options 
          for mental health care your employer provides`}
      </Typography>
      <div className="chartWrapper">
        <PolarArea data={data} options={options} />
      </div>
    </Fragment>
  );
};

export default memo(CareOptions);
