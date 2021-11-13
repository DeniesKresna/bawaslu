/*
 *
 * SurveyPage reducer
 *
 */
import produce from 'immer';
import { CHANGE_SEARCH, GET_ROW_SUCCESS, GET_DATA_SUCCESS, GET_LIST_SUCCESS } from './constants';

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
  row: {},
  list: []
};

/* eslint-disable default-case, no-param-reassign */
const surveyPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_DATA_SUCCESS:
        draft.data = action.payload;
        break;
      case CHANGE_SEARCH:
        draft.search = action.payload;
        break;
      case GET_LIST_SUCCESS:
        draft.list = action.payload;
        break;
      case GET_ROW_SUCCESS:
        draft.row = action.payload;
        break;
    }
  });

export default surveyPageReducer;
