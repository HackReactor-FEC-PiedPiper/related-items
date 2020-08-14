import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddToOutfit = ({ addToOutfit }) => {
  // This is all hard-coded but will be removed when modules are combined
  const [currentProduct, setCurrentProduct] = useState({});

  useEffect(() => {
    axios.all([
      axios.get('http://52.26.193.201:3000/products/5'),
      axios.get('http://52.26.193.201:3000/reviews/5/meta'),
    ]).then((results) => {
      const resultObj = {
        id: results[0].data.id,
        category: results[0].data.category,
        name: results[0].data.name,
        price: `$${results[0].data.default_price}`,
        description: results[0].data.description,
        ratings: results[1].data.ratings,
      };
      results[0].data.features.forEach((item) => {
        resultObj[item.feature] = item.value;
      });
      setCurrentProduct(resultObj);
    });
  }, []);

  return (
    <div className="card outfit">
      <i className="fas fa-plus plus" onClick={() => addToOutfit(currentProduct)} role="button" tabIndex={0} onKeyPress={() => addToOutfit(currentProduct)} aria-label="add-to-outfit" />
      <h3 className="add-to-outfit">
        <div>Add</div>
        <strong>{currentProduct.name}</strong>
        <div>To Outfit</div>
      </h3>
    </div>
  );
};

export default AddToOutfit;
