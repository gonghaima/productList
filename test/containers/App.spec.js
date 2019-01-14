import React from 'react';

import { STATUS } from 'constants/index';

import { App } from 'containers/App';
import { Pagination } from '../../src/containers/styled/product';

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
  return shallow(<App {...ownProps} />, { attachTo: document.getElementById('react') });
}

describe('App', () => {
  const wrapper = setup();

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should not render if selected data doesn't exist", () => {
    wrapper.setProps({
      product: {},
    });

    expect(wrapper.find('Grid')).not.toExist();
  });

  it('should render the Grid if data exists', () => {
    wrapper.setProps({
      selection: {
        itemPerPage: 1,
        selectionItems: [1, 3, 5],
      },
      product: {
        repos: {
          data: {
            react: [
              {
                id: 12,
                price: '$58.30',
                product_name: 'CAPTOPRIL',
                description: 'synthesize seamless methodologies',
                product_image: 'http://dummyimage.com/340x330.jpg/cc0000/ffffff',
              },
            ],
          },
          status: STATUS.READY,
        },
      },
    });

    expect(wrapper.find('Grid')).toMatchSnapshot();
    expect(wrapper.find(Pagination)).toMatchSnapshot();
  });
});
