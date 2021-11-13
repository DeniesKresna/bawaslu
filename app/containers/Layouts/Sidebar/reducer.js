/*
 *
 * Sidebar reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, GET_USER_SUCCESS } from './constants';

export const initialState = {
  user: {},
  isLoading: false
};

/* eslint-disable default-case, no-param-reassign */
const sidebarReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case GET_USER_SUCCESS:
        draft.user = action.payload;
        break;
    }
  });

export default sidebarReducer;
