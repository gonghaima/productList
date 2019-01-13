import { handleActions } from 'redux-actions';
import immutable from 'immutability-helper';
import { ActionTypes } from 'constants/index';
import config from '../config';

export const selectionState = {
  itemPerPage: config.selection[0],
  selectionItems: config.selection,
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
    },
    selectionState,
  ),
};
