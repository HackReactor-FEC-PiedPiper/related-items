import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import RelatedProducts from './RelatedProducts';
import Outfit from './Outfit';

const App = () => {
  const { productId } = useParams();
  const [currentProduct, setCurrentProduct] = useState({});

  useEffect(() => {
    axios.all([
      axios.get(`http://52.26.193.201:3000/products/${productId}`),
      axios.get(`http://52.26.193.201:3000/reviews/${productId}/meta`),
      axios.get(`http://52.26.193.201:3000/products/${productId}/styles`),
    ]).then((results) => {
      const resultObj = {
        id: results[0].data.id,
        category: results[0].data.category,
        name: results[0].data.name,
        price: `$${results[0].data.default_price}`,
        ratings: results[1].data.ratings,
        photoURL: results[2].data.results[0].photos[0].url,
      };
      results[0].data.features.forEach((item) => {
        resultObj[item.feature] = item.value;
      });
      setCurrentProduct(resultObj);
    });
  }, [productId]);

  return (
    <div>
      <RelatedProducts currentProduct={currentProduct} />
      <Outfit currentProduct={currentProduct} />
    </div>
  );
};

export default App;
