import { handleActions } from 'redux-actions';
import immutable from 'immutability-helper';
import { ActionTypes } from 'constants/index';
import config from '../config';

export const selectionState = {
  itemPerPage: config.selection[0],
  selectionItems: config.selection,
  currentPage: 0,
};

export default {
  selection: handleActions(
    {
      [ActionTypes.SELECTION_CHANGE]: (state, { payload }) => {
        const data = payload.selectedValue;
        return immutable(state, {
          itemPerPage: { $set: data },
        });
      },
      [ActionTypes.PAGE_CHANGE]: (state, { payload }) => {
        const data = payload.currentPage;
        return immutable(state, {
          currentPage: { $set: data },
        });
      },
    },
    selectionState,
  ),
};
