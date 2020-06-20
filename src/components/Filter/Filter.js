import React from 'react';
import PropTypes from 'prop-types';

const Filter = ({ hanleFilterChange }) => {
  return (
    <div>
      <h3>Find your contact:</h3>
      <input type="text" onChange={hanleFilterChange} />
    </div>
  );
};

export default Filter;

Filter.propTypes = {
  hanleFilterChange: PropTypes.func.isRequired,
};
