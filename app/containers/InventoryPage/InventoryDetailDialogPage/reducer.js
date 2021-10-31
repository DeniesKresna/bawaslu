/*
 *
 * InventoryDetailDialogPage reducer
 *
 */
import produce from 'immer';
import { GET_ROW_DATA, GET_ROW_DATA_SUCCESS, GET_ACTIVE_PERIOD, GET_ACTIVE_PERIOD_SUCCESS } from './constants';

export const initialState = {
  rowData: {},
  busy: true,
  activePeriod: null
};

/* eslint-disable default-case, no-param-reassign */
const inventoryDetailDialogPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_ROW_DATA:
        draft.busy = true;
        break;
      case GET_ROW_DATA_SUCCESS:
        draft.rowData = action.payload;
        draft.busy = false;
        break;
      case GET_ACTIVE_PERIOD:
        draft.busy = true;
        break;
      case GET_ACTIVE_PERIOD_SUCCESS:
        draft.activePeriod = action.payload;
        draft.busy = false;
        break;
    }
  });

export default inventoryDetailDialogPageReducer;
