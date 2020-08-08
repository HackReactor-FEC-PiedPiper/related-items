import React from 'react';
import Card from './Card';

const Outfit = () => (
  <div id="outfit">
    <h2>YOUR OUTFIT</h2>
    <div className="card-container">
      <Card />
      <Card />
      <Card />
    </div>
  </div>
);

export default Outfit;
