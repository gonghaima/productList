// @flow
/**
 * @module Actions/User
 * @desc User Actions
 */
import { createActions } from 'redux-actions';

import { ActionTypes } from 'constants/index';

export const { productGetRepos: getRepos } = createActions({
  [ActionTypes.PRODUCT_GET_REPOS]: query => ({ query }),
});
