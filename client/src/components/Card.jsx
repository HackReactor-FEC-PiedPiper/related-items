import React from 'react';
import PropTypes from 'prop-types';
import Stars from './Stars';

const Card = ({ product, toggle }) => {
  const {
    category, name, price, photoURL, ratings,
  } = product;

  return (
    <div className="card">
      {photoURL ? <img src={photoURL} alt={name} /> : <div className="image-placeholder" />}
      <i className="far fa-star" onClick={toggle} />
      <div className="card-content">
        <div id="category" className="light">{category}</div>
        <h3>{name}</h3>
        <div id="price" className="light">
          $
          {price}
        </div>
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
