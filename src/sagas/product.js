/**
 * @module Sagas/Product
 * @desc Product
 */

import { all, put, takeLatest } from 'redux-saga/effects';
// import { request } from 'modules/client';

import { ActionTypes } from 'constants/index';
// import gitHubData from '../mocks/githubData';
import productData from '../mocks/productData';

/**
 * Get Repos
 *
 * @param {Object} action
 *
 */
// export function* getRepos({ payload })
export function* getProducts() {
  try {
    yield put({
      type: ActionTypes.PRODUCT_GET_SUCCESS,
      payload: { data: productData },
    });
  } catch (err) {
    yield put({
      type: ActionTypes.PRODUCT_GET_REPOS_FAILURE,
      payload: err,
    });
  }
}

/**
 * Product Sagas
 */
export default function* root() {
  yield all([takeLatest(ActionTypes.PRODUCT_GET_MAKE, getProducts)]);
}
