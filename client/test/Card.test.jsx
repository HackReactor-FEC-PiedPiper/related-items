import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import Card from '../src/components/Card';

configure({ adapter: new Adapter() });

describe('Card should render properly', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Card />);
  });

  test('Card component should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('Should contain a category name', () => {
    expect(wrapper.find('#category').text()).toBe('CATEGORY');
  });

  test('Should contain a product name', () => {
    expect(wrapper.find('h3').text()).toBe('Expanded Product Name with Extra Text');
  });

  test('Should contain a price', () => {
    expect(wrapper.find('#price').text()).toBe('$123');
  });

  test('Should contain a star review', () => {
    expect(wrapper.find('#stars').text()).toBe('#####');
  });
});
