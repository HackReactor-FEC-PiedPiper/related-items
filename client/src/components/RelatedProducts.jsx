import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Carousel from 'react-multi-carousel';
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
            const resultsArray = [];
            for (let i = 0; i < results.length; i += 1) {
              const resultsObj = {};
              const product = results[i];
              const { features } = product[0].data;
              for (let j = 0; j < features.length; j += 1) {
                resultsObj[features[j].feature] = features[j].value;
              }

              resultsObj.id = product[0].data.id;
              resultsObj.category = product[0].data.category;
              resultsObj.name = product[0].data.name;
              resultsObj.price = `$${product[0].data.default_price}`;
              resultsObj.description = product[0].data.description;
              resultsObj.photoURL = product[1].data.results[0].photos[0].url;
              resultsObj.ratings = product[2].data.ratings;
              resultsArray.push(resultsObj);
            }
            setRelatedProducts(resultsArray);
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

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div id="related-products">
      <h2>RELATED PRODUCTS</h2>
      <Carousel responsive={responsive}>
        {relatedProducts.map((product) => (
          <Card key={product.id} product={product} handleClick={toggle} button="star" />
        ))}
      </Carousel>
      <ComparisonModal
        modal={modal}
        toggle={toggle}
        productToCompare={productToCompare}
        currentProduct={currentProduct}
      />
    </div>
  );
};

export default RelatedProducts;
