import React from 'react';

import { STATUS } from 'constants/index';

import { Product } from 'containers/Product';

jest.mock('uuid/v4', () => () => 'ABCDE');

const mockDispatch = jest.fn();
const props = {
  dispatch: mockDispatch,
  product: {
    repos: {
      data: [],
    },
  },
};

function setup(ownProps = props) {
  return shallow(<Product {...ownProps} />, { attachTo: document.getElementById('react') });
}

describe('GitHub', () => {
  const wrapper = setup();

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a Loader without data', () => {
    expect(wrapper.find('Loader')).toExist();
  });

  it('should have dispatched an action on mount', () => {
    expect(mockDispatch).toHaveBeenCalledWith({
      payload: { query: 'react' },
      type: 'PRODUCT_GET_REPOS',
    });
  });

  it("should not render if selected data doesn't exist", () => {
    wrapper.setProps({
      product: {
        repos: {
          data: {},
          status: STATUS.READY,
        },
      },
    });

    expect(wrapper.find('Grid')).not.toExist();
  });

  it('should render the Grid if data exists', () => {
    wrapper.setProps({
      product: {
        repos: {
          data: {
            react: [
              {
                id: 12,
                name: 'magic-tricks',
                html_url: 'https://github.com/username/magic-tricks',
                description: 'nothing much',
                owner: {
                  avatar_url: 'avatar_url',
                  login: 'username',
                },
              },
            ],
          },
          status: STATUS.READY,
        },
      },
    });

    expect(wrapper.find('Grid')).toMatchSnapshot();
  });
});
