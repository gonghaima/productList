import { handleActions } from 'redux-actions';
import immutable from 'immutability-helper';
import { parseError } from 'modules/client';

import { ActionTypes, STATUS } from 'constants/index';

export const productState = {
  repos: {
    data: {},
    status: STATUS.IDLE,
    message: '',
    query: '',
  },
};

export default {
  product: handleActions(
    {
      [ActionTypes.PRODUCT_GET_MAKE]: (state, { payload }) => {
        const data = state.repos.data[payload.query] ? state.repos.data[payload.query] : [];

        return immutable(state, {
          repos: {
            data: {
              [payload.query]: { $set: data },
            },
            message: { $set: '' },
            query: { $set: payload.query },
            status: { $set: STATUS.RUNNING },
          },
        });
      },
      [ActionTypes.PRODUCT_GET_SUCCESS]: (state, { payload }) =>
        immutable(state, {
          repos: {
            data: {
              [state.repos.query]: { $set: payload.data || [] },
            },
            status: { $set: STATUS.READY },
          },
        }),
      [ActionTypes.PRODUCT_GET_REPOS_FAILURE]: (state, { payload }) =>
        immutable(state, {
          repos: {
            message: { $set: parseError(payload.message) },
            status: { $set: STATUS.ERROR },
          },
        }),
    },
    productState,
  ),
};
