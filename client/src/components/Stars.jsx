import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './scss/starRating.scss';

const Stars = ({ ratings }) => {
  const [starRating, setStarRating] = useState(0);

  useEffect(() => {
    let count = 0;
    let total = 0;
    const ratingNumbers = ratings;

    const keys = Object.keys(ratingNumbers);

    keys.forEach((key) => {
      count += ratingNumbers[key];
      total += ratingNumbers[key] * Number(key);
    });

    const avg = (total / count).toFixed(1);

    setStarRating(avg);
  }, []);

  return (
    <span className="Stars" style={{ '--rating': `${starRating}` }} />
  );
};

Stars.defaultProps = {
  ratings: null,
};

Stars.propTypes = {
  ratings: PropTypes.shape({
    1: PropTypes.number,
    2: PropTypes.number,
    3: PropTypes.number,
    4: PropTypes.number,
    5: PropTypes.number,
  }),
};

export default Stars;
