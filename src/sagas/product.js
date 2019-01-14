/**
 * @module Sagas/Product
 * @desc Product
 */

import { all, call, put, takeLatest } from 'redux-saga/effects';
import { request } from 'modules/client';
import { ActionTypes } from 'constants/index';

/**
 * Get Repos
 *
 * @param {Object} action
 *
 */
export function* getProducts() {
  try {
    const response = yield call(request, '/api/product');
    yield put({
      type: ActionTypes.PRODUCT_GET_SUCCESS,
      payload: { data: (response && response.data) || [] },
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
