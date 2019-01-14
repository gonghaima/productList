import { expectSaga } from 'redux-saga-test-plan';
import product, { getProducts } from 'sagas/product';
import { ActionTypes } from 'constants/index';

jest.mock('modules/client', () => ({
  request: () => ({ items: [] }),
}));

describe('product', () => {
  it('should have the expected watchers', done =>
    expectSaga(product)
      .run({ silenceTimeout: true })
      .then(saga => {
        expect(saga).toMatchSnapshot();
        done();
      }));

  it('should have the product saga', () =>
    expectSaga(getProducts, { payload: { query: 'react' } })
      .put({
        type: ActionTypes.PRODUCT_GET_SUCCESS,
        payload: {
          data: [],
        },
      })
      .run());
});
