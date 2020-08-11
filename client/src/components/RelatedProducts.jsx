import React, { useState, useEffect } from 'react';
import Card from './Card';

const RelatedProducts = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://52.26.193.201:3000/products/1/related')
      .then((res) => res.json())
      .then(
        (productIds) => {
          Promise.all(productIds.map((productId) => (
            fetch(`http://52.26.193.201:3000/products/${productId}`)
          ))).then((result) => {
            Promise.all(result.map((res) => res.json()))
              .then((productInfo) => {
                console.log('productInfo', productInfo);
                setItems(productInfo);
              });
          });
        },
      );
  }, []);

  console.log('items', items);

  return (
    <div id="related-products">
      <h2>RELATED PRODUCTS</h2>
      <div className="card-container">
        {items.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
