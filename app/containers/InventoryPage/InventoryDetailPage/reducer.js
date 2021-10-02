/*
 *
 * InventoryDetailPage reducer
 *
 */
import produce from 'immer';
import { GET_ROW_DATA, GET_ROW_DATA_SUCCESS } from './constants';

export const initialState = {
  rowData: {},
  unitList: [],
  roomList: [],
  conditionList: [],
  goodsTypeList: [],
  historyList: [],
  busy: false
};

/* eslint-disable default-case, no-param-reassign */
const inventoryDetailReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_ROW_DATA:
        draft.busy = true;
        break;
      case GET_ROW_DATA_SUCCESS:
        draft.rowData = action.payload;
        draft.busy = false;
        break;
    }
  });

export default inventoryDetailReducer;
