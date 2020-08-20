import React from 'react';
import PropTypes from 'prop-types';

const AddToOutfit = ({ addToOutfit, currentProduct }) => (
  <div className="card outfit">
    <i className="fas fa-plus plus" onClick={() => addToOutfit(currentProduct)} role="button" tabIndex={0} onKeyPress={() => addToOutfit(currentProduct)} aria-label="add-to-outfit" />
    <div className="add-to-outfit">
      <div>Add</div>
      <strong>{currentProduct.name}</strong>
      <div>To Outfit</div>
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
