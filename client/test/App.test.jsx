import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import App from '../src/components/App';

configure({ adapter: new Adapter() });

describe('App should render properly', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  test('App component should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
