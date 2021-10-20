/*
 *
 * BarcodePage reducer
 *
 */
import produce from 'immer';
import { GET_DATA, GET_DATA_SUCCESS, GET_GOODS_TYPE_SUCCESS, GET_DATA_FAILED, SET_DATA_EXIST } from './constants';

export const initialState = {
  data: null,
  dataExist: false,
  goodsTypeData: []
};

/* eslint-disable default-case, no-param-reassign */
const barcodePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_DATA:
        draft.data = null;
        draft.dataExist = true;
        break;
      case GET_DATA_SUCCESS:
        draft.data = action.payload;
        draft.dataExist = false;
        break;
      case GET_GOODS_TYPE_SUCCESS:
        draft.goodsTypeData = action.payload;
        break;
      case GET_DATA_FAILED:
        draft.dataExist = false
        break;
      case SET_DATA_EXIST:
        draft.data = null
        break;
    }
  });

export default barcodePageReducer;
