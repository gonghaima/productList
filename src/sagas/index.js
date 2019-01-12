import { all, fork } from 'redux-saga/effects';

import github from './product';
// import user from './user';

/**
 * rootSaga
 */
export default function* root() {
  yield all([fork(github)]);
}
