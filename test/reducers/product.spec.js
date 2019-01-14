import reducer from 'reducers/product';
import { ActionTypes } from 'constants/index';

describe('Product', () => {
  it('should return the initial state', () => {
    expect(reducer.product(undefined, {})).toMatchSnapshot();
  });

  it(`should handle ${ActionTypes.PRODUCT_GET_MAKE}`, () => {
    expect(
      reducer.product(undefined, {
        type: ActionTypes.PRODUCT_GET_MAKE,
        payload: { q: 'react' },
      }),
    ).toMatchSnapshot();
  });

  it(`should handle ${ActionTypes.PRODUCT_GET_SUCCESS}`, () => {
    expect(
      reducer.product(undefined, {
        type: ActionTypes.PRODUCT_GET_SUCCESS,
        payload: {},
      }),
    ).toMatchSnapshot();
  });

  it(`should handle ${ActionTypes.PRODUCT_GET_REPOS_FAILURE}`, () => {
    expect(
      reducer.product(undefined, {
        type: ActionTypes.PRODUCT_GET_REPOS_FAILURE,
        payload: {},
      }),
    ).toMatchSnapshot();
  });
});
