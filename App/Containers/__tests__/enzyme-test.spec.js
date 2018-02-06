import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// imported as a connected component!
import TestComponent from '../TestComponent';

const middlewares = []; // you can mock any middlewares here if necessary
const mockStore = configureStore(middlewares);
configure({ adapter: new Adapter() });

const initialState = {
  preferences: {
    save_photos_locally: false,
    open_to_camera: false,
  },
};

describe('Testing TestComponent', () => {
  it('renders as expected', () => {
    const wrapper = shallow(
      <TestComponent />,
      { context: { store: mockStore(initialState) } },
    );
    expect(wrapper).toMatchSnapshot();
  });
});
