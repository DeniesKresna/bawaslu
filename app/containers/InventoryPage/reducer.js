/*
 *
 * InventoryPage reducer
 *
 */
import produce from 'immer';
import { CHANGE_SEARCH, GET_DATA_SUCCESS, CHANGE_FILTERED } from './constants';

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
  filtered: {
    unit: 0,
    goodsType: 0,
    room: 0,
    condition: 0,
    period: 0
  },
  row: {}
};


/* eslint-disable default-case, no-param-reassign */
const inventoryPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_DATA_SUCCESS:
        draft.data = action.payload;
        break;
      case CHANGE_SEARCH:
        draft.search = action.payload;
        break;
      case CHANGE_FILTERED:
        draft.filtered = action.payload;
        break;
    }
  });

export default inventoryPageReducer;
