import { handleActions } from 'redux-actions';
import immutable from 'immutability-helper';
import { ActionTypes } from 'constants/index';

export const selectionState = {
  itemPerPage: 100,
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
