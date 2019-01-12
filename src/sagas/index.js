import { all, fork } from 'redux-saga/effects';

import app from './appxxxxx';
import github from './github';
// import user from './user';

/**
 * rootSaga
 */
export default function* root() {
  yield all([fork(app), fork(github)]);
}
