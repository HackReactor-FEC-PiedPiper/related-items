import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Stars from './Stars';
import './css/main.css';

const Card = ({ product, handleClick, button }) => {
  const {
    id, category, name, price, photoURL, ratings,
  } = product;

  return (
    <div className="c-card">
      {photoURL
        ? <Link to={`/${id}`}><img className="c-card__image" src={photoURL} alt={name} /></Link> : (
          <Link to={`/${id}`}>
            <div className="c-card__image-placeholder">
              <div>No picture to display</div>
              <i className="c-card__icon fas fa-camera" />
            </div>
          </Link>
        )}
      { button === 'compare' ? (
        <i
          className="fas fa-exchange-alt c-card__btn c-card__btn--compare"
          onClick={() => handleClick(product)}
          role="button"
          tabIndex={0}
          onKeyPress={() => handleClick(product)}
          aria-label="compare"
        />
      ) : (
        <i
          className="far fa-times-circle c-card__btn c-card__btn--delete"
          onClick={() => handleClick(id)}
          role="button"
          tabIndex={0}
          onKeyPress={() => handleClick(id)}
          aria-label="delete-from-outfit"
        />
      )}
      <div className="c-card__content">
        <div id="category" className="c-card__text light">{category}</div>
        <Link to={`/${id}`}><h3>{name}</h3></Link>
        <div id="price" className="c-card__text light">
          {price}
        </div>
        {Object.keys(ratings).length !== 0 ? <Stars ratings={ratings} /> : null}
      </div>
    </div>
  );
};

Card.propTypes = {
  handleClick: PropTypes.func.isRequired,
  button: PropTypes.string.isRequired,
  product: PropTypes.shape(
    {
      id: PropTypes.number,
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
