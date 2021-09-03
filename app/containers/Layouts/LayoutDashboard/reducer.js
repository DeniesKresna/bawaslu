/*
 *
 * LayoutDashboard reducer
 *
 */
import produce from 'immer';
import { CHANGE_NOTIF_STATUS, SET_LOADING } from './constants';

export const initialState = {
  notifStatus: {
    open: false,
    title: 'Sukses',
    message: '',
    color: 'success'
  },
  isLoading: false
};

/* eslint-disable default-case, no-param-reassign */
const layoutDashboardReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_NOTIF_STATUS:
        draft.notifStatus = action.payload;
        break;
      case SET_LOADING:
        draft.isLoading = action.payload
        break;
    }
  });

export default layoutDashboardReducer;
