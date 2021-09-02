/*
 *
 * UnitPage reducer
 *
 */
import produce from 'immer';
import { CHANGE_DATA, CHANGE_SEARCH, GET_DATA, GET_DATA_SUCCESS, GET_DATA_FAILED } from './constants';

export const initialState = {
  data: {
    current_page : 1,
    data: [],
    from: 0,
    last_page: 0,
    per_page: 10,
    to: 0,
    total: 0
  },
  search: '',
  isLoading: false,
  row: {}
};

/* eslint-disable default-case, no-param-reassign */
const unitPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_DATA:
        draft.isLoading = false;
        break;
      case GET_DATA_SUCCESS:
        draft.data = action.payload;
        draft.isLoading = false;
        break;
      case GET_DATA_FAILED:
        draft.isLoading = false;
        break;
      case CHANGE_SEARCH:
        draft.search = action.payload;
        break;
      case CHANGE_DATA:
        draft.isLoading = true;
        break;
    }
  });

export default unitPageReducer;
