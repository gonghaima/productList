import React from 'react';

import Home from 'routes/Home';

function setup() {
  const props = {
    dispatch: () => {},
    location: {},
  };

  return shallow(<Home {...props} />);
}

describe('Private', () => {
  const wrapper = setup();

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
