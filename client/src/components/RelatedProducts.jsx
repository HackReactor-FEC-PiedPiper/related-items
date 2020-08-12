import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
import ComparisonModal from './ComparisonModal';

const RelatedProducts = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('http://52.26.193.201:3000/products/1/related')
      .then(
        (result) => {
          const productIds = result.data;
          axios.all(productIds.map((productId) => (
            axios.all([
              axios.get(`http://52.26.193.201:3000/products/${productId}`),
              axios.get(`http://52.26.193.201:3000/products/${productId}/styles`),
              axios.get(`http://52.26.193.201:3000/reviews/${productId}/meta`),
            ])
          ))).then((results) => {
            const resultsObj = results.map((product) => ({
              id: product[0].data.id,
              category: product[0].data.category,
              name: product[0].data.name,
              price: product[0].data.default_price,
              photoURL: product[1].data.results[0].photos[0].url,
              ratings: product[2].data.ratings,
            }));
            setItems(resultsObj);
          });
        },
      );
  }, []);

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div id="related-products">
      <h2>RELATED PRODUCTS</h2>
      <div className="card-container">
        {items.slice(0, 3).map((product) => (
          <Card key={product.id} product={product} toggle={toggle} />
        ))}
      </div>
      <ComparisonModal buttonLabel="Click me!" modal={modal} toggle={toggle} />
    </div>
  );
};

export default RelatedProducts;
