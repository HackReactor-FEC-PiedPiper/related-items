import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import localStorage from 'local-storage';
import AddToOutfit from './AddToOutfit';
import Card from './Card';

const Outfit = () => {
  const [outfit, setOutfit] = useState([]);

  useEffect(() => {
    localStorage.clear();
    setOutfit(localStorage.get('outfit') || []);
  }, []);

  const addToOutfit = (newItem) => {
    setOutfit([...outfit, newItem]);
    localStorage.set('outfit', [...outfit, newItem]);
  };

  const deleteFromOutfit = (itemToDelete) => {
    console.log('itemToDelete', itemToDelete);
    let index;
    outfit.forEach((item, i) => {
      if (item.id === itemToDelete) {
        index = i;
      }
    });
    console.log('index', index);
    console.log('outfit', outfit);
    const newOutfit = outfit;
    newOutfit.splice(index, 1);
    console.log('newOutfit', newOutfit);
    setOutfit(newOutfit);
    console.log('local storage before', localStorage.get('outfit'));
    localStorage.set('outfit', newOutfit);
    console.log('local storage after', localStorage.get('outfit'));
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

    carouselItems.push(<AddToOutfit addToOutfit={addToOutfit} />);

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
      <h2>MY OUTFIT</h2>
      {assembleCarouselItems()}
    </div>
  );
};

export default Outfit;
