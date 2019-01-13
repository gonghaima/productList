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
