import React from 'react';
import PropTypes from 'prop-types';
import './css/main.css';

const AddToOutfit = ({ addToOutfit, currentProduct }) => (
  <div className="c-card c-add-to-outfit">
    <i className="c-add-to-outfit__icon fas fa-plus" onClick={() => addToOutfit(currentProduct)} role="button" tabIndex={0} onKeyPress={() => addToOutfit(currentProduct)} aria-label="c-add-to-outfit" />
    <div className="c-add-to-outfit__text">
      <div className="c-add-to-outfit__word">Add</div>
      <strong className="c-add-to-outfit__word">{currentProduct.name}</strong>
      <div className="c-add-to-outfit__word">To Outfit</div>
    </div>
  </div>
);

AddToOutfit.defaultProps = {
  currentProduct: null,
};

AddToOutfit.propTypes = {
  addToOutfit: PropTypes.func.isRequired,
  currentProduct: PropTypes.shape(
    {
      id: PropTypes.number,
      category: PropTypes.string,
      name: PropTypes.string,
      price: PropTypes.string,
      photoURL: PropTypes.string,
      ratings: PropTypes.shape({
        1: PropTypes.number,
        2: PropTypes.number,
        3: PropTypes.number,
        4: PropTypes.number,
        5: PropTypes.number,
      }),
    },
  ),
};

export default AddToOutfit;
