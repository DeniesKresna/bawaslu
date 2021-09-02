/*
 *
 * LayoutDashboard reducer
 *
 */
import produce from 'immer';
import { CHANGE_NOTIF_STATUS } from './constants';

export const initialState = {
  notifStatus: {
    open: false,
    title: 'Sukses',
    message: '',
    color: 'success'
  }
};

/* eslint-disable default-case, no-param-reassign */
const layoutDashboardReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_NOTIF_STATUS:
        console.log(action.payload);
        draft.notifStatus = action.payload;
        break;
    }
  });

export default layoutDashboardReducer;
