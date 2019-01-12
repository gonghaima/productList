import { expectSaga } from 'redux-saga-test-plan';

import product, { getRepos } from 'sagas/product';
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

  it('should have the repos saga', () =>
    expectSaga(getRepos, { payload: { query: 'react' } })
      .put({
        type: ActionTypes.GITHUB_GET_REPOS_SUCCESS,
        payload: {
          data: [],
        },
      })
      .run());
});
