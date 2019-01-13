// @flow
/**
 * @module Actions/User
 * @desc User Actions
 */
import { createActions } from 'redux-actions';

import { ActionTypes } from 'constants/index';

export const { selectionChange: setSelection } = createActions({
  [ActionTypes.SELECTION_CHANGE]: selectedValue => ({ selectedValue }),
});

export const { pageChange: setPage } = createActions({
  [ActionTypes.PAGE_CHANGE]: currentPage => ({ currentPage }),
});
