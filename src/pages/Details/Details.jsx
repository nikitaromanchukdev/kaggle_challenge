import React from 'react';
import PropTypes from 'prop-types';

const Details = ({ match }) => {
  const { surveyId } = match.params;

  return (
    <div>
      {surveyId}
    </div>
  );
};

Details.propTypes = {
  match: PropTypes.shape(),
};

Details.defaultProps = {
  match: null,
};

export default Details;
