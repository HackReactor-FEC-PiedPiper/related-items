import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import Outfit from '../src/components/Outfit';

configure({ adapter: new Adapter() });

describe('Outfit should render properly', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Outfit />);
  });

  test('Outfit component should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('Should contain a heading', () => {
    expect(wrapper.find('h2').text()).toBe('YOUR OUTFIT');
  });
});
