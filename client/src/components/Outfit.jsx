import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-multi-carousel';
import localStorage from 'local-storage';
import AddToOutfit from './AddToOutfit';
import Card from './Card';

const Outfit = ({ currentProduct }) => {
  const [outfit, setOutfit] = useState([]);

  useEffect(() => {
    setOutfit(localStorage.get('outfit') || []);
  }, []);

  const addToOutfit = (newItem) => {
    let unique = true;
    outfit.forEach((item) => {
      if (newItem.name === item.name) {
        unique = false;
      }
    });

    if (unique) {
      setOutfit([...outfit, newItem]);
      localStorage.set('outfit', [...outfit, newItem]);
    }
  };

  const deleteFromOutfit = (itemToDelete) => {
    let index;
    outfit.forEach((item, i) => {
      if (item.id === itemToDelete) {
        index = i;
      }
    });

    setOutfit(outfit.slice(0, index).concat(outfit.slice(index + 1)));
    localStorage.set('outfit', outfit.slice(0, index).concat(outfit.slice(index + 1)));
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

  const assembleCarouselItems = () => {
    const carouselItems = [];

    carouselItems.push(<AddToOutfit
      key={Math.random()}
      addToOutfit={addToOutfit}
      currentProduct={currentProduct}
    />);

    for (let i = 0; i < outfit.length; i += 1) {
      const product = outfit[i];
      carouselItems.push(<Card key={product.id} product={product} handleClick={deleteFromOutfit} button="X" />);
    }

    return (
      <Carousel responsive={responsive}>
        {carouselItems}
      </Carousel>
    );
  };

  return (
    <div id="outfit">
      <h2>YOUR OUTFIT</h2>
      {assembleCarouselItems()}
    </div>
  );
};

Outfit.defaultProps = {
  currentProduct: null,
};

Outfit.propTypes = {
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

export default Outfit;
