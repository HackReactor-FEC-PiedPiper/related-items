import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import Stars from '../src/components/Stars';

configure({ adapter: new Adapter() });

describe('Stars should render properly', () => {
  let wrapper;

  const sampleData = {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
  };

  beforeEach(() => {
    wrapper = shallow(<Stars ratings={sampleData} />);
  });

  test('Stars component should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
