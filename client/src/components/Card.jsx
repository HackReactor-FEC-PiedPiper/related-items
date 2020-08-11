import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ product }) => {
  const {
    category, name, price, photoURL,
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
        <p id="stars">#####</p>
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
    },
  ).isRequired,
};

export default Card;
