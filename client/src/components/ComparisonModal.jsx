/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import Stars from './Stars';
import './css/main.css';

const ComparisonModal = ({
  modal, toggle, productToCompare, currentProduct,
}) => (
  <div>
    <Modal isOpen={modal} toggle={() => toggle({})} size="lg">
      <ModalHeader toggle={() => toggle({})}>Comparing</ModalHeader>
      <ModalBody>
        <table>
          <thead>
            <tr>
              <th>{currentProduct.name}</th>
              <th> </th>
              <th>{productToCompare.name}</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(currentProduct).map((characteristic) => {
              if (characteristic === 'ratings' && typeof currentProduct[characteristic] === 'object') {
                return (
                  <tr key={Math.random()}>
                    <td>
                      { currentProduct ? <Stars ratings={currentProduct.ratings} /> : null }
                    </td>
                    <td>Rating</td>
                    <td>
                      { currentProduct ? <Stars ratings={currentProduct.ratings} /> : null }
                    </td>
                  </tr>
                );
              }
              if (characteristic !== 'ratings' && characteristic !== 'photoURL' && characteristic !== 'id' && characteristic !== 'category' && characteristic !== 'name') {
                return (
                  <tr key={Math.random()}>
                    <td>{currentProduct[characteristic]}</td>
                    <td>{characteristic[0].toUpperCase() + characteristic.substring(1)}</td>
                    <td>{productToCompare[characteristic]}</td>
                  </tr>
                );
              }
              return null;
            })}
            {Object.keys(productToCompare).map((characteristic) => {
              if (characteristic !== 'ratings' && characteristic !== 'photoURL' && characteristic !== 'id' && currentProduct[characteristic] === undefined) {
                return (
                  <tr key={Math.random()}>
                    <td> </td>
                    <td>{characteristic[0].toUpperCase() + characteristic.substring(1)}</td>
                    <td>{productToCompare[characteristic]}</td>
                  </tr>
                );
              }
              return null;
            })}
          </tbody>
        </table>
      </ModalBody>
      <ModalFooter>
        {' '}
        <Button color="secondary" onClick={() => toggle({})}>Close</Button>
      </ModalFooter>
    </Modal>
  </div>
);

export default ComparisonModal;
