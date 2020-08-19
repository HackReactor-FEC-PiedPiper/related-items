import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Stars from './Stars';

const Card = ({ product, handleClick, button }) => {
  const {
    id, category, name, price, photoURL, ratings,
  } = product;

  return (
    <div className="card">
      {photoURL
        ? <Link to={`/${id}`}><img src={photoURL} alt={name} className="link" /></Link> : (
          <Link to={`/${id}`} className="link">
            <div className="image-placeholder">
              <div>No picture to display</div>
              <i className="fas fa-camera" />
            </div>
          </Link>
        )}
      { button === 'star' ? (
        <i
          className="far fa-star star-btn"
          onClick={() => handleClick(product)}
          role="button"
          tabIndex={0}
          onKeyPress={() => handleClick(product)}
          aria-label="compare"
        />
      ) : (
        <i
          className="far fa-times-circle x-btn"
          onClick={() => handleClick(id)}
          role="button"
          tabIndex={0}
          onKeyPress={() => handleClick(id)}
          aria-label="delete-from-outfit"
        />
      )}
      <div className="card-content">
        <div id="category" className="light">{category}</div>
        <Link to={`/${id}`}><h3>{name}</h3></Link>
        <div id="price" className="light">
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
