import React from 'react';

import { Home } from 'routes/Home';

const mockDispatch = jest.fn();
const props = {
  dispatch: mockDispatch,
  location: {},
};

function setup(ownProps = props) {
  return mount(<Home {...ownProps} />);
}

describe('Home', () => {
  const wrapper = setup();

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
