import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import ComparisonModal from '../src/components/ComparisonModal';

configure({ adapter: new Adapter() });

describe('ComparisonModal should render properly', () => {
  let wrapper;

  const sampleModal = true;

  const sampleToggle = () => 'toggled!';

  const sampleProductOne = {
    id: 13,
    category: 'Dress',
    name: 'Polka Dot A-Line Dress',
    price: '$110',
    photoURL: null,
    ratings: {},
  };

  const sampleProductTwo = {
    id: 5,
    category: 'Shoes',
    name: 'Heir Force Ones',
    price: '$123',
    photoURL: null,
    ratings: {},
  };

  beforeEach(() => {
    wrapper = shallow(<ComparisonModal
      modal={sampleModal}
      toggle={sampleToggle}
      productToCompare={sampleProductTwo}
      currentProduct={sampleProductOne}
    />);
  });

  test('ComparisonModal component should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
