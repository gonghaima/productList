import reducer from 'reducers/Selection';
import { ActionTypes } from 'constants/index';

describe('Selection', () => {
  it('should return the initial state', () => {
    expect(reducer.selection(undefined, {})).toMatchSnapshot();
  });

  it(`should handle ${ActionTypes.SELECTION_CHANGE}`, () => {
    expect(
      reducer.selection(undefined, {
        type: ActionTypes.SELECTION_CHANGE,
        payload: { q: 'react' },
      }),
    ).toMatchSnapshot();
  });

  it(`should handle ${ActionTypes.PAGE_CHANGE}`, () => {
    expect(
      reducer.selection(undefined, {
        type: ActionTypes.PAGE_CHANGE,
        payload: {},
      }),
    ).toMatchSnapshot();
  });
});
