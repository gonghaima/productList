import { all, fork } from 'redux-saga/effects';

import product from './product';
// import user from './user';

/**
 * rootSaga
 */
export default function* root() {
  yield all([fork(product)]);
}
