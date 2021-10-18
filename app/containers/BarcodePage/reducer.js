/*
 *
 * BarcodePage reducer
 *
 */
import produce from 'immer';
import { GET_DATA, GET_DATA_SUCCESS, GET_DATA_FAILED } from './constants';

export const initialState = {
  data: null,
  dataExist: false
};

/* eslint-disable default-case, no-param-reassign */
const barcodePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_DATA_SUCCESS:
        draft.data = action.payload;
        draft.dataExist = true;
        break;
      case GET_DATA_FAILED:
        draft.dataExist = false
        break;
    }
  });

export default barcodePageReducer;
