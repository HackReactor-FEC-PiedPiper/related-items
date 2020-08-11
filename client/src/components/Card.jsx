import React from 'react';
import PropTypes from 'prop-types';
import Stars from './Stars';

const Card = ({ product }) => {
  const {
    category, name, price, photoURL, ratings,
  } = product;

  return (
    <div className="card">
      {photoURL ? <img src={photoURL} alt={name} /> : <div className="image-placeholder" />}
      <div className="card-content">
        <p id="category" className="light">{category}</p>
        <h3>{name}</h3>
        <p id="price" className="light">
          $
          {price}
        </p>
        {Object.keys(ratings).length !== 0 ? <Stars ratings={ratings} /> : null}
      </div>
    </div>
  );
};

Card.propTypes = {
  product: PropTypes.shape(
    {
      category: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      photoURL: PropTypes.string,
      ratings: PropTypes.shape({
        1: PropTypes.number,
        2: PropTypes.number,
        3: PropTypes.number,
        4: PropTypes.number,
        5: PropTypes.number,
      }),
    },
  ).isRequired,
};

export default Card;
