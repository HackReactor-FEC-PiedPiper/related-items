import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import RelatedProducts from '../src/components/RelatedProducts';

configure({ adapter: new Adapter() });

describe('Related Products should render properly', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<RelatedProducts />);
  });

  test('Related Products component should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('Should contain a heading', () => {
    expect(wrapper.find('h2').text()).toBe('RELATED PRODUCTS');
  });
});
