import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';


const BarChart = (props) => {
  const { data, ...nativeProps } = props;

  return (
    <div className="chartWrapper">
      <Bar data={data} {...nativeProps} />
    </div>
  );
};

BarChart.propTypes = {
  data: PropTypes.shape({}).isRequired,
};


export default memo(BarChart);
