import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import AddToOutfit from '../src/components/AddToOutfit';

configure({ adapter: new Adapter() });

describe('App should render properly', () => {
  let wrapper;
  let result;

  const sampleAddToOutfit = () => {
    result = 'Added to Outfit!';
  };

  beforeEach(() => {
    wrapper = shallow(<AddToOutfit addToOutfit={sampleAddToOutfit} />);
  });

  test('App component should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('Plus icon should call a function when clicked', () => {
    expect(wrapper.find('i').simulate('click'));
    expect(result).toBe('Added to Outfit!');
  });

  test('Plus icon should call a function when key is pressed', () => {
    expect(wrapper.find('i').simulate('keyPress'));
    expect(result).toBe('Added to Outfit!');
  });
});
