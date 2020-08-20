import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';
import { configure, mount } from 'enzyme';
import App from '../src/components/App';

configure({ adapter: new Adapter() });

describe('App should render properly', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter initialEntries={['/:productId']}>
        <App />
      </MemoryRouter>,
    );
  });

  test('App component should render correctly', () => {
    expect(wrapper.find('RelatedProducts')).toHaveLength(1);
    expect(wrapper.find('Outfit')).toHaveLength(1);
  });
});
