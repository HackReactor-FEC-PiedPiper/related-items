import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import Card from '../src/components/Card';

configure({ adapter: new Adapter() });

describe('Card should render properly', () => {
  let wrapper;
  let result;

  const sampleProduct = {
    id: 5,
    category: 'Shoes',
    name: 'Heir Force Ones',
    price: '$123',
    photoURL: null,
    ratings: {},
  };

  const sampleHandleClick = (input) => {
    result = `Click! Here is the input: ${JSON.stringify(input)}`;
  };

  const sampleButton = 'X';

  beforeEach(() => {
    wrapper = shallow(<Card
      product={sampleProduct}
      handleClick={sampleHandleClick}
      button={sampleButton}
    />);
  });

  test('Card component should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('Should contain a category name', () => {
    expect(wrapper.find('#category').text()).toBe('Shoes');
  });

  test('Should contain a product name', () => {
    expect(wrapper.find('h3').text()).toBe('Heir Force Ones');
  });

  test('Should contain a price', () => {
    expect(wrapper.find('#price').text()).toBe('$123');
  });

  test('X icon should call a function when clicked', () => {
    expect(wrapper.find('.x-btn').simulate('click'));
    expect(result).toBe('Click! Here is the input: 5');
  });

  test('X icon should call a function when key is pressed', () => {
    expect(wrapper.find('.x-btn').simulate('keyPress'));
    expect(result).toBe('Click! Here is the input: 5');
  });

  let wrapperTwo;
  let resultTwo;

  const sampleProductTwo = {
    id: 5,
    category: 'Shoes',
    name: 'Heir Force Ones',
    price: '$123',
    photoURL: null,
    ratings: {},
  };

  const sampleHandleClickTwo = (input) => {
    resultTwo = `Click! Here is the input: ${JSON.stringify(input)}`;
  };

  const sampleButtonTwo = 'star';

  beforeEach(() => {
    wrapperTwo = shallow(<Card
      product={sampleProductTwo}
      handleClick={sampleHandleClickTwo}
      button={sampleButtonTwo}
    />);
  });

  test('Star icon should call a function when clicked', () => {
    expect(wrapperTwo.find('.star-btn').simulate('click'));
    expect(resultTwo).toBe('Click! Here is the input: {"id":5,"category":"Shoes","name":"Heir Force Ones","price":"$123","photoURL":null,"ratings":{}}');
  });

  test('Star icon should call a function when key is pressed', () => {
    expect(wrapperTwo.find('.star-btn').simulate('keyPress'));
    expect(resultTwo).toBe('Click! Here is the input: {"id":5,"category":"Shoes","name":"Heir Force Ones","price":"$123","photoURL":null,"ratings":{}}');
  });
});
