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
export function* getRepos() {
  try {
    // const response = yield call(
    //   request,
    //   `https://api.github.com/search/repositories?q=${payload.query}&sort=stars`,
    // );

    // yield call(request, `https://api.github.com/search/repositories?q=${payload.query}&sort=stars`);
    yield put({
      type: ActionTypes.PRODUCT_GET_REPOS_SUCCESS,
      payload: { data: productData },
    });
  } catch (err) {
    /* istanbul ignore next */
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
  yield all([takeLatest(ActionTypes.PRODUCT_GET_REPOS, getRepos)]);
}
