import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
import ComparisonModal from './ComparisonModal';

const RelatedProducts = () => {
  // This is all hard-coded but will be removed when modules are combined
  const [currentProduct, setCurrentProduct] = useState({});

  useEffect(() => {
    axios.all([
      axios.get('http://52.26.193.201:3000/products/5'),
      axios.get('http://52.26.193.201:3000/reviews/5/meta'),
    ]).then((results) => {
      const resultObj = {
        currentCategory: results[0].data.category,
        currentName: results[0].data.name,
        currentPrice: results[0].data.default_price,
        currentDescription: results[0].data.description,
        currentRatings: results[1].data.ratings,
      };
      setCurrentProduct(resultObj);
    });
  }, []);

  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    axios.get('http://52.26.193.201:3000/products/5/related')
      .then(
        (result) => {
          const onlyUnique = (value, index, self) => (
            self.indexOf(value) === index
          );

          const productIds = result.data.filter(onlyUnique);
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
              description: product[0].data.description,
              photoURL: product[1].data.results[0].photos[0].url,
              ratings: product[2].data.ratings,
            }));
            setRelatedProducts(resultsObj);
          });
        },
      );
  }, []);

  const [modal, setModal] = useState(false);

  const [productToCompare, setProductToCompare] = useState({});

  const toggle = (product = {}) => {
    setProductToCompare(product);
    setModal(!modal);
  };

  return (
    <div id="related-products">
      <h2>RELATED PRODUCTS</h2>
      <div className="card-container">
        {relatedProducts.slice(0, 3).map((product) => (
          <Card key={product.id} product={product} toggle={toggle} />
        ))}
      </div>
      <ComparisonModal buttonLabel="Click me!" modal={modal} toggle={toggle} productToCompare={productToCompare} currentProduct={currentProduct} />
    </div>
  );
};

export default RelatedProducts;
