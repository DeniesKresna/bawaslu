/*
 *
 * LoginPage reducer
 *
 */
import produce from 'immer';
import { GET_USER, GET_USER_SUCCESS, GET_USER_FAILED} from './constants';

export const initialState = {
  user: {},
  message: "",
  isLoading: false
};

/* eslint-disable default-case, no-param-reassign */
const loginPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_USER:
        draft.isLoading = true;
        break;
      case GET_USER_SUCCESS:
        draft.user = action.payload;
        draft.isLoading = false;
        break;
      case GET_USER_FAILED:
        draft.message = action.payload;
        draft.isLoading = false;
        break;
    }
  });

export default loginPageReducer;
