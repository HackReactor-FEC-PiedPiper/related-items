import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Carousel from 'react-multi-carousel';
import Card from './Card';
import ComparisonModal from './ComparisonModal';

const RelatedProducts = ({ currentProduct }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    axios.get(`http://52.26.193.201:3000/products/${currentProduct.id}/related`)
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
              resultsObj.photoURL = product[1].data.results[0].photos[0].url;
              resultsObj.ratings = product[2].data.ratings;
              resultsArray.push(resultsObj);
            }
            setRelatedProducts(resultsArray);
          });
        },
      );
  }, [currentProduct]);

  const [modal, setModal] = useState(false);

  const [productToCompare, setProductToCompare] = useState({});

  const toggle = (product) => {
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

RelatedProducts.defaultProps = {
  currentProduct: null,
};

RelatedProducts.propTypes = {
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

export default RelatedProducts;
