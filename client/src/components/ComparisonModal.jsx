/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import Stars from './Stars';

const ComparisonModal = ({
  modal, toggle, productToCompare, currentProduct,
}) => {
  const {
    category, description, ratings, price, name,
  } = productToCompare;

  const {
    currentCategory, currentDescription, currentRatings, currentPrice, currentName,
  } = currentProduct;

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>Comparing</ModalHeader>
        <ModalBody>
          <table>
            <thead>
              <tr>
                <th>{name}</th>
                <th> </th>
                <th>{currentName}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{category}</td>
                <td>Category</td>
                <td>{currentCategory}</td>
              </tr>
              <tr>
                <td>{description}</td>
                <td>Description</td>
                <td>{currentDescription}</td>
              </tr>
              <tr>
                <td>
                  $
                  {price}
                </td>
                <td>Price</td>
                <td>
                  $
                  {currentPrice}
                </td>
              </tr>
              {ratings && currentRatings ? (
                <tr>
                  <td>{Object.keys(ratings).length !== 0 ? <Stars ratings={ratings} /> : null}</td>
                  <td>Rating</td>
                  <td>
                    {Object.keys(currentRatings).length !== 0
                      ? <Stars ratings={currentRatings} /> : null}
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </ModalBody>
        <ModalFooter>
          {' '}
          <Button color="secondary" onClick={toggle}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ComparisonModal;
