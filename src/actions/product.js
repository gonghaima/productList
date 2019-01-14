// @flow
/**
 * @module Actions/User
 * @desc User Actions
 */
import { createActions } from 'redux-actions';

import { ActionTypes } from 'constants/index';

export const { productGetMake: getProducts } = createActions({
  [ActionTypes.PRODUCT_GET_MAKE]: query => ({ query }),
});
